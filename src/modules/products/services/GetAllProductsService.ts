import IGetAllProductsDTO from '../dtos/IGetAllProducts';
import IProductsRepository from '../repositories/IProductsRepository';

interface IResponse {
  productsData: IProductsData[];
  foundProductsTotal: number;
  totalPagesNum: number;
}

interface IProductsData {
  id: string;
  name: string;
  brand: string;
  description: string;
  originalPrice: number;
  discountPrice: number;
  images: string[];
}

function capitalizeFirstLetter(text: string): string {
  const words = text.split(' ');
  return words
    .map(word => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(' ');
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
      images: product.images.map(
        image => `${process.env.IMAGE_URL}/${image.path}`,
      ),
    }));

    const response: IResponse = {
      productsData,
      foundProductsTotal,
      totalPagesNum: Math.ceil(foundProductsTotal / productsPerPage),
    };

    return response;
  }
}
