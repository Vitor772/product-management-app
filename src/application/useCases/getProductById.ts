import { Product } from "../../domain/models/product";
import { ProductRepository } from "../../domain/repositories/productRepository";

export class GetProductByIdUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(id: number): Promise<Product | null> {
    return this.productRepository.findById(id);
  }
}