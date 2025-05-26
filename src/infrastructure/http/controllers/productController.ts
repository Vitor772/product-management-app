// src/presentation/controllers/productController.ts
import { Request, Response } from "express";
import { CreateProductUseCase } from "../../../application/useCases/createProduct";
import { GetProductsUseCase } from "../../../application/useCases/getProducts";
import { GetProductByIdUseCase } from "../../../application/useCases/getProductById"; // <--- NEW IMPORT
import { UpdateProductUseCase } from "../../../application/useCases/updateProduct";
import { DeleteProductUseCase } from "../../../application/useCases/deleteProduct";
import { PrismaProductRepository } from "../../database/prisma/prismaProductRepository";

const productRepository = new PrismaProductRepository();

export class ProductController {
  static async getAllProducts(req: Request, res: Response) {
    try {
      const getProducts = new GetProductsUseCase(productRepository);
      const products = await getProducts.execute();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }

  // <--- ADD THIS NEW METHOD
  static async getProductById(req: Request, res: Response) {
    try {
      const getProduct = new GetProductByIdUseCase(productRepository);
      const product = await getProduct.execute(parseInt(req.params.id));
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }
  // ---> END NEW METHOD

  static async createProduct(req: Request, res: Response) {
    try {
      const createProduct = new CreateProductUseCase(productRepository);
      const product = await createProduct.execute(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }

  static async updateProduct(req: Request, res: Response) {
    try {
      const updateProduct = new UpdateProductUseCase(productRepository);
      const product = await updateProduct.execute(
        parseInt(req.params.id),
        req.body
      );
      res.json(product);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }

  static async deleteProduct(req: Request, res: Response) {
    try {
      const deleteProduct = new DeleteProductUseCase(productRepository);
      await deleteProduct.execute(parseInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }
}