import { User } from "../TypeDefs/User";
import { UsersTestResolver } from "./UsersTestResolver";

describe("Register user", () => {

    let userResolver: UsersTestResolver;
    let userData: User;
    beforeAll(() => {
        userResolver = new UsersTestResolver();
        userData = {
            name: "testando",
            email: "testando@email.com",
            password: "testando"
        }
    })

    it("should be able to register a user", async () => {
        const registerResponse = await userResolver.register(userData);

        expect(registerResponse.successful).toBe(true);
    });

    it("should not be able to register a user", async () => {
        
        const exist = await userResolver.exists(userData.email);
 
        expect(exist).toBe(true);
    });
});