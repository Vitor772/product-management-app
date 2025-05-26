import { ProductRepository } from "../../domain/repositories/productRepository";

export class DeleteProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(id: number): Promise<void> {
    const existingProduct = await this.productRepository.findById(id);
    if (!existingProduct) {
      throw new Error("Product not found");
    }
    return this.productRepository.delete(id);
  }
}