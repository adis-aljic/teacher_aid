import {
    BaseEntity, Entity, PrimaryGeneratedColumn, Column,
    BeforeInsert, OneToMany
} from "typeorm";
import { hash } from "bcrypt"
import { ClassesEntity } from "src/Classes/classes.entity";

@Entity("user")
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column({ select: false })
    password: string;

    @Column({ default: "teacher" })
    role: string;

    @Column({ default: false })
    isAuth: boolean

    @Column()
    subject: string;
    user: { classID: number; school: string; city: string; cityAbb: string; schoolClass: string; departmant: string; abbrevation: string; };

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, 10)
    }


    @OneToMany(() => ClassesEntity, (schoolClass: ClassesEntity) => schoolClass.teacher)
    classes: ClassesEntity[]
}