import { Injectable } from "@nestjs/common";
import { IModule } from "dependency-cruiser";
import { EdgeDto, NodeDto } from "../../dto/dependencies.dto";
import { FileService } from "../file/file.service";

@Injectable()
export class EdgesService {
  constructor(private fileService: FileService) {}

  public getEdgesFromNode(
    modules: Array<IModule>,
    nodes: Array<NodeDto>,
  ): Array<EdgeDto> {
    const edges: Array<EdgeDto> = [];
    modules.forEach((m: IModule) => {
      if (!m.source.includes("node_modules")) {
        m.dependents.forEach((d) => {
          if (!d.includes("node_modules")) {
            const newEdge = new EdgeDto();
            const source = this.fileService.getParsedNodeName(m.source);
            
            const target = this.fileService.getParsedNodeName(d);
            if (source != target) {
              newEdge.data.source = nodes.findIndex(
                (n) => n.data.name == source
              );
              newEdge.data.target = nodes.findIndex(
                (n) => n.data.name == target
              );
              edges.push(newEdge);
            }
          }
        });
      }
    });

    return edges;
  }
}
