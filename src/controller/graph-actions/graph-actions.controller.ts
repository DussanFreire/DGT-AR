import { Controller, Get } from '@nestjs/common';
import { GraphActionsService } from 'src/service/graph-actions/graph-actions.service';

@Controller('graph-actions')
export class GraphActionsController {
    constructor(private graphActionsService: GraphActionsService) {}

    @Get()
    public getActions(){
        return this.graphActionsService.getActions();
    }
}
