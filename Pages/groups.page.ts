import { expect, Locator, Page } from '@playwright/test';
import { WebActionsObj } from '../Lib/WebActions';


export class GroupsPage {

    private readonly page: Page;
    private readonly webActions: WebActionsObj;

    private readonly currentDateString = new Date().toISOString().replace(/[:.]/g, '-');

    constructor(page: Page) {
        this.page = page;
        this.webActions = new WebActionsObj(page);
    }

    private linkEdit = this.groupLinkByName(this.currentDateString + '_Edited');
    private link = this.groupLinkByName(this.currentDateString);

    //#region Groups Page Locators

    private get newGroupButton(): Locator {
        return this.page.getByRole('button', { name: 'New Group' });
    }

    private get nameTextbox(): Locator {
        return this.page.getByRole('textbox', { name: 'Name' });
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

    private emailTextboxByLabel(label = 'Email address*'): Locator {
        return this.page.getByRole('textbox', { name: label });
    }

    private groupLinkByName(name: string): Locator {
        return this.page.getByRole('link', { name });
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
       
    async setGroupName(): Promise < void> {

    await this.webActions.clickElement(this.nameTextbox);
    await this.nameTextbox.fill(this.currentDateString);
}

    async clickCreate(): Promise < void> {
    await expect(this.createButton).toBeVisible();
    await this.webActions.clickElement(this.createButton);
}

    async waitForCreatedToast(): Promise < void> {
    await expect(this.createdToast).toBeVisible();
    await expect(this.createdHeading).toBeVisible();
}

    async openGroupByName(): Promise < void> {
    await expect(this.searchfield()).toBeVisible();
    await this.searchfield().fill(this.currentDateString);

    await expect(this.link).toBeVisible();
    await this.webActions.clickElement(this.link);
    await this.page.waitForLoadState("domcontentloaded", { timeout: 10000 });
    await expect(this.saveChanges()).toBeVisible();
    await expect(this.deleteChanges()).toBeVisible();
}

    async openGroupByNameEdited(): Promise < void> {
    await expect(this.searchfield()).toBeVisible();
    await this.searchfield().fill(this.currentDateString);
    await expect(this.linkEdit).toBeVisible();
    await this.webActions.clickElement(this.linkEdit);
    await this.page.waitForLoadState("domcontentloaded", { timeout: 10000 });
    await expect(this.saveChanges()).toBeVisible();
    await expect(this.deleteChanges()).toBeVisible();
}
    

    async setGroupEmail(email: string): Promise < void> {
    const emailBox = this.emailTextboxByLabel();
    await expect(emailBox).toBeVisible();
    await emailBox.fill(email);
}

    async createNewGroup(email ?: string): Promise < void> {
    await this.openNewGroupDialog();
    await this.setGroupName();
    await this.clickCreate();
    await this.waitForCreatedToast();
    // open created group and optionally set email
    await this.createdHeading.click();
    await this.openGroupByName();
    if(email) {
        await this.setGroupEmail(email);
    }
}

    async editGroupName(): Promise < void> {
    await expect(this.nameTextbox).toBeVisible();
    await this.webActions.clickElement(this.nameTextbox);
    await this.nameTextbox.fill(this.currentDateString + '_Edited');
    await this.page.waitForLoadState("domcontentloaded", { timeout: 10000 });
    await this.webActions.clickElement(this.saveChanges());
    await this.openGroupByNameEdited();
    await expect(this.linkEdit).toBeVisible();
}

    //#endregion

}
