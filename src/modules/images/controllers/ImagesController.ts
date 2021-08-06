import { Request, Response } from 'express';
import ProductsRepository from '../../products/repositories/ProductsRepository';
import ImagesRepository from '../repositories/ImagesRepository';
import CreateImageService from '../services/CreateImageService';

export default class ImagesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { imagePath, caption, product_id } = request.body;

    const imagesRepository = new ImagesRepository();
    const productsRepository = new ProductsRepository();

    const createImageService = new CreateImageService(
      imagesRepository,
      productsRepository,
    );

    const image = await createImageService.execute({
      imagePath,
      caption,
      product_id,
    });

    return response.json(image);
  }
}
