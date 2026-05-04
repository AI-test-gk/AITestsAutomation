import LoginPage from '../src/pages/login.page';
import ProductsPage from '../src/pages/products.page';
import CartPage from '../src/pages/cart.page';
import ProductDetailsPage from '../src/pages/product-details.page';
import {test, expect} from '../src/utils/base-test';
import USER_DATA from '@/constants/user-data';
import CART_PAGE_VALUES from '@/constants/cart-page-values';
import PATH_CONSTANTS from '@/constants/path-constants';
import TEST_IDS from '@/constants/test-ids';

test.describe('Check cart page', () => {
    let loginPage;
    let productsPage;
    let cartPage;
    let productDetailsPage;

    test.beforeEach(async ({page, baseURL}) => {
        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);
        productDetailsPage = new ProductDetailsPage(page);

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

    test('Should remove all items from cart and update cart quantity indicators', async () => {
        await expect(productsPage.cartBadge).toHaveText(
            String(CART_PAGE_VALUES.cartItemsBeforeCheckout)
        );

        const cartItems = await cartPage.cartItems.all();
        for (const cartItem of cartItems.reverse()) {
            await cartPage.removeFromCart(cartItem);
        }

        await expect(cartPage.cartItems).toHaveCount(0);
        await expect(cartPage.cartItemQuantityValues).toHaveCount(0);
        await expect(productsPage.cartBadge).toBeHidden();
    });

    test('Should open product details page from cart item title link and display correct details', async ({
        page
    }) => {
        const firstCartItem = cartPage.cartItems.first();
        const firstProductCard = cartPage.getProductCard(firstCartItem);
        const expectedName = await firstProductCard.getFieldText(
            TEST_IDS.productFields.name
        );
        const expectedDescription = await firstProductCard.getFieldText(
            TEST_IDS.productFields.description
        );
        const expectedPrice = await firstProductCard.getFieldText(
            TEST_IDS.productFields.price
        );

        await cartPage.cartItemTitleLinks.first().click();

        await expect(page).toHaveURL(
            PATH_CONSTANTS.inventoryItemDetailsPathRegex
        );
        await expect(
            productDetailsPage.productCard.getField(TEST_IDS.productFields.name)
        ).toHaveText(expectedName.trim());
        await expect(
            productDetailsPage.productCard.getField(
                TEST_IDS.productFields.description
            )
        ).toHaveText(expectedDescription.trim());
        await expect(
            productDetailsPage.productCard.getField(
                TEST_IDS.productFields.price
            )
        ).toHaveText(expectedPrice.trim());
        await expect(productDetailsPage.removeButton).toHaveCount(1);
        await expect(productDetailsPage.backToProductsButton).toBeVisible();
    });

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
