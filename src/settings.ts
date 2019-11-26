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
      public visualOptions: visualOptions = new visualOptions();
      }
    

    export enum localeValues {
      arabic = "ar-SA" as any // Arabic (Saudi Arabia)
      , bangladesh = "bn-BD" as any // Bangla (Bangladesh)
      , india = "bn-IN" as any // Bangla (India)
      , czech = "cs-CZ" as any // Czech (Czech Republic)
      , denmark = "da-DK" as any // Danish (Denmark)
      , german = "de-AT" as any // Austrian German
      , swiss = "de-CH" as any // "Swiss" German
      , standardGerman = "de-DE" as any // Standard German (as spoken in Germany)
      , greek = "el-GR" as any //Modern Greek
      , australian = "en-AU" as any // Australian English
      , canadian = "en-CA" as any // Canadian English
      , british = "en-GB" as any // British English
      , irish = "en-IE" as any // Irish English
      , indian = "en-IN" as any // Indian English
      , newZealand = "en-NZ" as any // New Zealand English
      , usEnglish = "en-US" as any // US English
      , southAfrica = "en-ZA" as any // English (South Africa)
      , argentine = "es-AR" as any // Argentine Spanish
      , chilean = "es-CL" as any // Chilean Spanish
      , colombian = "es-CO" as any // Colombian Spanish
      , spanish = "es-ES" as any // Castilian Spanish (as spoken in Central-Northern Spain)
      , mexican = "es-MX" as any // Mexican Spanish
      , americanSpanish = "es-US" as any // American Spanish
      , finland = "fi-FI" as any // Finnish (Finland)
      , belgian = "fr-BE" as any // Belgian French
      , canadianFrench = "fr-CA" as any // Canadian French
      , swissFrench = "fr-CH" as any // "Swiss" French
      , french = "fr-FR" as any // Standard French (especially in France)
      , israel = "he-IL" as any // Hebrew (Israel)
      , hindi = "hi-IN" as any // Hindi (India)
      , hungarian = "hu-HU" as any // Hungarian (Hungary)
      , indonesian = "id-ID" as any // Indonesian (Indonesia)
      , italianSwiss = "it-CH" as any // "Swiss" Italian
      , italian = "it-IT" as any // Standard Italian (as spoken in Italy)
      , japanese = "jp-JP" as any // Japanese (Japan)
      , korean = "ko-KR" as any // Korean (Republic of Korea)
      , belgianDutch = "nl-BE" as any // Belgian Dutch
      , dutch = "nl-NL" as any // Standard Dutch (as spoken in The Netherlands)
      , norwegian = "no-NO" as any // Norwegian (Norway)
      , polish = "pl-PL" as any // Polish (Poland)
      , brazilianPortuguese = "pt-BR" as any // Brazilian Portuguese
      , portuguese = "pt-PT" as any // European Portuguese (as written and spoken in Portugal)
      , romanian = "ro-RO" as any // Romanian (Romania)
      , russian = "ru-RU" as any // Russian (Russian Federation)
      , slovak = "sk-SK" as any // Slovak (Slovakia)
      , swedish = "sv-SE" as any // Swedish (Sweden)
      , indianTamil = "ta-IN" as any // Indian Tamil
      , sriLankan = "ta-LK" as any // Sri Lankan Tamil
      , thai = "th-TH" as any // Thai (Thailand)
      , turkish = "tr-TR" as any // Turkish (Turkey)
      , mainlandChina = "zh-CN" as any // Mainland China, simplified characters
      , hongKong = "zh-HK" as any // Hong Kong, traditional characters
      , taiwan = "zh-TW" as any // Taiwan, traditional characters
    }

     export enum kpiFontFamilyOptions {
       default = "helvetica, arial, sans-serif" as any
       , arial = "Arial" as any
       , arialBlack = "\"Arial Black\"" as any
       , arialUnicodeMS = "\"Arial Unicode MS\"" as any
       , calibri = "Calibri" as any
       , cambria = "Cambria" as any
       , cambriaMath = "\"Cambria Math\"" as any
       , candara = "Candara" as any
       , comicSansMS = "\"Comic Sans MS\"" as any
       , consolas = "Consolas" as any
       , constantia = "Constantia" as any
       , corbel = "Corbel" as any
       , corbelNew = "\"Courier New\"" as any
       , georgia = "Georgia" as any
       , lucidaSansUnicode = "\"Lucida Sans Unicode\"" as any
       , segoeUIBold = "\"Segoe UI Bold\", wf_segoe-ui_bold, helvetica, arial, sans-serif" as any
       , segoeUI = "\"Segoe UI\", wf_segoe-ui_normal, helvetica, arial, sans-serif" as any
       , segoeUILight = "\"Segoe UI Light\", wf_segoe-ui_bold, helvetica, arial, sans-serif" as any
       , symbol = "Symbol" as any
       , tahoma = "Tahoma" as any
       , timesNewRoman = "\"Times New Roman\"" as any
       , trebuchetMS = "\"Trebuchet MS\"" as any
       , verdana = "Verdana" as any
       , wingdings = "Wingdings" as any
       

     }
     export enum alignOptions {
      top = "top" as any
      , middle = "middle" as any
      , bottom = "bottom" as any
      
    }
    export enum showModes {
      comp = "comp" as any
      , indi = "indi" as any
      , both = "both" as any
    }

    export enum formatIndicators {
      auto = "auto" as any
      , none = "none" as any
      , k = "k" as any
      , M = "M" as any
      , B = "B" as any
      , kB = "kB" as any
    }

     export class visualOptions {
       public urlImgOk: string="";
       public urlImgKo: string="";
       /*
       public urlImgOk: string="https://s5.eestatic.com/2017/10/10/espana/Espana_253238302_49941798_1706x960.jpg";
       public urlImgKo: string="https://s4.eestatic.com/2017/10/10/espana/Espana_253237967_49932740_1706x960.jpg";
       */
       public koPercentValue: number=0.5;
       public showTrendLine: boolean=true;
       public showMode: showModes = showModes.both;
       public formatIndicator: formatIndicators = formatIndicators.auto;
       public widthTrendLine: number=5;
       
       public kpiFontWeight:number=1;
       public kpiFontWeightTarget:number=1;
       //public valueLocale:string="en-US";
       public valueLocale : localeValues = localeValues.usEnglish;
       public numberDecimals:number=2;
       public kpiColor: string = "#000000";
       public kpiColorTarget: string = "#000000";
       public kpifontFamily: kpiFontFamilyOptions = kpiFontFamilyOptions.default;
       public kpiTransparency: number=1;
       public kpiVerticalAlign: alignOptions=alignOptions.middle;
       public serieColorOk: string="#008000";
       public serieColorKo: string="#FF0000";
       public serieColorNeutral: string="#C0C0C0";
       public seriesTransparency: number=0.4;
     }

}
