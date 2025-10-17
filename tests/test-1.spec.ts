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
        await page.goto("/en", { waitUntil: 'domcontentloaded' });
        const currentUrl = page.url();
        console.log('Current URL:', currentUrl);
        loginPage = new LoginPage(page);
        webActions = new WebActionsObj(page);
        dashboardPage = new DashboardPage(page);
    });

    test('L_01 Login Page', async ({ page }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login('ValidLogin');
    });
  // await page.getByRole('textbox', { name: 'Password*' }).click();
  // await page.getByRole('textbox', { name: 'Email address*' }).click();
  // await page.getByRole('textbox', { name: 'Email address*' }).fill('dummyqatask@dummyqatask.test');
  // await page.getByRole('textbox', { name: 'Password*' }).fill('Dummyqatask@12345');
  // await page.getByRole('button', { name: 'Sign in' }).click();
  // await expect(page.getByRole('heading')).toContainText('Dashboard');

 test('L_02 dashboard Page', async ({ page }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login('ValidLogin');
        

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
        await loginPage.navigateToLoginPage();
        await loginPage.login('ValidLogin');
        await dashboardPage.ValidateDashboardPageIsOpen();
     });

});