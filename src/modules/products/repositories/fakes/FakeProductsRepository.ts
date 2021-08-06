import { uuid } from 'uuidv4';
import Product from '../../entities/Product';
import IProductsRepository from '../IProductsRepository';
import ICreateProductDTO from '../../dtos/ICreateProductDTO';
import IGetAllProductsDTO from '../../dtos/IGetAllProducts';

class FakeProductsRepository implements IProductsRepository {
  private products: Product[] = [];

  public async create({
    name,
    brand,
    description,
    price,
    discount,
  }: ICreateProductDTO): Promise<Product> {
    const product = new Product();

    Object.assign(product, {
      id: uuid(),
      name,
      brand,
      description,
      price,
      discount,
    });

    this.products.push(product);

    return product;
  }

  public async findAll({
    productsPerPage,
    currentPage,
    productName,
  }: IGetAllProductsDTO): Promise<[Product[], number]> {
    const skipOffset = (currentPage - 1) * productsPerPage;
    const lowerProductName: string = productName.toLowerCase();
    const foundProducts: Product[] = this.products.filter(product =>
      product.name.includes(lowerProductName),
    );
    const sortedProducts: Product[] = foundProducts.sort(
      (a: Product, b: Product) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      },
    );
    const productsToReturn: Product[] = sortedProducts
      .splice(0, skipOffset)
      .slice(0, productsPerPage);

    const productsReady: Product[] = productsToReturn.map(product =>
      Object.assign(product, {
        images: [
          { path: 'img1.png', caption: 'Cama' },
          { path: 'img2.png', caption: 'banho' },
        ],
      }),
    );
    return [productsReady, this.products.length];
  }

  public async findById(id: string): Promise<Product | undefined> {
    const index = this.products.findIndex(product => product.id === id);
    return this.products[index];
  }
}

export default FakeProductsRepository;
