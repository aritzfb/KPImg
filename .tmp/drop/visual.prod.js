var powerbi;!function(e){var t;!function(e){var t;!function(e){var t;!function(e){var t;!function(e){function t(e,t,a){void 0===e&&(e=[]);var n=e;return i(n),t&&(n.identityFields=t),a&&(n.source=a),n}function i(e,t){e.grouped=t?function(){return t}:function(){return a(e)}}function a(e){for(var t,i=[],a=0,n=e.length;n>a;a++){var r=e[a];if(!t||t.identity!==r.identity){if(t={values:[]},r.identity){t.identity=r.identity;var o=r.source;void 0!==o.groupName?t.name=o.groupName:o.displayName&&(t.name=o.displayName)}i.push(t)}t.values.push(r)}return i}e.createValueColumns=t,e.setGrouped=i,e.groupValues=a}(t=e.DataViewTransform||(e.DataViewTransform={}))}(t=e.dataview||(e.dataview={}))}(t=e.utils||(e.utils={}))}(t=e.extensibility||(e.extensibility={}))}(powerbi||(powerbi={}));var powerbi;!function(e){var t;!function(e){var t;!function(e){var t;!function(e){var t;!function(e){function t(e,t){if(!e||!e.length)return-1;var i=e[0];if(i.values&&i.values.length>0)for(var n=0,r=i.values.length;r>n;++n){var o=i.values[n];if(o&&o.source&&a(o.source,t))return n}return-1}function i(e,t){if(e&&e.length)for(var i=0,n=e.length;n>i;i++)if(a(e[i].source,t))return i;return-1}function a(e,t){var i=e.roles;return i&&i[t]}function n(e,t){return null!=e&&null!=e.metadata&&e.metadata.columns&&e.metadata.columns.some(function(e){return e.roles&&void 0!==e.roles[t]})}function r(e,t){return e&&e.source&&e.source.roles&&e.source.roles[t]===!0}e.getMeasureIndexOfRole=t,e.getCategoryIndexOfRole=i,e.hasRole=a,e.hasRoleInDataView=n,e.hasRoleInValueColumn=r}(t=e.DataRoleHelper||(e.DataRoleHelper={}))}(t=e.dataview||(e.dataview={}))}(t=e.utils||(e.utils={}))}(t=e.extensibility||(e.extensibility={}))}(powerbi||(powerbi={}));var powerbi;!function(e){var t;!function(e){var t;!function(e){var t;!function(e){var t;!function(e){function t(e,t,i){if(!e)return i;var a=e[t];return void 0===a?i:a}function i(e,i,a){var n=t(e,i);return n&&n.solid?n.solid.color:a}e.getValue=t,e.getFillColorByPropertyName=i}(t=e.DataViewObject||(e.DataViewObject={}))}(t=e.dataview||(e.dataview={}))}(t=e.utils||(e.utils={}))}(t=e.extensibility||(e.extensibility={}))}(powerbi||(powerbi={}));var powerbi;!function(e){var t;!function(e){var t;!function(e){var t;!function(e){var t;!function(t){function i(t,i,a){return t?e.DataViewObject.getValue(t[i.objectName],i.propertyName,a):a}function a(e,t,i){return e&&e[t]?e[t]:i}function n(e,t,a){var n=i(e,t);return n&&n.solid?n.solid.color:a}function r(e,t,a){var n=i(e,t,a);return n&&n.solid?n.solid.color:void 0===n||null===n||"object"==typeof n&&!n.solid?a:n}t.getValue=i,t.getObject=a,t.getFillColor=n,t.getCommonValue=r}(t=e.DataViewObjects||(e.DataViewObjects={}))}(t=e.dataview||(e.dataview={}))}(t=e.utils||(e.utils={}))}(t=e.extensibility||(e.extensibility={}))}(powerbi||(powerbi={}));var powerbi;!function(e){var t;!function(t){var i;!function(t){var i;!function(t){var i,a=e.extensibility.utils.dataview.DataRoleHelper;!function(e){function t(e,t,i){if(e.categories&&e.categories.length>0){var n=e.categories[0];return n.source&&a.hasRole(n.source,t)&&a.hasRole(n.source,i)}return!1}function i(e){return void 0!==e.groupName?e.groupName:e.queryName}function n(e){var t=o(e);return null!=t&&t.imageUrl===!0}function r(e){var t=o(e);return null!=t&&t.webUrl===!0}function o(e){return e&&e.type&&e.type.misc}function s(e){return e&&e.metadata&&e.metadata.columns&&e.metadata.columns.length?e.metadata.columns.some(function(e){return n(e)===!0}):!1}e.categoryIsAlsoSeriesRole=t,e.getSeriesName=i,e.isImageUrlColumn=n,e.isWebUrlColumn=r,e.getMiscellaneousTypeDescriptor=o,e.hasImageUrlColumn=s}(i=t.converterHelper||(t.converterHelper={}))}(i=t.dataview||(t.dataview={}))}(i=t.utils||(t.utils={}))}(t=e.extensibility||(e.extensibility={}))}(powerbi||(powerbi={}));var powerbi;!function(e){var t;!function(e){var t;!function(e){var t;!function(e){var t=function(){function t(){}return t.getDefault=function(){return new this},t.createPropertyIdentifier=function(e,t){return{objectName:e,propertyName:t}},t.parse=function(t){var i,a=this.getDefault();if(!t||!t.metadata||!t.metadata.objects)return a;i=a.getProperties();for(var n in i)for(var r in i[n]){var o=a[n][r];a[n][r]=e.DataViewObjects.getCommonValue(t.metadata.objects,i[n][r],o)}return a},t.isPropertyEnumerable=function(e){return!t.InnumerablePropertyPrefix.test(e)},t.enumerateObjectInstances=function(e,t){var i=e&&e[t.objectName];if(!i)return[];var a={objectName:t.objectName,selector:null,properties:{}};for(var n in i)i.hasOwnProperty(n)&&(a.properties[n]=i[n]);return{instances:[a]}},t.prototype.getProperties=function(){var e=this,i={},a=Object.keys(this);return a.forEach(function(a){if(t.isPropertyEnumerable(a)){var n=Object.keys(e[a]);i[a]={},n.forEach(function(e){t.isPropertyEnumerable(a)&&(i[a][e]=t.createPropertyIdentifier(a,e))})}}),i},t}();t.InnumerablePropertyPrefix=/^_/,e.DataViewObjectsParser=t}(t=e.dataview||(e.dataview={}))}(t=e.utils||(e.utils={}))}(t=e.extensibility||(e.extensibility={}))}(powerbi||(powerbi={}));var __extends=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i])};return function(t,i){function a(){this.constructor=t}e(t,i),t.prototype=null===i?Object.create(i):(a.prototype=i.prototype,new a)}}(),powerbi;!function(e){var t;!function(t){var i;!function(t){var i;!function(t){"use strict";var i=e.extensibility.utils.dataview.DataViewObjectsParser,a=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.visualOptions=new o,t}return __extends(t,e),t}(i);t.VisualSettings=a;var n;!function(e){e[e["default"]="helvetica, arial, sans-serif"]="default",e[e.arial="Arial"]="arial",e[e.arialBlack='"Arial Black"']="arialBlack",e[e.arialUnicodeMS='"Arial Unicode MS"']="arialUnicodeMS",e[e.calibri="Calibri"]="calibri",e[e.cambria="Cambria"]="cambria",e[e.cambriaMath='"Cambria Math"']="cambriaMath",e[e.candara="Candara"]="candara",e[e.comicSansMS='"Comic Sans MS"']="comicSansMS",e[e.consolas="Consolas"]="consolas",e[e.constantia="Constantia"]="constantia",e[e.corbel="Corbel"]="corbel",e[e.corbelNew='"Courier New"']="corbelNew",e[e.georgia="Georgia"]="georgia",e[e.lucidaSansUnicode='"Lucida Sans Unicode"']="lucidaSansUnicode",e[e.segoeUIBold='"Segoe UI Bold", wf_segoe-ui_bold, helvetica, arial, sans-serif']="segoeUIBold",e[e.segoeUI='"Segoe UI", wf_segoe-ui_normal, helvetica, arial, sans-serif']="segoeUI",e[e.segoeUILight='"Segoe UI Light", wf_segoe-ui_bold, helvetica, arial, sans-serif']="segoeUILight",e[e.symbol="Symbol"]="symbol",e[e.tahoma="Tahoma"]="tahoma",e[e.timesNewRoman='"Times New Roman"']="timesNewRoman",e[e.trebuchetMS='"Trebuchet MS"']="trebuchetMS",e[e.verdana="Verdana"]="verdana",e[e.wingdings="Wingdings"]="wingdings"}(n=t.kpiFontFamilyOptions||(t.kpiFontFamilyOptions={}));var r;!function(e){e[e.top="top"]="top",e[e.middle="middle"]="middle",e[e.bottom="bottom"]="bottom"}(r=t.alignOptions||(t.alignOptions={}));var o=function(){function e(){this.urlImgOk="",this.urlImgKo="",this.koPercentValue=.5,this.showTrendLine=!0,this.widthTrendLine=5,this.kpiFontWeight=1,this.valueLocale="en-US",this.numberDecimals=2,this.kpiColor="#000000",this.kpifontFamily=n["default"],this.kpiTransparency=1,this.kpiVerticalAlign=r.middle,this.serieColorOk="#008000",this.serieColorKo="#FF0000",this.serieColorNeutral="#C0C0C0",this.seriesTransparency=.4}return e}();t.visualOptions=o}(i=t.kPImg0051F6D5AD8348148E01E9E4B31C9F41_DEBUG||(t.kPImg0051F6D5AD8348148E01E9E4B31C9F41_DEBUG={}))}(i=t.visual||(t.visual={}))}(t=e.extensibility||(e.extensibility={}))}(powerbi||(powerbi={}));var powerbi;!function(e){var t;!function(e){var t;!function(e){var t;!function(e){"use strict";var t=function(){function e(){}return e}();e.myElementSerie=t;var i=function(){function i(e){this.target=e.element;var t=document.createElement("canvas");this.target.appendChild(t),this.host=e.host}return i.prototype.update=function(e){this.settings=i.parseSettings(e&&e.dataViews&&e.dataViews[0]);var a,n,r=!1,o=!1,s=!1;e&&e.dataViews&&e.dataViews[0]&&e.dataViews[0].categorical.categories&&(s=!0),e&&e.dataViews&&e.dataViews[0]&&e.dataViews[0].categorical.values&&(2==e.dataViews[0].categorical.values.length?(r=!0,o=!0,e.dataViews[0].categorical.values[0].source.roles.value?(a=0,n=1):(a=1,n=0)):1==e.dataViews[0].categorical.values.length&&(e.dataViews[0].categorical.values[0].source.roles.value?(r=!0,a=0):(o=!0,n=0)));var l=0,u=0,c=new Array;if(r)if(s){var v,g;v=e.dataViews[0].categorical.values[a].minLocal,g=e.dataViews[0].categorical.values[a].maxLocal;for(var f=0;f<e.dataViews[0].categorical.categories[0].values.length;f++){var p=new t;p.name=e.dataViews[0].categorical.categories[0].values[f].valueOf().toString(),p.value=parseFloat(e.dataViews[0].categorical.values[0].values[f].valueOf().toString()),o&&(p.target=parseFloat(e.dataViews[0].categorical.values[1].values[f].valueOf().toString())),p.percent=0,g-v!=0?p.percent=(p.value-v)/(g-v):p.percent=.5,p.realPercent=p.percent,p.percent>1&&(p.percent=1),p.percent<0&&(p.percent=0),c.push(p),l+=p.value,o&&(u+=p.target)}}else l=parseFloat(e.dataViews[0].categorical.values[a].values[0].valueOf().toString()),o&&(u=parseFloat(e.dataViews[0].categorical.values[n].values[0].valueOf().toString()));var h=document.createElement("img");if(this.settings.visualOptions.urlImgOk&&this.settings.visualOptions.urlImgKo&&this.settings.visualOptions.koPercentValue&&r&&o){var d="";if(0==u||0==l)d=this.settings.visualOptions.urlImgKo.valueOf().toString();else{var m;m=o?l/u:l,d=m>=this.settings.visualOptions.koPercentValue?this.settings.visualOptions.urlImgOk.valueOf().toString():this.settings.visualOptions.urlImgKo.valueOf().toString()}h.setAttribute("src",d)}else h.setAttribute("src","data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=");h.onload=function(e){return function(){function t(e,t,i){var a=e.getContext("2d"),n=e.height;e.width>n&&(n=e.width);var r=n;a.font=r.toString()+"px "+i;for(var o=a.measureText(t).width;o>e.width;)r--,a.font=r.toString()+"px "+i,o=a.measureText(t).width;return r}var i=document.getElementsByTagName("canvas").item(0),a=i.getContext("2d");if(a.drawImage(h,0,0,i.width,i.height),r){var n=0;n=0!=u?l/u:l;var o=parseFloat(l.toFixed(e.visualOptions.numberDecimals)).toLocaleString(e.visualOptions.valueLocale.toString());0!=u&&(o=(100*n).toFixed(e.visualOptions.numberDecimals)+"%"),a.textAlign="center";var s=t(i,o,e.visualOptions.kpifontFamily.valueOf().toString()),v=e.visualOptions.kpiFontWeight;if(0>v?v=0:v>1&&(v=1),v*=s,a.font=v.toString()+"px "+e.visualOptions.kpifontFamily.valueOf().toString(),c.length>0){if(a.beginPath(),a.moveTo(0,i.height),a.lineWidth=1,a.fillStyle=e.visualOptions.serieColorNeutral.valueOf().toString(),1==c.length)a.lineTo(0,i.height-c[0].percent*i.height),a.lineTo(i.width,i.height-c[1].percent*i.height);else for(var g=0;g<c.length;g++)a.lineTo(g*i.width/(c.length-1),i.height-c[g].percent*i.height);if(a.lineTo(i.width,i.height),a.globalAlpha=parseFloat(e.visualOptions.seriesTransparency.valueOf().toString()),a.closePath(),a.stroke(),c.length>1){for(var f=0,p=0,d=0,m=0,b=c.length,w=0;w<c.length;w++){var O=w*(i.width/c.length),y=c[w].realPercent;f+=y,p+=O,d+=O*y,m+=O*O}var S=p/b,V=f/b,A=(d-b*S*V)/(m-b*S*S);this.bRegressionLine=A,this.aRegressionLine=V-this.bRegressionLine*S,e.visualOptions.showTrendLine||(a.fillStyle=e.visualOptions.serieColorOk.valueOf().toString(),0>A&&(a.fillStyle=e.visualOptions.serieColorKo.valueOf().toString())),a.fill()}this.bRegressionLine&&e.visualOptions.showTrendLine&&(a.beginPath(),a.lineWidth=e.visualOptions.widthTrendLine,a.globalAlpha=parseFloat(e.visualOptions.seriesTransparency.valueOf().toString()),a.strokeStyle=e.visualOptions.serieColorNeutral.valueOf().toString(),this.bRegressionLine>0&&(a.strokeStyle=e.visualOptions.serieColorOk.valueOf().toString()),this.bRegressionLine<0&&(a.strokeStyle=e.visualOptions.serieColorKo.valueOf().toString()),a.moveTo(0,i.height*(1-this.aRegressionLine)),a.lineTo(i.width,i.height*(1-this.bRegressionLine*i.width-this.aRegressionLine)),a.closePath(),a.stroke(),a.fill(),a.strokeStyle=e.visualOptions.serieColorNeutral.valueOf().toString())}var C=i.height/2+v/4;a.fillStyle=e.visualOptions.kpiColor.valueOf().toString(),a.globalAlpha=parseFloat(e.visualOptions.kpiTransparency.valueOf().toString()),"middle"==e.visualOptions.kpiVerticalAlign.valueOf().toString()?a.fillText(o,i.width/2,C):"top"==e.visualOptions.kpiVerticalAlign.valueOf().toString()?a.fillText(o,i.width/2,v/1.3):"bottom"==e.visualOptions.kpiVerticalAlign.valueOf().toString()?a.fillText(o,i.width/2,i.height-5):a.fillText(o,i.width/2,C)}}}(this.settings);var b=this.target.getElementsByTagName("canvas").item(0);b.height=this.target.offsetHeight,b.width=this.target.offsetWidth;b.getContext("2d")},i.parseSettings=function(t){return e.VisualSettings.parse(t)},i.prototype.enumerateObjectInstances=function(t){return e.VisualSettings.enumerateObjectInstances(this.settings||e.VisualSettings.getDefault(),t)},i}();e.Visual=i}(t=e.kPImg0051F6D5AD8348148E01E9E4B31C9F41_DEBUG||(e.kPImg0051F6D5AD8348148E01E9E4B31C9F41_DEBUG={}))}(t=e.visual||(e.visual={}))}(t=e.extensibility||(e.extensibility={}))}(powerbi||(powerbi={}));var powerbi;!function(e){var t;!function(t){var i;!function(t){t.kPImg0051F6D5AD8348148E01E9E4B31C9F41_DEBUG={name:"kPImg0051F6D5AD8348148E01E9E4B31C9F41_DEBUG",displayName:"KPImg","class":"Visual",version:"1.0.2",apiVersion:"2.2.0",create:function(t){return new e.extensibility.visual.kPImg0051F6D5AD8348148E01E9E4B31C9F41_DEBUG.Visual(t)},custom:!0}}(i=t.plugins||(t.plugins={}))}(t=e.visuals||(e.visuals={}))}(powerbi||(powerbi={}));