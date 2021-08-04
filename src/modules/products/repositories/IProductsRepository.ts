import ICreateProductDTO from '../dtos/ICreateProductDTO';
import IGetAllProductsDTO from '../dtos/IGetAllProducts';
import Product from '../entities/Product';

export default interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  findAll(data: IGetAllProductsDTO): Promise<[Product[], number]>;
  findById(id: string): Promise<Product | undefined>;
}
