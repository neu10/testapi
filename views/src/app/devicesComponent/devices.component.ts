import { Component } from '@angular/core';

@Component({
    selector: 'devices',
    templateUrl: './devices.component.html',
    styleUrls: ['./devices.component.scss']
})

export class DevicesComponent {
   
        private factorList: any = [
            {factor:"Temperature", icon:"fa fa-thermometer-half", bgColor:"grey"},
            {factor:"Humidity", icon:"fa fa-sun-o",bgColor:"green"},
            {factor:"Dust", icon:"fa fa-low-vision",bgColor:"red"},
            {factor:"Wind Factors", icon:"fa fa-flag-checkered",bgColor:"purple"},
            {factor:"Weather", icon:"fa fa-bolt",bgColor:"blue"},
            {factor:"Solar panel tilt angle", icon:"fa fa-snowflake-o",bgColor:"orange"}
        ]
    constructor() {

    }
}