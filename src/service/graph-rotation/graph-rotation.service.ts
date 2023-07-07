import { Injectable } from "@nestjs/common";
import { FileService } from "../file/file.service";
import { GraphActionsService } from "../graph-actions/graph-actions.service";

@Injectable()
export class GraphRotationService {
  constructor(private fileService: FileService,
    private graphActionsService: GraphActionsService) {}

  public rotateGraphHorizontal() {
    this.graphActionsService.addAction(`rotate horizontal`);

    this.fileService.updateVersion();
    this.fileService.currentData.actions.rotateH =
      !this.fileService.currentData.actions.rotateH;
    this.fileService.currentMetric.vsCodeUserActions.remoteRotation.horizontalRotationUsed++;
    return this.fileService.currentData;
  }

  public rotateGraphVertical() {
    this.graphActionsService.addAction(`rotate vertical`);
    this.fileService.updateVersion();
    this.fileService.currentData.actions.rotateV =
      !this.fileService.currentData.actions.rotateV;
    this.fileService.currentMetric.vsCodeUserActions.remoteRotation.verticalRotationUsed++;
    return this.fileService.currentData;
  }
}
