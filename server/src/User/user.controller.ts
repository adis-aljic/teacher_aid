import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./DTO/createUser.dto";
import { UserType } from "./type/user.type";
import { LoginUserDto } from "./DTO/loginUser.dto";
import { ExpressRequest } from "./globalType/expressRequest.interface";
import { AuthGuard } from "src/guards/auth.guard";

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) { }
    @UsePipes(new ValidationPipe())
    @Post("/api/newuser")
    async createUser(@Body() createUserDTO: CreateUserDTO): Promise<UserType> {
        const user = await this.userService.createUser(createUserDTO)
        return this.userService.userResponse(user)
    }

    @UsePipes(new ValidationPipe())
    @Post("api/user/login")
    async login(@Body() loginUserDto: LoginUserDto): Promise<UserType> {
        const user = await this.userService.loginUser(loginUserDto)
        return this.userService.userResponse(user)

    }

    @Get("api/user")
    @UseGuards(AuthGuard)
    async currentUser(@Req() request: ExpressRequest): Promise<UserType> {

        return this.userService.userResponse(request.user)
    }

    @Get("api/user/auth/:id")
    // @UseGuards(AuthGuard)
    async authUser(@Param("id", ParseIntPipe) id: number): Promise<any> {
        return this.userService.authUser(id)
    }
}



