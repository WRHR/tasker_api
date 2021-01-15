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

import { getConnection } from "typeorm";
import { CompletedTask } from "src/entities/CompletedTask";

ObjectType();
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class CompletedTaskRes {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => CompletedTask, { nullable: true })
  compTask?: CompletedTask;
}

@ObjectType()
export class CompleteTaskResolver {
  @Query(() => [CompletedTask])
  async myCompletedTasks(@Ctx() { req }: MyContext): Promise<CompletedTask[]> {
    return await CompletedTask.find({ userId: req.session.id });
  }

  @Mutation(() => CompletedTaskRes)
  async completeTask(
    @Arg("taskNum") taskNum: number,
    @Ctx() { req }: MyContext
  ): Promise<CompletedTaskRes> {
    let ct;

    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(CompletedTask)
        .values({
          taskId: taskNum.toString(),
          userId: req.session.userId?.toString(),
        })
        .returning("*")
        .execute();
      ct = result.raw[0];
    } catch (err) {
      return {
        errors: [
          {
            field: "completed task",
            message: "An error occured",
          },
        ],
      };
    }
    return { ct };
  }
}
