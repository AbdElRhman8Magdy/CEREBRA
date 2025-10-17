import * as fs from 'fs';
import * as path from 'path';
import type { Page, ElementHandle, Locator, FrameLocator } from '@playwright/test';
import { BrowserContext, errors, expect } from '@playwright/test';

import { Frame } from '@playwright/test';


const waitForElement = 100000;


interface RowData {
    [key: string]: any;
}export class WebActionsObj {
    readonly page: Page;
    static page: any;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToURL(url: string) {
        this.page.goto(url);
    }

    async waitForElement(locator: Locator, timeout: number = 5000): Promise<void> {
        try {
            await locator.waitFor({ state: 'visible', timeout });
            console.log(`Element is visible: ${locator}`);
        } catch (error) {
            console.error(`Error: Element ${locator} not found within ${timeout}ms`);
            throw new Error(`Element ${locator} did not appear within timeout.`);
        }
    }
    async waitForPageNavigation(event: string, timeout: number = waitForElement, page: Page = this.page): Promise<void> {
        try {
            switch (event.toLowerCase()) {
                case 'networkidle':
                    await page.waitForLoadState('networkidle', { timeout: timeout });
                    break;
                case 'load':
                    await page.waitForLoadState('load', { timeout: timeout });
                    break;
                case '':
                    await page.waitForLoadState('domcontentloaded', { timeout: timeout });
            }
        } catch (error) {
            console.error(`Error: waiting exceeded timeout: ${timeout}ms`);
        }
    }


    async clickElement(selector: string | Locator, options: { timeout?: number } = { timeout: 15000 }): Promise<void> {
        if (typeof selector === "string") {
            await this.page.waitForSelector(selector, { state: 'visible', timeout: options.timeout });
            await this.page.click(selector, { timeout: options.timeout });
        } else {
            await selector.waitFor({ state: 'visible', timeout: options.timeout });
            await selector.click({ timeout: options.timeout });
        }
    }


    async delay(time: number): Promise<void> {
        return new Promise(function (resolve) {
            setTimeout(resolve, time);
        });
    }


    async setValue(object: Locator, value: string, delayBetweenChars: number = 2) {

        await object.clear();
        await object.focus();

        // Type letter by letter with delay
        for (let i = 0; i < value.length; i++) {
            await this.page.keyboard.type(value[i]);
            if (i < value.length - 1) { // Don't delay after the last character
                await this.delay(delayBetweenChars);
            }
        }

    }


    async typeAndSelectOptionFromDropdown(object: Locator, option: string, isExact: boolean = true, timeOut: number = 3000): Promise<void> {
        await object.click({ timeout: 20000 });
        await this.delay(500);
        await object.pressSequentially(option);

        const optionElement = this.page.getByRole('option', { name: option, exact: isExact });

        try {
            await optionElement.waitFor({ state: 'visible', timeout: timeOut });
            await optionElement.click();
        } catch (error) {
            if (error instanceof errors.TimeoutError) {
                await this.page.getByRole('option').first().click();
            } else {
                throw error;
            }
        }

    }

    async selectOptionFromDropdown(dropdown: Locator, option: string): Promise<void> {
        await dropdown.click({ timeout: 20000 });
        await this.page.waitForTimeout(300); // Allow the dropdown to render

        // Primary attempt: use getByRole with name
        const optionByRole = this.page.getByRole('option', { name: option });

        try {
            await optionByRole.first().waitFor({ state: 'visible', timeout: 2000 });
            await optionByRole.first().click({ timeout: 20000 });
        } catch (primaryError) {
            console.warn(`Primary role-based lookup failed for "${option}". Trying fallback.`);

            // Fallback: find li[role="option"] that contains the text inside its children (like a span)
            const fallbackOption = this.page.locator('li[role="option"]', {
                hasText: option,
            });

            try {
                await fallbackOption.first().waitFor({ state: 'visible', timeout: 2000 });
                await fallbackOption.first().click({ timeout: 20000 });
            } catch (fallbackError) {
                throw new Error(`Could not select option "${option}" from dropdown. Tried both role-based and fallback lookup.`);
            }
        }
    }

    async isElementVisible(locator: Locator, timeout: number = 20000): Promise<boolean> {
        try {
            await locator.waitFor({ state: 'visible', timeout });
            return true;
        } catch (error) {
            return false;
        }
    }    async getTextFromWebElements(locator: string): Promise<string[]> {
        return this.page.$$eval(locator, elements => elements.map(item => item.textContent.trim()));
    }

    async downloadFile(locator: string): Promise<string> {
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.page.click(locator)
        ]);
        await download.saveAs(path.join(__dirname, '../Downloads', download.suggestedFilename()));
        return download.suggestedFilename();
    }

    static async keyPress(locator: Locator, key: string): Promise<void> {
        this.page.press(locator, key);
    }    async waitForSelector(selector: string | Locator, timeout = 10000): Promise<void> {
        if (typeof selector === "string") {
            await this.page.waitForSelector(selector, { timeout });
        } else {
            await selector.waitFor({ state: 'visible', timeout });
        }
    }

    async waitForSelectorInvisible(selector: string | Locator, timeout = 60000): Promise<boolean> {
        try {
            if (typeof selector === "string") {
                await this.page.waitForSelector(selector, { state: 'hidden', timeout });
            } else {
                await selector.waitFor({ state: 'hidden', timeout });
            }
            return true;  // Return true if the element becomes hidden
        } catch (error) {
            return false; // Return false if the element did not become hidden within the timeout
        }
    }


    async waitForSelectorVisible(selector: string, options: { timeout?: number } = { timeout: 30000 }): Promise<void> {
        await this.page.waitForSelector(selector, { ...options, state: 'visible' });
    }    async verifyInputValue(locator: string, attribute: string, expectedValue: string): Promise<void> {
        try {
            await this.page.waitForSelector(locator);
            if (attribute === 'value') {
                const actualValue = await this.page.$eval(locator, (el: HTMLInputElement) => el.value);
                expect(actualValue.trim()).toBe(expectedValue);
                console.log(`PASS: The input value matches the expected value: "${expectedValue}"`);
            } else {
                const textValue = await this.page.getAttribute(locator, attribute);
                if (textValue === null) {
                    console.log(`FAIL: Attribute "${attribute}" not found on element with locator: ${locator}`);
                } else {
                    expect(textValue.trim()).toBe(expectedValue);
                    console.log(`PASS: Attribute "${attribute}" matches the expected value.`);
                }
            }
        } catch (error) {
            console.error(`Error verifying attribute "${attribute}" for element with locator "${locator}":`, error);
        }
    }


    async verifypagetitle(value: string): Promise<void> {

        await expect(this.page).toHaveTitle(value);

    }

    async verifypageurl(value: string): Promise<void> {

        expect(this.page.url()).toContain(value);

    }

    async verifyElementIsDisplayed(locator: string, errorMessage: string): Promise<void> {
        await this.page.waitForSelector(locator, { state: 'visible', timeout: waitForElement })
            .catch(() => { throw new Error(`${errorMessage}`); });
    }

    async expectToBeTrue(status: boolean, errorMessage: string): Promise<void> {
        expect(status, `${errorMessage}`).toBe(true);
    }

    async expectToBeValue(expectedValue: string, actualValue: string, errorMessage: string): Promise<void> {
        expect(expectedValue.trim(), `${errorMessage}`).toBe(actualValue);
    }

    async isElementDisabled(locator: string): Promise<boolean> {
        const element = await this.page.$(locator);
        const isDisabled = await element?.getAttribute('class');
        return isDisabled?.includes('p-disabled') ?? false;
    }

    async verifyElementIsNotVisible(locator: string): Promise<void> {
        const element = this.page.locator(locator);
        const isVisible = await element.isVisible();

        if (isVisible) {
            // If the element is visible, throw an error
            throw new Error(`Element ${locator} is visible, but it should not be.`);
        } else {
            // If the element is not visible, log a success message or handle as needed
            console.log(`Element ${locator} is correctly not visible.`);
        }
    }

    private formatDate(): string {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = date.toLocaleString('en-US', { month: 'short' });
        const year = date.getFullYear();

        return `${day} ${month}, ${year}`;
    }

    async logCurrentDate(): Promise<void> {
        const currentDate = this.formatDate();
        console.log(currentDate);
    }}

