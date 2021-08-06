import Product from '../entities/Product';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import CreateProductService from './CreateProductService';

let fakeProductsRepository: FakeProductsRepository;
let createProduct: CreateProductService;

describe('CreateProduct', () => {
  beforeAll(() => {
    fakeProductsRepository = new FakeProductsRepository();
    createProduct = new CreateProductService(fakeProductsRepository);
  });
  it('should be able to create a product', async () => {
    const product = new Product();
    const response = await createProduct.execute({
      name: 'Kit de lençol',
      brand: 'Bom sono',
      description: 'Casal',
      price: 200,
      discount: 5,
    });

    Object.assign(product, {
      name: response.name,
      brand: response.brand,
      description: response.description,
      price: response.price,
      discount: response.discount,
    });

    expect(response).toHaveProperty('id');
    expect(product).toEqual({
      name: 'Kit de lençol',
      brand: 'Bom sono',
      description: 'Casal',
      price: 200,
      discount: 5,
    });
  });
});
