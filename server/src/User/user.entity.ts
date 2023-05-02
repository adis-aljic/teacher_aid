import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
import { hash } from "bcrypt"

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

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, 10)
    }

}