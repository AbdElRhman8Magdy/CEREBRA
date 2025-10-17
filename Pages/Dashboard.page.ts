export * from './Dashboard.page';
import { expect, Locator, Page } from '@playwright/test';
import { WebActionsObj } from '../Lib/WebActions';


export class DashboardPage {

    private readonly page: Page;
    private readonly webActions: WebActionsObj;




    constructor(page: Page) {
        this.page = page;
        this.webActions = new WebActionsObj(page);
    }



    //#region Dashboard Page Locators 

    private get SideMenuArrow(): Locator {
        return this.page.getByRole('button', { name: 'User Management' });
    }

    private get SideMenuGroups(): Locator {
        return this.page.locator('.fi-sidebar-item').filter({ hasText: 'Groups' });
    }

    private get SideMenuUsers(): Locator {
        return this.page.locator('.fi-sidebar-item').filter({ hasText: 'Users' });
    }

    private get SideMenuDepartments(): Locator {
        return this.page.locator('.fi-sidebar-item').filter({ hasText: 'Departments' });
    }

    private get SideMenuRoles(): Locator {
        return this.page.locator('.fi-sidebar-item').filter({ hasText: 'Roles' });
    }

    private get UserProfile(): Locator {
        return this.page.getByRole('button', { name: 'User menu' });
    }

    private get GeneralTab(): Locator {
        return this.page.getByRole('main').getByRole('link', { name: 'General' });
    }

    //#endregion

    //#region Dashboard Page Methods

    private async ensureSideMenuOpen(): Promise<void> {
        if (!(await this.SideMenuGroups.isVisible())) {
            await expect(this.SideMenuArrow).toBeVisible();
            await this.SideMenuArrow.click();
            await expect(this.SideMenuGroups).toBeVisible();
        }
    }


    async openUserProfile() {
        await expect(this.UserProfile).toBeVisible();
        await this.webActions.clickElement(this.UserProfile);
    }
    async goBack() {
        await expect(this.GeneralTab).toBeVisible();
        await this.webActions.clickElement(this.GeneralTab);
        await this.page.waitForLoadState("domcontentloaded", { timeout: 10000 });

    }

    async openGroupsPage() {
        await expect(this.SideMenuGroups).toBeVisible();
        await this.ensureSideMenuOpen();
        await this.webActions.clickElement(this.SideMenuGroups);
    }

    async openUsersPage() {
        await expect(this.SideMenuUsers).toBeVisible();
        await this.ensureSideMenuOpen();
        await this.webActions.clickElement(this.SideMenuUsers);
        await this.webActions.waitForPageNavigation('domcontentloaded');
    }

    async openDepartmentsPage() {
        await expect(this.SideMenuDepartments).toBeVisible();
        await this.ensureSideMenuOpen();
        await this.webActions.clickElement(this.SideMenuDepartments);
    }
    async openRolesPage() {
        await expect(this.SideMenuRoles).toBeVisible();
        await this.ensureSideMenuOpen();
        await this.webActions.clickElement(this.SideMenuRoles);
    }

    async ValidateDashboardPageIsOpen() {
        await expect(this.UserProfile).toBeVisible();
        await expect(this.GeneralTab).toBeVisible();
        await this.openGroupsPage();
        await this.goBack();
        await this.openUsersPage();
        await this.goBack();
        await this.openDepartmentsPage();
        await this.goBack();
        await this.openRolesPage();
        await this.goBack();

    }


    //#endregion


}