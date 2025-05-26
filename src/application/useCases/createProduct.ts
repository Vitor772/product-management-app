import { Product, ProductProps } from "../../domain/models/product";
import { ProductRepository } from "../../domain/repositories/productRepository";

export class CreateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(productData: ProductProps): Promise<Product> {
    const product = new Product(productData);
    return this.productRepository.save(product);
  }
}