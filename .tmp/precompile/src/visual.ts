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

module powerbi.extensibility.visual.kPImg0051F6D5AD8348148E01E9E4B31C9F41_DEBUG  {
    "use strict";
    export class myElementSerie {
        public name:string;
        public value:number;
        public target:number;
        public color:string;
        public percent:number;
        public realPercent:number;
        public aRegressionLine:number;
        public bRegressionLine:number;
        public covariance: number;
        public predictedValue:number;
                
    }
    export class Visual implements IVisual {
        private target: HTMLElement;
        private settings: VisualSettings;
        private host: IVisualHost;
        constructor(options: VisualConstructorOptions) {
            this.target = options.element;
            const mycanvas : HTMLElement = document.createElement("canvas");
            //mycanvas.id="mycanvas";
            this.target.appendChild(mycanvas);
            this.host = options.host;
            
        }

        

        public update(options: VisualUpdateOptions) {
            this.settings = Visual.parseSettings(options && options.dataViews && options.dataViews[0]);
            
            
            //data load
            let hasValue : boolean = false;
            let hasTarget : boolean = false;
            let hasCategories : boolean = false;

            let catValueIndex, catTargetIndex:number;
            let minValue :number = 0;
            let maxValue : number = 0;

            if(options) if(options.dataViews) if (options.dataViews[0]) if(options.dataViews[0].categorical.categories) hasCategories=true;
            if(options) if(options.dataViews) if (options.dataViews[0]) if(options.dataViews[0].categorical.values){
                if(options.dataViews[0].categorical.values.length==2) {
                    hasValue=true;
                    hasTarget=true;
                    if(options.dataViews[0].categorical.values[0].source.roles.value){
                        catValueIndex=0;
                        catTargetIndex=1;
                    }else{
                        catValueIndex=1;
                        catTargetIndex=0;
                    }
                } else if(options.dataViews[0].categorical.values.length==1){
                    if(options.dataViews[0].categorical.values[0].source.roles.value) {
                        hasValue=true;
                        catValueIndex=0;
                    } else {
                        hasTarget=true;
                        catTargetIndex=0;
                    }
                }
            }

            let globalValue : number = 0;
            let globalTarget : number = 0;
            let series : Array<myElementSerie> = new Array();
            debugger;
            if(/*hasTarget &&*/ hasValue){
                if(!hasCategories){
                    globalValue = parseFloat(options.dataViews[0].categorical.values[catValueIndex].values[0].valueOf().toString());
                    if(hasTarget) globalTarget = parseFloat(options.dataViews[0].categorical.values[catTargetIndex].values[0].valueOf().toString());
                } else {
                    var minLocal,maxLocal;
                    minLocal=options.dataViews[0].categorical.values[catValueIndex].minLocal;
                    maxLocal=options.dataViews[0].categorical.values[catValueIndex].maxLocal;
                    minValue = minLocal;
                    maxValue = maxLocal;
                    /*if(options.dataViews[0].categorical.values[0].source.roles.value){
                        minLocal=options.dataViews[0].categorical.values[0].minLocal;
                        maxLocal=options.dataViews[0].categorical.values[0].maxLocal;
                    } else {
                        minLocal=options.dataViews[0].categorical.values[1].minLocal;
                        maxLocal=options.dataViews[0].categorical.values[1].maxLocal;
                    }*/
                    for(var i=0;i<options.dataViews[0].categorical.categories[0].values.length;i++){
                        var myelement  = new myElementSerie();
                        myelement.name = options.dataViews[0].categorical.categories[0].values[i].valueOf().toString();
                        myelement.value = parseFloat(options.dataViews[0].categorical.values[0].values[i].valueOf().toString());
                        if(hasTarget) myelement.target = parseFloat(options.dataViews[0].categorical.values[1].values[i].valueOf().toString());
                        myelement.percent=0;
                        //if(myelement.target!=0) myelement.percent=myelement.value/myelement.target;
                        if((maxLocal-minLocal)!=0) myelement.percent=(myelement.value-minLocal)/(maxLocal-minLocal);
                        else myelement.percent=0.5;
                        myelement.realPercent=myelement.percent;
                        
                        if(myelement.percent>1)myelement.percent=1;
                        if(myelement.percent<0)myelement.percent=0;
                        series.push(myelement);
                        globalValue += myelement.value;
                        if(hasTarget) globalTarget += myelement.target;
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
                    var currentPercent;
                    if(hasTarget) currentPercent = globalValue/globalTarget;
                    else currentPercent=globalValue;
                    if(currentPercent>= this.settings.visualOptions.koPercentValue) mysrc = this.settings.visualOptions.urlImgOk.valueOf().toString();
                    else mysrc=this.settings.visualOptions.urlImgKo.valueOf().toString();
                }
                myimg.setAttribute("src",mysrc);
            
            } else myimg.setAttribute("src","data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=");

            
            myimg.onload = (function(mysettings,mytarget){
                return function(){
                    function calcMaxFontSize (can : HTMLCanvasElement,strText:string, fontFamily:string, numIndicators:number) :number {
                        let canCtx : CanvasRenderingContext2D = can.getContext("2d");                    
                        let maxSize : number = can.height/numIndicators;
                        if(can.width<maxSize) maxSize=can.width;
                        let fontSize:number = maxSize;
                        canCtx.font = fontSize.toString() + "px " + fontFamily;
                        let myTextWidth :number = canCtx.measureText(strText).width;
                        while (myTextWidth>can.width){
                            fontSize--;
                            canCtx.font = fontSize.toString() + "px " + fontFamily;
                            myTextWidth = canCtx.measureText(strText).width;
                        }            
                        return fontSize;
                    }

                    function formatIndicator (indicator:number):string{
                        let retorno:string="";
                        if(indicator){
                            switch(mysettings.visualOptions.formatIndicator.valueOf().toString()){
                                case "none":
                                    retorno=parseFloat(indicator.toFixed(mysettings.visualOptions.numberDecimals) as any).toLocaleString(mysettings.visualOptions.valueLocale.toString());
                                break;
                                case "auto":
                                    var currentValue = indicator;        
                                    var numDigitos = parseFloat(currentValue.toFixed(mysettings.visualOptions.numberDecimals) as any).toLocaleString(mysettings.visualOptions.valueLocale.toString()).length;
                                    var numDivisiones = 0;
                                    
                                    while (numDigitos > 4) {
                                        numDivisiones++;
                                        currentValue = currentValue / 1000.00;
                                        numDigitos = parseFloat(currentValue.toFixed(mysettings.visualOptions.numberDecimals) as any).toLocaleString(mysettings.visualOptions.valueLocale.toString()).length;
                                    }
                                    var escale = "";
                                    if (numDivisiones==1) escale="k";
                                    else if (numDivisiones==2) escale="M";
                                    else if (numDivisiones==3) escale="B";
                                    else if (numDivisiones>=4) escale="kB";
                                    
                                    retorno=parseFloat(currentValue.toFixed(mysettings.visualOptions.numberDecimals) as any).toLocaleString(mysettings.visualOptions.valueLocale.toString())+escale;
                                break;
                                case "k":
                                    retorno=parseFloat((indicator/1000).toFixed(mysettings.visualOptions.numberDecimals) as any).toLocaleString(mysettings.visualOptions.valueLocale.toString())+"k";
                                break;
                                case "M":
                                    retorno=parseFloat((indicator/1000000).toFixed(mysettings.visualOptions.numberDecimals) as any).toLocaleString(mysettings.visualOptions.valueLocale.toString())+"M";
                                break;
                                case "B":
                                    retorno=parseFloat((indicator/1000000000).toFixed(mysettings.visualOptions.numberDecimals) as any).toLocaleString(mysettings.visualOptions.valueLocale.toString())+"B";
                                break;
                                case "kB":
                                    retorno=parseFloat((indicator/1000000000000).toFixed(mysettings.visualOptions.numberDecimals) as any).toLocaleString(mysettings.visualOptions.valueLocale.toString())+"kB";
                                break;
                            }
                        }
                        return retorno;
                    }

                    let mycan : HTMLCanvasElement = document.getElementsByTagName("canvas").item(0);
                    let myCanCtx : CanvasRenderingContext2D = mycan.getContext("2d");
                    
                    //myCanCtx.filter = "none";            
                    myCanCtx.drawImage(myimg,0,0,mycan.width,mycan.height);

                    let numberOfIndicators :number = 0;
                    if (hasValue) numberOfIndicators=1;
                    if (hasValue && hasTarget) numberOfIndicators=2;
                    if (mysettings.visualOptions.showMode.valueOf().toString() == "indi") numberOfIndicators=1;
                    if (mysettings.visualOptions.showMode.valueOf().toString() == "comp") numberOfIndicators=1;

                    if(hasValue /*&& hasTarget*/){
                            
                        //draw series
                        if(series.length>0){
                            myCanCtx.beginPath();
                            myCanCtx.moveTo(0,mycan.height);  
                            myCanCtx.lineWidth=1;
                            myCanCtx.fillStyle = mysettings.visualOptions.serieColorNeutral.valueOf().toString();
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
                            
                            
                            

                            if (series.length>1){
                                //Calculate thend: minimun squares
                                var totalY = 0;
                                var totalX = 0;
                                var totalXY = 0;
                                var totalX2 = 0;
                                var totalN = series.length;
                                var realTotalY = 0;
                                var realTotalX = 0;
                                var realTotalXY = 0;
                                var realTotalX2 = 0;
                                for(var numSer=0;numSer<series.length;numSer++){                    
                                    //var x=numSer+1;
                                    var x=numSer*(mycan.width/series.length);
                                    //var x=(numSer+1)*(mycan.width/series.length);
                                    var y=series[numSer].realPercent;
                                    var realX = numSer;
                                    //var realX = numSer+1;
                                    var realY = series[numSer].value;
                                    totalY+=y;
                                    realTotalY+=realY;
                                    totalX+=x;
                                    realTotalX+=realX;
                                    totalXY+=x*y;
                                    realTotalXY+=realX*realY;
                                    totalX2+=x*x;
                                    realTotalX2+=realX*realX;                                    
                                }
                                var avgX=totalX/totalN;
                                var avgY=totalY/totalN;
                                var realAvgX=realTotalX/totalN;
                                var realAvgY=realTotalY/totalN;
                                //regression line: f(x)=a+bx. Calculate the factor b
                                //var b=(totalXY-totalN*avgX*avgY)/(totalX2-totalN*avgX*avgX);
                                var b= ( totalN*totalXY - totalX*totalY) / ( totalN*totalX2 - totalX*totalX);

                                //var realBRegressionLine=(realTotalXY-totalN*realAvgX*realAvgY)/(realTotalX2-totalN*realAvgX*realAvgY);
                                var realBRegressionLine=( (totalN*realTotalXY) - (realTotalX*realTotalY) ) / ( (totalN*realTotalX2) - (realTotalX*realTotalX) );
                                // Calculate de a value for regression line: a=avgX
                                this.bRegressionLine = b;
                                
                                //this.aRegressionLine = avgY-this.bRegressionLine*avgX;
                                this.aRegressionLine = ( totalY - this.bRegressionLine*totalX) / totalN;                                
                                //var realARegressionLine = realAvgY-realBRegressionLine*realAvgX;
                                var realARegressionLine = (realTotalY - realBRegressionLine*realTotalX) / totalN;
                                
                                //calculate real correlation
                                var parteArriba=0, parteAbajo1=0, parteAbajo2=0;
                                for(var numSer=0;numSer<series.length;numSer++){ 
                                    var x=numSer;
                                    //var x=numSer + 1;
                                    var y=series[numSer].value;
                                    parteArriba += (x-realAvgX)*(y-realAvgY);
                                    parteAbajo1 += (x-realAvgX)*(x-realAvgX);
                                    parteAbajo2 += (y-realAvgY)*(y-realAvgY);

                                }
                                this.covariance = parteArriba / (Math.sqrt(parteAbajo1)*Math.sqrt(parteAbajo2));
                                //this.predictedValue = realARegressionLine+realBRegressionLine*(series.length+1)/series.length;
                                
                                //this.predictedValue = realARegressionLine+realBRegressionLine*(series.length+1);
                                this.predictedValue = realARegressionLine+realBRegressionLine*(series.length);
                                

                                mytarget.onmouseover= (function(mytarget,mycovariance,mypredictedValue) {                
                                    return function(){
                                        if(!document.getElementById("kpimgalternatetext")){

                                            mycan.hidden=true;
                                            var myAlternateText = document.createElement("div");
                                            myAlternateText.id="kpimgalternatetext";
                                            //myAlternateText.innerHTML="<p>Predicted value: " +  mypredictedValue.toFixed(4) + "</p>";
                                            

                                            myAlternateText.innerHTML+="<p>Last element name: " +  series[series.length-1].name + "</p>";
                                            myAlternateText.innerHTML+="<p>Predicted value for next element: " +  formatIndicator(mypredictedValue) + "</p>";
                                            myAlternateText.innerHTML+="<p>Reliability: " + Math.abs(mycovariance).toFixed(2) + "%</p>";
                                            myAlternateText.innerHTML+="<p>b: " + realBRegressionLine+ ";a: " + realARegressionLine +"</p>";
                                            mytarget.appendChild(myAlternateText);
                                        }
                                    }                                    
                                })(mytarget,this.covariance,this.predictedValue);                                
                                mytarget.onmouseleave = function(e){
                                    mycan.hidden=false;
                                    document.getElementById("kpimgalternatetext").remove();
                                }

                                if (!mysettings.visualOptions.showTrendLine){
                                    myCanCtx.fillStyle=mysettings.visualOptions.serieColorOk.valueOf().toString();
                                    if (b<0) myCanCtx.fillStyle=mysettings.visualOptions.serieColorKo.valueOf().toString();
                            
                                }

                                myCanCtx.fill();
                            
                            }
                            

                            //regression line
                            if (this.bRegressionLine && mysettings.visualOptions.showTrendLine) {
                                myCanCtx.beginPath();
                                myCanCtx.lineWidth=mysettings.visualOptions.widthTrendLine;
                                myCanCtx.globalAlpha = parseFloat(mysettings.visualOptions.seriesTransparency.valueOf().toString());
                                myCanCtx.strokeStyle=mysettings.visualOptions.serieColorNeutral.valueOf().toString();
                                if (this.bRegressionLine>0) myCanCtx.strokeStyle=mysettings.visualOptions.serieColorOk.valueOf().toString();
                                if (this.bRegressionLine<0) myCanCtx.strokeStyle=mysettings.visualOptions.serieColorKo.valueOf().toString();
                                
                                
                                
                                
                                var initialYreg = mycan.height-ytrans(realARegressionLine);

                                var finalXreg = mycan.height-ytrans(totalN*realBRegressionLine+realARegressionLine);
                                //debugger;
                                //initialYreg = mycan.height;
                                //finalXreg = -mycan.height/2;
                                
                                myCanCtx.moveTo(0,initialYreg);
                                myCanCtx.lineTo(mycan.width,finalXreg);

                                //myCanCtx.moveTo(0,mycan.height*(1-this.aRegressionLine));
                                //myCanCtx.moveTo(0,mycan.height*(1-(realARegressionLine-minLocal)/(maxLocal-minLocal)));
                                //myCanCtx.moveTo(0,mycan.height);
                                //myCanCtx.moveTo(0,mycan.height*(1-this.aRegressionLine));
                                //myCanCtx.moveTo(0,mycan.height-this.aRegressionLine);

                                //myCanCtx.lineTo(mycan.width,mycan.height*(1-this.bRegressionLine*mycan.width -this.aRegressionLine));
                                //myCanCtx.lineTo(mycan.width,-mycan.height/(maxLocal-minLocal)*(realBRegressionLine*mycan.width -realARegressionLine));
                                //myCanCtx.lineTo(mycan.width,-mycan.height/2);
                                //myCanCtx.lineTo(mycan.width,-mycan.height/mycan.width);
                                //myCanCtx.lineTo(mycan.width,mycan.height*(1-this.bRegressionLine*mycan.width -this.aRegressionLine));
                                
                                myCanCtx.closePath();
                                myCanCtx.stroke();
                                myCanCtx.fill();

                                myCanCtx.strokeStyle=mysettings.visualOptions.serieColorNeutral.valueOf().toString();
                                
                            }
                        
                        }
                        //end draw series
                        

                        //show values
                        var indicator :number = globalValue;                        
                        //var mytext = parseFloat(globalValue.toFixed(mysettings.visualOptions.numberDecimals) as any).toLocaleString(mysettings.visualOptions.valueLocale.toString());
                        var mytext = formatIndicator(globalValue);
                        myCanCtx.textAlign="center";
                        
                        let fontSize:number = calcMaxFontSize(mycan,mytext,mysettings.visualOptions.kpifontFamily.valueOf().toString(),numberOfIndicators); 
                        var myfontWeight = mysettings.visualOptions.kpiFontWeight;
                        if (myfontWeight<0) myfontWeight=0;
                        else if (myfontWeight>1)myfontWeight=1;
                        myfontWeight = myfontWeight*fontSize;
                        
                        myCanCtx.font=(myfontWeight).toString()+"px " + mysettings.visualOptions.kpifontFamily.valueOf().toString();
                        
                        var moveHeight = mycan.height/2+myfontWeight/4;
                        myCanCtx.fillStyle = mysettings.visualOptions.kpiColor.valueOf().toString();
                        myCanCtx.globalAlpha = parseFloat(mysettings.visualOptions.kpiTransparency.valueOf().toString());
                        if (mysettings.visualOptions.showMode.valueOf().toString()=="indi"){
                            if(mysettings.visualOptions.kpiVerticalAlign.valueOf().toString()=="middle")
                            //middle align
                            myCanCtx.fillText(mytext,mycan.width/2,moveHeight);  
                            else if(mysettings.visualOptions.kpiVerticalAlign.valueOf().toString()=="top")
                            //top align
                            myCanCtx.fillText(mytext,mycan.width/2,myfontWeight/1.3);  
                            else if(mysettings.visualOptions.kpiVerticalAlign.valueOf().toString()=="bottom")
                            //bottom align
                            myCanCtx.fillText(mytext,mycan.width/2,mycan.height-5); 
                            else myCanCtx.fillText(mytext,mycan.width/2,moveHeight);
                        } else if (mysettings.visualOptions.showMode.valueOf().toString()=="both"){
                            //top align
                            myCanCtx.fillText(mytext,mycan.width/2,myfontWeight/1.3); 
                        }
                        
                        //end show values
                        
                        

                        //show percentage
                        if (globalTarget) if (globalTarget!=0) {
                            var targetIndicator : number = globalValue/globalTarget;
                            mytext = parseFloat((targetIndicator*100).toFixed(mysettings.visualOptions.numberDecimals) as any).toLocaleString(mysettings.visualOptions.valueLocale.toString()) + "%";
                            //mytext = parseFloat((Math.abs(this.covariance)*100).toFixed(mysettings.visualOptions.numberDecimals) as any).toLocaleString(mysettings.visualOptions.valueLocale.toString()) + "%";
                            myCanCtx.textAlign="center";
                        
                            fontSize = calcMaxFontSize(mycan,mytext,mysettings.visualOptions.kpifontFamily.valueOf().toString(),numberOfIndicators); 
                            myfontWeight = mysettings.visualOptions.kpiFontWeightTarget;
                            if (myfontWeight<0) myfontWeight=0;
                            else if (myfontWeight>1)myfontWeight=1;
                            myfontWeight = myfontWeight*fontSize;
                            
                            myCanCtx.font=(myfontWeight).toString()+"px " + mysettings.visualOptions.kpifontFamily.valueOf().toString();
                            myCanCtx.fillStyle = mysettings.visualOptions.kpiColorTarget.valueOf().toString();
                            if (mysettings.visualOptions.showMode.valueOf().toString()=="comp"){
                                if(mysettings.visualOptions.kpiVerticalAlign.valueOf().toString()=="middle")
                                //middle align
                                myCanCtx.fillText(mytext,mycan.width/2,moveHeight);  
                                else if(mysettings.visualOptions.kpiVerticalAlign.valueOf().toString()=="top")
                                //top align
                                myCanCtx.fillText(mytext,mycan.width/2,myfontWeight/1.3);  
                                else if(mysettings.visualOptions.kpiVerticalAlign.valueOf().toString()=="bottom")
                                //bottom align
                                myCanCtx.fillText(mytext,mycan.width/2,mycan.height-5); 
                                else myCanCtx.fillText(mytext,mycan.width/2,moveHeight);
                            } else if (mysettings.visualOptions.showMode.valueOf().toString()=="both"){
                                //bottom align
                                myCanCtx.fillText(mytext,mycan.width/2,mycan.height-mycan.height*0.01);
                            }
                             
                            
                        }
                        
                    }

                    //end load indicator and series

                }
            })(this.settings, this.target);
            function ytrans(x){
                return mycan.height/(maxLocal-minLocal)*(x-minLocal);
            }

            let mycan : HTMLCanvasElement = this.target.getElementsByTagName("canvas").item(0);
            mycan.height=this.target.offsetHeight;
            mycan.width=this.target.offsetWidth;
            let myCanCtx : CanvasRenderingContext2D = mycan.getContext("2d");

            
            
            
            //end load ok image
            
            
        }

        private static parseSettings(dataView: DataView): VisualSettings {
            //let parsedSettings : VisualSettings = VisualSettings.parse(dataView) as VisualSettings;
            return VisualSettings.parse(dataView) as VisualSettings;
            
            //return parsedSettings;
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