import { Injectable } from "@nestjs/common";
import { FileService } from "../file/file.service";
import { GraphActionsService } from "../graph-actions/graph-actions.service";
import { GraphColorService } from "../graph-color/graph-color.service";
import { MetricsService } from "../metrics/metrics.service";
import { log } from "console";

@Injectable()
export class GraphTaskService {
  
  fs = require('fs');

  constructor(
    private fileService: FileService,
    private graphActionsService: GraphActionsService,
    private graphColorService: GraphColorService,
    private metricsService: MetricsService
  ) {}

  public setUser(user: string,type: string) {
    this.fileService.user = user;
    this.fileService.type = type;
  }


  public callbackFun(err){
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
    console.log("JSON file has been saved.");
  }

  public getUniqueName(dir: string){
    console.log(dir);
    
    let aux = dir;
    let cont = 0 ;
    while (this.fs.existsSync(aux)) {
      cont++;
      aux = dir+cont;
    }
    return aux;
  }
  
  public  finishExperiment() {
    const dirRoot = this.getUniqueName('./experiment'+"/"+this.fileService.user + "-" + this.fileService.type);
    
    this.fs.mkdirSync(dirRoot);
    
    var generalMetrics = JSON.stringify(this.metricsService.getGenneralMetrics());
    var actions = JSON.stringify(this.graphActionsService.getActions());

    this.fs.writeFile(dirRoot+'/metrics.json', generalMetrics, 'utf8' ,(err)=>this.callbackFun(err) );
    this.fs.writeFile(dirRoot+'/actions.json', actions, 'utf8', (err)=>this.callbackFun(err));
  }

  public chageTask(answ: any) {
    this.fileService.currentMetric.info.answer = answ;
    this.fileService.version++;
    this.fileService.taskId++;
    this.fileService.currentData.taskId = this.fileService.taskId;
    this.graphActionsService.addAction(`go to next task`);
    this.graphColorService.resetGraph();
    return this.fileService.currentData;
  }
}
