
import { test, expect } from '@playwright/test';
import { WebActionsObj } from '../Lib/WebActions';
import { LoginPage } from '../Pages/login.page';
import { LoginData } from '../test-data/LoginData';
import { DashboardPage } from '../Pages/Dashboard.page';
import { group } from 'console';
import { GroupsPage } from '../Pages/groups.page';
import { UsersPage } from '../Pages/Users.page';
import { da } from '@faker-js/faker';
import { DepartmentsPage } from '../Pages/Departments.page';


test.describe("Test Cases Related to departments @departments", () => {

    let webActions: WebActionsObj;
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;
    let groupsPage: GroupsPage;
    let usersPage: UsersPage;
    let departmentsPage: DepartmentsPage;

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
        departmentsPage = new DepartmentsPage(page);

    });

    test('D_01 Add a New Department ', async ({ page }) => {
        await dashboardPage.openDepartmentsPage();
        await departmentsPage.addNewDepartment();
        
        
    });

});
