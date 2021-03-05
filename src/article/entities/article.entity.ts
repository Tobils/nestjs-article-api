import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('article')
export class Article {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    imagepath: string

    @Column()
    title: string

    @Column()
    description: string

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date
}
