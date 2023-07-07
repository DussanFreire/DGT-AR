import { Injectable } from "@nestjs/common";
import { FileService } from "../file/file.service";
import { GraphActionsService } from "../graph-actions/graph-actions.service";
import { GraphService } from "../graph/graph.service";

@Injectable()
export class GraphColorService {
  constructor(
    private fileService: FileService,
    private graphService: GraphService,
    private graphActionsService: GraphActionsService
  ) {}

  private updateNodesColors(folder: string) {
    if (!this.graphService.filterNotUsed) {
      this.updateNodesColorsToTransp();
      this.graphService.filterNotUsed = true;
    }
    const filterColor = this.fileService.currentData.filters.find(
      (f) => f.name === folder
    ).color;

    this.fileService.currentData.nodes.forEach((n) => {
      if (n.color === filterColor && n.name.startsWith(folder)) {
        n.visible = !n.visible;
      }
    });
  }

  public resetGraph() {
    this.graphActionsService.addAction("Reset graph");
    this.fileService.updateVersion();
    this.fileService.currentData.actions.resetUsed = true;
    this.graphService.filterNotUsed = false;
    this.fileService.currentMetric.vsCodeUserActions.resetUsed++;
    this.fileService.currentData.nodes.forEach((n) => {
      n.visible = true;
      n.links.forEach((l) => {
        l.visible = true;
      });
    });
  }

  private updateEdgesColors() {
    this.fileService.currentData.nodes.forEach((n) =>
      n.links.forEach((l) => {
        const source = this.fileService.currentData.nodes.find(
          (s) => s.id === l.source
        );
        const target = this.fileService.currentData.nodes.find(
          (t) => t.id === l.target
        );
        if (source.visible && target.visible) {
          l.visible = true;
        } else {
          l.visible = false;
        }
      })
    );
  }

  private updateNodesColorsToTransp() {
    this.fileService.currentData.nodes.forEach((n) => {
      n.visible = false;
      n.links.forEach((l) => {
        l.visible = false;
      });
    });
  }

  public updateGraphColorToTransp() {
    this.graphActionsService.addAction(`fiter transparent`);

    this.fileService.currentData.actions.filterUsed = true;
    this.fileService.currentMetric.vsCodeUserActions.filtersUsed
      .transpFilterUsed++;
    this.fileService.updateVersion();
    this.updateNodesColorsToTransp();

    return this.fileService.currentData;
  }

  public updateGraphColor(folder: string) {
    this.graphActionsService.addAction(`fiter ${folder} folder`);
    this.updateToMetricsFilter(folder);
    this.fileService.updateVersion();
    this.updateNodesColors(folder);
    this.fileService.currentData.actions.filterUsed = true;
    this.updateEdgesColors();
    return this.fileService.currentData;
  }

  private updateToMetricsFilter(folder: string) {
    if (!this.fileService.currentData.filters.some((x) => x.name == folder))
      return;
    this.fileService.currentMetric.vsCodeUserActions.filtersUsed
      .folderFilterUsed[folder]++;
  }
}
