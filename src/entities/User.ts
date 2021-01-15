import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Task } from "./Task";
import { CompletedTask } from "./CompletedTask";

@ObjectType()
@Entity()
export class User extends BaseEntity{
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Field()
  @Column({ unique: true })
  email!: string;
  
  @Column({ type: "text" })
  password!: string;

  @OneToMany(()=>Task, task =>task.creator)
  tasks: Task
  
  @OneToMany(()=>CompletedTask, completedTask =>completedTask.completedBy)
  completedTasks: CompletedTask[]
  
  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
