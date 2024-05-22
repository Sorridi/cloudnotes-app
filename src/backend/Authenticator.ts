import { DataBase } from "./database/DataBase"

interface AuthObject {
    readonly email: string;
    readonly password: string;
}

interface AuthResult {
    readonly result: boolean;
    readonly message: string;
}

class Authenticator {

    private static results: Map<[boolean, boolean], AuthResult | undefined> = new Map([
        [[true, true], {result: true, message: "Account created successfully!"}],
        [[true, false], {result: false, message: "This E-mail is not associated with an account!"}],
        [[false, true], {result: false, message: "This E-mail is already associated with an account!"}],
        [[false, false], undefined]
    ])

    private static getAuthObjects(): AuthObject[] {
        return DataBase.get("AUTH");
    }

    private static registered(email: string): AuthObject | undefined {
        for (let obj of this.getAuthObjects()) {
            if (obj.email === email) {
                return obj;
            }
        }
        return;
    }

    private static createAuthentication(email: string, password: string): void {
        DataBase.append("auth", {email: email, password: password});
    }

    public static authenticate(email: string, password: string, repeat?: string): AuthResult {
        let authenticated = false;
        let authObj = this.registered(email);
        let authResult = this.results.get([authObj === undefined, repeat !== undefined]);


        if (authResult?.result) {
            authenticated = password === repeat;
            if (authenticated) this.createAuthentication(email, password);
        }
        else if (authResult === undefined) {
            // @ts-ignore
            authenticated = password === authObj.password;
            authResult = {result: authenticated, message: authenticated ? "Login successful!" : "Incorrect password!"};
        }


        return authResult;
    }
}

export { Authenticator };