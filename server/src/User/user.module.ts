import { Module } from "@nestjs/common";
import { UserEntity } from "./user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { MailModule } from "src/mail/mail.module";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), MailModule],
    controllers: [UserController],
    providers: [UserService, MailModule],
    exports: [UserService, MailModule]
})
export class UserModule { }
