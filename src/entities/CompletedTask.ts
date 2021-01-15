import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { User } from "./User";
import { Task } from "./Task";

@ObjectType()
@Entity()
export class CompletedTask extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @ManyToOne(() => Task, (task) => task.id)
  taskId!: Task;

  
  @ManyToOne(() => User, (user) => user.completedTasks)
  completedBy!: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;
}
