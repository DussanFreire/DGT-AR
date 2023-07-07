import { Body, Controller, Get, Post } from '@nestjs/common';
import { FileService } from '../../service/file/file.service';

@Controller('graph-data-flow')
export class GraphDataFlowController {
    constructor(private fileService :FileService) {}    
  
    @Post()
    public async postMetrics(@Body() headData: any) {
        this.fileService.connectionStatus = true;
        this.fileService.addHeadDataToList(headData);
    }
  

    @Get()
    public async getFile() {
       return this.fileService.currentHeadData;
    }
}
