import { NgFor, NgIf, NgStyle } from "@angular/common";
import { Component, Input } from "@angular/core";

interface Color {
  name: string;
  value: string;
  main?: boolean;
}

interface GroupedColors {
  [groupName: string]: Color[];
}

interface ColorStoryData {
  mode: { name: string; id: string };
  color: Color[];
}

@Component({
  imports: [NgFor, NgStyle, NgIf],
  selector: "app-color-story",
  template: `
    <div *ngFor="let group of groupedColorsArray">
      <div style="margin-bottom: 20px;">
        <h3 class="text-capitalize" style="margin-bottom: 10px;">
          {{ group.key }}
        </h3>
        <div class="display-flex flex-wrap align-items-start gap-4">
          <div *ngFor="let color of group.colors">
            <div
              class="color-card"
              [ngStyle]="{ 'background-color': color.value }"
            ></div>
            <p>
              <strong>--{{ color.name }}</strong>
            </p>
            <p *ngIf="color.main">
              <code>Main</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ColorStoryComponent {
  @Input() data: ColorStoryData[] = [];

  get groupedColors(): GroupedColors {
    return this.data.reduce((acc: GroupedColors, item) => {
      item.color.forEach((color: Color) => {
        const baseName = color.name.split("-")[0];
        if (!acc[baseName]) {
          acc[baseName] = [];
        }
        acc[baseName].push(color);
      });
      return acc;
    }, {});
  }

  get groupedColorsArray(): { key: string; colors: Color[] }[] {
    return Object.entries(this.groupedColors).map(([key, colors]) => ({
      key,
      colors,
    }));
  }
}
