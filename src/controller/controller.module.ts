import { Module } from '@nestjs/common';
import { ServiceModule } from '../service/service.module';
import { DependenciesController } from './dependencies/dependencies.controller';
import { MetricsController } from './metrics/metrics.controller';
import { GraphSizeController } from './graph-size/graph-size.controller';
import { GraphRotationController } from './graph-rotation/graph-rotation.controller';
import { GraphMovementController } from './graph-movement/graph-movement.controller';
import { GraphColorController } from './graph-color/graph-color.controller';
import { GraphTasksController } from './graph-tasks/graph-tasks.controller';
import { GraphController } from './graph/graph.controller';
import { GraphDataFlowController } from './graph-data-flow/graph-data-flow.controller';
import { GraphActionsController } from './graph-actions/graph-actions.controller';

@Module({
  imports: [ServiceModule],
  controllers: [
    DependenciesController,
    MetricsController,
    GraphSizeController,
    GraphRotationController,
    GraphMovementController,
    GraphColorController,
    GraphTasksController,
    GraphController,
    GraphDataFlowController,
    GraphActionsController,
  ],
})
export class ControllersModule {}
