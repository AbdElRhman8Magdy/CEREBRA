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
        await loginPage.loginWithSavedState();
    });

   

    test('L_02 dashboard Page', async ({ page }) => {
        await loginPage.loginWithSavedState();
        
        await dashboardPage.openGroupsPage();
    
        await page.getByRole('button', { name: 'New Group' }).click();
        await page.getByRole('textbox', { name: 'Name' }).click();
        await page.getByRole('textbox', { name: 'Name' }).fill('CurrentDateNewGroup');
        await expect(page.getByRole('button', { name: 'Create', exact: true })).toBeVisible();
        await page.getByRole('button', { name: 'Create', exact: true }).click();
        await expect(page.locator('div').filter({ hasText: 'Created' }).nth(3)).toBeVisible();
        await page.getByRole('heading', { name: 'Created' }).click();
        await page.getByRole('link', { name: 'CurrentDateNewGroup' }).click();
        await page.getByRole('textbox', { name: 'Email address*' }).fill('dummyqatask@dummyqatask.test');
    });

    test('L_03 dashboard Page', async ({ page }) => {
        await loginPage.loginWithSavedState();
        await dashboardPage.ValidateDashboardPageIsOpen();
    });

});