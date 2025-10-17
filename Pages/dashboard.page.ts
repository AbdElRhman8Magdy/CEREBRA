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
        return this.page.getByRole('link', { name: 'Groups' });
    }

    private get SideMenuUsers(): Locator {
        return this.page.getByRole('link', { name: 'Users' });
    }

    private get SideMenuDepartments(): Locator {
        return this.page.getByRole('link', { name: 'Departments' });
    }

    private get SideMenuRoles(): Locator {
        return this.page.getByRole('link', { name: 'Roles' });
    }

    private get UserProfile(): Locator {
        return this.page.getByRole('button', { name: 'User menu' });
    }

    //#endregion

    //#region Dashboard Page Methods

   private async ensureSideMenuOpen(): Promise < void> {
           if (!(await this.SideMenuGroups.isVisible())) {
                   await expect(this.SideMenuArrow).toBeVisible();
                   await this.SideMenuArrow.click();
                       await expect(this.SideMenuGroups).toBeVisible();
               }
   }


    async openUserProfile() {
    await expect(this.UserProfile).toBeVisible();
    await this.UserProfile.click();
}

    async openGroupsPage() {
        await expect(this.SideMenuGroups).toBeVisible();
        await this.SideMenuGroups.click();
        await this.ensureSideMenuOpen();
        await this.SideMenuGroups.click();
    }

    async openUsersPage() {
        await expect(this.SideMenuUsers).toBeVisible();
        await this.SideMenuUsers.click();
        await this.ensureSideMenuOpen();
        await this.SideMenuUsers.click();
    }

    async openDepartmentsPage() {
        await expect(this.SideMenuDepartments).toBeVisible();
        await this.SideMenuDepartments.click();
        await this.ensureSideMenuOpen();
        await this.SideMenuDepartments.click();
    }
    async openRolesPage() {
        await expect(this.SideMenuRoles).toBeVisible();
        await this.SideMenuRoles.click();
        await this.ensureSideMenuOpen();
        await this.SideMenuRoles.click();
    }


    //#endregion


}