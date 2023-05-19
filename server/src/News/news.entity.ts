import { ClassesEntity } from "src/Classes/classes.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("news")
export class NewsEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    classId : number

    @Column({default: null})
    url : string

    @Column()
    title: string

    @Column()
    text : string

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @ManyToOne(() => ClassesEntity, (classes: ClassesEntity) => classes.news)
    public classes: ClassesEntity;
}   