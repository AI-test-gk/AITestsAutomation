import LoginPage from '../src/pages/login.page';
import ProductsPage from '../src/pages/products.page';
import {test, expect} from '../src/utils/base-test';
import USER_DATA from '@/constants/user-data';
import LOGIN_PAGE_VALUES from '@/constants/login-page-values';
import PATH_CONSTANTS from '@/constants/path-constants';

test.describe('Check login page', () => {
    let loginPage;

    test.beforeEach(async ({page, baseURL}) => {
        loginPage = new LoginPage(page);
        await loginPage.goto(baseURL);
        await loginPage.waitForPageLoaded();
    });

    test('Should log in successfuly', async ({page, baseURL}) => {
        await expect(page).toHaveURL(baseURL);

        await expect(loginPage.usernameInput).toBeVisible();
        await loginPage.usernameInput.fill(USER_DATA.sauce_user.email);
        await expect(loginPage.passwordInput).toBeVisible();
        await loginPage.passwordInput.fill(USER_DATA.sauce_user.password);
        await expect(loginPage.loginButton).toBeVisible();
        await expect(loginPage.loginButton).toHaveText(
            LOGIN_PAGE_VALUES.loginButton
        );
        await loginPage.loginButton.click();

        await expect(page).toHaveURL(
            `${baseURL}${PATH_CONSTANTS.inventoryPagePath}`
        );
    });

    test('Should show error message when loggin in with wrong username', async () => {
        const wrongUsername = 'wrong_user';
        await loginPage.login(wrongUsername, USER_DATA.sauce_user.password);

        await loginPage.verifyAndDismissError(
            expect,
            LOGIN_PAGE_VALUES.errorMessage
        );
    });

    test('Should show error message when loggin in with wrong password', async () => {
        const wrongPassword = 'wrong_password';
        await loginPage.login(USER_DATA.sauce_user.email, wrongPassword);

        await loginPage.verifyAndDismissError(
            expect,
            LOGIN_PAGE_VALUES.errorMessage
        );
    });

    test('Should show error message when loggin in with empty username', async () => {
        await loginPage.login('', USER_DATA.sauce_user.password);

        await loginPage.verifyAndDismissError(
            expect,
            LOGIN_PAGE_VALUES.usernameRequiredErrorMessage
        );
    });

    test('Should show error message when loggin in with empty password', async () => {
        await loginPage.login(USER_DATA.sauce_user.email, '');

        await loginPage.verifyAndDismissError(
            expect,
            LOGIN_PAGE_VALUES.passwordRequiredErrorMessage
        );
    });

    test('Should log out and redirect to login page with visible form elements', async ({
        page,
        baseURL
    }) => {
        await loginPage.openAndLogin(
            baseURL,
            USER_DATA.sauce_user.email,
            USER_DATA.sauce_user.password
        );

        const productsPage = new ProductsPage(page);
        await productsPage.sideMenuButton.click();
        await productsPage.logoutLink.click();

        await expect(page).toHaveURL(baseURL);
        await expect(loginPage.usernameInput).toBeVisible();
        await expect(loginPage.passwordInput).toBeVisible();
        await expect(loginPage.loginButton).toBeVisible();
    });
});
