import { expect, Locator, Page } from '@playwright/test';
import { WebActionsObj } from '../Lib/WebActions';


export class GroupsPage {

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
        await this.UserProfile.click();
    }
    async goBack() {
        await expect(this.GeneralTab).toBeVisible();
        await this.GeneralTab.click();
    }

   


    //#endregion


}