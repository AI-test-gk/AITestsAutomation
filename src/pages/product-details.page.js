import BasePage from './base.page';
import ProductCardComponent from '../components/product-card.component';

class ProductDetailsPage extends BasePage {
    constructor(page) {
        super();
        this.page = page;
        this.productCard = new ProductCardComponent(page);
    }

    get removeButton() {
        return this.page.getByRole('button', {name: 'Remove'});
    }

    get backToProductsButton() {
        return this.page.getByTestId('back-to-products');
    }
}

export default ProductDetailsPage;
