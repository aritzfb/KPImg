var powerbi;!function(e){var t;!function(e){var t;!function(e){var t;!function(e){var t;!function(e){function t(e,t,a){void 0===e&&(e=[]);var r=e;return i(r),t&&(r.identityFields=t),a&&(r.source=a),r}function i(e,t){e.grouped=t?function(){return t}:function(){return a(e)}}function a(e){for(var t,i=[],a=0,r=e.length;r>a;a++){var n=e[a];if(!t||t.identity!==n.identity){if(t={values:[]},n.identity){t.identity=n.identity;var o=n.source;void 0!==o.groupName?t.name=o.groupName:o.displayName&&(t.name=o.displayName)}i.push(t)}t.values.push(n)}return i}e.createValueColumns=t,e.setGrouped=i,e.groupValues=a}(t=e.DataViewTransform||(e.DataViewTransform={}))}(t=e.dataview||(e.dataview={}))}(t=e.utils||(e.utils={}))}(t=e.extensibility||(e.extensibility={}))}(powerbi||(powerbi={}));var powerbi;!function(e){var t;!function(e){var t;!function(e){var t;!function(e){var t;!function(e){function t(e,t){if(!e||!e.length)return-1;var i=e[0];if(i.values&&i.values.length>0)for(var r=0,n=i.values.length;n>r;++r){var o=i.values[r];if(o&&o.source&&a(o.source,t))return r}return-1}function i(e,t){if(e&&e.length)for(var i=0,r=e.length;r>i;i++)if(a(e[i].source,t))return i;return-1}function a(e,t){var i=e.roles;return i&&i[t]}function r(e,t){return null!=e&&null!=e.metadata&&e.metadata.columns&&e.metadata.columns.some(function(e){return e.roles&&void 0!==e.roles[t]})}function n(e,t){return e&&e.source&&e.source.roles&&e.source.roles[t]===!0}e.getMeasureIndexOfRole=t,e.getCategoryIndexOfRole=i,e.hasRole=a,e.hasRoleInDataView=r,e.hasRoleInValueColumn=n}(t=e.DataRoleHelper||(e.DataRoleHelper={}))}(t=e.dataview||(e.dataview={}))}(t=e.utils||(e.utils={}))}(t=e.extensibility||(e.extensibility={}))}(powerbi||(powerbi={}));var powerbi;!function(e){var t;!function(e){var t;!function(e){var t;!function(e){var t;!function(e){function t(e,t,i){if(!e)return i;var a=e[t];return void 0===a?i:a}function i(e,i,a){var r=t(e,i);return r&&r.solid?r.solid.color:a}e.getValue=t,e.getFillColorByPropertyName=i}(t=e.DataViewObject||(e.DataViewObject={}))}(t=e.dataview||(e.dataview={}))}(t=e.utils||(e.utils={}))}(t=e.extensibility||(e.extensibility={}))}(powerbi||(powerbi={}));var powerbi;!function(e){var t;!function(e){var t;!function(e){var t;!function(e){var t;!function(t){function i(t,i,a){return t?e.DataViewObject.getValue(t[i.objectName],i.propertyName,a):a}function a(e,t,i){return e&&e[t]?e[t]:i}function r(e,t,a){var r=i(e,t);return r&&r.solid?r.solid.color:a}function n(e,t,a){var r=i(e,t,a);return r&&r.solid?r.solid.color:void 0===r||null===r||"object"==typeof r&&!r.solid?a:r}t.getValue=i,t.getObject=a,t.getFillColor=r,t.getCommonValue=n}(t=e.DataViewObjects||(e.DataViewObjects={}))}(t=e.dataview||(e.dataview={}))}(t=e.utils||(e.utils={}))}(t=e.extensibility||(e.extensibility={}))}(powerbi||(powerbi={}));var powerbi;!function(e){var t;!function(t){var i;!function(t){var i;!function(t){var i,a=e.extensibility.utils.dataview.DataRoleHelper;!function(e){function t(e,t,i){if(e.categories&&e.categories.length>0){var r=e.categories[0];return r.source&&a.hasRole(r.source,t)&&a.hasRole(r.source,i)}return!1}function i(e){return void 0!==e.groupName?e.groupName:e.queryName}function r(e){var t=o(e);return null!=t&&t.imageUrl===!0}function n(e){var t=o(e);return null!=t&&t.webUrl===!0}function o(e){return e&&e.type&&e.type.misc}function s(e){return e&&e.metadata&&e.metadata.columns&&e.metadata.columns.length?e.metadata.columns.some(function(e){return r(e)===!0}):!1}e.categoryIsAlsoSeriesRole=t,e.getSeriesName=i,e.isImageUrlColumn=r,e.isWebUrlColumn=n,e.getMiscellaneousTypeDescriptor=o,e.hasImageUrlColumn=s}(i=t.converterHelper||(t.converterHelper={}))}(i=t.dataview||(t.dataview={}))}(i=t.utils||(t.utils={}))}(t=e.extensibility||(e.extensibility={}))}(powerbi||(powerbi={}));var powerbi;!function(e){var t;!function(e){var t;!function(e){var t;!function(e){var t=function(){function t(){}return t.getDefault=function(){return new this},t.createPropertyIdentifier=function(e,t){return{objectName:e,propertyName:t}},t.parse=function(t){var i,a=this.getDefault();if(!t||!t.metadata||!t.metadata.objects)return a;i=a.getProperties();for(var r in i)for(var n in i[r]){var o=a[r][n];a[r][n]=e.DataViewObjects.getCommonValue(t.metadata.objects,i[r][n],o)}return a},t.isPropertyEnumerable=function(e){return!t.InnumerablePropertyPrefix.test(e)},t.enumerateObjectInstances=function(e,t){var i=e&&e[t.objectName];if(!i)return[];var a={objectName:t.objectName,selector:null,properties:{}};for(var r in i)i.hasOwnProperty(r)&&(a.properties[r]=i[r]);return{instances:[a]}},t.prototype.getProperties=function(){var e=this,i={},a=Object.keys(this);return a.forEach(function(a){if(t.isPropertyEnumerable(a)){var r=Object.keys(e[a]);i[a]={},r.forEach(function(e){t.isPropertyEnumerable(a)&&(i[a][e]=t.createPropertyIdentifier(a,e))})}}),i},t}();t.InnumerablePropertyPrefix=/^_/,e.DataViewObjectsParser=t}(t=e.dataview||(e.dataview={}))}(t=e.utils||(e.utils={}))}(t=e.extensibility||(e.extensibility={}))}(powerbi||(powerbi={}));var __extends=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i])};return function(t,i){function a(){this.constructor=t}e(t,i),t.prototype=null===i?Object.create(i):(a.prototype=i.prototype,new a)}}(),powerbi;!function(e){var t;!function(t){var i;!function(t){var i;!function(t){"use strict";var i=e.extensibility.utils.dataview.DataViewObjectsParser,a=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.visualOptions=new o,t}return __extends(t,e),t}(i);t.VisualSettings=a;var r;!function(e){e[e["default"]="helvetica, arial, sans-serif"]="default",e[e.arial="Arial"]="arial",e[e.arialBlack='"Arial Black"']="arialBlack",e[e.arialUnicodeMS='"Arial Unicode MS"']="arialUnicodeMS",e[e.calibri="Calibri"]="calibri",e[e.cambria="Cambria"]="cambria",e[e.cambriaMath='"Cambria Math"']="cambriaMath",e[e.candara="Candara"]="candara",e[e.comicSansMS='"Comic Sans MS"']="comicSansMS",e[e.consolas="Consolas"]="consolas",e[e.constantia="Constantia"]="constantia",e[e.corbel="Corbel"]="corbel",e[e.corbelNew='"Courier New"']="corbelNew",e[e.georgia="Georgia"]="georgia",e[e.lucidaSansUnicode='"Lucida Sans Unicode"']="lucidaSansUnicode",e[e.segoeUIBold='"Segoe UI Bold", wf_segoe-ui_bold, helvetica, arial, sans-serif']="segoeUIBold",e[e.segoeUI='"Segoe UI", wf_segoe-ui_normal, helvetica, arial, sans-serif']="segoeUI",e[e.segoeUILight='"Segoe UI Light", wf_segoe-ui_bold, helvetica, arial, sans-serif']="segoeUILight",e[e.symbol="Symbol"]="symbol",e[e.tahoma="Tahoma"]="tahoma",e[e.timesNewRoman='"Times New Roman"']="timesNewRoman",e[e.trebuchetMS='"Trebuchet MS"']="trebuchetMS",e[e.verdana="Verdana"]="verdana",e[e.wingdings="Wingdings"]="wingdings"}(r=t.kpiFontFamilyOptions||(t.kpiFontFamilyOptions={}));var n;!function(e){e[e.top="top"]="top",e[e.middle="middle"]="middle",e[e.bottom="bottom"]="bottom"}(n=t.alignOptions||(t.alignOptions={}));var o=function(){function e(){this.urlImgOk="",this.urlImgKo="",this.koPercentValue=.5,this.showTrendLine=!0,this.widthTrendLine=5,this.kpiFontWeight=1,this.kpiColor="#000000",this.kpifontFamily=r["default"],this.kpiTransparency=1,this.kpiVerticalAlign=n.middle,this.serieColorOk="#008000",this.serieColorKo="#FF0000",this.serieColorNeutral="#C0C0C0",this.seriesTransparency=.4}return e}();t.visualOptions=o}(i=t.kPImg0051F6D5AD8348148E01E9E4B31C9F41_DEBUG||(t.kPImg0051F6D5AD8348148E01E9E4B31C9F41_DEBUG={}))}(i=t.visual||(t.visual={}))}(t=e.extensibility||(e.extensibility={}))}(powerbi||(powerbi={}));var powerbi;!function(e){var t;!function(e){var t;!function(e){var t;!function(e){"use strict";var t=function(){function e(){}return e}();e.myElementSerie=t;var i=function(){function i(e){this.target=e.element;var t=document.createElement("canvas");this.target.appendChild(t)}return i.prototype.update=function(e){this.settings=i.parseSettings(e&&e.dataViews&&e.dataViews[0]);var a=!1,r=!1,n=!1;e&&e.dataViews&&e.dataViews[0]&&e.dataViews[0].categorical.categories&&(n=!0),e&&e.dataViews&&e.dataViews[0]&&e.dataViews[0].categorical.values&&(2==e.dataViews[0].categorical.values.length?(a=!0,r=!0):1==e.dataViews[0].categorical.values.length&&(e.dataViews[0].categorical.values[0].source.roles.value?a=!0:r=!0));var o=0,s=0,l=new Array;if(r&&a)if(n){var u,c;e.dataViews[0].categorical.values[0].source.roles.value?(u=e.dataViews[0].categorical.values[0].minLocal,c=e.dataViews[0].categorical.values[0].maxLocal):(u=e.dataViews[0].categorical.values[1].minLocal,c=e.dataViews[0].categorical.values[1].maxLocal);for(var v=0;v<e.dataViews[0].categorical.categories[0].values.length;v++){var g=new t;g.name=e.dataViews[0].categorical.categories[0].values[v].valueOf().toString(),g.value=parseFloat(e.dataViews[0].categorical.values[0].values[v].valueOf().toString()),g.target=parseFloat(e.dataViews[0].categorical.values[1].values[v].valueOf().toString()),g.percent=0,c-u!=0?g.percent=(g.value-u)/(c-u):g.percent=.5,g.realPercent=g.percent,g.percent>1&&(g.percent=1),g.percent<0&&(g.percent=0),l.push(g),o+=g.value,s+=g.target}}else o=parseFloat(e.dataViews[0].categorical.values[0].values[0].valueOf().toString()),s=parseFloat(e.dataViews[0].categorical.values[1].values[0].valueOf().toString());var f=document.createElement("img");if(this.settings.visualOptions.urlImgOk&&this.settings.visualOptions.urlImgKo&&this.settings.visualOptions.koPercentValue&&a&&r){var p="";if(0==s||0==o)p=this.settings.visualOptions.urlImgKo.valueOf().toString();else{var h=o/s;p=h>=this.settings.visualOptions.koPercentValue?this.settings.visualOptions.urlImgOk.valueOf().toString():this.settings.visualOptions.urlImgKo.valueOf().toString()}f.setAttribute("src",p)}else f.setAttribute("src","data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=");f.onload=function(e){return function(){var t=document.getElementsByTagName("canvas").item(0),i=t.getContext("2d");if(i.drawImage(f,0,0,t.width,t.height),a&&r){var n=0;0!=s&&(n=o/s);var u=(100*n).toFixed(2)+"%";i.textAlign="center";var c=t.height;c>t.width&&(c=t.height);var v=c;i.font=v.toString()+"px sans-serif";for(var g=i.measureText(u).width;g>t.width;)v--,i.font=v.toString()+"px "+e.visualOptions.kpifontFamily.valueOf().toString(),g=i.measureText(u).width;var p=e.visualOptions.kpiFontWeight;if(0>p?p=0:p>1&&(p=1),p*=v,i.font=p.toString()+"px "+e.visualOptions.kpifontFamily.valueOf().toString(),l.length>0){if(i.beginPath(),i.moveTo(0,t.height),i.lineWidth=1,i.fillStyle=e.visualOptions.serieColorNeutral.valueOf().toString(),1==l.length)i.lineTo(0,t.height-l[0].percent*t.height),i.lineTo(t.width,t.height-l[1].percent*t.height);else for(var h=0;h<l.length;h++)i.lineTo(h*t.width/(l.length-1),t.height-l[h].percent*t.height);if(i.lineTo(t.width,t.height),i.globalAlpha=parseFloat(e.visualOptions.seriesTransparency.valueOf().toString()),i.closePath(),i.stroke(),l.length>1){for(var d=0,m=0,w=0,b=0,O=l.length,y=0;y<l.length;y++){var S=y*(t.width/l.length),V=l[y].realPercent;d+=V,m+=S,w+=S*V,b+=S*S}var A=m/O,C=d/O,k=(w-O*A*C)/(b-O*A*A);this.bRegressionLine=k,this.aRegressionLine=C-this.bRegressionLine*A,e.visualOptions.showTrendLine||(i.fillStyle=e.visualOptions.serieColorOk.valueOf().toString(),0>k&&(i.fillStyle=e.visualOptions.serieColorKo.valueOf().toString())),i.fill()}this.bRegressionLine&&e.visualOptions.showTrendLine&&(i.beginPath(),i.lineWidth=e.visualOptions.widthTrendLine,i.globalAlpha=parseFloat(e.visualOptions.seriesTransparency.valueOf().toString()),i.strokeStyle=e.visualOptions.serieColorNeutral.valueOf().toString(),this.bRegressionLine>0&&(i.strokeStyle=e.visualOptions.serieColorOk.valueOf().toString()),this.bRegressionLine<0&&(i.strokeStyle=e.visualOptions.serieColorKo.valueOf().toString()),i.moveTo(0,t.height*(1-this.aRegressionLine)),i.lineTo(t.width,t.height*(1-this.bRegressionLine*t.width-this.aRegressionLine)),i.closePath(),i.stroke(),i.fill(),i.strokeStyle=e.visualOptions.serieColorNeutral.valueOf().toString())}var x=t.height/2+p/4;i.fillStyle=e.visualOptions.kpiColor.valueOf().toString(),i.globalAlpha=parseFloat(e.visualOptions.kpiTransparency.valueOf().toString()),"middle"==e.visualOptions.kpiVerticalAlign.valueOf().toString()?i.fillText(u,t.width/2,x):"top"==e.visualOptions.kpiVerticalAlign.valueOf().toString()?i.fillText(u,t.width/2,p/1.3):"bottom"==e.visualOptions.kpiVerticalAlign.valueOf().toString()?i.fillText(u,t.width/2,t.height-5):i.fillText(u,t.width/2,x)}}}(this.settings);var d=this.target.getElementsByTagName("canvas").item(0);d.height=this.target.offsetHeight,d.width=this.target.offsetWidth;d.getContext("2d")},i.parseSettings=function(t){return e.VisualSettings.parse(t)},i.prototype.enumerateObjectInstances=function(t){return e.VisualSettings.enumerateObjectInstances(this.settings||e.VisualSettings.getDefault(),t)},i}();e.Visual=i}(t=e.kPImg0051F6D5AD8348148E01E9E4B31C9F41_DEBUG||(e.kPImg0051F6D5AD8348148E01E9E4B31C9F41_DEBUG={}))}(t=e.visual||(e.visual={}))}(t=e.extensibility||(e.extensibility={}))}(powerbi||(powerbi={}));var powerbi;!function(e){var t;!function(t){var i;!function(t){t.kPImg0051F6D5AD8348148E01E9E4B31C9F41_DEBUG={name:"kPImg0051F6D5AD8348148E01E9E4B31C9F41_DEBUG",displayName:"KPImg","class":"Visual",version:"1.0.2",apiVersion:"2.2.0",create:function(t){return new e.extensibility.visual.kPImg0051F6D5AD8348148E01E9E4B31C9F41_DEBUG.Visual(t)},custom:!0}}(i=t.plugins||(t.plugins={}))}(t=e.visuals||(e.visuals={}))}(powerbi||(powerbi={}));