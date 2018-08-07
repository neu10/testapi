import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AboutComponent } from "./aboutUs.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    { path: "", component: AboutComponent}
];

@NgModule({
  imports: [CommonModule,RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [AboutComponent]
})
export class AboutUsModule {}