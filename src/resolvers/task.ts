import { Arg, Ctx, Field, InputType, Mutation, ObjectType } from "type-graphql";
import { MyContext } from "../types";
import { Task } from "../entities/Task";
import {} from "graphql";
import { getConnection } from "typeorm";

@InputType()
class TaskOptions {
  @Field()
  title: string;

  @Field()
  text: string;

  @Field()
  category: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class TaskResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Task, { nullable: true })
  task?: Task;
}

@ObjectType()
export class TaskResolver {
  @Mutation(() => TaskResponse)
  async createTask(
    @Arg("options") options: TaskOptions,
    @Ctx() { req }: MyContext
  ): Promise<TaskResponse> {
    let task;

    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Task)
        .values({
          title: options.title,
          text: options.text,
          category: options.category,
          creatorId: req.session.userId,
        })
        .returning("*")
        .execute();
      console.log("task result", result);
      task = result.raw[0];
    } catch (err) {
      if (err) {
        return {
          errors: [
            {
              field: "task",
              message: "cannot create task",
            },
          ],
        };
      }
    }
    return { task };
  }
}
