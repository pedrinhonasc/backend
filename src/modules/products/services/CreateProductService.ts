import Product from '../entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  name: string;
  brand: string;
  description: string;
  price: number;
  discount: number;
}

class CreateProductService {
  constructor(private productsRepository: IProductsRepository) {}

  public async execute({
    name,
    brand,
    description,
    price,
    discount,
  }: IRequest): Promise<Product> {
    const product = await this.productsRepository.create({
      name,
      brand,
      description,
      price,
      discount,
    });
    return product;
  }
}

export default CreateProductService;
