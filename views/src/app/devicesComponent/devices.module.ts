import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DevicesComponent } from "./devices.component";
import { RouterModule, Routes } from "@angular/router";

// const routes: Routes = [
//     { path: "", component: DevicesComponent}
// ];

@NgModule({
  imports: [CommonModule],
  exports: [RouterModule],
  declarations: [DevicesComponent]
})
export class DevicesModule {}