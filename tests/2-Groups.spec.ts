
import { test, expect } from '@playwright/test';
import { WebActionsObj } from '../Lib/WebActions';
import { LoginPage } from '../Pages/login.page';
import { LoginData } from '../test-data/LoginData';
import { DashboardPage } from '../Pages/Dashboard.page';
import { group } from 'console';
import { GroupsPage } from '../Pages/groups.page';


test.describe("Test Cases Related to Login @Login", () => {

    let webActions: WebActionsObj;
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;
    let groupsPage: GroupsPage;

    test.beforeEach(async ({ page }) => {

        await page.waitForLoadState('domcontentloaded');
        await page.goto("/", { waitUntil: 'domcontentloaded' });
        console.log('Current URL:', page.url());
        loginPage = new LoginPage(page);
        webActions = new WebActionsObj(page);
        dashboardPage = new DashboardPage(page);
        groupsPage = new GroupsPage(page);
        await loginPage.loginWithSavedState();
    });

    test('G_01 Normal Login', async ({ page }) => {
        await dashboardPage.openGroupsPage();

        await groupsPage.createNewGroup();
        await groupsPage.editGroupName();

        // await page.getByRole('button', { name: 'New Group' }).click();
        // await page.getByRole('textbox', { name: 'Name' }).click();
        // await page.getByRole('textbox', { name: 'Name' }).fill('CurrentDateNewGroup');
        // await expect(page.getByRole('button', { name: 'Create', exact: true })).toBeVisible();
        // await page.getByRole('button', { name: 'Create', exact: true }).click();
        // await expect(page.locator('div').filter({ hasText: 'Created' }).nth(3)).toBeVisible();
        // await page.getByRole('heading', { name: 'Created' }).click();
        // await page.getByRole('link', { name: 'CurrentDateNewGroup' }).click();
        // await page.getByRole('textbox', { name: 'Email address*' }).fill('dummyqatask@dummyqatask.test');

    });

});
