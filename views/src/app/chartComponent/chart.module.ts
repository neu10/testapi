import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChartComponent } from "./chart.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    { path: "", component: ChartComponent}
];

@NgModule({
  imports: [CommonModule,RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [ChartComponent]
})
export class ChartModule {}