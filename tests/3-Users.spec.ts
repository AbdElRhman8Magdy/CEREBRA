
import { test, expect } from '@playwright/test';
import { WebActionsObj } from '../Lib/WebActions';
import { LoginPage } from '../Pages/login.page';
import { LoginData } from '../test-data/LoginData';
import { DashboardPage } from '../Pages/Dashboard.page';
import { group } from 'console';
import { GroupsPage } from '../Pages/groups.page';
import { UsersPage } from '../Pages/Users.page';


test.describe("Test Cases Related to Login @Login", () => {

    let webActions: WebActionsObj;
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;
    let groupsPage: GroupsPage;
    let usersPage: UsersPage;
    
    test.beforeEach(async ({ page }) => {
        await page.waitForLoadState('domcontentloaded');
        await page.goto("/", { waitUntil: 'domcontentloaded' });
         loginPage = new LoginPage(page);
        console.log('Current URL:', page.url());
        await loginPage.loginWithSavedState();

       
        webActions = new WebActionsObj(page);
        dashboardPage = new DashboardPage(page);
        groupsPage = new GroupsPage(page);
        usersPage = new UsersPage(page);

    });

    test('C_01 Add a New User ', async ({ page }) => {
        await dashboardPage.openUsersPage();
        await usersPage.openNewUserPage();
        await usersPage.addNewUser();
    });

     test('C_02 Edit User', async ({ page }) => {
        await dashboardPage.openUsersPage();
        await usersPage.editUserPage();
        await usersPage.searchUserPage();
        await usersPage.activateUserPage();
    });

    test('C_03 Delete User', async ({ page }) => {
        await dashboardPage.openUsersPage();
        await usersPage.searchUserPage();
        await usersPage.deleteNewUser();
    });

});
