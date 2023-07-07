import { Controller, Get } from "@nestjs/common";
import { GraphRotationService } from "../../service/graph-rotation/graph-rotation.service";

@Controller("graph-rotation")
export class GraphRotationController {
  constructor(private graphRotationService: GraphRotationService) {}

  @Get("horizontal")
  public async rotateModelH() {
    return this.graphRotationService.rotateGraphHorizontal();
  }

  @Get("vertical")
  public async rotateModelV() {
    return this.graphRotationService.rotateGraphVertical();
  }
}
