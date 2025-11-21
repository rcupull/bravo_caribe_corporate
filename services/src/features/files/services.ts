import multer from 'multer';
import {
  S3Client,
  ListBucketsCommand,
  PutObjectCommand,
  ListObjectsV2Command,
  DeleteObjectCommand
} from '@aws-sdk/client-s3';
import { Agent } from 'https';
import sharp, { WebpOptions } from 'sharp';
import { logger } from '../logger';
import { Image, QueryHandle, RequestHandler } from '../../types/general';
import {
  S3_REGION,
  S3_ENDPOINT,
  S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY,
  S3_BUCKET_APP
} from '../../config';

export class FileServices {
  private s3: S3Client;

  middlewareMulterMemoryStorage: RequestHandler;
  constructor() {
    this.s3 = new S3Client({
      endpoint: S3_ENDPOINT,
      credentials: {
        accessKeyId: S3_ACCESS_KEY_ID,
        secretAccessKey: S3_SECRET_ACCESS_KEY
      },
      region: S3_REGION,
      forcePathStyle: true,
      /**
       * ////////////////////////////////////////////////////////////////////////
       * ////////////////////////////////////////////////////////////////////////
       * ////////////////////////////////////////////////////////////////////////
       * TODO this is a security issue to fix
       * ////////////////////////////////////////////////////////////////////////
       * ////////////////////////////////////////////////////////////////////////
       * ////////////////////////////////////////////////////////////////////////
       */
      //eslint-disable-next-line
      requestHandler: new (require('@aws-sdk/node-http-handler').NodeHttpHandler)({
        httpsAgent: new Agent({
          rejectUnauthorized: false // ⚠️ Ignore SSL certificate errors
        })
      })
    });

    /**
     * //////////////////////////////////////////////////////////////////////
     * //////////////////////////////////////////////////////////////////////
     * //////////////////////////////////////////////////////////////////////
     */

    this.middlewareMulterMemoryStorage = multer({
      storage: multer.memoryStorage(),
      limits: {
        fileSize: 10 * 1024 * 1024 // Limit file size to 10MB
      }
    }).single('upload');

    /**
     * //////////////////////////////////////////////////////////////////////
     * //////////////////////////////////////////////////////////////////////
     * //////////////////////////////////////////////////////////////////////
     */

    if (process.env.NODE_ENV !== 'test') {
      this.s3
        .send(
          new ListBucketsCommand({
            BucketRegion: S3_REGION
          })
        )
        .then(() => {
          logger.info('MINIO Connected');
        })
        .catch((e: any) => {
          logger.info(`MINIO Error: ${JSON.stringify(e)}`);
        });
    }
  }

  getAllObjectBucket = async (folderPath: string) => {
    const command = new ListObjectsV2Command({ Bucket: S3_BUCKET_APP, Prefix: folderPath });

    try {
      const { Contents = [] } = await this.s3.send(command);

      return Contents.map(({ Key }) => Key);
    } catch (error) {
      logger.error('Error fetching objects from S3 bucket:', error);
      return [];
    }
  };

  uploadImage: QueryHandle<
    {
      imagePath: string;
      imageBuffer: Buffer;
      resize?: number | null;
      options?: WebpOptions;
    },
    {
      imageSrc: string | null;
    }
  > = async ({ imagePath, imageBuffer, options = {}, resize = 800 }) => {
    const transformedImage = await sharp(imageBuffer)
      .resize(resize)
      .webp({ quality: 80, lossless: false, smartSubsample: true, ...options })
      .toBuffer();

    const imageSrc = `/images/${imagePath}/${Date.now().toString()}.webp`;

    const command = new PutObjectCommand({
      Bucket: S3_BUCKET_APP,
      Key: imageSrc,
      Body: transformedImage,
      ContentType: 'image/webp'
    });

    try {
      await this.s3.send(command);
      return { imageSrc };
    } catch (error) {
      logger.error('Error putting objects to S3 bucket:', error);
      return { imageSrc: null };
    }
  };

  copyTmpImageToJpeg: QueryHandle<
    {
      originalImageUrl: string;
    },
    {
      imageSrc: string | null;
    }
  > = async ({ originalImageUrl }) => {
    const response = await fetch(originalImageUrl);
    if (!response.ok) {
      logger.error(`No se pudo descargar la imagen: ${response.status}`);
      return { imageSrc: null };
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const transformedImage = await sharp(buffer)
      .resize(800)
      .webp({ quality: 80, lossless: false, smartSubsample: true })
      .toBuffer();

    const imageSrc = `/images/tmp/${Date.now().toString()}.jpeg`;

    const command = new PutObjectCommand({
      Bucket: S3_BUCKET_APP,
      Key: imageSrc,
      Body: transformedImage,
      ContentType: 'image/jpeg'
    });

    try {
      await this.s3.send(command);
      return { imageSrc };
    } catch (error) {
      logger.error('Error putting objects to S3 bucket:', error);
      return { imageSrc: null };
    }
  };

  imagesDeleteMany = async (args: { imagesToDelete: Array<Image> }) => {
    const { imagesToDelete } = args;

    if (!imagesToDelete.length) {
      return;
    }

    try {
      const promises = imagesToDelete.map((image) => {
        return this.s3.send(
          new DeleteObjectCommand({
            Bucket: S3_BUCKET_APP,
            Key: image.src
          })
        );
      });

      await Promise.all(promises);
    } catch (e) {
      logger.error('Error deleting images', e);
    }
  };
}
