import { expect, Locator, Page } from '@playwright/test';
import { WebActionsObj } from '../Lib/WebActions';
import { faker } from '@faker-js/faker';


export class UsersPage {

    private readonly page: Page;
    private readonly webActions: WebActionsObj;

    private readonly FirstNameString = faker.person.firstName();
    constructor(page: Page) {
        this.page = page;
        this.webActions = new WebActionsObj(page);
    }
    
    //#region User Page Locators

    private get newUserBTN(): Locator {
        return this.page.getByRole('link', { name: 'New User' });
    }
    private get firstNameField(): Locator {
        return this.page.locator('id=data.first_name');
    }



    private get newGroupButton(): Locator {
        return this.page.getByRole('button', { name: 'New Group' });
    }
    


    //#endregion

    //#region Users Page Methods



    async openNewUserPage(): Promise<void> {
        await expect(this.newUserBTN).toBeVisible();
        await this.webActions.clickElement(this.newUserBTN);
        await this.page.waitForLoadState('networkidle');
        await expect(this.firstNameField).toBeVisible();
    }

    async addNewUser(): Promise<void> {
        await this.webActions.setValue(this.firstNameField, this.FirstNameString);
    }

    //#endregion

}
