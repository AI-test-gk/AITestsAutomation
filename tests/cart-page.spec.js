import LoginPage from '../../src/pages/login.page';
import ProductsPage from '../../src/pages/products-page';
import CartPage from '../../src/pages/cart-page';
import {test, expect} from '../src/utils/BaseTest';
import USER_DATA from '@/constants/user-data';
import CART_PAGE_VALUES from '@/constants/cart-page-values';
import PATH_CONSTANTS from '@/constants/path-constants';

test.describe('Check cart page', () => {
    let loginPage;
    let productsPage;
    let cartPage;

    test.beforeEach(async ({page, baseURL}) => {
        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);

        await loginPage.openAndLogin(
            baseURL,
            USER_DATA.sauce_user.email,
            USER_DATA.sauce_user.password
        );

        const firstItem = productsPage.inventoryItems.first();
        const secondItem = productsPage.inventoryItems.nth(1);

        await productsPage.addToCart(firstItem);
        await productsPage.addToCart(secondItem);

        await productsPage.cartLink.click();
        await cartPage.waitForPageLoaded();
    });

    test('Should display cart products with all core elements', async ({
        page,
        baseURL
    }) => {
        await expect(page).toHaveURL(
            `${baseURL}${PATH_CONSTANTS.cartPagePath}`
        );

        await expect(cartPage.pageTitle).toBeVisible();
        await expect(cartPage.pageTitle).toHaveText(CART_PAGE_VALUES.cartTitle);
        await expect(cartPage.cartList).toBeVisible();
        await expect(cartPage.quantityLabel).toBeVisible();
        await expect(cartPage.descriptionLabel).toBeVisible();
        await expect(cartPage.cartItems).toHaveCount(
            CART_PAGE_VALUES.cartItemsBeforeCheckout
        );
        await expect(cartPage.continueShoppingButton).toBeVisible();
        await expect(cartPage.checkoutButton).toBeVisible();
    });

    test('Should redirect user back to products page after continue shopping click', async ({
        page,
        baseURL
    }) => {
        await cartPage.continueShoppingButton.click();

        await expect(page).toHaveURL(
            `${baseURL}${PATH_CONSTANTS.inventoryPagePath}`
        );
        await expect(productsPage.pageTitle).toHaveText(
            CART_PAGE_VALUES.productsTitle
        );
    });
    // add test for remove from cart functionality
    // add test for clicking product title in the cart and redirecting to product details page

    test('Should complete checkout navigation and display overview details', async ({
        page,
        baseURL
    }) => {
        await cartPage.checkoutButton.click();

        await expect(page).toHaveURL(
            `${baseURL}${PATH_CONSTANTS.checkoutStepOnePath}`
        );
        await expect(cartPage.pageTitle).toHaveText(
            CART_PAGE_VALUES.checkoutStepOneTitle
        );

        await cartPage.fillCheckoutInformation(
            USER_DATA.checkout_user.firstName,
            USER_DATA.checkout_user.lastName,
            USER_DATA.checkout_user.postalCode
        );
        await cartPage.checkoutContinueButton.click();

        await expect(page).toHaveURL(
            `${baseURL}${PATH_CONSTANTS.checkoutStepTwoPath}`
        );
        await expect(cartPage.pageTitle).toHaveText(
            CART_PAGE_VALUES.checkoutStepTwoTitle
        );
        await expect(cartPage.checkoutOverviewItems).toHaveCount(
            CART_PAGE_VALUES.cartItemsBeforeCheckout
        );
        await expect(cartPage.paymentInfoValue).toHaveText(
            CART_PAGE_VALUES.expectedPaymentInfo
        );
        await expect(cartPage.shippingInfoValue).toHaveText(
            CART_PAGE_VALUES.expectedShippingInfo
        );

        await cartPage.finishButton.click();

        await expect(page).toHaveURL(
            `${baseURL}${PATH_CONSTANTS.checkoutCompletePath}`
        );
        await expect(cartPage.pageTitle).toHaveText(
            CART_PAGE_VALUES.checkoutCompleteTitle
        );
    });
});
