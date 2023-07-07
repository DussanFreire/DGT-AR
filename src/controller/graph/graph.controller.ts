import { Controller, Get } from '@nestjs/common';
import { MetricsDto } from '../../dto/metrics.dto';
import { FileService } from '../../service/file/file.service';
import { GraphService } from '../../service/graph/graph.service';
import fetch from 'node-fetch'
import { DependenciesService } from 'src/service/dependencies/dependencies.service';
@Controller('graph')
export class GraphController {
  constructor(private fileService :FileService, private graphService : GraphService,private dependenciesService: DependenciesService) {}    
  
  @Get()
  public async getFile() {
    const newData =this.graphService.initAndGetActionData();
    return newData;
  }

  @Get("create")
  public async createDataset(){
    const data =  await this.dependenciesService.getDependencies();
    const url="http://localhost:5000/layout";
    const responseJson = await fetch(url, {
      method: 'POST',
      body: data,
      headers: {'Content-Type': 'application/json; charset=UTF-8'} });
    const response =  await responseJson.json();
    
  }

  @Get('folders')
  public async getGraphFolders() {
    return this.graphService.getJsonFolderFilter();
  }

  @Get("restart")
  async restartFile() {
    this.fileService.resetGraph();
    this.graphService.updateExperimentInfo();
    this.graphService.resetGraphSize();
    if(this.graphService.theExperimentHasEnded()){
      this.fileService.currentMetric.info.taskId = this.fileService.taskId;
      this.fileService.currentMetric.info.experimentId = this.fileService.experimentId;
      this.fileService.metricsHistory.push({...this.fileService.currentMetric});
      this.fileService.experimentId++;
      this.fileService.currentMetric = new MetricsDto();
      this.fileService.currentMetric.vsCodeUserActions.filtersUsed.folderFilterUsed = this.graphService.getJsonFolderFilter();
    }
    this.fileService.taskId = 0;
    this.fileService.currentMetric.info.taskId = this.fileService.taskId;
    this.fileService.currentMetric.info.experimentId = this.fileService.experimentId;
    return this.fileService.currentData;
  } 

  @Get("restart-app")
  public async restarApp() {
    this.fileService.restarApp();
    this.graphService.restarApp();
  }
}
