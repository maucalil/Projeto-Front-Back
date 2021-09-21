import { hash } from "bcryptjs";
import { Arg, Mutation, Query, Resolver, ID, Authorized } from "type-graphql";

import { Users } from "../../Entities/Users";
import { IUser } from "../../Interfaces/IUser";
import { Message } from "../TypeDefs/Messages";
import { User } from "../TypeDefs/User";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return await Users.find({ select: ["id","name", "email", "role"] });
  }

  @Mutation(() => Message)
  async register(
    @Arg("name") name: string,
    @Arg("email") email: string,
    @Arg("password") password: string,
    ): Promise<Message> {
    
        try { 

            const userAlreadyExists = await Users.findOne({
                email
            });
        
            if (userAlreadyExists) {
                return { successful: false, message: "User already exists!"}
            }

            const passwordHash = await hash(password, 10);
            const user = await Users.create({ name, email, password: passwordHash}); 
            Users.save(user);    

            return { successful: true, message: "User created successfully!"}
        }
        catch (err) {
            return { successful: false, message:  "err"}
        }  
  }
  
  @Mutation(() => Message)
  async updatePassword(
    @Arg("email") email: string,
    @Arg("oldPassword") oldPassword: string,
    @Arg("newPassword") newPassword: string,
    ): Promise<Message> {
      
      try { 
        const user = await Users.findOne({ email: email });
          const userPassword = user?.password;

          if(oldPassword === userPassword) {
              await Users.update({email: email}, {password: newPassword}); // ({qual usuario quero update}, {o que vou update})
              return { successful: true, message: "Password updated successfully!"}
          }
          else { 
            return { successful: false, message: "Passwords don't match!"}
          }  
          
        }
      catch(err) {
        return { successful: false, message: "Passwords don't match! Error: " + err}
      }
    }
  
  @Mutation(() => Message)
  @Authorized("admin")
  async deleteUser(
    @Arg("id") id: number,
    ): Promise<Message> {
    
        try {
            await Users.delete(id) // as it is a id, can just do (id)
            return { successful: true, message: `User id:${id} deleted successfully!`}
        } 
        catch (err) {
            return {successful: false, message: "Error: " + err}
        }
  }

  @Mutation(() => Message)
  async setAdmin(
    @Arg("adminId") adminId: number,
    @Arg("id") id: number,
    ): Promise<Message> {
    
        try {
            const adminUser = await Users.findOne(adminId);
            
            if(adminUser?.role != "admin") {
              return {successful: false, message: "No authorized!"}
            }
            const user = await Users.findOne(id);
            await Users.update({id: id}, {role: "admin"}) // as it is a id, can just do (id)
            return { successful: true, message: `User ${user?.name} id: ${id} role updated to admin!`}
        } 
        catch (err) {
            return {successful: false, message: "Error: " + err}
        }
  }
}