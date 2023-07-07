import { Injectable } from "@nestjs/common";
import { FileService } from "../file/file.service";
import { GraphActionsService } from "../graph-actions/graph-actions.service";

@Injectable()
export class GraphSizeService {
  constructor(
    private fileService: FileService,
    private graphActionsService: GraphActionsService
  ) {}

  public changeGraphSize(graphSize: string) {
    this.fileService.updateVersion();
    this.fileService.currentData.actions.sizeChanged =true;
    switch (graphSize) {
      case "small":
        this.graphActionsService.addAction(`change size to small`);
        this.fileService.currentData.size = 1;
        this.fileService.currentMetric.vsCodeUserActions.remoteSizeChanged
          .sizeVerySmallChanged++;
        break;
      case "normal":
        this.graphActionsService.addAction(`change size to normal`);
        this.fileService.currentMetric.vsCodeUserActions.remoteSizeChanged
          .sizeNormalChanged++;
        this.fileService.currentData.size = 1.25;
        break;
      case "big":
        this.graphActionsService.addAction(`change size to big`);
        this.fileService.currentMetric.vsCodeUserActions.remoteSizeChanged
          .sizeSmallChanged++;
        this.fileService.currentData.size = 1.5;
        break;
      default:
        break;
    }
    return this.fileService.currentData;
  }
}
