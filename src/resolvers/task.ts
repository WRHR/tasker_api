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
  @Query(() => [Task])
  async allTasks(): Promise<Task[]> {
    return await Task.find();
  }

  @Query(() => Task, { nullable: true })
  async findTask(
    @Arg("id") id: number, 
  ): Promise<Task | undefined> {
    return await Task.findOne(id)
  }

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

  @Mutation(() => Task, { nullable: true })
  async updateTask(
    @Arg("id") id: number,
    @Arg("title", () => String, { nullable: true }) title: string
  ): Promise<Task | null> {
    const task = await Task.findOne(id);
    if (!task) {
      return null;
    }
    if (typeof title !== "undefined") {
      Task.update({ id }, { title });
    }
    return task;
  }

  @Mutation(() => Boolean)
  async deleteTask(@Arg("id") id: number): Promise<boolean> {
    await Task.delete(id);
    return true;
  }
}
