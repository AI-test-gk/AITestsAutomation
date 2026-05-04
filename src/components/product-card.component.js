class ProductCardComponent {
    constructor(root) {
        this.root = root;
    }

    getField(fieldTestId) {
        return this.root.getByTestId(fieldTestId);
    }

    async getFieldText(fieldTestId) {
        return this.getField(fieldTestId).innerText();
    }

    getAddToCartButton() {
        return this.root.getByRole('button', {name: 'Add to cart'});
    }

    getRemoveButtonByRole() {
        return this.root.getByRole('button', {name: 'Remove'});
    }

    getRemoveButtonByTestPrefix() {
        return this.root.locator('[data-test^="remove"]');
    }

    async addToCart() {
        await this.getAddToCartButton().click();
    }

    async removeFromCartByRole() {
        await this.getRemoveButtonByRole().click();
    }

    async removeFromCartByTestPrefix() {
        await this.getRemoveButtonByTestPrefix().click();
    }
}

export default ProductCardComponent;
