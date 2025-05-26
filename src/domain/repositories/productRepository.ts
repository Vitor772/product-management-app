import { Product } from "../models/product";

export interface ProductRepository {
  findAll(): Promise<Product[]>;
  findById(id: number): Promise<Product | null>;
  save(product: Product): Promise<Product>;
  update(id: number, product: Product): Promise<Product>;
  delete(id: number): Promise<void>;
}