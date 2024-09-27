import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { User as UserModel } from "@prisma/client";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(
    @Body() userData: { name: string; email: string }
  ): Promise<UserModel> {
    return this.usersService.createUser(userData);
  }

  @Get()
  async getAllUsers(): Promise<UserModel[]> {
    return this.usersService.users({});
  }

  @Get(":id")
  async getUserById(@Param("id") id: string): Promise<UserModel> {
    return this.usersService.user({ id: Number(id) });
  }

  @Put(":id")
  async updateUser(
    @Param("id") id: string,
    @Body() userData: { name?: string; email?: string }
  ): Promise<UserModel> {
    return this.usersService.updateUser({
      where: { id: Number(id) },
      data: userData,
    });
  }

  @Delete(":id")
  async deleteUser(@Param("id") id: string): Promise<UserModel> {
    return this.usersService.deleteUser({ id: Number(id) });
  }

  @Get(":id/with-school")
  async getUserWithSchool(
    @Param("id") id: string
  ): Promise<UserModel & { school: any }> {
    return this.usersService.getUserWithSchool(Number(id));
  }
}
