import { faker } from '@faker-js/faker';

export default class User {
    static getEmail(): string {
        throw new Error("Method not implemented.");
    }
    private FirstNameString: string;
    private LastNameString: string;
    private EmailString: string;
    private PasswordString: string;
    private access_token?: string;
    private userID?: string;
    private position: string;
    private phoneNumber: string;



    constructor() {
        this.FirstNameString = faker.person.firstName();
        this.LastNameString = faker.person.lastName();
        this.EmailString = faker.internet.email({ firstName: this.FirstNameString, lastName: this.LastNameString });
        this.PasswordString = faker.internet.password({prefix: 'M!g1', length: 12});
        this.position = faker.person.jobTitle();
        this.phoneNumber = faker.phone.number();
    }
    
    getFirstname(): string {
        return this.FirstNameString;
    }
    getLastname(): string {
        return this.LastNameString;
    }
    getEmail(): string {
        return this.EmailString;
    }
    getPassword(): string {
        return this.PasswordString;
    }
    getAccessToken(): string | undefined {
        return this.access_token;
    }
    getUserID(): string | undefined {
        return this.userID;
    }
    getPosition(): string  {
        return this.position;
    }
    getPhoneNumber(): string  {
        return this.phoneNumber;
    }
}