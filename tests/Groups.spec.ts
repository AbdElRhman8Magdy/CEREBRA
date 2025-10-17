
import { test, expect } from '@playwright/test';
import { WebActionsObj } from '../Lib/WebActions';
import { LoginPage } from '../Pages/login.page';
import { LoginData } from '../test-data/LoginData';
import { DashboardPage } from '../Pages/Dashboard.page';


test.describe("Test Cases Related to Login @Login", () => {

    let webActions: WebActionsObj;
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;

    test.beforeEach(async ({ page }) => {

        await page.waitForLoadState('domcontentloaded');
        await page.goto("/", { waitUntil: 'domcontentloaded' });
        console.log('Current URL:', page.url());
        loginPage = new LoginPage(page);
        webActions = new WebActionsObj(page);
        dashboardPage = new DashboardPage(page);
    });

    test('L_01 Normal Login', async ({ page }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login('ValidLogin');
        await dashboardPage.ValidateDashboardPageIsOpen();
    });

});
