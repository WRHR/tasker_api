import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
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
  @PrimaryColumn()
  userId: number;
  
  @Field()
  @PrimaryColumn()
  taskId: number;

  @ManyToOne(() => Task, (task) => task.id)
  @JoinColumn({name:'taskId'})
  task: Task;

  @ManyToOne(() => User, (user) => user.completedTasks)
  @JoinColumn({ name: "userId" })
  completedBy!: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;
}
