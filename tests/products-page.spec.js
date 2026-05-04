import LoginPage from '../src/pages/login.page';
import ProductsPage from '../src/pages/products.page';
import CartPage from '../src/pages/cart.page';
import {test, expect} from '../src/utils/base-test';
import USER_DATA from '@/constants/user-data';
import PRODUCTS_PAGE_VALUES from '@/constants/products-page-values';
import PATH_CONSTANTS from '@/constants/path-constants';
import TEST_IDS from '@/constants/test-ids';

test.describe('Check products page', () => {
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

        await productsPage.waitForPageLoaded();
    });

    test('Should display products page with all core elements', async ({
        page,
        baseURL
    }) => {
        await expect(page).toHaveURL(
            `${baseURL}${PATH_CONSTANTS.inventoryPagePath}`
        );

        await expect(productsPage.pageTitle).toBeVisible();
        await expect(productsPage.pageTitle).toHaveText(
            PRODUCTS_PAGE_VALUES.title
        );
        await expect(productsPage.cartLink).toBeVisible();

        await expect(productsPage.inventoryList).toBeVisible();
        await expect(productsPage.inventoryItems).toHaveCount(
            PRODUCTS_PAGE_VALUES.productsCount
        );

        const firstItem = productsPage.inventoryItems.first();
        const firstProductCard = productsPage.getProductCard(firstItem);
        await expect(
            firstProductCard.getField(TEST_IDS.productFields.name)
        ).toBeVisible();
        await expect(
            firstProductCard.getField(TEST_IDS.productFields.description)
        ).toBeVisible();
        await expect(
            firstProductCard.getField(TEST_IDS.productFields.price)
        ).toBeVisible();
        await expect(firstProductCard.getAddToCartButton()).toBeVisible();
    });

    test.describe('Products sorting', () => {
        test('Should display sorting dropdown with default option', async () => {
            await expect(productsPage.sortDropdown).toBeVisible();
            await expect(productsPage.activeSortOption).toHaveText(
                PRODUCTS_PAGE_VALUES.defaultSortOptionLabel
            );
        });

        test('Should sort products by name from A to Z', async () => {
            await productsPage.selectSortOption(
                PRODUCTS_PAGE_VALUES.sortOptions.nameAsc.value
            );
            await expect(productsPage.activeSortOption).toHaveText(
                PRODUCTS_PAGE_VALUES.sortOptions.nameAsc.label
            );

            const names = await productsPage.getProductNames();
            const sortedNames = [...names].sort((left, right) =>
                left.localeCompare(right)
            );

            expect(names).toEqual(sortedNames);
        });

        test('Should sort products by name from Z to A', async () => {
            await productsPage.selectSortOption(
                PRODUCTS_PAGE_VALUES.sortOptions.nameDesc.value
            );
            await expect(productsPage.activeSortOption).toHaveText(
                PRODUCTS_PAGE_VALUES.sortOptions.nameDesc.label
            );

            const names = await productsPage.getProductNames();
            const sortedNames = [...names].sort((left, right) =>
                right.localeCompare(left)
            );

            expect(names).toEqual(sortedNames);
        });

        test('Should sort products by price from low to high', async () => {
            await productsPage.selectSortOption(
                PRODUCTS_PAGE_VALUES.sortOptions.priceAsc.value
            );
            await expect(productsPage.activeSortOption).toHaveText(
                PRODUCTS_PAGE_VALUES.sortOptions.priceAsc.label
            );

            const prices = await productsPage.getProductPrices();
            const sortedPrices = [...prices].sort(
                (left, right) => left - right
            );

            expect(prices).toEqual(sortedPrices);
        });

        test('Should sort products by price from high to low', async () => {
            await productsPage.selectSortOption(
                PRODUCTS_PAGE_VALUES.sortOptions.priceDesc.value
            );
            await expect(productsPage.activeSortOption).toHaveText(
                PRODUCTS_PAGE_VALUES.sortOptions.priceDesc.label
            );

            const prices = await productsPage.getProductPrices();
            const sortedPrices = [...prices].sort(
                (left, right) => right - left
            );

            expect(prices).toEqual(sortedPrices);
        });
    });

    test.describe.serial('Cart flow', () => {
        test('Should add item to cart, update cart counter, and show item in cart', async ({
            page,
            baseURL
        }) => {
            const firstItem = productsPage.inventoryItems.first();
            const firstProductCard = productsPage.getProductCard(firstItem);

            await expect(firstProductCard.getAddToCartButton()).toBeVisible();
            await productsPage.addToCart(firstItem);

            await expect(productsPage.cartBadge).toHaveText(
                PRODUCTS_PAGE_VALUES.cartBadgeAfterAdd
            );

            await expect(
                firstProductCard.getRemoveButtonByRole()
            ).toBeVisible();
            await expect(firstProductCard.getAddToCartButton()).toBeHidden();

            await productsPage.goToCart();
            await expect(cartPage.page).toHaveURL(
                `${baseURL}${PATH_CONSTANTS.cartPagePath}`
            );
            await expect(cartPage.cartItems).toHaveCount(
                PRODUCTS_PAGE_VALUES.cartItemsCountAfterAdd
            );
        });

        test('Should remove item from cart via product card and verify cart is empty', async ({
            page,
            baseURL
        }) => {
            const firstItem = productsPage.inventoryItems.first();
            const firstProductCard = productsPage.getProductCard(firstItem);

            await productsPage.addToCart(firstItem);
            await expect(productsPage.cartBadge).toHaveText(
                PRODUCTS_PAGE_VALUES.cartBadgeAfterAdd
            );

            await productsPage.removeFromCart(firstItem);

            await expect(productsPage.cartBadge).toBeHidden();
            await expect(firstProductCard.getAddToCartButton()).toBeVisible();

            await productsPage.goToCart();
            await expect(cartPage.page).toHaveURL(
                `${baseURL}${PATH_CONSTANTS.cartPagePath}`
            );
            await expect(cartPage.cartItems).toHaveCount(
                PRODUCTS_PAGE_VALUES.cartItemsCountAfterRemove
            );
        });
    });
});
