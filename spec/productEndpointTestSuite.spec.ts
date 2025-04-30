import { ProductModel } from '../src/models/productModel';

describe('Product endpoints', () => {
  let token: string;
  const productModel: ProductModel = new ProductModel();
  beforeAll(async () => {
    const response = await fetch('http://localhost:3000/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: 'Alice',
        lastName: 'Anderson',
        password: 'password123',
      }),
    });
    const data = await response.json();
    token = data.token;
  });

  it('should return a 404 status code for a non-existent endpoint', async () => {
    const response = await fetch('http://localhost:3000/nonexistent');
    expect(response.status).toBe(404);
  });

  it('should return a 200 status code and three products from the seed data for the request to fetch all products. Route: /api/products', async () => {
    const response = await fetch('http://localhost:3000/api/products');
    const products = await response.json();
    expect(response.status).toBe(200);
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBe(3);
  });

  it('should return a 200 status code and a single product for the request to fetch a product by ID. Route: /api/products/:id', async () => {
    const response = await fetch('http://localhost:3000/api/products/1');
    const product = await response.json();
    expect(response.status).toBe(200);
    expect(product.id).toBe(1);
  });

  it('should return a 200 status code and a success message for the request to create a new product. Route: /api/products', async () => {
    const response = await fetch('http://localhost:3000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: 'New Product',
        price: 100,
        category: 'Category1',
      }),
    });
    const data = await response.json();
    expect(response.status).toBe(201);
    expect(data.message).toBe('Product created successfully');
    expect(data.product).toBeDefined();
    expect(data.product.name).toBe('New Product');
    const result = await productModel.deleteProduct(data.product.id);
    expect(result).toBe(true);
  });
});
