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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var utils;
        (function (utils) {
            var dataview;
            (function (dataview) {
                // TODO: refactor & focus DataViewTransform into a service with well-defined dependencies.
                var DataViewTransform;
                (function (DataViewTransform) {
                    // TODO: refactor this, setGrouped, and groupValues to a test helper to stop using it in the product
                    function createValueColumns(values, valueIdentityFields, source) {
                        if (values === void 0) { values = []; }
                        var result = values;
                        setGrouped(result);
                        if (valueIdentityFields) {
                            result.identityFields = valueIdentityFields;
                        }
                        if (source) {
                            result.source = source;
                        }
                        return result;
                    }
                    DataViewTransform.createValueColumns = createValueColumns;
                    function setGrouped(values, groupedResult) {
                        values.grouped = groupedResult
                            ? function () { return groupedResult; }
                            : function () { return groupValues(values); };
                    }
                    DataViewTransform.setGrouped = setGrouped;
                    /** Group together the values with a common identity. */
                    function groupValues(values) {
                        var groups = [], currentGroup;
                        for (var i = 0, len = values.length; i < len; i++) {
                            var value = values[i];
                            if (!currentGroup || currentGroup.identity !== value.identity) {
                                currentGroup = {
                                    values: []
                                };
                                if (value.identity) {
                                    currentGroup.identity = value.identity;
                                    var source = value.source;
                                    // allow null, which will be formatted as (Blank).
                                    if (source.groupName !== undefined) {
                                        currentGroup.name = source.groupName;
                                    }
                                    else if (source.displayName) {
                                        currentGroup.name = source.displayName;
                                    }
                                }
                                groups.push(currentGroup);
                            }
                            currentGroup.values.push(value);
                        }
                        return groups;
                    }
                    DataViewTransform.groupValues = groupValues;
                })(DataViewTransform = dataview.DataViewTransform || (dataview.DataViewTransform = {}));
            })(dataview = utils.dataview || (utils.dataview = {}));
        })(utils = extensibility.utils || (extensibility.utils = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var utils;
        (function (utils) {
            var dataview;
            (function (dataview) {
                var DataRoleHelper;
                (function (DataRoleHelper) {
                    function getMeasureIndexOfRole(grouped, roleName) {
                        if (!grouped || !grouped.length) {
                            return -1;
                        }
                        var firstGroup = grouped[0];
                        if (firstGroup.values && firstGroup.values.length > 0) {
                            for (var i = 0, len = firstGroup.values.length; i < len; ++i) {
                                var value = firstGroup.values[i];
                                if (value && value.source) {
                                    if (hasRole(value.source, roleName)) {
                                        return i;
                                    }
                                }
                            }
                        }
                        return -1;
                    }
                    DataRoleHelper.getMeasureIndexOfRole = getMeasureIndexOfRole;
                    function getCategoryIndexOfRole(categories, roleName) {
                        if (categories && categories.length) {
                            for (var i = 0, ilen = categories.length; i < ilen; i++) {
                                if (hasRole(categories[i].source, roleName)) {
                                    return i;
                                }
                            }
                        }
                        return -1;
                    }
                    DataRoleHelper.getCategoryIndexOfRole = getCategoryIndexOfRole;
                    function hasRole(column, name) {
                        var roles = column.roles;
                        return roles && roles[name];
                    }
                    DataRoleHelper.hasRole = hasRole;
                    function hasRoleInDataView(dataView, name) {
                        return dataView != null
                            && dataView.metadata != null
                            && dataView.metadata.columns
                            && dataView.metadata.columns.some(function (c) { return c.roles && c.roles[name] !== undefined; }); // any is an alias of some
                    }
                    DataRoleHelper.hasRoleInDataView = hasRoleInDataView;
                    function hasRoleInValueColumn(valueColumn, name) {
                        return valueColumn
                            && valueColumn.source
                            && valueColumn.source.roles
                            && (valueColumn.source.roles[name] === true);
                    }
                    DataRoleHelper.hasRoleInValueColumn = hasRoleInValueColumn;
                })(DataRoleHelper = dataview.DataRoleHelper || (dataview.DataRoleHelper = {}));
            })(dataview = utils.dataview || (utils.dataview = {}));
        })(utils = extensibility.utils || (extensibility.utils = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var utils;
        (function (utils) {
            var dataview;
            (function (dataview) {
                var DataViewObject;
                (function (DataViewObject) {
                    function getValue(object, propertyName, defaultValue) {
                        if (!object) {
                            return defaultValue;
                        }
                        var propertyValue = object[propertyName];
                        if (propertyValue === undefined) {
                            return defaultValue;
                        }
                        return propertyValue;
                    }
                    DataViewObject.getValue = getValue;
                    /** Gets the solid color from a fill property using only a propertyName */
                    function getFillColorByPropertyName(object, propertyName, defaultColor) {
                        var value = getValue(object, propertyName);
                        if (!value || !value.solid) {
                            return defaultColor;
                        }
                        return value.solid.color;
                    }
                    DataViewObject.getFillColorByPropertyName = getFillColorByPropertyName;
                })(DataViewObject = dataview.DataViewObject || (dataview.DataViewObject = {}));
            })(dataview = utils.dataview || (utils.dataview = {}));
        })(utils = extensibility.utils || (extensibility.utils = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var utils;
        (function (utils) {
            var dataview;
            (function (dataview) {
                var DataViewObjects;
                (function (DataViewObjects) {
                    /** Gets the value of the given object/property pair. */
                    function getValue(objects, propertyId, defaultValue) {
                        if (!objects) {
                            return defaultValue;
                        }
                        return dataview.DataViewObject.getValue(objects[propertyId.objectName], propertyId.propertyName, defaultValue);
                    }
                    DataViewObjects.getValue = getValue;
                    /** Gets an object from objects. */
                    function getObject(objects, objectName, defaultValue) {
                        if (objects && objects[objectName]) {
                            return objects[objectName];
                        }
                        return defaultValue;
                    }
                    DataViewObjects.getObject = getObject;
                    /** Gets the solid color from a fill property. */
                    function getFillColor(objects, propertyId, defaultColor) {
                        var value = getValue(objects, propertyId);
                        if (!value || !value.solid) {
                            return defaultColor;
                        }
                        return value.solid.color;
                    }
                    DataViewObjects.getFillColor = getFillColor;
                    function getCommonValue(objects, propertyId, defaultValue) {
                        var value = getValue(objects, propertyId, defaultValue);
                        if (value && value.solid) {
                            return value.solid.color;
                        }
                        if (value === undefined
                            || value === null
                            || (typeof value === "object" && !value.solid)) {
                            return defaultValue;
                        }
                        return value;
                    }
                    DataViewObjects.getCommonValue = getCommonValue;
                })(DataViewObjects = dataview.DataViewObjects || (dataview.DataViewObjects = {}));
            })(dataview = utils.dataview || (utils.dataview = {}));
        })(utils = extensibility.utils || (extensibility.utils = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var utils;
        (function (utils) {
            var dataview;
            (function (dataview) {
                // powerbi.extensibility.utils.dataview
                var DataRoleHelper = powerbi.extensibility.utils.dataview.DataRoleHelper;
                var converterHelper;
                (function (converterHelper) {
                    function categoryIsAlsoSeriesRole(dataView, seriesRoleName, categoryRoleName) {
                        if (dataView.categories && dataView.categories.length > 0) {
                            // Need to pivot data if our category soure is a series role
                            var category = dataView.categories[0];
                            return category.source &&
                                DataRoleHelper.hasRole(category.source, seriesRoleName) &&
                                DataRoleHelper.hasRole(category.source, categoryRoleName);
                        }
                        return false;
                    }
                    converterHelper.categoryIsAlsoSeriesRole = categoryIsAlsoSeriesRole;
                    function getSeriesName(source) {
                        return (source.groupName !== undefined)
                            ? source.groupName
                            : source.queryName;
                    }
                    converterHelper.getSeriesName = getSeriesName;
                    function isImageUrlColumn(column) {
                        var misc = getMiscellaneousTypeDescriptor(column);
                        return misc != null && misc.imageUrl === true;
                    }
                    converterHelper.isImageUrlColumn = isImageUrlColumn;
                    function isWebUrlColumn(column) {
                        var misc = getMiscellaneousTypeDescriptor(column);
                        return misc != null && misc.webUrl === true;
                    }
                    converterHelper.isWebUrlColumn = isWebUrlColumn;
                    function getMiscellaneousTypeDescriptor(column) {
                        return column
                            && column.type
                            && column.type.misc;
                    }
                    converterHelper.getMiscellaneousTypeDescriptor = getMiscellaneousTypeDescriptor;
                    function hasImageUrlColumn(dataView) {
                        if (!dataView || !dataView.metadata || !dataView.metadata.columns || !dataView.metadata.columns.length) {
                            return false;
                        }
                        return dataView.metadata.columns.some(function (column) { return isImageUrlColumn(column) === true; });
                    }
                    converterHelper.hasImageUrlColumn = hasImageUrlColumn;
                })(converterHelper = dataview.converterHelper || (dataview.converterHelper = {}));
            })(dataview = utils.dataview || (utils.dataview = {}));
        })(utils = extensibility.utils || (extensibility.utils = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var utils;
        (function (utils) {
            var dataview;
            (function (dataview) {
                var DataViewObjectsParser = (function () {
                    function DataViewObjectsParser() {
                    }
                    DataViewObjectsParser.getDefault = function () {
                        return new this();
                    };
                    DataViewObjectsParser.createPropertyIdentifier = function (objectName, propertyName) {
                        return {
                            objectName: objectName,
                            propertyName: propertyName
                        };
                    };
                    DataViewObjectsParser.parse = function (dataView) {
                        var dataViewObjectParser = this.getDefault(), properties;
                        if (!dataView || !dataView.metadata || !dataView.metadata.objects) {
                            return dataViewObjectParser;
                        }
                        properties = dataViewObjectParser.getProperties();
                        for (var objectName in properties) {
                            for (var propertyName in properties[objectName]) {
                                var defaultValue = dataViewObjectParser[objectName][propertyName];
                                dataViewObjectParser[objectName][propertyName] = dataview.DataViewObjects.getCommonValue(dataView.metadata.objects, properties[objectName][propertyName], defaultValue);
                            }
                        }
                        return dataViewObjectParser;
                    };
                    DataViewObjectsParser.isPropertyEnumerable = function (propertyName) {
                        return !DataViewObjectsParser.InnumerablePropertyPrefix.test(propertyName);
                    };
                    DataViewObjectsParser.enumerateObjectInstances = function (dataViewObjectParser, options) {
                        var dataViewProperties = dataViewObjectParser && dataViewObjectParser[options.objectName];
                        if (!dataViewProperties) {
                            return [];
                        }
                        var instance = {
                            objectName: options.objectName,
                            selector: null,
                            properties: {}
                        };
                        for (var key in dataViewProperties) {
                            if (dataViewProperties.hasOwnProperty(key)) {
                                instance.properties[key] = dataViewProperties[key];
                            }
                        }
                        return {
                            instances: [instance]
                        };
                    };
                    DataViewObjectsParser.prototype.getProperties = function () {
                        var _this = this;
                        var properties = {}, objectNames = Object.keys(this);
                        objectNames.forEach(function (objectName) {
                            if (DataViewObjectsParser.isPropertyEnumerable(objectName)) {
                                var propertyNames = Object.keys(_this[objectName]);
                                properties[objectName] = {};
                                propertyNames.forEach(function (propertyName) {
                                    if (DataViewObjectsParser.isPropertyEnumerable(objectName)) {
                                        properties[objectName][propertyName] =
                                            DataViewObjectsParser.createPropertyIdentifier(objectName, propertyName);
                                    }
                                });
                            }
                        });
                        return properties;
                    };
                    return DataViewObjectsParser;
                }());
                DataViewObjectsParser.InnumerablePropertyPrefix = /^_/;
                dataview.DataViewObjectsParser = DataViewObjectsParser;
            })(dataview = utils.dataview || (utils.dataview = {}));
        })(utils = extensibility.utils || (extensibility.utils = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var visual;
        (function (visual) {
            var kPImg0051F6D5AD8348148E01E9E4B31C9F41_DEBUG;
            (function (kPImg0051F6D5AD8348148E01E9E4B31C9F41_DEBUG) {
                "use strict";
                var DataViewObjectsParser = powerbi.extensibility.utils.dataview.DataViewObjectsParser;
                var VisualSettings = (function (_super) {
                    __extends(VisualSettings, _super);
                    function VisualSettings() {
                        var _this = _super !== null && _super.apply(this, arguments) || this;
                        _this.visualOptions = new visualOptions();
                        return _this;
                    }
                    return VisualSettings;
                }(DataViewObjectsParser));
                kPImg0051F6D5AD8348148E01E9E4B31C9F41_DEBUG.VisualSettings = VisualSettings;
                var localeValues;
                (function (localeValues) {
                    localeValues[localeValues["arabic"] = "ar-SA"] = "arabic"; // Arabic (Saudi Arabia)
                    localeValues[localeValues["bangladesh"] = "bn-BD"] = "bangladesh"; // Bangla (Bangladesh)
                    localeValues[localeValues["india"] = "bn-IN"] = "india"; // Bangla (India)
                    localeValues[localeValues["czech"] = "cs-CZ"] = "czech"; // Czech (Czech Republic)
                    localeValues[localeValues["denmark"] = "da-DK"] = "denmark"; // Danish (Denmark)
                    localeValues[localeValues["german"] = "de-AT"] = "german"; // Austrian German
                    localeValues[localeValues["swiss"] = "de-CH"] = "swiss"; // "Swiss" German
                    localeValues[localeValues["standardGerman"] = "de-DE"] = "standardGerman"; // Standard German (as spoken in Germany)
                    localeValues[localeValues["greek"] = "el-GR"] = "greek"; //Modern Greek
                    localeValues[localeValues["australian"] = "en-AU"] = "australian"; // Australian English
                    localeValues[localeValues["canadian"] = "en-CA"] = "canadian"; // Canadian English
                    localeValues[localeValues["british"] = "en-GB"] = "british"; // British English
                    localeValues[localeValues["irish"] = "en-IE"] = "irish"; // Irish English
                    localeValues[localeValues["indian"] = "en-IN"] = "indian"; // Indian English
                    localeValues[localeValues["newZealand"] = "en-NZ"] = "newZealand"; // New Zealand English
                    localeValues[localeValues["usEnglish"] = "en-US"] = "usEnglish"; // US English
                    localeValues[localeValues["southAfrica"] = "en-ZA"] = "southAfrica"; // English (South Africa)
                    localeValues[localeValues["argentine"] = "es-AR"] = "argentine"; // Argentine Spanish
                    localeValues[localeValues["chilean"] = "es-CL"] = "chilean"; // Chilean Spanish
                    localeValues[localeValues["colombian"] = "es-CO"] = "colombian"; // Colombian Spanish
                    localeValues[localeValues["spanish"] = "es-ES"] = "spanish"; // Castilian Spanish (as spoken in Central-Northern Spain)
                    localeValues[localeValues["mexican"] = "es-MX"] = "mexican"; // Mexican Spanish
                    localeValues[localeValues["americanSpanish"] = "es-US"] = "americanSpanish"; // American Spanish
                    localeValues[localeValues["finland"] = "fi-FI"] = "finland"; // Finnish (Finland)
                    localeValues[localeValues["belgian"] = "fr-BE"] = "belgian"; // Belgian French
                    localeValues[localeValues["canadianFrench"] = "fr-CA"] = "canadianFrench"; // Canadian French
                    localeValues[localeValues["swissFrench"] = "fr-CH"] = "swissFrench"; // "Swiss" French
                    localeValues[localeValues["french"] = "fr-FR"] = "french"; // Standard French (especially in France)
                    localeValues[localeValues["israel"] = "he-IL"] = "israel"; // Hebrew (Israel)
                    localeValues[localeValues["hindi"] = "hi-IN"] = "hindi"; // Hindi (India)
                    localeValues[localeValues["hungarian"] = "hu-HU"] = "hungarian"; // Hungarian (Hungary)
                    localeValues[localeValues["indonesian"] = "id-ID"] = "indonesian"; // Indonesian (Indonesia)
                    localeValues[localeValues["italianSwiss"] = "it-CH"] = "italianSwiss"; // "Swiss" Italian
                    localeValues[localeValues["italian"] = "it-IT"] = "italian"; // Standard Italian (as spoken in Italy)
                    localeValues[localeValues["japanese"] = "jp-JP"] = "japanese"; // Japanese (Japan)
                    localeValues[localeValues["korean"] = "ko-KR"] = "korean"; // Korean (Republic of Korea)
                    localeValues[localeValues["belgianDutch"] = "nl-BE"] = "belgianDutch"; // Belgian Dutch
                    localeValues[localeValues["dutch"] = "nl-NL"] = "dutch"; // Standard Dutch (as spoken in The Netherlands)
                    localeValues[localeValues["norwegian"] = "no-NO"] = "norwegian"; // Norwegian (Norway)
                    localeValues[localeValues["polish"] = "pl-PL"] = "polish"; // Polish (Poland)
                    localeValues[localeValues["brazilianPortuguese"] = "pt-BR"] = "brazilianPortuguese"; // Brazilian Portuguese
                    localeValues[localeValues["portuguese"] = "pt-PT"] = "portuguese"; // European Portuguese (as written and spoken in Portugal)
                    localeValues[localeValues["romanian"] = "ro-RO"] = "romanian"; // Romanian (Romania)
                    localeValues[localeValues["russian"] = "ru-RU"] = "russian"; // Russian (Russian Federation)
                    localeValues[localeValues["slovak"] = "sk-SK"] = "slovak"; // Slovak (Slovakia)
                    localeValues[localeValues["swedish"] = "sv-SE"] = "swedish"; // Swedish (Sweden)
                    localeValues[localeValues["indianTamil"] = "ta-IN"] = "indianTamil"; // Indian Tamil
                    localeValues[localeValues["sriLankan"] = "ta-LK"] = "sriLankan"; // Sri Lankan Tamil
                    localeValues[localeValues["thai"] = "th-TH"] = "thai"; // Thai (Thailand)
                    localeValues[localeValues["turkish"] = "tr-TR"] = "turkish"; // Turkish (Turkey)
                    localeValues[localeValues["mainlandChina"] = "zh-CN"] = "mainlandChina"; // Mainland China, simplified characters
                    localeValues[localeValues["hongKong"] = "zh-HK"] = "hongKong"; // Hong Kong, traditional characters
                    localeValues[localeValues["taiwan"] = "zh-TW"] = "taiwan"; // Taiwan, traditional characters
                })(localeValues = kPImg0051F6D5AD8348148E01E9E4B31C9F41_DEBUG.localeValues || (kPImg0051F6D5AD8348148E01E9E4B31C9F41_DEBUG.localeValues = {}));
                var kpiFontFamilyOptions;
                (function (kpiFontFamilyOptions) {
                    kpiFontFamilyOptions[kpiFontFamilyOptions["default"] = "helvetica, arial, sans-serif"] = "default";
                    kpiFontFamilyOptions[kpiFontFamilyOptions["arial"] = "Arial"] = "arial";
                    kpiFontFamilyOptions[kpiFontFamilyOptions["arialBlack"] = "\"Arial Black\""] = "arialBlack";
                    kpiFontFamilyOptions[kpiFontFamilyOptions["arialUnicodeMS"] = "\"Arial Unicode MS\""] = "arialUnicodeMS";
                    kpiFontFamilyOptions[kpiFontFamilyOptions["calibri"] = "Calibri"] = "calibri";
                    kpiFontFamilyOptions[kpiFontFamilyOptions["cambria"] = "Cambria"] = "cambria";
                    kpiFontFamilyOptions[kpiFontFamilyOptions["cambriaMath"] = "\"Cambria Math\""] = "cambriaMath";
                    kpiFontFamilyOptions[kpiFontFamilyOptions["candara"] = "Candara"] = "candara";
                    kpiFontFamilyOptions[kpiFontFamilyOptions["comicSansMS"] = "\"Comic Sans MS\""] = "comicSansMS";
                    kpiFontFamilyOptions[kpiFontFamilyOptions["consolas"] = "Consolas"] = "consolas";
                    kpiFontFamilyOptions[kpiFontFamilyOptions["constantia"] = "Constantia"] = "constantia";
                    kpiFontFamilyOptions[kpiFontFamilyOptions["corbel"] = "Corbel"] = "corbel";
                    kpiFontFamilyOptions[kpiFontFamilyOptions["corbelNew"] = "\"Courier New\""] = "corbelNew";
                    kpiFontFamilyOptions[kpiFontFamilyOptions["georgia"] = "Georgia"] = "georgia";
                    kpiFontFamilyOptions[kpiFontFamilyOptions["lucidaSansUnicode"] = "\"Lucida Sans Unicode\""] = "lucidaSansUnicode";
                    kpiFontFamilyOptions[kpiFontFamilyOptions["segoeUIBold"] = "\"Segoe UI Bold\", wf_segoe-ui_bold, helvetica, arial, sans-serif"] = "segoeUIBold";
                    kpiFontFamilyOptions[kpiFontFamilyOptions["segoeUI"] = "\"Segoe UI\", wf_segoe-ui_normal, helvetica, arial, sans-serif"] = "segoeUI";
                    kpiFontFamilyOptions[kpiFontFamilyOptions["segoeUILight"] = "\"Segoe UI Light\", wf_segoe-ui_bold, helvetica, arial, sans-serif"] = "segoeUILight";
                    kpiFontFamilyOptions[kpiFontFamilyOptions["symbol"] = "Symbol"] = "symbol";
                    kpiFontFamilyOptions[kpiFontFamilyOptions["tahoma"] = "Tahoma"] = "tahoma";
                    kpiFontFamilyOptions[kpiFontFamilyOptions["timesNewRoman"] = "\"Times New Roman\""] = "timesNewRoman";
                    kpiFontFamilyOptions[kpiFontFamilyOptions["trebuchetMS"] = "\"Trebuchet MS\""] = "trebuchetMS";
                    kpiFontFamilyOptions[kpiFontFamilyOptions["verdana"] = "Verdana"] = "verdana";
                    kpiFontFamilyOptions[kpiFontFamilyOptions["wingdings"] = "Wingdings"] = "wingdings";
                })(kpiFontFamilyOptions = kPImg0051F6D5AD8348148E01E9E4B31C9F41_DEBUG.kpiFontFamilyOptions || (kPImg0051F6D5AD8348148E01E9E4B31C9F41_DEBUG.kpiFontFamilyOptions = {}));
                var alignOptions;
                (function (alignOptions) {
                    alignOptions[alignOptions["top"] = "top"] = "top";
                    alignOptions[alignOptions["middle"] = "middle"] = "middle";
                    alignOptions[alignOptions["bottom"] = "bottom"] = "bottom";
                })(alignOptions = kPImg0051F6D5AD8348148E01E9E4B31C9F41_DEBUG.alignOptions || (kPImg0051F6D5AD8348148E01E9E4B31C9F41_DEBUG.alignOptions = {}));
                var showModes;
                (function (showModes) {
                    showModes[showModes["comp"] = "comp"] = "comp";
                    showModes[showModes["indi"] = "indi"] = "indi";
                    showModes[showModes["both"] = "both"] = "both";
                })(showModes = kPImg0051F6D5AD8348148E01E9E4B31C9F41_DEBUG.showModes || (kPImg0051F6D5AD8348148E01E9E4B31C9F41_DEBUG.showModes = {}));
                var formatIndicators;
                (function (formatIndicators) {
                    formatIndicators[formatIndicators["auto"] = "auto"] = "auto";
                    formatIndicators[formatIndicators["none"] = "none"] = "none";
                    formatIndicators[formatIndicators["k"] = "k"] = "k";
                    formatIndicators[formatIndicators["M"] = "M"] = "M";
                    formatIndicators[formatIndicators["B"] = "B"] = "B";
                    formatIndicators[formatIndicators["kB"] = "kB"] = "kB";
                })(formatIndicators = kPImg0051F6D5AD8348148E01E9E4B31C9F41_DEBUG.formatIndicators || (kPImg0051F6D5AD8348148E01E9E4B31C9F41_DEBUG.formatIndicators = {}));
                var visualOptions = (function () {
                    function visualOptions() {
                        this.urlImgOk = "";
                        this.urlImgKo = "";
                        /*
                        public urlImgOk: string="https://s5.eestatic.com/2017/10/10/espana/Espana_253238302_49941798_1706x960.jpg";
                        public urlImgKo: string="https://s4.eestatic.com/2017/10/10/espana/Espana_253237967_49932740_1706x960.jpg";
                        */
                        this.koPercentValue = 0.5;
                        this.showTrendLine = true;
                        this.showMode = showModes.both;
                        this.formatIndicator = formatIndicators.auto;
                        this.widthTrendLine = 5;
                        this.kpiFontWeight = 1;
                        this.kpiFontWeightTarget = 1;
                        //public valueLocale:string="en-US";
                        this.valueLocale = localeValues.usEnglish;
                        this.numberDecimals = 2;
                        this.kpiColor = "#000000";
                        this.kpiColorTarget = "#000000";
                        this.kpifontFamily = kpiFontFamilyOptions.default;
                        this.kpiTransparency = 1;
                        this.kpiVerticalAlign = alignOptions.middle;
                        this.serieColorOk = "#008000";
                        this.serieColorKo = "#FF0000";
                        this.serieColorNeutral = "#C0C0C0";
                        this.seriesTransparency = 0.4;
                    }
                    return visualOptions;
                }());
                kPImg0051F6D5AD8348148E01E9E4B31C9F41_DEBUG.visualOptions = visualOptions;
            })(kPImg0051F6D5AD8348148E01E9E4B31C9F41_DEBUG = visual.kPImg0051F6D5AD8348148E01E9E4B31C9F41_DEBUG || (visual.kPImg0051F6D5AD8348148E01E9E4B31C9F41_DEBUG = {}));
        })(visual = extensibility.visual || (extensibility.visual = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var visual;
        (function (visual) {
            var kPImg0051F6D5AD8348148E01E9E4B31C9F41_DEBUG;
            (function (kPImg0051F6D5AD8348148E01E9E4B31C9F41_DEBUG) {
                "use strict";
                var myElementSerie = (function () {
                    function myElementSerie() {
                    }
                    return myElementSerie;
                }());
                kPImg0051F6D5AD8348148E01E9E4B31C9F41_DEBUG.myElementSerie = myElementSerie;
                var Visual = (function () {
                    function Visual(options) {
                        this.target = options.element;
                        var mycanvas = document.createElement("canvas");
                        //mycanvas.id="mycanvas";
                        this.target.appendChild(mycanvas);
                        this.host = options.host;
                    }
                    Visual.prototype.update = function (options) {
                        this.settings = Visual.parseSettings(options && options.dataViews && options.dataViews[0]);
                        //data load
                        var hasValue = false;
                        var hasTarget = false;
                        var hasCategories = false;
                        var catValueIndex, catTargetIndex;
                        if (options)
                            if (options.dataViews)
                                if (options.dataViews[0])
                                    if (options.dataViews[0].categorical.categories)
                                        hasCategories = true;
                        if (options)
                            if (options.dataViews)
                                if (options.dataViews[0])
                                    if (options.dataViews[0].categorical.values) {
                                        if (options.dataViews[0].categorical.values.length == 2) {
                                            hasValue = true;
                                            hasTarget = true;
                                            if (options.dataViews[0].categorical.values[0].source.roles.value) {
                                                catValueIndex = 0;
                                                catTargetIndex = 1;
                                            }
                                            else {
                                                catValueIndex = 1;
                                                catTargetIndex = 0;
                                            }
                                        }
                                        else if (options.dataViews[0].categorical.values.length == 1) {
                                            if (options.dataViews[0].categorical.values[0].source.roles.value) {
                                                hasValue = true;
                                                catValueIndex = 0;
                                            }
                                            else {
                                                hasTarget = true;
                                                catTargetIndex = 0;
                                            }
                                        }
                                    }
                        var globalValue = 0;
                        var globalTarget = 0;
                        var series = new Array();
                        debugger;
                        if (hasValue) {
                            if (!hasCategories) {
                                globalValue = parseFloat(options.dataViews[0].categorical.values[catValueIndex].values[0].valueOf().toString());
                                if (hasTarget)
                                    globalTarget = parseFloat(options.dataViews[0].categorical.values[catTargetIndex].values[0].valueOf().toString());
                            }
                            else {
                                debugger;
                                var minLocal, maxLocal;
                                minLocal = options.dataViews[0].categorical.values[catValueIndex].minLocal;
                                maxLocal = options.dataViews[0].categorical.values[catValueIndex].maxLocal;
                                /*if(options.dataViews[0].categorical.values[0].source.roles.value){
                                    minLocal=options.dataViews[0].categorical.values[0].minLocal;
                                    maxLocal=options.dataViews[0].categorical.values[0].maxLocal;
                                } else {
                                    minLocal=options.dataViews[0].categorical.values[1].minLocal;
                                    maxLocal=options.dataViews[0].categorical.values[1].maxLocal;
                                }*/
                                for (var i = 0; i < options.dataViews[0].categorical.categories[0].values.length; i++) {
                                    var myelement = new myElementSerie();
                                    myelement.name = options.dataViews[0].categorical.categories[0].values[i].valueOf().toString();
                                    myelement.value = parseFloat(options.dataViews[0].categorical.values[0].values[i].valueOf().toString());
                                    if (hasTarget)
                                        myelement.target = parseFloat(options.dataViews[0].categorical.values[1].values[i].valueOf().toString());
                                    myelement.percent = 0;
                                    //if(myelement.target!=0) myelement.percent=myelement.value/myelement.target;
                                    if ((maxLocal - minLocal) != 0)
                                        myelement.percent = (myelement.value - minLocal) / (maxLocal - minLocal);
                                    else
                                        myelement.percent = 0.5;
                                    myelement.realPercent = myelement.percent;
                                    if (myelement.percent > 1)
                                        myelement.percent = 1;
                                    if (myelement.percent < 0)
                                        myelement.percent = 0;
                                    series.push(myelement);
                                    globalValue += myelement.value;
                                    if (hasTarget)
                                        globalTarget += myelement.target;
                                }
                            }
                        }
                        //end data load
                        // load ok image
                        var myimg = document.createElement("img");
                        if (this.settings.visualOptions.urlImgOk && this.settings.visualOptions.urlImgKo && this.settings.visualOptions.koPercentValue && hasValue && hasTarget) {
                            var mysrc = "";
                            if (globalTarget == 0 || globalValue == 0)
                                mysrc = this.settings.visualOptions.urlImgKo.valueOf().toString();
                            else {
                                var currentPercent;
                                if (hasTarget)
                                    currentPercent = globalValue / globalTarget;
                                else
                                    currentPercent = globalValue;
                                if (currentPercent >= this.settings.visualOptions.koPercentValue)
                                    mysrc = this.settings.visualOptions.urlImgOk.valueOf().toString();
                                else
                                    mysrc = this.settings.visualOptions.urlImgKo.valueOf().toString();
                            }
                            myimg.setAttribute("src", mysrc);
                        }
                        else
                            myimg.setAttribute("src", "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=");
                        myimg.onload = (function (mysettings) {
                            return function () {
                                function calcMaxFontSize(can, strText, fontFamily, numIndicators) {
                                    var canCtx = can.getContext("2d");
                                    var maxSize = can.height / numIndicators;
                                    if (can.width < maxSize)
                                        maxSize = can.width;
                                    var fontSize = maxSize;
                                    canCtx.font = fontSize.toString() + "px " + fontFamily;
                                    var myTextWidth = canCtx.measureText(strText).width;
                                    while (myTextWidth > can.width) {
                                        fontSize--;
                                        canCtx.font = fontSize.toString() + "px " + fontFamily;
                                        myTextWidth = canCtx.measureText(strText).width;
                                    }
                                    return fontSize;
                                }
                                function formatIndicator(indicator) {
                                    var retorno = "";
                                    if (indicator) {
                                        switch (mysettings.visualOptions.formatIndicator.valueOf().toString()) {
                                            case "none":
                                                retorno = parseFloat(indicator.toFixed(mysettings.visualOptions.numberDecimals)).toLocaleString(mysettings.visualOptions.valueLocale.toString());
                                                break;
                                            case "auto":
                                                var currentValue = indicator;
                                                var numDigitos = parseFloat(currentValue.toFixed(mysettings.visualOptions.numberDecimals)).toLocaleString(mysettings.visualOptions.valueLocale.toString()).length;
                                                var numDivisiones = 0;
                                                while (numDigitos > 4) {
                                                    numDivisiones++;
                                                    currentValue = currentValue / 1000.00;
                                                    numDigitos = parseFloat(currentValue.toFixed(mysettings.visualOptions.numberDecimals)).toLocaleString(mysettings.visualOptions.valueLocale.toString()).length;
                                                }
                                                var escale = "";
                                                if (numDivisiones == 1)
                                                    escale = "k";
                                                else if (numDivisiones == 2)
                                                    escale = "M";
                                                else if (numDivisiones == 3)
                                                    escale = "B";
                                                else if (numDivisiones >= 4)
                                                    escale = "kB";
                                                retorno = parseFloat(currentValue.toFixed(mysettings.visualOptions.numberDecimals)).toLocaleString(mysettings.visualOptions.valueLocale.toString()) + escale;
                                                break;
                                            case "k":
                                                retorno = parseFloat((indicator / 1000).toFixed(mysettings.visualOptions.numberDecimals)).toLocaleString(mysettings.visualOptions.valueLocale.toString()) + "k";
                                                break;
                                            case "M":
                                                retorno = parseFloat((indicator / 1000000).toFixed(mysettings.visualOptions.numberDecimals)).toLocaleString(mysettings.visualOptions.valueLocale.toString()) + "M";
                                                break;
                                            case "B":
                                                retorno = parseFloat((indicator / 1000000000).toFixed(mysettings.visualOptions.numberDecimals)).toLocaleString(mysettings.visualOptions.valueLocale.toString()) + "B";
                                                break;
                                            case "kB":
                                                retorno = parseFloat((indicator / 1000000000000).toFixed(mysettings.visualOptions.numberDecimals)).toLocaleString(mysettings.visualOptions.valueLocale.toString()) + "kB";
                                                break;
                                        }
                                    }
                                    return retorno;
                                }
                                var mycan = document.getElementsByTagName("canvas").item(0);
                                var myCanCtx = mycan.getContext("2d");
                                //myCanCtx.filter = "none";            
                                myCanCtx.drawImage(myimg, 0, 0, mycan.width, mycan.height);
                                var numberOfIndicators = 0;
                                if (hasValue)
                                    numberOfIndicators = 1;
                                if (hasValue && hasTarget)
                                    numberOfIndicators = 2;
                                if (mysettings.visualOptions.showMode.valueOf().toString() == "indi")
                                    numberOfIndicators = 1;
                                if (mysettings.visualOptions.showMode.valueOf().toString() == "comp")
                                    numberOfIndicators = 1;
                                if (hasValue /*&& hasTarget*/) {
                                    //draw series
                                    if (series.length > 0) {
                                        myCanCtx.beginPath();
                                        myCanCtx.moveTo(0, mycan.height);
                                        myCanCtx.lineWidth = 1;
                                        myCanCtx.fillStyle = mysettings.visualOptions.serieColorNeutral.valueOf().toString();
                                        if (series.length == 1) {
                                            myCanCtx.lineTo(0, mycan.height - series[0].percent * mycan.height);
                                            myCanCtx.lineTo(mycan.width, mycan.height - series[1].percent * mycan.height);
                                        }
                                        else
                                            for (var i = 0; i < series.length; i++) {
                                                myCanCtx.lineTo(i * mycan.width / (series.length - 1), mycan.height - series[i].percent * mycan.height);
                                            }
                                        myCanCtx.lineTo(mycan.width, mycan.height);
                                        myCanCtx.globalAlpha = parseFloat(mysettings.visualOptions.seriesTransparency.valueOf().toString());
                                        myCanCtx.closePath();
                                        myCanCtx.stroke();
                                        if (series.length > 1) {
                                            //Calculate thend: minimun squares
                                            var totalY = 0;
                                            var totalX = 0;
                                            var totalXY = 0;
                                            var totalX2 = 0;
                                            var totalN = series.length;
                                            for (var numSer = 0; numSer < series.length; numSer++) {
                                                //var x=numSer+1;
                                                var x = numSer * (mycan.width / series.length);
                                                var y = series[numSer].realPercent;
                                                totalY += y;
                                                totalX += x;
                                                totalXY += x * y;
                                                totalX2 += x * x;
                                            }
                                            var avgX = totalX / totalN;
                                            var avgY = totalY / totalN;
                                            //regression line: f(x)=a+bx. Calculate the factor b
                                            var b = (totalXY - totalN * avgX * avgY) / (totalX2 - totalN * avgX * avgX);
                                            // Calculate de a value for regression line: a=avgX
                                            this.bRegressionLine = b;
                                            this.aRegressionLine = avgY - this.bRegressionLine * avgX;
                                            if (!mysettings.visualOptions.showTrendLine) {
                                                myCanCtx.fillStyle = mysettings.visualOptions.serieColorOk.valueOf().toString();
                                                if (b < 0)
                                                    myCanCtx.fillStyle = mysettings.visualOptions.serieColorKo.valueOf().toString();
                                            }
                                            myCanCtx.fill();
                                        }
                                        //regression line
                                        if (this.bRegressionLine && mysettings.visualOptions.showTrendLine) {
                                            myCanCtx.beginPath();
                                            myCanCtx.lineWidth = mysettings.visualOptions.widthTrendLine;
                                            myCanCtx.globalAlpha = parseFloat(mysettings.visualOptions.seriesTransparency.valueOf().toString());
                                            myCanCtx.strokeStyle = mysettings.visualOptions.serieColorNeutral.valueOf().toString();
                                            if (this.bRegressionLine > 0)
                                                myCanCtx.strokeStyle = mysettings.visualOptions.serieColorOk.valueOf().toString();
                                            if (this.bRegressionLine < 0)
                                                myCanCtx.strokeStyle = mysettings.visualOptions.serieColorKo.valueOf().toString();
                                            //myCanCtx.moveTo(0,mycan.height*(1-this.aRegressionLine));
                                            myCanCtx.moveTo(0, mycan.height * (1 - this.aRegressionLine));
                                            //myCanCtx.lineTo(mycan.width,-this.bRegressionLine*mycan.width + mycan.height*(1-this.aRegressionLine));                            
                                            myCanCtx.lineTo(mycan.width, mycan.height * (1 - this.bRegressionLine * mycan.width - this.aRegressionLine));
                                            myCanCtx.closePath();
                                            myCanCtx.stroke();
                                            myCanCtx.fill();
                                            myCanCtx.strokeStyle = mysettings.visualOptions.serieColorNeutral.valueOf().toString();
                                        }
                                    }
                                    //end draw series
                                    //show values
                                    var indicator = globalValue;
                                    //var mytext = parseFloat(globalValue.toFixed(mysettings.visualOptions.numberDecimals) as any).toLocaleString(mysettings.visualOptions.valueLocale.toString());
                                    var mytext = formatIndicator(globalValue);
                                    myCanCtx.textAlign = "center";
                                    var fontSize = calcMaxFontSize(mycan, mytext, mysettings.visualOptions.kpifontFamily.valueOf().toString(), numberOfIndicators);
                                    var myfontWeight = mysettings.visualOptions.kpiFontWeight;
                                    if (myfontWeight < 0)
                                        myfontWeight = 0;
                                    else if (myfontWeight > 1)
                                        myfontWeight = 1;
                                    myfontWeight = myfontWeight * fontSize;
                                    myCanCtx.font = (myfontWeight).toString() + "px " + mysettings.visualOptions.kpifontFamily.valueOf().toString();
                                    var moveHeight = mycan.height / 2 + myfontWeight / 4;
                                    myCanCtx.fillStyle = mysettings.visualOptions.kpiColor.valueOf().toString();
                                    myCanCtx.globalAlpha = parseFloat(mysettings.visualOptions.kpiTransparency.valueOf().toString());
                                    if (mysettings.visualOptions.showMode.valueOf().toString() == "indi") {
                                        if (mysettings.visualOptions.kpiVerticalAlign.valueOf().toString() == "middle")
                                            //middle align
                                            myCanCtx.fillText(mytext, mycan.width / 2, moveHeight);
                                        else if (mysettings.visualOptions.kpiVerticalAlign.valueOf().toString() == "top")
                                            //top align
                                            myCanCtx.fillText(mytext, mycan.width / 2, myfontWeight / 1.3);
                                        else if (mysettings.visualOptions.kpiVerticalAlign.valueOf().toString() == "bottom")
                                            //bottom align
                                            myCanCtx.fillText(mytext, mycan.width / 2, mycan.height - 5);
                                        else
                                            myCanCtx.fillText(mytext, mycan.width / 2, moveHeight);
                                    }
                                    else if (mysettings.visualOptions.showMode.valueOf().toString() == "both") {
                                        //top align
                                        myCanCtx.fillText(mytext, mycan.width / 2, myfontWeight / 1.3);
                                    }
                                    //end show values
                                    //show percentage
                                    if (globalTarget)
                                        if (globalTarget != 0) {
                                            var targetIndicator = globalValue / globalTarget;
                                            mytext = parseFloat((targetIndicator * 100).toFixed(mysettings.visualOptions.numberDecimals)).toLocaleString(mysettings.visualOptions.valueLocale.toString()) + "%";
                                            myCanCtx.textAlign = "center";
                                            fontSize = calcMaxFontSize(mycan, mytext, mysettings.visualOptions.kpifontFamily.valueOf().toString(), numberOfIndicators);
                                            myfontWeight = mysettings.visualOptions.kpiFontWeightTarget;
                                            if (myfontWeight < 0)
                                                myfontWeight = 0;
                                            else if (myfontWeight > 1)
                                                myfontWeight = 1;
                                            myfontWeight = myfontWeight * fontSize;
                                            myCanCtx.font = (myfontWeight).toString() + "px " + mysettings.visualOptions.kpifontFamily.valueOf().toString();
                                            myCanCtx.fillStyle = mysettings.visualOptions.kpiColorTarget.valueOf().toString();
                                            if (mysettings.visualOptions.showMode.valueOf().toString() == "comp") {
                                                if (mysettings.visualOptions.kpiVerticalAlign.valueOf().toString() == "middle")
                                                    //middle align
                                                    myCanCtx.fillText(mytext, mycan.width / 2, moveHeight);
                                                else if (mysettings.visualOptions.kpiVerticalAlign.valueOf().toString() == "top")
                                                    //top align
                                                    myCanCtx.fillText(mytext, mycan.width / 2, myfontWeight / 1.3);
                                                else if (mysettings.visualOptions.kpiVerticalAlign.valueOf().toString() == "bottom")
                                                    //bottom align
                                                    myCanCtx.fillText(mytext, mycan.width / 2, mycan.height - 5);
                                                else
                                                    myCanCtx.fillText(mytext, mycan.width / 2, moveHeight);
                                            }
                                            else if (mysettings.visualOptions.showMode.valueOf().toString() == "both") {
                                                //bottom align
                                                myCanCtx.fillText(mytext, mycan.width / 2, mycan.height - mycan.height * 0.01);
                                            }
                                        }
                                }
                                //end load indicator and series
                            };
                        })(this.settings);
                        var mycan = this.target.getElementsByTagName("canvas").item(0);
                        mycan.height = this.target.offsetHeight;
                        mycan.width = this.target.offsetWidth;
                        var myCanCtx = mycan.getContext("2d");
                        //end load ok image
                    };
                    Visual.parseSettings = function (dataView) {
                        //let parsedSettings : VisualSettings = VisualSettings.parse(dataView) as VisualSettings;
                        return kPImg0051F6D5AD8348148E01E9E4B31C9F41_DEBUG.VisualSettings.parse(dataView);
                        //debugger;
                        //return parsedSettings;
                    };
                    /**
                     * This function gets called for each of the objects defined in the capabilities files and allows you to select which of the
                     * objects and properties you want to expose to the users in the property pane.
                     *
                     */
                    Visual.prototype.enumerateObjectInstances = function (options) {
                        return kPImg0051F6D5AD8348148E01E9E4B31C9F41_DEBUG.VisualSettings.enumerateObjectInstances(this.settings || kPImg0051F6D5AD8348148E01E9E4B31C9F41_DEBUG.VisualSettings.getDefault(), options);
                    };
                    return Visual;
                }());
                kPImg0051F6D5AD8348148E01E9E4B31C9F41_DEBUG.Visual = Visual;
            })(kPImg0051F6D5AD8348148E01E9E4B31C9F41_DEBUG = visual.kPImg0051F6D5AD8348148E01E9E4B31C9F41_DEBUG || (visual.kPImg0051F6D5AD8348148E01E9E4B31C9F41_DEBUG = {}));
        })(visual = extensibility.visual || (extensibility.visual = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
var powerbi;
(function (powerbi) {
    var visuals;
    (function (visuals) {
        var plugins;
        (function (plugins) {
            plugins.kPImg0051F6D5AD8348148E01E9E4B31C9F41_DEBUG = {
                name: 'kPImg0051F6D5AD8348148E01E9E4B31C9F41_DEBUG',
                displayName: 'KPImg',
                class: 'Visual',
                version: '1.0.2',
                apiVersion: '2.2.0',
                create: function (options) { return new powerbi.extensibility.visual.kPImg0051F6D5AD8348148E01E9E4B31C9F41_DEBUG.Visual(options); },
                custom: true
            };
        })(plugins = visuals.plugins || (visuals.plugins = {}));
    })(visuals = powerbi.visuals || (powerbi.visuals = {}));
})(powerbi || (powerbi = {}));
//# sourceMappingURL=visual.js.map