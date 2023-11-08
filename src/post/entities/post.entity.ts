import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    thumbnail: string;

    @Column({ default: 1 })
    status: number;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;

    @ManyToOne(() => User, (user) => user.post)
    user: User;
}