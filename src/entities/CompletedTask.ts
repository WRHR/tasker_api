import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class CompletedTask{
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  completed:string

  
  
}