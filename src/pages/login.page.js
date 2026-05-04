import BasePage from './base.page';

class LoginPage extends BasePage {
    constructor(page) {
        super();
        this.page = page;
    }

    async goto(baseURL) {
        await this.page.goto(baseURL);
    }

    get usernameInput() {
        return this.page.getByTestId('username');
    }

    get passwordInput() {
        return this.page.getByTestId('password');
    }

    get loginButton() {
        return this.page.getByTestId('login-button');
    }

    get errorMessage() {
        return this.page.getByTestId('error');
    }

    get closeErrorButton() {
        return this.page.getByTestId('error-button');
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async openAndLogin(baseURL, username, password) {
        await this.goto(baseURL);
        await this.waitForPageLoaded();
        await this.login(username, password);
    }

    async verifyAndDismissError(expect, expectedText) {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toHaveText(expectedText);
        await this.closeErrorButton.click();
        await expect(this.errorMessage).toBeHidden();
    }
}

export default LoginPage;
