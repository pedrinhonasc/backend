import Image from '../entities/Image';
import ICreateImageDTO from '../dtos/ICreateImageDTO';

export default interface IImagesRepository {
  create(data: ICreateImageDTO): Promise<Image>;
}
