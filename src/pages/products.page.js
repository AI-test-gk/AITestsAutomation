import BasePage from './base.page';
import TEST_IDS from '../constants/test-ids';
import ProductCardComponent from '../components/product-card.component';

class ProductsPage extends BasePage {
    constructor(page) {
        super();
        this.page = page;
    }

    get pageTitle() {
        return this.page.getByTestId(TEST_IDS.common.pageTitle);
    }

    get inventoryList() {
        return this.page.getByTestId('inventory-list');
    }

    get inventoryItems() {
        return this.page.getByTestId(TEST_IDS.products.inventoryItem);
    }

    get cartLink() {
        return this.page.getByTestId('shopping-cart-link');
    }

    get cartBadge() {
        return this.page.getByTestId('shopping-cart-badge');
    }

    get sortDropdown() {
        return this.page.getByTestId('product-sort-container');
    }

    get activeSortOption() {
        return this.page.getByTestId('active-option');
    }

    get sideMenuButton() {
        return this.page.getByRole('button', {name: 'Open Menu'});
    }

    get logoutLink() {
        return this.page.getByTestId('logout-sidebar-link');
    }

    getProductCard(productCard) {
        return new ProductCardComponent(productCard);
    }

    async addToCart(productCard) {
        await this.getProductCard(productCard).addToCart();
    }

    async removeFromCart(productCard) {
        await this.getProductCard(productCard).removeFromCartByRole();
    }

    async goToCart() {
        await this.cartLink.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async selectSortOption(value) {
        await this.sortDropdown.selectOption(value);
    }

    async getProductNames() {
        const count = await this.inventoryItems.count();
        const names = [];

        for (let index = 0; index < count; index += 1) {
            const item = this.inventoryItems.nth(index);
            const name = await this.getProductCard(item).getFieldText(
                TEST_IDS.productFields.name
            );
            names.push(name.trim());
        }

        return names;
    }

    async getProductPrices() {
        const count = await this.inventoryItems.count();
        const prices = [];

        for (let index = 0; index < count; index += 1) {
            const item = this.inventoryItems.nth(index);
            const priceText = await this.getProductCard(item).getFieldText(
                TEST_IDS.productFields.price
            );
            prices.push(Number(priceText.replace('$', '').trim()));
        }

        return prices;
    }
}

export default ProductsPage;
