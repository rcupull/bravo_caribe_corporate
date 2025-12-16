import { ModelDocument, QueryHandle } from '../../types/general';
import { Product } from '../../types/products';
import { GetAllShoppingArgs, Shopping, ShoppingState } from '../../types/shopping';
import { isEqualIds } from '../../utils/general';
import { ModelCrudTemplate } from '../../utils/ModelCrudTemplate';
import { modelGetter } from './schemas';
import { getAllFilterQuery } from './utils';

export class ShoppingServices extends ModelCrudTemplate<
  Shopping,
  Pick<Shopping, 'state' | 'purchaserId' | 'browserFingerprint' | 'products'>,
  GetAllShoppingArgs
> {
  constructor() {
    super(modelGetter, getAllFilterQuery);
  }

  getShoppingDataFromProduct: QueryHandle<
    {
      products: Array<Product>;
    },
    {
      getOneProductShoppingData: (post: Product) => {
        amountInProcess: number;
        stockAmountAvailable: number;
        stockAmount: number;
      };
    }
  > = async ({ products }) => {
    /**
     * shopping que tienen estos productos incluidos pero todavia no han sido vendidos. O sea, existen en los almacenes del comerciante
     * El stockAmount de los posts sera decrementado una vez se haya vendido y entregado el producto (cambia para ShoppingState.DELIVERED)
     *
     * Un equivalente a este metodo exite en TransactionsServices de market-catalogs
     * */
    const allShoppings = (await this.getAll({
      query: {
        'products.productData._id': { $in: products.map((p) => p._id) },
        state: {
          $in: [
            ShoppingState.CONSTRUCTION,
            ShoppingState.REQUESTED,
            ShoppingState.APPROVED,
            ShoppingState.READY_TO_DELIVERY
          ]
        }
      },
      projection: {
        products: 1
      }
    })) as Array<Pick<Shopping, 'products'>>;

    return {
      getOneProductShoppingData: (product) => {
        const { stockAmount = 0 } = product;
        const amountInProcess = allShoppings.reduce((acc, shopping) => {
          let out = acc;
          shopping.products.forEach(({ count, productData }) => {
            if (isEqualIds(productData._id, product._id)) {
              out = out + count;
            }
          });

          return out;
        }, 0);

        return {
          amountInProcess,
          stockAmount,
          stockAmountAvailable: stockAmount - amountInProcess
        };
      }
    };
  };

  changeShoppingState = (
    shopping: ModelDocument<Shopping>,
    state: ShoppingState
  ): ModelDocument<Shopping> => {
    if (!shopping.history) {
      shopping.history = [];
    }

    shopping.history.push({
      state,
      lastUpdatedDate: new Date()
    });

    shopping.state = state;

    return shopping;
  };
}
