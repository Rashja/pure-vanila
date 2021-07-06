import { Product } from "../../models/Product";

export class SingleProduct {
  product: Product;
  constructor(productInfo: Product) {
    this.product = productInfo;
  }
  render = (): string => {
    return `
        <div class="single-product-wrapper" >
            <div class="single-product-img-wrapper" >
                <img 
                    class="single-product-img"
                    src=${this.product.get("image")} 
                    alt="product"
                />
            </div>
            <div class="single-product-data-wrapper" >
                <div class="single-product-category" >${this.product.get('category')}</div>
                <div class="single-product-title" >${this.product.get('title')}</div>
                <div class="single-product-description" >${this.product.get('description')}</div>
                <div class="single-product-price" >price: ${this.product.get('price')} $</div>
            </div>
        </div>
        `;
  };
}

