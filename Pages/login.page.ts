import { expect, Locator, Page } from '@playwright/test';
import { WebActionsObj } from '../Lib/WebActions';
import { LoginData } from '../test-data/LoginData';

export class LoginPage {

    private readonly page: Page;
    private readonly webActions: WebActionsObj;




    constructor(page: Page) {
        this.page = page;
        this.webActions = new WebActionsObj(page);
    }



    //#region Login Page Locators 

    private get emailInput(): Locator {
        return this.page.getByRole('textbox', { name: 'Email address*' });
    }

    private get passwordInput(): Locator {
        return this.page.getByRole('textbox', { name: 'Password*' });
    }

    private get signInButton(): Locator {
        return this.page.getByRole('button', { name: 'Sign in' });
    }
    private get pageHeader(): Locator {
        return this.page.getByRole('heading', { name: 'CEREBRA' });
    }


    //#endregion

    //#region Login Page Methods

    async navigateToLoginPage() {
        await this.page.goto('/login');
    }

    async login(loginType: keyof typeof LoginData) {
        const credentials = LoginData[loginType];
        await this.emailInput.fill(credentials.email);
        await this.passwordInput.fill(credentials.password);
        await this.signInButton.click();
    }


    //#endregion


}