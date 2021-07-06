import { View } from "../View";
import { Product, ProductProps } from "../../models/Product";
import { SingleProduct } from "../../components/single-product/SingleProduct";

export default class extends View<Product, ProductProps> {
  product:Product | null = null;
  constructor(_params: {id:number}, _parent: Element) { 
    super(_params, _parent, Product.buidProduct());
    this.classDidMount(_params.id,Product.buidProduct({id:Number(_params.id)}));
  }
  
  classDidMount = (_param:number,_product:Product) => {
    this.setTitle("product");
    _product.on("change", () => {
      this.render();
    });
  
    _product.fetch()
    this.product=_product
  };

  eventsMap(): { [key: string]: () => void } {
    return {
      "click:.test": this.buttonClick,
    };
  }

  buttonClick(): void {
    this.product!.fetch();
    console.log("clicked");
  }

  template(): string {
    return `
       <div class="single-product-container" >
          ${new SingleProduct(this.product!).render()}
        </div>
      `;
  }
}

