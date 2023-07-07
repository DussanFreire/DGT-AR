import { MetricsDto, MovementMetrics, RotationMetrics, SizeMetrics } from "./metrics.dto";

export class GeneralMetricsDto {
    user: string= "";
    dataset: string= "";
    experimentId:number=0;
    taskQty:number=0;
    durationInSeconds: number = 0;
    resetUsed:number = 0;
    folderFilterUsed: {};
    transpFilterUsed: number = 0;
    movementMetrics: MovementMetrics = new MovementMetrics()
    remoteRotation: RotationMetrics = new RotationMetrics();
    remoteSizeChanged: SizeMetrics = new SizeMetrics();
    details: Array<MetricsDto> = [];
  }