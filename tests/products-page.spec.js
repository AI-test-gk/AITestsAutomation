import LoginPage from '../src/pages/login.page';
import ProductsPage from '../src/pages/products-page';
import {test, expect} from '../src/utils/BaseTest';
import USER_DATA from '@/constants/user-data';
import PRODUCTS_PAGE_VALUES from '@/constants/products-page-values';
import PATH_CONSTANTS from '@/constants/path-constants';

test.describe('Check products page', () => {
    let loginPage;
    let productsPage;

    test.beforeEach(async ({page, baseURL}) => {
        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);

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
        await expect(productsPage.getProductName(firstItem)).toBeVisible();
        await expect(
            productsPage.getProductDescription(firstItem)
        ).toBeVisible();
        await expect(productsPage.getProductPrice(firstItem)).toBeVisible();
        await expect(productsPage.getAddToCartButton(firstItem)).toBeVisible();
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

            await expect(
                productsPage.getAddToCartButton(firstItem)
            ).toBeVisible();
            await productsPage.addToCart(firstItem);

            await expect(productsPage.cartBadge).toHaveText(
                PRODUCTS_PAGE_VALUES.cartBadgeAfterAdd
            );

            await expect(productsPage.getRemoveButton(firstItem)).toBeVisible();
            await expect(
                productsPage.getAddToCartButton(firstItem)
            ).toBeHidden();

            await productsPage.cartLink.click();
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(
                `${baseURL}${PATH_CONSTANTS.cartPagePath}`
            );
            await expect(page.getByTestId('cart-item')).toHaveCount(
                PRODUCTS_PAGE_VALUES.cartItemsCountAfterAdd
            );
        });

        test('Should remove item from cart via product card and verify cart is empty', async ({
            page,
            baseURL
        }) => {
            const firstItem = productsPage.inventoryItems.first();

            await productsPage.addToCart(firstItem);
            await expect(productsPage.cartBadge).toHaveText(
                PRODUCTS_PAGE_VALUES.cartBadgeAfterAdd
            );

            await productsPage.removeFromCart(firstItem);

            await expect(productsPage.cartBadge).toBeHidden();
            await expect(
                productsPage.getAddToCartButton(firstItem)
            ).toBeVisible();

            await productsPage.cartLink.click();
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(
                `${baseURL}${PATH_CONSTANTS.cartPagePath}`
            );
            await expect(page.getByTestId('cart-item')).toHaveCount(
                PRODUCTS_PAGE_VALUES.cartItemsCountAfterRemove
            );
        });
    });
});
