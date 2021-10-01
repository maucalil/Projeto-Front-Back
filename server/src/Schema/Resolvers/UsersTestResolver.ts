import { Message } from "../TypeDefs/Messages";
import { User } from "../TypeDefs/User";

class UsersTestResolver {
    private users: User[] = [];
    async register(user: User): Promise<Message> {
 
      this.users.push(user);
      return {successful: true, message: "User successfully registered!"};
    }
  
    async exists(email: string): Promise<boolean> {
      const user = this.users.some((user) => user.email === email);
      return user;
    }
  }
  
export { UsersTestResolver };