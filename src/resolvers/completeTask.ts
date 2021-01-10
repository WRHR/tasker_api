import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
} from "type-graphql";
import { MyContext } from "../types";
import { Task } from "../entities/Task";
import {} from "graphql";
import { getConnection } from "typeorm";
import { CompletedTask } from "src/entities/CompletedTask";

@ObjectType()
export class CompleteTaskResolver {
  @Query(() => [CompletedTask])
  async myCompletedTasks(@Ctx() { req }: MyContext): Promise<CompletedTask[]> {
    return await CompletedTask.find({ userId: req.session.id });
  }
}
