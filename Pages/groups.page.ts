import { expect, Locator, Page } from '@playwright/test';
import { WebActionsObj } from '../Lib/WebActions';


export class GroupsPage {

    private readonly page: Page;
    private readonly webActions: WebActionsObj;

    private readonly currentDateString = new Date().toISOString().replace(/[:.]/g, '-');
    private readonly DateString = this.currentDateString;
    constructor(page: Page) {
        this.page = page;
        this.webActions = new WebActionsObj(page);
    }

    private get linkEdit(): Locator {
        return this.page.getByRole('link', { name: this.currentDateString + '_Edited' });
    }
    private get link(): Locator {
        return this.page.getByRole('link', { name: this.currentDateString });
    }

    //#region Groups Page Locators

    private get newGroupButton(): Locator {
        return this.page.getByRole('button', { name: 'New Group' });
    }

    private get nameTextbox(): Locator {
        return this.page.getByRole('textbox', { name: 'Name' });
    }
    private get EditedTextbox(): Locator {
        return this.page.getByRole('textbox', { name: 'Name' })
    }

    private get createButton(): Locator {
        return this.page.getByRole('button', { name: 'Create', exact: true });
    }

    private get createdToast(): Locator {
        return this.page.locator('div').filter({ hasText: 'Created' }).nth(3);
    }

    private get createdHeading(): Locator {
        return this.page.getByRole('heading', { name: 'Created' });
    }

    

    private groupLinkByName(): Locator {
        return this.page.getByRole('link', );
    }
    private searchfield(): Locator {
        return this.page.getByRole('searchbox', { name: 'Search' })
    }
    private saveChanges(): Locator {
        return this.page.getByRole('button', { name: 'Save Changes' })
    }
    private deleteChanges(): Locator {
        return this.page.getByRole('button', { name: 'Delete' })
    }


    //#region Groups Page Methods



    async openNewGroupDialog(): Promise<void> {
        await expect(this.newGroupButton).toBeVisible();
        await this.webActions.clickElement(this.newGroupButton);
        await expect(this.nameTextbox).toBeVisible();
    }

    async setGroupName(): Promise<void> {

        await this.webActions.clickElement(this.nameTextbox);
        await this.webActions.setValue(this.nameTextbox, this.DateString);
    }

    async clickCreate(): Promise<void> {
        await expect(this.createButton).toBeVisible();
        await this.webActions.clickElement(this.createButton);
    }

    async waitForCreatedToast(): Promise<void> {
        await expect(this.createdToast).toBeVisible();
        await expect(this.createdHeading).toBeVisible();
    }

    async openGroupByName(): Promise<void> {
        await expect(this.searchfield()).toBeVisible();
        await this.webActions.setValue(this.searchfield(), this.DateString);
        await this.page.waitForLoadState('networkidle');

        await expect(this.link).toBeVisible();
        await this.webActions.clickElement(this.link);
        await this.page.waitForLoadState("domcontentloaded", { timeout: 10000 });
        await expect(this.saveChanges()).toBeVisible();
        await expect(this.deleteChanges()).toBeVisible();
    }

    async openGroupByNameEdited(): Promise<void> {
        await expect(this.searchfield()).toBeVisible();
        await this.webActions.setValue(this.searchfield(), this.DateString + '_Edited');
        await this.page.waitForLoadState("domcontentloaded", { timeout: 10000 });
        await expect(this.linkEdit).toBeVisible();
        await this.webActions.clickElement(this.linkEdit);
        await this.page.waitForLoadState("domcontentloaded", { timeout: 10000 });
        await expect(this.saveChanges()).toBeVisible();
        await expect(this.deleteChanges()).toBeVisible();
    }


    async setGroupEmail(email: string): Promise<void> {
        const emailBox = this.emailTextboxByLabel();
        await expect(emailBox).toBeVisible();
        await emailBox.fill(email);
    }

    async createNewGroup(email?: string): Promise<void> {
        await this.openNewGroupDialog();
        await this.setGroupName();
        await this.clickCreate();
        await this.waitForCreatedToast();
        // open created group and optionally set email
        await this.createdHeading.click();
        await this.openGroupByName();
        if (email) {
            await this.setGroupEmail(email);
        }
    }

    async editGroupName(): Promise<void> {
        await expect(this.nameTextbox).toBeVisible();
        await this.webActions.clickElement(this.nameTextbox);
        await this.webActions.setValue(this.nameTextbox, this.DateString + '_Edited');
        await this.page.waitForLoadState("domcontentloaded", { timeout: 10000 });
        await this.webActions.clickElement(this.saveChanges());
        await this.openGroupByNameEdited();
        await expect(this.EditedTextbox).toBeVisible();
        console.log('Edited Textbox Value:', await this.EditedTextbox.inputValue());
        const editedValue = await this.EditedTextbox.inputValue();
        await expect(editedValue).toContain('_Edited');
    }

    async deleteGroupName(): Promise<void> {
        await this.openGroupByName();
        await expect(this.EditedTextbox).toBeVisible();
        await this.webActions.clickElement(this.deleteChanges());
        await this.page.waitForLoadState("domcontentloaded", { timeout: 10000 });
    }

    //#endregion

}
