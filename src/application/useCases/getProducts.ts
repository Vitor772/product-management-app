import { Product } from "../../domain/models/product";
import { ProductRepository } from "../../domain/repositories/productRepository";

export class GetProductsUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(): Promise<Product[]> {
    return this.productRepository.findAll();
  }
}