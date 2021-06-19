import {Model} from "./Model";
import { Attributes } from "./Attributes";
import { ApiSync } from "./ApiSync";
import { Eventing } from "./Eventing";
import { Collection } from "./Collection";

export interface ProductProps{
    title?:string;
    id?:number;
    price?:number;
    image?:string;
    description?:string;
    category?:string;
}

const rootUrl="https://fakestoreapi.com/products";

export class Product extends Model<ProductProps>{
    static buidProduct(attrs?:ProductProps):Product {
        return new Product(
            new Attributes<ProductProps>(attrs!),
            new Eventing(),
            new ApiSync<ProductProps>(rootUrl)
        )
    }
    static buildProductCollection():Collection<Product,ProductProps>{
        return new Collection<Product,ProductProps>(
            rootUrl,
            (json:ProductProps)=>Product.buidProduct(json)
        )
    }
}