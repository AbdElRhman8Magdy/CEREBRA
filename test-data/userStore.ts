import * as fs from 'fs';
import * as path from 'path';

export interface SavedUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    position?: string;
    phoneNumber?: string;
}

const SAVE_PATH = path.resolve(__dirname, 'saved-user.json');

export function saveUser(user: SavedUser): void {
    try {
        fs.writeFileSync(SAVE_PATH, JSON.stringify(user, null, 2), { encoding: 'utf-8' });
        console.log(`Saved user to ${SAVE_PATH}`);
    } catch (err) {
        console.error('Failed to save user:', err);
        throw err;
    }
}

export function loadUser(): SavedUser | null {
    try {
        if (!fs.existsSync(SAVE_PATH)) return null;
        const raw = fs.readFileSync(SAVE_PATH, { encoding: 'utf-8' });
        return JSON.parse(raw) as SavedUser;
    } catch (err) {
        console.error('Failed to load saved user:', err);
        return null;
    }
}
