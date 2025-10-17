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


    private get UserProfile(): Locator {
        return this.page.getByRole('button', { name: 'User menu' });
    }

    private get GeneralTab(): Locator {
        return this.page.getByRole('main').getByRole('link', { name: 'General' });
    }

    //#endregion

    //#region Dashboard Page Methods




    async openUserProfile() {
        await expect(this.UserProfile).toBeVisible();
        await this.UserProfile.click();
    }


    //#endregion


}