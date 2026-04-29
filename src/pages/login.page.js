import BasePage from './base.page';

class LoginPage extends BasePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
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
}

export default LoginPage;
