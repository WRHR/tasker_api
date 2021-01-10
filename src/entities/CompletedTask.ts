import {
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
export class CompletedTask {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @OneToOne(() => Task, (task) => task.id)
  taskId: Task;

  @Field()
  @ManyToOne(() => User, (user) => user.completedTasks)
  userId: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;
}
