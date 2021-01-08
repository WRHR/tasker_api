import { Arg, Field, Mutation, ObjectType } from 'type-graphql'
import {MyContext} from '../types'
import {Task} from '../entities/Task'
import { } from 'graphql'

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class TaskResponse {
  @Field(()=>[FieldError], {nullable:true})
  errors?:FieldError[]
  
  @Field(()=>Task, {nullable:true})
  task?:Task
}

@ObjectType()
export class TaskResolver{
  @Mutation(()=>TaskResponse)
  async createTask(@Arg('options') options:)
}