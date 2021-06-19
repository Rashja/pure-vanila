import { Product } from "../../models/Product";

export class ProductCard {
  product: Product;
  constructor(productInfo: Product) {
    this.product = productInfo;
  }
  render = (): string => {
    return `
        <div class="product-card-wrapper" >
        <div class="link-wrapper" >
            <a class="product-card-link" >
                <img class="product-card-img" src=${this.product.get(
                  "image"
                )} alt="product" />
                <div class="product-card-data-wrapper" >
                <div class="product-card-category" >${this.product.get('category')}</div>
                <div class="product-card-title" >${this.product.get('title')}</div>
                <div class="product-card-price" >price: ${this.product.get('price')} $</div>
                </div>
            </a>
        </div>
        </div>
        `;
  };
}
