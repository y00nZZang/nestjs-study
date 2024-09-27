import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from "@nestjs/common";
import { SchoolsService } from "./schools.service";
import { School as SchoolModel } from "@prisma/client";

@Controller("schools")
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @Post()
  async createSchool(
    @Body() schoolData: { name: string; address: string }
  ): Promise<SchoolModel> {
    return this.schoolsService.createSchool(schoolData);
  }

  @Get()
  async getAllSchools(): Promise<SchoolModel[]> {
    return this.schoolsService.schools({});
  }

  @Get(":id")
  async getSchoolById(@Param("id") id: string): Promise<SchoolModel> {
    return this.schoolsService.school({ id: Number(id) });
  }

  @Put(":id")
  async updateSchool(
    @Param("id") id: string,
    @Body() schoolData: { name?: string; address?: string }
  ): Promise<SchoolModel> {
    return this.schoolsService.updateSchool({
      where: { id: Number(id) },
      data: schoolData,
    });
  }

  @Delete(":id")
  async deleteSchool(@Param("id") id: string): Promise<SchoolModel> {
    return this.schoolsService.deleteSchool({ id: Number(id) });
  }
}
