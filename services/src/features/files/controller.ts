import { FileServices } from './services';

import { combineMiddleware } from '../../utils/general';
import { controllerFactory } from '../../utils/controllers';
import { get200Response } from '../../utils/responses';

export class FileController {
  constructor(private readonly fileServices: FileServices) {}

  post_image_products = combineMiddleware(
    this.fileServices.middlewareMulterMemoryStorage,
    controllerFactory({}, async ({ req, res }) => {
      const { file } = req;

      if (!file) {
        return res.status(400).send('No file uploaded.');
      }

      const { imageSrc } = await this.fileServices.uploadImage({
        imageBuffer: file.buffer,
        imagePath: `products`
      });

      get200Response({
        res,
        json: {
          imageSrc
        }
      });
    })
  );

  post_image_blogs = combineMiddleware(
    this.fileServices.middlewareMulterMemoryStorage,
    controllerFactory({}, async ({ req, res }) => {
      const { file } = req;

      if (!file) {
        return res.status(400).send('No file uploaded.');
      }

      const { imageSrc } = await this.fileServices.uploadImage({
        imageBuffer: file.buffer,
        imagePath: `blogs`
      });

      get200Response({
        res,
        json: {
          imageSrc
        }
      });
    })
  );
}
