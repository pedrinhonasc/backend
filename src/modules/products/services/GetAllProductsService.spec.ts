import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import GetAllProductsService from './GetAllProductsService';
import CreateProductService from './CreateProductService';

let fakeProductsRepository: FakeProductsRepository;
let getAllProducts: GetAllProductsService;
let createProduct: CreateProductService;

describe('GetAllProduct', () => {
  beforeAll(async () => {
    fakeProductsRepository = new FakeProductsRepository();
    getAllProducts = new GetAllProductsService(fakeProductsRepository);
    createProduct = new CreateProductService(fakeProductsRepository);

    await createProduct.execute({
      name: 'Kit de lençol',
      brand: 'Bom sono',
      description: 'Casal',
      price: 200,
      discount: 5,
    });

    await createProduct.execute({
      name: 'Kit de lençol',
      brand: 'Bom sono',
      description: 'Casal',
      price: 200,
      discount: 5,
    });

    await createProduct.execute({
      name: 'Kit de lençol',
      brand: 'Bom sono',
      description: 'Casal',
      price: 200,
      discount: 5,
    });
  });
  it('should be able to list all products', async () => {
    const products = await getAllProducts.execute({
      productsPerPage: 10,
      currentPage: 1,
      productName: '',
    });

    expect(products.foundProductsTotal).toBe(3);
    expect(products.totalPagesNum).toBe(1);
  });
});
