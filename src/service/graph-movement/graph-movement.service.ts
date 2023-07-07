import { Injectable } from "@nestjs/common";
import { FileService } from "../file/file.service";
import { GraphActionsService } from "../graph-actions/graph-actions.service";

@Injectable()
export class GraphMovementService {
  constructor(
    private fileService: FileService,
    private graphActionsService: GraphActionsService
  ) {}

  public moveGraph(graphMovement: string) {
    this.fileService.updateVersion();
    switch (graphMovement) {
      case "x-forward":
        this.graphActionsService.addAction(`move x-forward`);
        this.fileService.currentData.actions.xForward = true;
        this.fileService.currentMetric.vsCodeUserActions.remoteMovement
          .forwardX++;
        break;
      case "y-forward":
        this.graphActionsService.addAction(`move y-forward`);
        this.fileService.currentData.actions.yForward = true;
        this.fileService.currentMetric.vsCodeUserActions.remoteMovement
          .forwardY++;
        break;
      case "z-forward":
        this.graphActionsService.addAction(`move z-forward`);
        this.fileService.currentData.actions.zForward = true;
        this.fileService.currentMetric.vsCodeUserActions.remoteMovement
          .forwardZ++;
        break;
      case "x-backward":
        this.graphActionsService.addAction(`move x-backward`);
        this.fileService.currentData.actions.xBackward = true;
        this.fileService.currentMetric.vsCodeUserActions.remoteMovement
          .backwardX++;
        break;
      case "y-backward":
        this.graphActionsService.addAction(`move y-backward`);
        this.fileService.currentMetric.vsCodeUserActions.remoteMovement
          .backwardY++;
        this.fileService.currentData.actions.yBackward = true;
        break;
      case "z-backward":
        this.graphActionsService.addAction(`move z-backward`);
        this.fileService.currentMetric.vsCodeUserActions.remoteMovement
          .backwardZ++;
        this.fileService.currentData.actions.zBackward = true;
        break;
      default:
        break;
    }
    return this.fileService.currentData;
  }
}
