import { UserEntity } from "src/User/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "classes" })
export class ClassesEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    school: string

    @Column()
    city: string

    @Column()
    cityAbb: string

    @Column()
    schoolClass: string

    @Column()
    departmant: string

    @Column()
    abbrevation: string

    @Column({ default: false })
    selected: boolean

    @ManyToOne(() => UserEntity, (teacher: UserEntity) => teacher.classes)
    teacher: UserEntity
}