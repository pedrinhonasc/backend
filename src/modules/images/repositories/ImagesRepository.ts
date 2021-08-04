import { getRepository, Repository } from 'typeorm';
import Image from '../entities/Image';
import ICreateImageDTO from '../dtos/ICreateImageDTO';
import IImagesRepository from './IImagesRepository';

export default class ImagesRepository implements IImagesRepository {
  private ormRepository: Repository<Image>;

  constructor() {
    this.ormRepository = getRepository(Image);
  }

  public async create({
    imagePath,
    subtitle,
    product_id,
  }: ICreateImageDTO): Promise<Image> {
    const image = this.ormRepository.create({
      path: imagePath,
      subtitle,
      product_id,
    });

    await this.ormRepository.save(image);

    return image;
  }
}
