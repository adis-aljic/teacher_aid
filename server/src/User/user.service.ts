import { Repository } from "typeorm/repository/Repository";
import { UserEntity } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { HttpException, HttpStatus, Injectable, NotFoundException, UsePipes } from "@nestjs/common";
import { CreateUserDTO } from "./DTO/createUser.dto";
import { sign } from "jsonwebtoken"
import { JWT } from "src/config";
import { LoginUserDto } from "./DTO/loginUser.dto";
import { compare } from "bcrypt";
import { MailerService } from '@nestjs-modules/mailer';


@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>, private mailerService: MailerService) { }

    async sendUserConfirmation(user: any) {
        console.log(user);

        const url = `http://localhost:4000/api/user/auth/${user.id}`;

        await this.mailerService.sendMail({
            to: user.email,
            subject: `Welcome ${user.firstName} ${user.lastName}! Confirm your Email`,
            template: './confirmation',
            context: {
                name: `${user.firstName} ${user.lastName}`,
                url,
            },
        });
    }
    async createUser(createUserDTO: CreateUserDTO) {

        const checkIfUserExist = await this.userRepository.findOneBy({ email: createUserDTO.email })
        if (checkIfUserExist) {

            throw new HttpException("User exist, email is taken", HttpStatus.UNPROCESSABLE_ENTITY)
        }

        const newUser = new UserEntity() as any
        Object.assign(newUser, createUserDTO)

        await this.userRepository.save(newUser)
        await this.userRepository.findOne({ where: { email: newUser.email } })
        this.sendUserConfirmation(newUser)

        return newUser
    }

    generateJWT(user: UserEntity): string {
        return sign({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            subject: user.subject
        }, JWT)
    }
    userResponse(user: UserEntity): any {
        return {
            ...user,
            token: this.generateJWT(user)
        }
    }

    async loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            select: ["id", "email", "firstName", "lastName", "password", "role", "subject", "isAuth"],
            where: { email: loginUserDto.email }
        })

        console.log(user);


        if (!user) {
            throw new HttpException("Username or password is incorrect", HttpStatus.UNPROCESSABLE_ENTITY)
        }

        if (!user.isAuth) {
            throw new HttpException("You must confirm your account. Please check your email for confirmation link", HttpStatus.UNAUTHORIZED)
        }
        const isPasswordCorrect = await compare(loginUserDto.password, user.password)
        if (!isPasswordCorrect) {
            throw new HttpException("Credentional is not valid", HttpStatus.UNPROCESSABLE_ENTITY)
        }
        delete user.password
        return user
    }

    async findById(id: number): Promise<UserEntity> {
        return this.userRepository.findOneBy({ id })
    }

    async authUser(id: number): Promise<any> {
        const found = await this.userRepository.findOneBy({ id })


        if (!found) {
            throw new NotFoundException("User with ID not found")
        }
        else {
            found.isAuth = true;

            return this.userRepository.save(found)
        }
    }

}

