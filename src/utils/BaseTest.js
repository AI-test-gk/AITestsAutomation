import {test as base, expect} from '@playwright/test';

class BaseTest {
    constructor(page) {
        this.page = page;
    }

    async openBaseUrl(baseUrl) {
        await this.page.goto(baseUrl);
    }
}

const test = base.extend({
    // Add shared fixtures here as the framework grows.
});

export {test, expect, BaseTest};
