import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";
import { env } from "process";


const configDB: TypeOrmModuleOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "wireless",
    database: "teacher_aid",
    entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    synchronize: true

}

export default configDB;