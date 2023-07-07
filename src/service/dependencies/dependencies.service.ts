import { Injectable } from "@nestjs/common";
import { cruise, ICruiseResult, IReporterOutput } from "dependency-cruiser";
import { ICruiseOptions } from "dependency-cruiser/types/options";
import { DependenciesDto } from "../../dto/dependencies.dto";
import { EdgesService } from "../edges/edges.service";
import { NodesService } from "../nodes/nodes.service";
@Injectable()
export class DependenciesService {
  public dependenciesMapped = new DependenciesDto();

  public ARRAY_OF_FILES_AND_DIRS_TO_CRUISE: string[] = ["DataDep"];


  constructor(
    private nodeService: NodesService,
    private edgeService: EdgesService
  ) {}

  async getDependencies(): Promise<DependenciesDto> {
    const cruiseOptions: ICruiseOptions = {
      exclude: ["node_modules", "dist"],
    };
    try {
      const cruiseResult: IReporterOutput = cruise(
        this.ARRAY_OF_FILES_AND_DIRS_TO_CRUISE,
        cruiseOptions
      );
      
      const dependencies = cruiseResult.output as ICruiseResult;
      
      [this.dependenciesMapped.elements.nodes, dependencies.modules]= this.nodeService.getGraphNodes(
        dependencies.modules,this.dependenciesMapped
      );
      this.dependenciesMapped.elements.edges = this.edgeService.getEdgesFromNode(
        dependencies.modules,
        this.dependenciesMapped.elements.nodes,
      );
      this.dependenciesMapped.tasks = [
        "¿Cuáles son los archivos que podrían ser afectados de forma directa si se realiza algún cambio en el archivo 'src/converter.js'?",
        "¿Cuáles son los archivos dentro la categoría de archivos de la carpeta 'src' que tienen alguna relación con archivos dentro la carpeta 'scec'?",
        "¿Cuáles son los 3 nodos que a simple vista tienen mayor número de dependencias'?",
        "¿Cuál es la carpeta que tiene la menor cantidad de archivos dentro del proyecto?",
        "¿Cuáles son los nodos que no dependen de ningún otro en la carpeta 'services'?",
      ];
      return this.dependenciesMapped;
    } catch (error) {
      console.error(error);
    }
  }

  async getCruiserDep(): Promise<ICruiseResult> {
    const cruiseOptions: ICruiseOptions = {
      exclude: ["node_modules"],
    };

    try {
      const cruiseResult: IReporterOutput = cruise(
        this.ARRAY_OF_FILES_AND_DIRS_TO_CRUISE,
        cruiseOptions
      );
      const dependencies = cruiseResult.output as ICruiseResult;

      return dependencies;
    } catch (error) {
      console.error(error);
    }
  }
}
