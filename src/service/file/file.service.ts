import { Injectable } from "@nestjs/common";
import { DependenciesDto, NodeFilterGraph } from "../../dto/dependencies.dto";
import { ColorsManager } from "../dependencies/ColorsManager";
import * as jsonData from "../../assets/angular.js.json";
import { MetricsDto } from "../../dto/metrics.dto";
import { HeadDataDto } from "../../dto/headData.dto";
import { ActionDto } from "src/dto/actions.dto";

@Injectable()
export class FileService {
  connectionStatus: boolean = false;
  user: string= "";
  type: string= "";
  metricsHistory:Array<MetricsDto> = [];
  actionsHistory:Array<ActionDto> = [];
  currentHeadData: HeadDataDto= new HeadDataDto();
  currentMetric: MetricsDto = new MetricsDto();
  version = 0;
  taskId = 0;
  experimentId = 0;
  currentData: any;
  firstTime: boolean = true;
  colorManager = new ColorsManager();

  constructor() {
    this.currentData = this.getDataset();
  }

  getConnectinStatus() {
    return this.connectionStatus;
}
  restarApp() {
    this.metricsHistory = [];
    this.connectionStatus = false;
    this.currentHeadData= new HeadDataDto();
    this.currentMetric = new MetricsDto();
    this.version = 0;
    this.taskId = 0;
    this.experimentId = 0;
    this.currentData = this.getDataset();;
    this.firstTime = true;
    this.colorManager = new ColorsManager();
    this.user="";
    this.type="";
  }

  addHeadDataToList(headData: any) {
    const HeadData= JSON.parse(headData["headMetrics"])
    this.currentHeadData.HeadCoords.push(...HeadData.HeadCoords);
    this.currentHeadData.HeadRotation.push(...HeadData.HeadRotation);
  }

  updateVersion() {
    this.version++;
    this.currentData.version = this.version;
  }

  resetGraph() {
    this.currentData = { ...this.getDataset() };
  }

  getParsedNodeName(source: string): string {
    const resources = source.split("/");
    const resourcesQty = resources.length;

    return resources[resourcesQty - 2] + "/" + resources[resourcesQty - 1];
  }

  getFolderName(source: string): string {
    const resources = source.split("/");
    const resourcesQty = resources.length;

    return resources[resourcesQty - 2];
  }

  getNodeNameAndSetAppName(
    source: string,
    dependenciesMapped: DependenciesDto
  ): string {
    if (this.firstTime) {
      dependenciesMapped.graph.name = source.split("/")[1];
    }
    const resources = source.split("/");
    const resourcesQty = resources.length;

    return resources[resourcesQty - 2] + "/" + resources[resourcesQty - 1];
  }

  createFilterByFolder(
    folderName: string,
    dependenciesMapped: DependenciesDto
  ) {
    if (!dependenciesMapped.filters.some((f) => f.name == folderName)) {
      const filtesQty = dependenciesMapped.filters.length;
      const colorsQty = this.colorManager.palleteColor.length;
      const nodeFilterGraph = new NodeFilterGraph();
      nodeFilterGraph.name = folderName;
      if(filtesQty < colorsQty){
        nodeFilterGraph.color = this.colorManager.palleteColor[filtesQty].color;
        nodeFilterGraph.background = this.colorManager.palleteColor[filtesQty].background;
      }
      else{
        nodeFilterGraph.color = this.colorManager.palleteColor[filtesQty % colorsQty].color;
        nodeFilterGraph.background = this.colorManager.palleteColor[filtesQty % colorsQty].background;
      }
      dependenciesMapped.filters.push(nodeFilterGraph);
    }
  }

  getDataset() {
    return JSON.parse(JSON.stringify(jsonData));
  }
  changeSize() {
    const normalDataSet = this.getDataset();
    this.currentData.nodes.forEach((n, i) => {
      n.x = normalDataSet.nodes[i].x * this.currentData.size;
      n.y = normalDataSet.nodes[i].y * this.currentData.size;
      n.z = normalDataSet.nodes[i].z * this.currentData.size;
    });
  }
}
