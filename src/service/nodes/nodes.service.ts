import { Injectable } from "@nestjs/common";
import { IModule } from "dependency-cruiser";
import { DependenciesDto, NodeDto } from "../../dto/dependencies.dto";
import { FileService } from "../file/file.service";

@Injectable()
export class NodesService {

    constructor(private fileService: FileService) {}

    private getNewNode(module: IModule, id: number, dependenciesMapped: DependenciesDto): NodeDto {
        const node = new NodeDto();
        node.data.folder = this.fileService.getFolderName(module.source);
        node.data.name = this.fileService.getNodeNameAndSetAppName(module.source,dependenciesMapped);
        this.fileService.createFilterByFolder(node.data.folder,dependenciesMapped);
        node.data.id = id;

        return node;
    }

    private discardCircularDep(modules: Array<IModule>): Array<IModule> {
        modules.forEach((m: IModule) => {
            m.dependencies = m.dependencies.filter(
                (d) => {
                    const hasCircularDep = m.dependents.includes(d.resolved);
                    if(hasCircularDep){
                        m.dependents = m.dependents.filter(dt => dt != d.resolved)
                    }
                    return !hasCircularDep;
                }
            );
        });

        return modules;
    }

    private isAValidModule(moduleName: string): boolean {
        return moduleName.split("/")[0]=="DataDep"
    }

    private discardInvalidModules(modules: Array<IModule>): Array<IModule> {
        modules.forEach((m: IModule) => {
            m.dependencies = m.dependencies.filter(
                (d) => this.isAValidModule(d.resolved)
            );
            m.dependents = m.dependents.filter(
                (dt) => this.isAValidModule(dt)
            );
        });
        
        return  modules.filter(m=>this.isAValidModule(m.source));
    }

    private isNotALonelyNode(module: IModule): boolean {
        return module.dependencies.length > 0 || module.dependents.length > 0
    }

    getGraphNodes(modules: Array<IModule>,dependenciesMapped:DependenciesDto): [Array<NodeDto>, Array<IModule> ] {
        const nodes: Array<NodeDto> = [];
        let index: number = 0;
        
        modules= this.discardCircularDep(modules);
        modules = this.discardInvalidModules(modules);

        modules.forEach((m: IModule) => {
            if (!m.source.includes("node_modules") && this.isNotALonelyNode(m)) {
                const newNode = this.getNewNode(m, index, dependenciesMapped);
                index++;
                nodes.push(newNode);
            }
        });

        return [nodes, modules];
    }
}
