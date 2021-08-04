import { getRepository, Like, Repository } from 'typeorm';
import Product from '../entities/Product';
import IProductsRepository from './IProductsRepository';
import ICreateProductDTO from '../dtos/ICreateProductDTO';
import IGetAllProductsDTO from '../dtos/IGetAllProducts';

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    brand,
    description,
    price,
    discount,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({
      name,
      brand,
      description,
      price,
      discount,
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async findAll({
    productsPerPage,
    currentPage,
    productName,
  }: IGetAllProductsDTO): Promise<[Product[], number]> {
    const skipOffset = (currentPage - 1) * productsPerPage;
    const lowerProductName = productName.toLowerCase();
    return this.ormRepository.findAndCount({
      order: {
        name: 'ASC',
      },
      skip: skipOffset,
      take: productsPerPage,
      where: {
        name: Like(`%${lowerProductName}%`),
      },
      relations: ['images'],
    });
  }

  public async findById(id: string): Promise<Product | undefined> {
    return this.ormRepository.findOne(id);
  }
}

export default ProductsRepository;
