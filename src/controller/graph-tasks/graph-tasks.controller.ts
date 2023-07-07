import { Body, Controller, Get, Post } from "@nestjs/common";
import { GraphTaskService } from "../../service/graph-task/graph-task.service";

@Controller("graph-tasks")
export class GraphTasksController {
  constructor(private graphTaskService: GraphTaskService) {}

  @Post("next")
  async chageTask(@Body() answ: any) {
    console.log(answ);
    return this.graphTaskService.chageTask(answ);
  }

  @Get("finish")
  async finishExperiment() {
    setTimeout(() => {
      this.graphTaskService.finishExperiment();
    }, 12000);
    return true;
  }

  @Post("set-user")
  async setUser(@Body() data: any) {
    console.log(data);
    return this.graphTaskService.setUser(data.user, data.type);
  }
}
