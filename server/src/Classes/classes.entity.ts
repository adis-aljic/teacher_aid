import { UserEntity } from "src/User/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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



    @ManyToMany(() => UserEntity, (user) => user.classes)
    @JoinTable()
    user: UserEntity[]

    // @ManyToOne(() => UserEntity, (user) => user.classes)
    // user: UserEntity

}