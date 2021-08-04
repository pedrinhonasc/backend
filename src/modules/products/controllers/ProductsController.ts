import { Request, Response } from 'express';
import ProductsRepository from '../repositories/ProductsRepository';
import GetAllProductsService from '../services/GetAllProductsService';

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { name: productName } = request.query;
    const productsPerPage = parseInt(String(request.query.productsPerPage), 10);
    const currentPage = parseInt(String(request.query.currentPage), 10);
    const productsRepository = new ProductsRepository();
    const getAllProductsService = new GetAllProductsService(productsRepository);

    console.log(request.query);
    console.group(currentPage);
    console.log(productName);

    const pageData = await getAllProductsService.execute({
      productsPerPage,
      currentPage,
      productName: String(productName),
    });

    return response.json(pageData);
  }
}
