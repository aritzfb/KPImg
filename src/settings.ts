/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

module powerbi.extensibility.visual {
    "use strict";
    import DataViewObjectsParser = powerbi.extensibility.utils.dataview.DataViewObjectsParser;

    export class VisualSettings extends DataViewObjectsParser {
      public dataPoint: dataPointSettings = new dataPointSettings();
      public visualOptions: visualOptions = new visualOptions();
      }

    export class dataPointSettings {
     // Default color
      public defaultColor: string = "";
     // Show all
      public showAllDataPoints: boolean = true;
     // Fill
      public fill: string = "";
     // Color saturation
      public fillRule: string = "";
     // Text Size
      public fontSize: number = 12;
     }

     export enum alignOptions {
      top = "top" as any
      , middle = "middle" as any
      , bottom = "bottom" as any
      
    }

     export class visualOptions {
       public urlImgOk: string="";
       public urlImgKo: string="";
       /*
       public urlImgOk: string="https://s5.eestatic.com/2017/10/10/espana/Espana_253238302_49941798_1706x960.jpg";
       public urlImgKo: string="https://s4.eestatic.com/2017/10/10/espana/Espana_253237967_49932740_1706x960.jpg";
       */
       public koPercentValue: number=0.5;
       public kpiColor: string = "#000000";
       public kpiTransparency: number=1;
       public kpiVerticalAlign: alignOptions=alignOptions.middle;
       public serieColorOk: string="#008000";
       public serieColorKo: string="#FF0000";
       public serieColorNeutral: string="#C0C0C0";
       public seriesTransparency: number=0.4;
     }

}
