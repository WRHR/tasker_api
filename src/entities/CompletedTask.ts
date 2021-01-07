import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { User } from "./User";


@ObjectType()
@Entity()
export class CompletedTask{
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  completed:string

  @Field()
  @ManyToOne(()=>User, (user) => user.completedTasks)
  completedBy:User
}