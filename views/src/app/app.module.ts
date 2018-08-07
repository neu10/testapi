import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule} from 'src/material.module';
import { RouterModule, Routes } from "@angular/router";
import { DevicesComponent} from './devicesComponent/devices.component';

const routes: Routes = [
  {
    path: "devices",
    component: DevicesComponent
  },
 
  {
    path: "chart",
    loadChildren: "./chartComponent/chart.module#ChartModule"
  },
  {
    path:'aboutus',
    loadChildren:'./aboutUsComponent/aboutUs.module#AboutUsModule'
  },
  {
    path: "**",
    component: DevicesComponent
  },
];

@NgModule({
  declarations: [
    AppComponent,
    DevicesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
