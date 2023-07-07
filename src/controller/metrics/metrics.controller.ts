import { Body, Controller, Get, Post } from "@nestjs/common";
import { MetricsService } from "../../service/metrics/metrics.service";
import { MetricsDto } from "../../dto/metrics.dto";
import { FileService } from "../../service/file/file.service";

@Controller("metrics")
export class MetricsController {
  constructor(
    private fileService: FileService,
    private metricsService: MetricsService
  ) {}

  @Get()
  async getMetrics() {
    return this.fileService.metricsHistory;
  }

  @Get("restart")
  async restartMetrics() {
    this.fileService.metricsHistory = [];
    return this.fileService.metricsHistory;
  }

  @Post()
  async GetFileWithData(@Body() metricsDto: MetricsDto) {
    return this.metricsService.getMetricsWithData(metricsDto);
  }

  @Get("general")
  async getGenneralMetrics() {
    return this.metricsService.getGenneralMetrics();
  }
}
