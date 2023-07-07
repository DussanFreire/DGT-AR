import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControllersModule } from './controller/controller.module';
import { ServiceModule } from './service/service.module';
import { GraphConnectionController } from './graph-connection/graph-connection.controller';

@Module({
  imports: [ControllersModule, ServiceModule],
  controllers: [AppController, GraphConnectionController],
  providers: [AppService],
})
export class AppModule {}
