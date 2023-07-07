import { Controller, Get } from "@nestjs/common";
import { GraphSizeService } from "../../service/graph-size/graph-size.service";

@Controller("graph-size")
export class GraphSizeController {
  constructor(private graphSizeController: GraphSizeService) {}

  @Get("small")
  public async chageSizeSmall() {
    return this.graphSizeController.changeGraphSize("small");
  }

  @Get("normal")
  public async chageSizeNormal() {
    return this.graphSizeController.changeGraphSize("normal");
  }

  @Get("big")
  public async chageSizeBig() {
    return this.graphSizeController.changeGraphSize("big");
  }

}
