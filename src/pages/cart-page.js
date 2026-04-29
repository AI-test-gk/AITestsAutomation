import BasePage from './base.page';

class CartPage extends BasePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super();
        this.page = page;
    }

    get pageTitle() {
        return this.page.getByTestId('title');
    }

    get cartList() {
        return this.page.getByTestId('cart-list');
    }

    get cartItems() {
        return this.page.getByTestId('inventory-item');
    }

    get quantityLabel() {
        return this.page.getByTestId('cart-quantity-label');
    }

    get descriptionLabel() {
        return this.page.getByTestId('cart-desc-label');
    }

    get continueShoppingButton() {
        return this.page.getByTestId('continue-shopping');
    }

    get checkoutButton() {
        return this.page.getByTestId('checkout');
    }

    get checkoutFirstNameInput() {
        return this.page.getByTestId('firstName');
    }

    get checkoutLastNameInput() {
        return this.page.getByTestId('lastName');
    }

    get checkoutPostalCodeInput() {
        return this.page.getByTestId('postalCode');
    }

    get checkoutContinueButton() {
        return this.page.getByTestId('continue');
    }

    get checkoutOverviewItems() {
        return this.page.getByTestId('inventory-item');
    }

    get paymentInfoValue() {
        return this.page.getByTestId('payment-info-value');
    }

    get shippingInfoValue() {
        return this.page.getByTestId('shipping-info-value');
    }

    get finishButton() {
        return this.page.getByTestId('finish');
    }

    getRemoveButton(productCard) {
        return productCard.getByRole('button', {name: 'Remove'});
    }

    async removeFromCart(productCard) {
        await this.getRemoveButton(productCard).click();
    }

    async fillCheckoutInformation(firstName, lastName, postalCode) {
        await this.checkoutFirstNameInput.fill(firstName);
        await this.checkoutLastNameInput.fill(lastName);
        await this.checkoutPostalCodeInput.fill(postalCode);
    }
}

export default CartPage;
