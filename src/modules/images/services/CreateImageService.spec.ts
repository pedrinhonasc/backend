import CreateImageService from './CreateImageService';
import FakeImagesRepository from '../repositories/fakes/FakeImagesRepository';
import FakeProductsRepository from '../../products/repositories/fakes/FakeProductsRepository';
import CreateProductService from '../../products/services/CreateProductService';
import AppError from '../../../shared/errors/AppError';

let fakeImagesRepository: FakeImagesRepository;
let fakeProductsRepository: FakeProductsRepository;
let createImage: CreateImageService;
let createProduct: CreateProductService;

describe('CreateImage', () => {
  beforeAll(() => {
    fakeImagesRepository = new FakeImagesRepository();
    fakeProductsRepository = new FakeProductsRepository();
    createProduct = new CreateProductService(fakeProductsRepository);
    createImage = new CreateImageService(
      fakeImagesRepository,
      fakeProductsRepository,
    );
  });
  it('should be able to create an image', async () => {
    const product = await createProduct.execute({
      name: 'Kit de lençol',
      brand: 'Bom sono',
      description: 'Casal',
      price: 200,
      discount: 5,
    });

    const response = await createImage.execute({
      imagePath: 'img.png',
      subtitle: 'img',
      product_id: product.id,
    });

    expect(response).toHaveProperty('id');
  });
  it('should not be able to create an image', async () => {
    await createProduct.execute({
      name: 'Kit de lençol',
      brand: 'Bom sono',
      description: 'Casal',
      price: 200,
      discount: 5,
    });

    expect(
      createImage.execute({
        imagePath: 'img.png',
        subtitle: 'img',
        product_id: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
