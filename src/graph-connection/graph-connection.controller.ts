import { Controller, Get } from '@nestjs/common';
import { log } from 'console';
import { FileService } from 'src/service/file/file.service';

@Controller('graph-connection')
export class GraphConnectionController {
    constructor(private fileService :FileService) {}    

    @Get()
    public async getGraphFolders() {
      return {status: this.fileService.getConnectinStatus()};
    }
  
}
