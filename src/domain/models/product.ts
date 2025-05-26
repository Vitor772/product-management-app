export interface ProductProps {
  id?: number;
  name: string;
  description?: string;
  price: number;
  category: string;
  stock: number;
}

export class Product {
  private id?: number;
  private name: string;
  private description?: string;
  private price: number;
  private category: string;
  private stock: number;

  constructor(props: ProductProps) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.price = props.price;
    this.category = props.category;
    this.stock = props.stock;
    this.validate();
  }

  getId(): number | undefined {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string | undefined {
    return this.description;
  }

  getPrice(): number {
    return this.price;
  }

  getCategory(): string {
    return this.category;
  }

  getStock(): number {
    return this.stock;
  }

  private validate(): void {
    if (!this.name) {
      throw new Error("Name is required");
    }
    if (this.price <= 0) {
      throw new Error("Price must be greater than zero");
    }
    if (this.stock < 0) {
      throw new Error("Stock cannot be negative");
    }
  }

  // Optional: Add a method to return the product as a plain object
  toObject(): ProductProps {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      category: this.category,
      stock: this.stock
    };
  }
}