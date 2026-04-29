class BasePage {
    async click(locator) {
        await locator.click();
    }

    async fill(locator, value) {
        await locator.fill(value);
    }

    async getText(locator) {
        return locator.innerText();
    }

    async isVisible(locator) {
        return locator.isVisible();
    }

    async waitForPageLoaded() {
        await this.page.waitForLoadState('domcontentloaded');
    }
}

export default BasePage;
