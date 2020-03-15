import { ProductState } from './../reducers/products.reducer';
import { HashMap } from '../../shared/HashMap';
import { Product } from '../../models/product.class';
export const availableProductsAsList = ({ product }: { product: ProductState; }) =>
    hashMapToList<Product>(product.availableProducts);

function hashMapToList<T>(oh: HashMap<T>): Array<T> {
    return Object.keys(oh).map(key => oh[key]);
}
