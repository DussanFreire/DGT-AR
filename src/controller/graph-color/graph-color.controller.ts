import { Controller, Get, Param } from "@nestjs/common";
import { GraphColorService } from "../../service/graph-color/graph-color.service";

@Controller("graph-color")
export class GraphColorController {
  constructor(private graphColorService: GraphColorService) {}

  @Get("transparent")
  public updateTranspatent() {
    return this.graphColorService.updateGraphColorToTransp();
  }


  @Get("reset")
  public resetGraph() {
    return this.graphColorService.resetGraph();
  }

  @Get("toggle/:folder")
  public updateColorFile(@Param("folder") folder: string) {
    return this.graphColorService.updateGraphColor(folder);
  }
}
