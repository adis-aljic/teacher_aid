import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ClassService } from "./classes.service";
import { AuthGuard } from "src/guards/auth.guard";
import { CreateClassDTO } from "./DTO/createClass.dto";
import { RegisterClass } from "src/User/DTO/registerClass.dto";
import { ExpressRequest } from "src/User/globalType/expressRequest.interface";


@Controller()
export class ClassesController {
    constructor(private readonly classService: ClassService) { }
    @Post("api/classes/createclass")
    // @UseGuards(AuthGuard)
    async createClass(@Body() createClassDTO: CreateClassDTO): Promise<any> {

        return await this.classService.createClass(createClassDTO)
    }

    @Get("api/classes/list")
    async listClasses() {
        return await this.classService.listClass()
    }
    @Post("api/user/addclass")
    async addClassToUser(@Req() req: ExpressRequest, @Body("id") id: number): Promise<any> {
        const token = req.headers.auth;

        return await this.classService.addClassToUser(token as any, id)
    }
}

