import { Product } from "../../domain/models/product";
import { ProductRepository } from "../../domain/repositories/productRepository";

export class UpdateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(id: number, productData: Partial<Product>): Promise<Product> {
    const existingProduct = await this.productRepository.findById(id);
    if (!existingProduct) {
      throw new Error("Product not found");
    }

    const updatedProduct = new Product({
      id: existingProduct.getId(),
      name: (productData as any).name ?? existingProduct.getName(),
      description: (productData as any).description ?? existingProduct.getDescription(),
      price: (productData as any).price ?? existingProduct.getPrice(),
      category: (productData as any).category ?? existingProduct.getCategory(),
      stock: (productData as any).stock ?? existingProduct.getStock(),
    });

    return this.productRepository.update(id, updatedProduct);
  }
}