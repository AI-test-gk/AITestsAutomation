class BaseComponent {
    constructor(page, rootSelector) {
        this.page = page;
        this.rootSelector = rootSelector;
    }

    locator(selector) {
        return this.page.locator(`${this.rootSelector} ${selector}`);
    }

    async isVisible() {
        return this.page.locator(this.rootSelector).isVisible();
    }
}

module.exports = BaseComponent;
