import { Injectable } from "@nestjs/common";
import { GeneralMetricsDto } from "../../dto/generalMetrcis.dto";
import { HeadDataDto } from "../../dto/headData.dto";
import { MetricsDto } from "../../dto/metrics.dto";
import { FileService } from "../file/file.service";
import { GraphService } from "../graph/graph.service";

@Injectable()
export class MetricsService {
  constructor(
    private fileService: FileService,
    private graphService: GraphService
  ) {}

  public getJsonFolderFilter(): {} {
    let jsonData = {};
    this.fileService.currentData.filters.forEach((x: {}) => {
      jsonData[x["name"]] = 0;
      return jsonData;
    });

    return jsonData;
  }

  public getGenneralMetrics() {
    let resume: GeneralMetricsDto = new GeneralMetricsDto();
    let metrics = this.fileService.metricsHistory;
    resume.user = this.fileService.user;
    resume.dataset = this.fileService.currentData.graphName;
    resume.details = { ...metrics };
    resume.folderFilterUsed = this.getJsonFolderFilter();

    for (const key in resume.folderFilterUsed) {
      resume.folderFilterUsed[key] = 0;
    }
    metrics.forEach((m) => {
      resume.durationInSeconds += +m.info.durationInSeconds;

      resume.taskQty++;

      resume.resetUsed += m.vsCodeUserActions.resetUsed;

      resume.transpFilterUsed +=
        m.vsCodeUserActions.filtersUsed.transpFilterUsed;

      for (const key in m.vsCodeUserActions.remoteMovement) {
        resume.movementMetrics[key] += m.vsCodeUserActions.remoteMovement[key];
      }

      for (const key in m.vsCodeUserActions.remoteRotation) {
        resume.remoteRotation[key] += m.vsCodeUserActions.remoteRotation[key];
      }

      for (const key in m.vsCodeUserActions.remoteSizeChanged) {
        resume.remoteSizeChanged[key] +=
          m.vsCodeUserActions.remoteSizeChanged[key];
      }

      for (const key in m.vsCodeUserActions.filtersUsed.folderFilterUsed) {
        resume.folderFilterUsed[key] +=
          m.vsCodeUserActions.filtersUsed.folderFilterUsed[key];
      }
    });
    return resume;
  }

  public getMetricsWithData(metricsDto: MetricsDto) {
    this.parseIncommingDataInCurrentMetric(metricsDto);
    this.AddCurrentMetricToHistory();
    const auxData = { ...this.fileService.currentData };
    this.fileService.currentHeadData = new HeadDataDto();
    auxData.actions = { ...auxData.actions };
    this.resetMovementData();
    return auxData;
  }

  private resetMovementData() {
    this.fileService.currentData.actions.xBackward = false;
    this.fileService.currentData.actions.yBackward = false;
    this.fileService.currentData.actions.zBackward = false;
    this.fileService.currentData.actions.xForward = false;
    this.fileService.currentData.actions.yForward = false;
    this.fileService.currentData.actions.zForward = false;
  }
  private AddCurrentMetricToHistory() {
    this.fileService.metricsHistory.push({ ...this.fileService.currentMetric });
    this.fileService.currentMetric = new MetricsDto();
    this.fileService.currentMetric.info.startTime = new Date().toISOString();
    this.fileService.currentMetric.vsCodeUserActions.filtersUsed.folderFilterUsed =
      this.graphService.getJsonFolderFilter();
  }

  private parseIncommingDataInCurrentMetric(metricsDto: MetricsDto) {
    for (const key in metricsDto) {
      if (Object.prototype.hasOwnProperty.call(metricsDto, key)) {
        if (key == "headMetrics") {
          this.fileService.currentMetric.hololensMetrics[key] = JSON.parse(
            metricsDto[key]
          );
        }
        if (key == "desktopInputs") {
          this.fileService.currentMetric.unityUserActions[key] = JSON.parse(
            metricsDto[key]
          );
        }
        if (key == "handMetricsInSeconds") {
          this.fileService.currentMetric.hololensMetrics[key] = JSON.parse(
            metricsDto[key]
          );
        }

        if (key == "actionsDone") {
          this.fileService.currentMetric.unityUserActions[key] = JSON.parse(
            metricsDto[key]
          );
        }
      }
    }
    this.fileService.currentMetric.info.task =
      this.fileService.currentData.tasks[this.fileService.taskId - 1];
    this.fileService.currentMetric.hololensMetrics.headMetrics = {
      ...this.fileService.currentHeadData,
    };
    this.fileService.currentMetric.info.endTime = new Date().toISOString();

    const startDate = new Date(this.fileService.currentMetric.info.startTime) ;
    const endDate = new Date(this.fileService.currentMetric.info.endTime) ;
    const durationInSeconds =  (endDate.getTime() - startDate.getTime()) / 1000;
    this.fileService.currentMetric.info.durationInSeconds =
      durationInSeconds.toString();
    this.fileService.currentMetric.info.taskId = this.fileService.taskId;
    this.fileService.currentMetric.info.experimentId =
      this.fileService.experimentId;
  }
}
