import { Module } from '@nestjs/common';
import { DependenciesService } from './dependencies/dependencies.service';
import { FileService } from './file/file.service';
import { EdgesService } from './edges/edges.service';
import { NodesService } from './nodes/nodes.service';
import { GraphColorService } from './graph-color/graph-color.service';
import { GraphRotationService } from './graph-rotation/graph-rotation.service';
import { GraphSizeService } from './graph-size/graph-size.service';
import { GraphMovementService } from './graph-movement/graph-movement.service';
import { GraphTaskService } from './graph-task/graph-task.service';
import { GraphService } from './graph/graph.service';
import { MetricsService } from './metrics/metrics.service';
import { GraphActionsService } from './graph-actions/graph-actions.service';
@Module({
  providers: [
    DependenciesService,
    FileService,
    EdgesService,
    NodesService,
    GraphColorService,
    GraphRotationService,
    GraphSizeService,
    GraphMovementService,
    GraphTaskService,
    GraphService,
    MetricsService,
    GraphActionsService,
  ],
  exports: [
    DependenciesService,
    FileService,
    EdgesService,
    NodesService,
    GraphColorService,
    GraphRotationService,
    GraphSizeService,
    GraphMovementService,
    GraphTaskService,
    GraphService,
    MetricsService,
    GraphActionsService
  ],
})
export class ServiceModule {}
