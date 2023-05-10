import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";
import { ConfigService } from "@nestjs/config";
let config: ConfigService<any>;

const configDB: TypeOrmModuleOptions = {
    // type: config.get("TYPE_DB"),
    // type: process.env("TYPE_dB"),
    type: "postgres",
    // host: config.get("HOST_DB"),
    host: "localhost",
    // port: config.get("PORT_DB"),
    port: 5432,
    // username: config.get("USERNAME_DB"),
    username: "postgres",
    // password: config.get("PASSWORD_DB"),
    password: "wireless",
    // database: config.get("DATABASE_NAME_DB"),
    database: "teacher_aid",
    entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    synchronize: true

} as any

// console.log(configDB);


export default configDB;