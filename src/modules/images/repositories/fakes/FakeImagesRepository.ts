import { uuid } from 'uuidv4';
import Image from '../../entities/Image';
import ICreateImageDTO from '../../dtos/ICreateImageDTO';
import IImagesRepository from '../IImagesRepository';

export default class FakeImagesRepository implements IImagesRepository {
  private images: Image[] = [];

  public async create({
    imagePath,
    subtitle,
    product_id,
  }: ICreateImageDTO): Promise<Image> {
    const image = new Image();
    Object.assign(image, {
      id: uuid(),
      path: imagePath,
      subtitle,
      product_id,
    });

    this.images.push(image);

    return image;
  }
}
