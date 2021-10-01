import { compare, hash } from "bcryptjs";
import { Arg, Mutation, Query, Resolver, Authorized } from "type-graphql";

import { Users } from "../../Entities/Users";
import { Message } from "../TypeDefs/Messages";
import { User } from "../TypeDefs/User";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return await Users.find({ select: ["id","name", "email", "role"] });
  }

  @Query(() => User)
  async getUser(
    @Arg("id") id: number
  ): Promise<User> {
    const user = await Users.findOne(id);

    return {name: user?.name!, email: user?.email!, role: user?.role!, password: user?.password!};
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
            return { successful: false, message:  `${err}`}
        }  
  }
  
  @Mutation(() => Message)
  async updatePassword(
    @Arg("id") id: number,
    @Arg("oldPassword") oldPassword: string,
    @Arg("newPassword") newPassword: string,
    ): Promise<Message> {
      
      try { 
        const user = await Users.findOne({ id: id });
          const userPassword = user?.password!;

          const passwordMatched = await compare(oldPassword, userPassword);

          if(!passwordMatched) {
            return { successful: false, message: "Passwords don't match!"}
          }

          const password = await hash(newPassword, 10);
          await Users.update({id: id}, {password: password}); // ({qual usuario quero update}, {o que vou update})
          return { successful: true, message: "Password updated successfully!"}
          
        }
      catch(err) {
        return { successful: false, message: "Passwords don't match! Error: " + err}
      }
    }
  
  @Mutation(() => Message)
  @Authorized()
  async deleteUser(
    @Arg("id") id: number,
    @Arg("adminId") adminId: number,
    ): Promise<Message> {

      const adminUser = await Users.findOne(adminId, {select: ["role"]})
      if(adminUser?.role === "admin") {
        try {
            await Users.delete(id) // as it is a id, can just do (id)
            return { successful: true, message: `User id:${id} deleted successfully!`}
        } 
        catch (err) {
            return {successful: false, message: "Error: " + err}
        }
      }
      return {successful: false, message: "Error: You're not a admin!"} 
        
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