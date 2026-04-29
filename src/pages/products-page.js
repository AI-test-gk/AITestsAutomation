// path: src/pages/products-page.js
import BasePage from './base.page';

class ProductsPage extends BasePage {
    constructor(page) {
        super();
        this.page = page;
    }

    async goto(baseURL) {
        await this.page.goto(`${baseURL}inventory.html`);
    }

    get pageTitle() {
        return this.page.getByTestId('title');
    }

    get inventoryContainer() {
        return this.page.getByTestId('inventory-container');
    }

    get inventoryList() {
        return this.page.getByTestId('inventory-list');
    }

    get inventoryItems() {
        return this.page.getByTestId('inventory-item');
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

    getProductName(productCard) {
        return productCard.getByTestId('inventory-item-name');
    }

    getProductDescription(productCard) {
        return productCard.getByTestId('inventory-item-desc');
    }

    getProductPrice(productCard) {
        return productCard.getByTestId('inventory-item-price');
    }

    getAddToCartButton(productCard) {
        return productCard.getByRole('button', {name: 'Add to cart'});
    }

    getRemoveButton(productCard) {
        return productCard.getByRole('button', {name: 'Remove'});
    }

    async addToCart(productCard) {
        await this.getAddToCartButton(productCard).click();
    }

    async removeFromCart(productCard) {
        await this.getRemoveButton(productCard).click();
    }

    async selectSortOption(value) {
        await this.sortDropdown.selectOption(value);
    }

    async getProductNames() {
        const count = await this.inventoryItems.count();
        const names = [];

        for (let index = 0; index < count; index += 1) {
            const item = this.inventoryItems.nth(index);
            const name = await this.getProductName(item).innerText();
            names.push(name.trim());
        }

        return names;
    }

    async getProductPrices() {
        const count = await this.inventoryItems.count();
        const prices = [];

        for (let index = 0; index < count; index += 1) {
            const item = this.inventoryItems.nth(index);
            const priceText = await this.getProductPrice(item).innerText();
            prices.push(Number(priceText.replace('$', '').trim()));
        }

        return prices;
    }
}

export default ProductsPage;
