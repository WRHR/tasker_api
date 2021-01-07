import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { User } from "./User";
import { Task } from "./Task";


@ObjectType()
@Entity()
export class CompletedTask{
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @OneToOne(()=>Task, task => task.id)

  @Field()
  @ManyToOne(()=>User, (user) => user.completedTasks)
  completedBy:User
}