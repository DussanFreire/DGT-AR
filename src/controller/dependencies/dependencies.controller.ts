import { Controller, Get } from "@nestjs/common";
import { DependenciesService } from '../../service/dependencies/dependencies.service'

@Controller("dependencies")
export class DependenciesController {
  constructor(private dependenciesService: DependenciesService) {}

  @Get()
  async getDependencies() {
    return await this.dependenciesService.getDependencies();
  }

  @Get("cruiser")
  async getCruiserDep() {
    return await this.dependenciesService.getCruiserDep();
  }
}
