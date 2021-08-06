import Image from '../entities/Image';
import IImagesRepository from '../repositories/IImagesRepository';
import IProductsRepository from '../../products/repositories/IProductsRepository';
import AppError from '../../../shared/errors/AppError';

interface IRequest {
  imagePath: string;
  subtitle: string;
  product_id: string;
}

export default class CreateImageService {
  constructor(
    private imagesRepository: IImagesRepository,
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    imagePath,
    subtitle,
    product_id,
  }: IRequest): Promise<Image> {
    const foundProduct = await this.productsRepository.findById(product_id);

    if (!foundProduct) throw new AppError('Product not found.', 400);

    const image = await this.imagesRepository.create({
      imagePath,
      subtitle,
      product_id,
    });

    return image;
  }
}
