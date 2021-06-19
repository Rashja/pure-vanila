import { View } from "../View";
import { Product, ProductProps } from "../../models/Product";
import { ProductCard } from "../../components/porduct-card/ProductCard";
const products = Product.buildProductCollection();
const product = Product.buidProduct({ id: 1 });

export default class Posts extends View<Product, ProductProps> {
  constructor(_params: number, _parent: Element) {
    super(_params, _parent, product);
    this.classDidMount();
  }
  
  classDidMount = () => {
    this.setTitle("products");
    products.on("change", () => {
      this.render();
    });
    products.fetch();
  };

  regionsMap(): { [key: string]: string } {
    return {
      userShow: ".user-show",
      userForm: ".user-form",
    };
  }

  eventsMap(): { [key: string]: () => void } {
    return {
      "click:.test": this.buttonClick,
    };
  }

  buttonClick(): void {
    products.fetch();
    console.log("clicked");
  }

  onRender(): void {
    // const userShow= new UserShow(this.regions.userShow,this.model)
    // userShow.render()
  }

  template(): string {
    return `
        <div class="products-wrapper" >
          ${products.models.map((item)=>new ProductCard(item).render()).join(" ")}
        </div>
      `;
  }
}
