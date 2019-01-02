/*
 *  Power BI Visual CLI
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
    export class myElementSerie {
        public name:string;
        public value:number;
        public target:number;
        public color:string;
        public percent:number;
                
    }
    export class Visual implements IVisual {
        private target: HTMLElement;
        private settings: VisualSettings;
        
        constructor(options: VisualConstructorOptions) {
            this.target = options.element;
            const mycanvas : HTMLElement = document.createElement("canvas");
            //mycanvas.id="mycanvas";
            this.target.appendChild(mycanvas);
            
        }

        public update(options: VisualUpdateOptions) {
            this.settings = Visual.parseSettings(options && options.dataViews && options.dataViews[0]);
            

            //data load
            let hasValue : boolean = false;
            let hasTarget : boolean = false;
            let hasCategories : boolean = false;

            if(options) if(options.dataViews) if (options.dataViews[0]) if(options.dataViews[0].categorical.categories) hasCategories=true;
            if(options) if(options.dataViews) if (options.dataViews[0]) if(options.dataViews[0].categorical.values){
                if(options.dataViews[0].categorical.values.length==2) {
                    hasValue=true;
                    hasTarget=true;
                } else if(options.dataViews[0].categorical.values.length==1){
                    if(options.dataViews[0].categorical.values[0].source.roles.value) hasValue=true;
                    else hasTarget=true;
                }
            }

            let globalValue : number = 0;
            let globalTarget : number = 0;
            let series : Array<myElementSerie> = new Array();
            
            if(hasTarget && hasValue){
                if(!hasCategories){
                    globalValue = parseFloat(options.dataViews[0].categorical.values[0].values[0].valueOf().toString());
                    globalTarget = parseFloat(options.dataViews[0].categorical.values[1].values[0].valueOf().toString());
                } else {
                    for(var i=0;i<options.dataViews[0].categorical.categories[0].values.length;i++){
                        var myelement  = new myElementSerie();
                        myelement.name = options.dataViews[0].categorical.categories[0].values[i].valueOf().toString();
                        myelement.value = parseFloat(options.dataViews[0].categorical.values[0].values[i].valueOf().toString());
                        myelement.target = parseFloat(options.dataViews[0].categorical.values[1].values[i].valueOf().toString());
                        myelement.percent=0;
                        if(myelement.target!=0) myelement.percent=myelement.value/myelement.target;
                        if(myelement.percent>1)myelement.percent=1;
                        if(myelement.percent<0)myelement.percent=0;
                        series.push(myelement);
                        globalValue += myelement.value;
                        globalTarget += myelement.target;
                    }
                }
            }
            //end data load
            // load ok image
            let myimg : HTMLImageElement = document.createElement("img");
            if(this.settings.visualOptions.urlImgOk && this.settings.visualOptions.urlImgKo && this.settings.visualOptions.koPercentValue && hasValue && hasTarget){
                var mysrc = "";
                if(globalTarget==0 || globalValue==0) mysrc = this.settings.visualOptions.urlImgKo.valueOf().toString();
                else {
                    var currentPercent = globalValue/globalTarget;
                    if(currentPercent>= this.settings.visualOptions.koPercentValue) mysrc = this.settings.visualOptions.urlImgOk.valueOf().toString();
                    else mysrc=this.settings.visualOptions.urlImgKo.valueOf().toString();
                }
                myimg.setAttribute("src",mysrc);
            
            }

            
            myimg.onload = (function(mysettings){
                return function(){

                    let mycan : HTMLCanvasElement = document.getElementsByTagName("canvas").item(0);
                    let myCanCtx : CanvasRenderingContext2D = mycan.getContext("2d");
                    
                    //myCanCtx.filter = "none";            
                    myCanCtx.drawImage(myimg,0,0,mycan.width,mycan.height);

                    if(hasValue && hasTarget){
                        var indicator :number = 0;
                        if(globalTarget!=0) indicator=globalValue/globalTarget;
                        var mytext = (indicator*100).toFixed(2) + "%";

                        myCanCtx.textAlign="center";
                                        
                        var maxSize = mycan.height;
                        if (maxSize>mycan.width) maxSize=mycan.height;
                        
                        var fontSize = maxSize;
                        myCanCtx.font=(fontSize).toString()+"px sans-serif";
                        var mytextwidth = myCanCtx.measureText(mytext).width;
                        
                        while (mytextwidth>mycan.width){
                            fontSize--;
                            myCanCtx.font=(fontSize).toString()+"px sans-serif";
                            mytextwidth = myCanCtx.measureText(mytext).width;
                        }

                        if(series.length>0){
                            myCanCtx.beginPath();
                            myCanCtx.moveTo(0,mycan.height);  

                            if (series.length==1){
                                myCanCtx.lineTo(0,mycan.height-series[0].percent*mycan.height); 
                                myCanCtx.lineTo(mycan.width,mycan.height-series[1].percent*mycan.height); 
                            }
                            else for(var i=0;i<series.length;i++){
                                myCanCtx.lineTo(i*mycan.width/(series.length-1),mycan.height-series[i].percent*mycan.height);    
                            }
                            myCanCtx.lineTo(mycan.width,mycan.height);
                            myCanCtx.globalAlpha = parseFloat(mysettings.visualOptions.seriesTransparency.valueOf().toString());
                            myCanCtx.closePath();
                            myCanCtx.stroke();
                            myCanCtx.fillStyle = mysettings.visualOptions.serieColorNeutral.valueOf().toString();
                            if (series.length>1){
                                myCanCtx.fillStyle=mysettings.visualOptions.serieColorOk.valueOf().toString();
                                if (series[series.length-1].percent<series[series.length-2].percent) myCanCtx.fillStyle=mysettings.visualOptions.serieColorKo.valueOf().toString();
                            }
                            myCanCtx.fill();
                        }

                        var moveHeight = mycan.height/2+fontSize/4;
                        myCanCtx.fillStyle = mysettings.visualOptions.kpiColor.valueOf().toString();
                        myCanCtx.globalAlpha = parseFloat(mysettings.visualOptions.kpiTransparency.valueOf().toString());
                        if(mysettings.visualOptions.kpiVerticalAlign.valueOf().toString()=="middle")
                        //middle align
                        myCanCtx.fillText(mytext,mycan.width/2,moveHeight);  
                        else if(mysettings.visualOptions.kpiVerticalAlign.valueOf().toString()=="top")
                        //top align
                        myCanCtx.fillText(mytext,mycan.width/2,fontSize/1.3);  
                        else if(mysettings.visualOptions.kpiVerticalAlign.valueOf().toString()=="bottom")
                        //bottom align
                        myCanCtx.fillText(mytext,mycan.width/2,mycan.height-5); 
                        else myCanCtx.fillText(mytext,mycan.width/2,moveHeight); 
                        
                    }

                    //end load indicator and series






                }
            })(this.settings);




            

            let mycan : HTMLCanvasElement = this.target.getElementsByTagName("canvas").item(0);
            mycan.height=this.target.offsetHeight;
            mycan.width=this.target.offsetWidth;
            let myCanCtx : CanvasRenderingContext2D = mycan.getContext("2d");
            
            //end load ok image
            
            
        }

        private static parseSettings(dataView: DataView): VisualSettings {
            return VisualSettings.parse(dataView) as VisualSettings;
        }

        /** 
         * This function gets called for each of the objects defined in the capabilities files and allows you to select which of the 
         * objects and properties you want to expose to the users in the property pane.
         * 
         */
        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
            return VisualSettings.enumerateObjectInstances(this.settings || VisualSettings.getDefault(), options);
        }
    }
}