import BasePage from './base.page';
import TEST_IDS from '../constants/test-ids';
import ProductCardComponent from '../components/product-card.component';

class CartPage extends BasePage {
    constructor(page) {
        super();
        this.page = page;
    }

    get pageTitle() {
        return this.page.getByTestId(TEST_IDS.common.pageTitle);
    }

    get cartList() {
        return this.page.getByTestId('cart-list');
    }

    get cartItems() {
        return this.page.getByTestId(TEST_IDS.products.inventoryItem);
    }

    get cartItemQuantityValues() {
        return this.page.getByTestId('item-quantity');
    }

    get cartItemTitleLinks() {
        return this.page.getByTestId(TEST_IDS.productFields.name);
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

    get checkoutErrorMessage() {
        return this.page.getByTestId('error');
    }

    get checkoutOverviewItems() {
        return this.page.getByTestId(TEST_IDS.products.inventoryItem);
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

    getProductCard(productCard) {
        return new ProductCardComponent(productCard);
    }

    async removeFromCart(productCard) {
        await this.getProductCard(productCard).removeFromCartByTestPrefix();
    }

    async fillCheckoutInformation(firstName, lastName, postalCode) {
        await this.checkoutFirstNameInput.fill(firstName);
        await this.checkoutLastNameInput.fill(lastName);
        await this.checkoutPostalCodeInput.fill(postalCode);
    }
}

export default CartPage;
