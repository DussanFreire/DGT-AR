import { HeadDataDto } from "./headData.dto";

export class MetricsDto {
  info:ExperimentInfo=new ExperimentInfo();
  hololensMetrics: HololensMetrics = new HololensMetrics(); 
  unityUserActions: UntyMetrics =  new UntyMetrics();
  vsCodeUserActions: VSCodeMetrics = new VSCodeMetrics();
}


export class ExperimentInfo{
  experimentId: number = 0;
  taskId: number = 0;
  task: string = "";
  answer: Array<string> = [];
  endTime: string ="";
  startTime: string = "";
  durationInSeconds: string = "";
}

export class UntyMetrics{
  actionsDone: any;
  desktopInputs: any;
}

export class HololensMetrics{
  headMetrics: HeadDataDto = new HeadDataDto();
  handMetricsInSeconds: any;
}

export class VSCodeMetrics{
  remoteMovement: MovementMetrics = new MovementMetrics();
  remoteRotation: RotationMetrics = new RotationMetrics();
  remoteSizeChanged: SizeMetrics = new SizeMetrics();
  filtersUsed: FiltersMetrics = new FiltersMetrics();
  resetUsed: number = 0;

}


export class FiltersMetrics{
  folderFilterUsed: any = {};
  transpFilterUsed: number = 0;
}

export class MovementMetrics{
  forwardX: number = 0;
  backwardX: number = 0;
  forwardZ: number = 0;
  backwardZ: number = 0;
  forwardY: number = 0;
  backwardY: number = 0;
}

export class RotationMetrics{
  verticalRotationUsed: number = 0;
  horizontalRotationUsed: number = 0;
}

export class SizeMetrics{
  sizeSmallChanged: number = 0;
  sizeNormalChanged: number = 0;
  sizeVerySmallChanged: number = 0;
}