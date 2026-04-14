class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(url) {
    await this.page.goto(url);
  }

  async click(selector) {
    await this.page.locator(selector).click();
  }

  async fill(selector, value) {
    await this.page.locator(selector).fill(value);
  }

  async getText(selector) {
    return this.page.locator(selector).innerText();
  }

  async isVisible(selector) {
    return this.page.locator(selector).isVisible();
  }

  async waitForPageLoaded() {
    await this.page.waitForLoadState('domcontentloaded');
  }
}

module.exports = BasePage;
