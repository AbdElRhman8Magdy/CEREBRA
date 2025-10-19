import { expect, Locator, Page } from '@playwright/test';
import { WebActionsObj } from '../Lib/WebActions';
import User from '../test-data/User';
import { saveUser } from '../test-data/userStore';
import { loadUser } from '../test-data/userStore';
import { time } from 'console';


export class UsersPage {

    private readonly page: Page;
    private readonly webActions: WebActionsObj;
    private readonly user: User;
    private readonly dept?: string;

    constructor(page: Page) {
        this.page = page;
        this.webActions = new WebActionsObj(page);
        this.user = new User();
    }

    //#region User Page Locators

    private get newUserBTN(): Locator {
        return this.page.getByRole('link', { name: 'New User' });
    }
    private get firstNameField(): Locator {
        return this.page.locator('id=data.first_name');
    }
    private get lastNameField(): Locator {
        return this.page.locator('id=data.last_name');
    }
    private get emailField(): Locator {
        return this.page.locator('id=data.email');
    }
    private get rolesBTN(): Locator {
        return this.page.getByRole('textbox', { name: 'Select an option' })
    }
    private get passwordField(): Locator {
        return this.page.locator('id=data.password');
    }
    private get userTypeField(): Locator {
        return this.page.locator('id=data.user_type');
    }
    private get departmentIdField(): Locator {
        return this.page.locator('id=data.department_id');
    }
    private get positionField(): Locator {
        return this.page.getByRole('textbox', { name: 'Position' });
    }
    private get phoneNumberField(): Locator {
        return this.page.getByRole('textbox', { name: 'Phone Number' });
    }
    private get departmentField(): Locator {
        return this.page.getByText('Department', { exact: true });
    }
    private departmentSelect(dept: string): Locator {
        return this.page.getByRole('option', { name: dept });
    }
    private get authField(): Locator {
        return this.page.locator('id=data.authentication_type');
    }
    private get authField1(): Locator {
        return this.page.getByLabel('Authentication Type*')
    }
    private get activeBTN(): Locator {
        return this.page.locator('label').filter({ hasText: 'Active' }).nth(1);
    }
    private get createBTN(): Locator {
        return this.page.locator('#key-bindings-1');
    }
    private get searchField(): Locator {
        return this.page.getByRole('searchbox', { name: 'Search', exact: true });
    }
    private userEmailList(name: string): Locator {
        return this.page.getByRole('link', { name });
    }
    private userEditEmailList(name: string): Locator {
        return this.page.getByRole('textbox', { name: 'Email*' });
    }
    private get userEditMenuBTN(): Locator {
        return this.page.locator('.whitespace-nowrap.px-3');
    }
    private get userEditBTN(): Locator {
        return this.page.getByRole('link', { name: 'Edit' });
    }
    private get saveUserEditBTN(): Locator {
        return this.page.getByRole('button', { name: 'Save changes' });
    }
    private get userDeleteBTN(): Locator {
        return this.page.getByRole('button', { name: 'Delete' });
    }


    //#endregion

    //#region Users Page Methods



    async openNewUserPage(): Promise<void> {
        await expect(this.newUserBTN).toBeVisible();
        await this.webActions.clickElement(this.newUserBTN);
        await this.page.waitForLoadState('networkidle');
        await expect(this.firstNameField).toBeVisible();
    }

    async editUserPage(): Promise<void> {
        const savedUser = loadUser();
        if (!savedUser) {
            throw new Error('No saved user found. Run addNewUser() first to create and save a user.');
        }
        await this.searchUserPage();
        await this.webActions.clickElement(this.userEditMenuBTN);
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.userEditBTN).toBeVisible();
        await this.webActions.clickElement(this.userEditBTN);
        await this.page.waitForLoadState('networkidle');
        await expect(this.userEditEmailList(savedUser.email)).toBeVisible();

        await this.editNewUser();



    }
    async searchUserPage(): Promise<void> {
        const savedUser = loadUser();
        if (!savedUser) {
            throw new Error('No saved user found. Run addNewUser() first to create and save a user.');
        }

        await expect(this.searchField).toBeVisible();
        await this.webActions.setValue(this.searchField, savedUser.email);
        console.log('Searching for user with email:', savedUser.email);
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.userEmailList(savedUser.email)).toBeVisible();
        await expect(this.userEditMenuBTN).toBeVisible();

    }




    async addNewUser(): Promise<void> {
        console.log('Creating user with email:', this.user);
        await this.webActions.setValue(this.firstNameField, this.user.getFirstname());
        await this.webActions.setValue(this.lastNameField, this.user.getLastname());
        await this.webActions.setValue(this.emailField, this.user.getEmail());
        await this.webActions.typeAndSelectOptionFromDropdown(this.rolesBTN, 'user', false);
        await this.webActions.setValue(this.passwordField, this.user.getPassword());
        // await this.webActions.typeAndSelectOptionFromDropdown(this.userTypeField, 'Admin', false);
        await this.webActions.clickElement(this.userTypeField);
        await this.webActions.clickElement(this.departmentField);
        await this.webActions.clickElement(this.departmentSelect('QA'));
        await this.webActions.clickElement(this.departmentField);
        await this.webActions.clickElement(this.departmentSelect('quality'));
        await this.webActions.setValue(this.positionField, this.user.getPosition());
        await this.webActions.setValue(this.phoneNumberField, this.user.getPhoneNumber());
        // Authentication type select: try robust selection methods

        await this.authSelect();



        // Give the application a moment to react to the change
        await this.page.waitForTimeout(250);
        await this.webActions.clickElement(this.authField);
        await this.webActions.clickElement(this.activeBTN);
        await this.webActions.clickElement(this.createBTN);
        await this.page.waitForLoadState('domcontentloaded');
        await this.webActions.isElementVisible(this.newUserBTN);
        await expect(this.newUserBTN).toBeVisible();
        console.log('Created user:', this.user.getEmail());

        // Save generated user data to test-data/saved-user.json for later reuse
        this.saveUser();



    }





    async editNewUser(): Promise<void> {
        console.log('editing user with email:', this.user);
        await this.webActions.setValue(this.firstNameField, this.user.getFirstname());
        await this.webActions.setValue(this.lastNameField, this.user.getLastname());
        await this.webActions.setValue(this.emailField, this.user.getEmail());

        await this.webActions.clickElement(this.userTypeField);
        await this.webActions.clickElement(this.departmentField);
        await this.webActions.clickElement(this.departmentSelect('QA'));
        await this.webActions.clickElement(this.departmentField);
        await this.webActions.clickElement(this.departmentSelect('quality'));
        await this.webActions.setValue(this.positionField, this.user.getPosition());
        await this.webActions.setValue(this.phoneNumberField, this.user.getPhoneNumber());

        await this.authSelect();

        await this.page.waitForTimeout(250);
        await this.webActions.clickElement(this.authField);
        await this.webActions.clickElement(this.saveUserEditBTN);
        await this.page.waitForLoadState('domcontentloaded');
        await this.webActions.isElementVisible(this.searchField);

        this.saveUser();
    }

    async deleteNewUser(): Promise<void> {
        console.log('deleting user with email:', this.user);
        const savedUser = loadUser();
        if (!savedUser) {
            throw new Error('No saved user found. Run addNewUser() first to create and save a user.');
        }
        await this.searchUserPage();
        await this.webActions.clickElement(this.userEditMenuBTN);
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.userEditBTN).toBeVisible();
        await this.webActions.clickElement(this.userEditBTN);
        await this.webActions.clickElement(this.userDeleteBTN);

        await this.page.waitForLoadState('domcontentloaded');


    }



    async saveUser(): Promise<void> {
        try {
            saveUser({
                firstName: this.user.getFirstname(),
                lastName: this.user.getLastname(),
                email: this.user.getEmail(),
                password: this.user.getPassword(),
                position: this.user.getPosition(),
                phoneNumber: this.user.getPhoneNumber(),
            });
        } catch (err) {
            console.warn('Warning: could not save user data to file.', err);
        }
    }


    async authSelect(): Promise<void> {
        const authSelect = this.page.getByRole('combobox', { name: 'Authentication Type*' });
        await expect(authSelect).toBeVisible();
        await expect(authSelect).toBeEnabled();

        // Preferred: select by value (matching the option 'value' attribute)
        try {
            await authSelect.selectOption({ value: 'Manual' });
        } catch (e) {
            // Some apps use different values (e.g., 'Manual' vs 'manual' vs 'Manual '), try selecting by label
            try {
                await authSelect.selectOption({ label: 'Manual' });
            } catch (e2) {
                // As a last resort, set the value via JS and dispatch events (useful for Livewire or custom bindings)
                await this.page.evaluate(() => {
                    const el = document.getElementById('data.authentication_type') as HTMLSelectElement | null;
                    if (el) {
                        el.value = 'Manual';
                        el.dispatchEvent(new Event('input', { bubbles: true }));
                        el.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                });
            }
        }
    }

    //#endregion

}
