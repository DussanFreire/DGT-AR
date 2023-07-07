import { Controller, Get } from "@nestjs/common";
import { GraphMovementService } from "../../service/graph-movement/graph-movement.service";

@Controller("graph-movement")
export class GraphMovementController {
  constructor(private graphMovementService: GraphMovementService) {}


  
  @Get("x-forward")
  async moveXForward() {
    return this.graphMovementService.moveGraph("x-forward");
  }

  @Get("y-forward")
  async moveYForward() {
    return this.graphMovementService.moveGraph("y-forward");
  }

  @Get("z-forward")
  async moveZForward() {
    return this.graphMovementService.moveGraph("z-forward");
  }

  @Get("x-backward")
  async moveXbackward() {
    return this.graphMovementService.moveGraph("x-backward");
  }

  @Get("y-backward")
  async moveYbackward() {
    return this.graphMovementService.moveGraph("y-backward");
  }
  @Get("z-backward")
  async moveZbackward() {
    return this.graphMovementService.moveGraph("z-backward");
  }
}
