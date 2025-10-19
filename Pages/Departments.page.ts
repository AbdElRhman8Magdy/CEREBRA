export * from './Dashboard.page';
import { expect, Locator, Page } from '@playwright/test';
import { WebActionsObj } from '../Lib/WebActions';
import { time } from 'console';
import User from '../test-data/User';



export class DepartmentsPage {

    private readonly page: Page;
    private readonly webActions: WebActionsObj;
    private readonly user: User;




    constructor(page: Page) {
        this.page = page;
        this.webActions = new WebActionsObj(page);
        this.user = new User();
    }



    //#region Dashboard Page Locators 

    private get newDepartmentButton(): Locator {
        return this.page.getByRole('button', { name: 'New Department' });
    }
    private get nameDepartmentField(): Locator {
        return this.page.locator('id=mountedActionsData.0.name');
    }
    private get ParentDepartmentField(): Locator {
        return this.page.locator('div').filter({ hasText: /^Select an option$/ }).first();
    }
    private parDepartmentSelect(dept: string): Locator {
        return this.page.getByRole('option', { name: dept });
    }
    private get submittDepartment(): Locator {
        return this.page.getByRole('button', { name: 'Create' }).nth(1);
    }
    private get searchtDepartment(): Locator {
        return this.page.getByRole('searchbox', { name: 'Search', exact: true });
    }




    //#endregion

    //#region Dashboard Page Methods

    async addNewDepartment(): Promise<void> {
        await this.webActions.isElementVisible(this.newDepartmentButton);
        await this.webActions.clickElement(this.newDepartmentButton);
        await this.webActions.isElementVisible(this.nameDepartmentField);
        await this.webActions.setValue(this.nameDepartmentField, 'Automation_Department_' + this.user.getFirstname());
        await this.webActions.clickElement(this.ParentDepartmentField);
        await this.webActions.clickElement(this.parDepartmentSelect('quality'));
        // await this.webActions.clickElement(this.ParentDepartmentField);
        // await this.webActions.clickElement(this.parDepartmentSelect('QA team'));
        await this.webActions.clickElement(this.submittDepartment);
        await this.webActions.isElementVisible(this.newDepartmentButton);
        await this.page.reload({ waitUntil: 'domcontentloaded' });
        await this.webActions.setValue(this.searchtDepartment, 'Automation_Department_' + this.user.getFirstname());


    }


    //#endregion


}