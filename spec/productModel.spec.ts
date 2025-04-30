import { ProductModel } from '../src/models/productModel';
import { Product } from '../src/types';

describe('Product model', () => {
  let productModel: ProductModel;

  beforeAll(() => {
    productModel = new ProductModel();
  });

  it('should return products from the test database', async () => {
    const products = await productModel.index();
    expect(products).toBeInstanceOf(Array);
    expect(products.length).toBe(3);
  });

  it('should return a product by ID from the test database', async () => {
    const product = await productModel.show('1');
    expect(product).toBeDefined();
    expect(product.id).toBe(1);
  });

  it('should create a new product in the test database', async () => {
    const newProduct = {
      name: 'Test Product',
      price: 50,
      category: 'Test Category',
    };
    const createdProduct = await productModel.create(newProduct as Product);
    expect(createdProduct).toBeDefined();
    expect(createdProduct.name).toBe(newProduct.name);

    expect(createdProduct.category).toBe(newProduct.category);
    const resultOfDeleting = await productModel.deleteProduct(
      createdProduct.id.toString()
    );
    expect(resultOfDeleting).toBe(true);
  });
});
