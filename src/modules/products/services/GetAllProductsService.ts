import IGetAllProductsDTO from '../dtos/IGetAllProducts';
import IProductsRepository from '../repositories/IProductsRepository';
import capitalizeFirstLetter from '../../../shared/utils/utils';

interface IResponse {
  productsData: IProductsData[];
  foundProductsTotal: number;
  totalPagesNum: number;
}

interface IImage {
  path: string;
  caption: string;
}

interface IProductsData {
  id: string;
  name: string;
  brand: string;
  description: string;
  originalPrice: number;
  discountPrice: number;
  images: IImage[];
}

export default class GetAllProductsService {
  constructor(private productsRepository: IProductsRepository) {}

  public async execute({
    productsPerPage,
    currentPage,
    productName,
  }: IGetAllProductsDTO): Promise<IResponse> {
    const [products, foundProductsTotal] =
      await this.productsRepository.findAll({
        productsPerPage,
        currentPage,
        productName,
      });

    const productsData: IProductsData[] = products.map(product => ({
      id: product.id,
      name: capitalizeFirstLetter(product.name),
      brand: product.brand,
      description: product.description,
      originalPrice: parseInt(product.price.toString(), 10),
      discountPrice:
        Math.round(product.price * (1 - product.discount / 100) * 100) / 100,
      images: product.images.map(image => {
        return {
          path: `${process.env.IMAGE_URL}/${image.path}`,
          caption: image.caption,
        };
      }),
    }));

    const response: IResponse = {
      productsData,
      foundProductsTotal,
      totalPagesNum: Math.ceil(foundProductsTotal / productsPerPage),
    };

    return response;
  }
}
