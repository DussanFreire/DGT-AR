import { Injectable } from "@nestjs/common";
import { HeadDataDto } from "../../dto/headData.dto";
import { MetricsDto } from "../../dto/metrics.dto";
import { FileService } from "../file/file.service";

@Injectable()
export class GraphService {

  constructor(private fileService: FileService) {}

  public filterNotUsed:boolean = false;

  public getJsonFolderFilter(): {} {
    let jsonData = {};
    this.fileService.currentData.filters.forEach((x: {}) => {
      jsonData[x["name"]] = 0;
      return jsonData;
    });

    return jsonData;
  }

  public resetGraphSize() {
    this.fileService.currentData.size = 0.30;
    this.filterNotUsed=false;
    this.fileService.changeSize();
    this.fileService.currentData.size = 1;
  }
  public restarApp() {
    this.filterNotUsed = false;
  }
  public updateExperimentInfo() {
    this.fileService.currentMetric = new MetricsDto();
    this.fileService.experimentId++;
    this.fileService.currentMetric.vsCodeUserActions.filtersUsed.folderFilterUsed = this.getJsonFolderFilter();
    this.fileService.version = 0;
    this.fileService.currentMetric.info.startTime = (new Date()).toISOString();
    this.fileService.currentHeadData = new HeadDataDto();
  }
  public theExperimentHasEnded(): boolean {
    return this.fileService.experimentId != 1;
  }

  public initAndGetActionData() {
    const auxData = { ...this.fileService.currentData };
    auxData.actions = { ...auxData.actions };
    this.fileService.currentData.actions.xBackward = false;
    this.fileService.currentData.actions.yBackward = false;
    this.fileService.currentData.actions.zBackward = false;
    this.fileService.currentData.actions.xForward = false;
    this.fileService.currentData.actions.yForward = false;
    this.fileService.currentData.actions.zForward = false;
    this.fileService.currentData.actions.sizeChanged = false;
    this.fileService.currentData.actions.filterUsed = false;
    this.fileService.currentData.actions.resetUsed = false;

    return auxData;
  }
}
