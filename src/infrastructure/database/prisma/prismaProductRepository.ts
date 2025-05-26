import { PrismaClient } from "@prisma/client";
import { Product } from "../../../domain/models/product";
import { ProductRepository } from "../../../domain/repositories/productRepository";

export class PrismaProductRepository implements ProductRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(): Promise<Product[]> {
    const products = await this.prisma.product.findMany();
    return products.map(product => this.toDomainProduct(product));
  }

  async findById(id: number): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({ where: { id } });
    return product ? this.toDomainProduct(product) : null;
  }

  async save(product: Product): Promise<Product> {
    const newProduct = await this.prisma.product.create({
      data: this.toPrismaData(product)
    });
    return this.toDomainProduct(newProduct);
  }

  async update(id: number, product: Product): Promise<Product> {
    const updatedProduct = await this.prisma.product.update({
      where: { id },
      data: this.toPrismaData(product)
    });
    return this.toDomainProduct(updatedProduct);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.product.delete({ where: { id } });
  }

  private toDomainProduct(prismaProduct: any): Product {
    return new Product({
      id: prismaProduct.id,
      name: prismaProduct.name,
      description: prismaProduct.description ?? undefined,
      price: prismaProduct.price,
      category: prismaProduct.category,
      stock: prismaProduct.stock
    });
  }

  private toPrismaData(product: Product): any {
    return {
      name: product.getName(),
      description: product.getDescription(),
      price: product.getPrice(),
      category: product.getCategory(),
      stock: product.getStock()
    };
  }
}