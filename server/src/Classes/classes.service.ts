import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ClassesEntity } from "./classes.entity";
import { CreateClassDTO } from "./DTO/createClass.dto";
import { Repository } from "typeorm";
import { RegisterClass } from "src/User/DTO/registerClass.dto";
import { decode, verify } from "jsonwebtoken";
import { JWT } from "src/config";

@Injectable()
export class ClassService {
    constructor(@InjectRepository(ClassesEntity)
    private readonly classRepository: Repository<ClassesEntity>) { }
    async createClass(createClassDTO: CreateClassDTO)
        : Promise<ClassesEntity> {

        const schoolClass = new ClassesEntity()
        Object.assign(schoolClass, createClassDTO)

        console.log(schoolClass);
        return await this.classRepository.save(schoolClass)
    }

    async listClass() {
        return await this.classRepository.find()
        // return ["Aaa", "gg"]
    }

    async addClassToUser(token: string, id: number): Promise<ClassesEntity> {
        const decode = verify(token, JWT) as any

        const classForUpdate = await this.classRepository.findOneBy({ id: id })
        if (classForUpdate.selected) {
            throw new HttpException("Class is already assinged", HttpStatus.NOT_ACCEPTABLE)
        } // hendlat na frontendu
        classForUpdate.selected = true
        classForUpdate.teacher = decode


        await this.classRepository.save(classForUpdate)

        return {
            "statusCode": 200,
            "message": "Class is susscesfully registered"
        } as any
        // const user = decode(token, JWT)
    }
}