class BasePage {
    async waitForPageLoaded() {
        await this.page.waitForLoadState('domcontentloaded');
    }
}

export default BasePage;
