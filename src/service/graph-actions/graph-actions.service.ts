import { Injectable } from '@nestjs/common';
import { ActionDto } from 'src/dto/actions.dto';
import { FileService } from '../file/file.service';

@Injectable()
export class GraphActionsService {
    

    constructor(
        private fileService: FileService,
    ) {}

    getActions() {
        return this.fileService.actionsHistory;
    }
    
    public addAction(actionName :string){
        let action =  new ActionDto();
        action.actionName = actionName;
        action.experimentId = this.fileService.experimentId+"";
        action.taskId = this.fileService.taskId +"";
        action.time = (new Date()).toUTCString();
        this.fileService.actionsHistory.push(action);

    }
}
