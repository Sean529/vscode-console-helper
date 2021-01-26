"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
var vscode_1 = require("vscode");
console.log('%c AT-[ commands ]->', 'font-size:13; background:#de4307; color:#f6d04d;', vscode_1.commands);
// TODO: 应该可以获取配置信息，后期可以改为从配置信息中获取变量名
var SETTINGS_LIST = [
    {
        name: 'Prefix Logo',
        default: '',
        description: '前缀标识'
    },
    {
        name: 'Color',
        default: '',
        description: '字体颜色'
    },
    {
        name: 'Color Bg',
        default: '',
        description: '背景颜色'
    },
    {
        name: 'Font Size',
        default: '',
        description: '字号大小'
    },
    {
        name: 'Show Semi',
        default: false,
        description: '末尾是否加分号'
    },
    {
        name: 'Number Argument',
        default: 'console.log 接收 2 个参数',
        description: 'console.log 接收的变量数量'
    }
];
// 变量占位符
var PLACEHOLDER = '#';
// 用户选择 console.log 的参数个数
var NUMBER_ARGUMENT = {
    oneArgument: 'console.log 接收 1 个参数',
    twoArgument: 'console.log 接收 2 个参数',
    threeArgument: 'console.log 接收 3 个参数'
};
// 样式 key
var STYLES = {
    color: 'color',
    colorBg: 'background',
    fontSize: 'font-size'
};
// 执行 log 写入
var insertText = function (val) {
    var editor = vscode_1.window.activeTextEditor;
    if (!editor) {
        showErrorMessage();
        return;
    }
    var selection = editor.selection;
    var range = new vscode_1.Range(selection.start, selection.end);
    editor.edit(function (editBuilder) {
        editBuilder.replace(range, val);
    });
};
// 文件无权限提示
var showErrorMessage = function () {
    vscode_1.window.showErrorMessage('无法插入 log，文件没有编辑权限');
};
// 获取全部 log 语句
var getAllLogStatements = function (document, documentText) {
    var logStatements = [];
    var logRegex = /console.(log|debug|info|warn|error|assert|dir|dirxml|trace|group|groupEnd|time|timeEnd|profile|profileEnd|count)\(([\s\S]*?)\);?/g;
    var match;
    while ((match = logRegex.exec(documentText))) {
        var matchRange = new vscode_1.Range(document.positionAt(match.index), document.positionAt(match.index + match[0].length));
        if (!matchRange.isEmpty)
            logStatements.push(matchRange);
    }
    return logStatements;
};
// 删除成功提示信息
var deleteSuccessShowMessage = function (logs) {
    var message = logs.length
        ? logs.length + " console.logs deleted"
        : logs.length + " console.log deleted";
    vscode_1.window.showInformationMessage(message);
};
// 执行删除 log 每行操作
var deleteFoundLogLines = function (range, edit, document) {
    for (var index = range.start.line; index <= range.end.line; index++) {
        edit.delete(document.lineAt(index).rangeIncludingLineBreak);
    }
};
// 删除所有找到的 log 语句
var deleteFoundLogStatements = function (logs) {
    var editor = vscode_1.window.activeTextEditor;
    var document = editor.document;
    editor.edit(function (edit) {
        logs.forEach(function (range) {
            deleteFoundLogLines(range, edit, document);
        });
        deleteSuccessShowMessage(logs);
    });
};
// 格式化前缀
var prefixFormat = function (_a) {
    var selectVariable = _a.selectVariable, prefixLogo = _a.prefixLogo, statement = _a.statement;
    if (!prefixLogo || prefixLogo === '#') {
        // 未填写或填写的是 #
        return "" + selectVariable;
    }
    else if (prefixLogo.includes('#')) {
        // 正确填写，替换占位符
        return prefixLogo.replace(PLACEHOLDER, selectVariable);
    }
    else if (!prefixLogo.includes('#')) {
        // 有填写且未填写占位符
        return prefixLogo;
    }
    return statement;
};
// 对象深度克隆
var cloneDeep = function (obj) {
    var copy = Object.create(Object.getPrototypeOf(obj));
    var propNames = Object.getOwnPropertyNames(obj);
    propNames.forEach(function (name) {
        var desc = Object.getOwnPropertyDescriptor(obj, name);
        Object.defineProperty(copy, name, desc);
    });
    return copy;
};
// 判断对象是否为空
var isEmpty = function (obj) {
    return Object.keys(obj).length === 0;
};
// 把对象的空值删除
var filterEmptyObj = function (obj) {
    for (var key in obj) {
        if (obj[key] === '') {
            delete obj[key];
        }
    }
    return obj;
};
// 样式对象转为字符串
var stylesTransform = function (customStyles) {
    // 将对象中为空的属性删除，参数是引用类型，避免改变实参，这了进行深度 clone
    var styles = filterEmptyObj(cloneDeep(customStyles));
    if (isEmpty(styles)) {
        return '';
    }
    var styleTemp = '';
    for (var key in styles) {
        var styleKey = STYLES["" + key];
        var styleValue = styles[key];
        styleTemp += styleKey + ":" + styleValue + "; ";
    }
    styleTemp = styleTemp.substring(0, styleTemp.length - 1); // 移除末尾的空格
    return styleTemp;
};
// 拼接模板
var tempJoin = function (temp, styles, selectVariable) {
    if (styles) {
        return "console.log('%c " + temp + "', '" + styles + "', " + selectVariable + ")";
    }
    else if (temp) {
        return "console.log('" + temp + "', " + selectVariable + ")";
    }
    return "console.log(" + selectVariable + ")";
};
// 语句末尾是否加分号
var statementSemi = function (data) {
    var selectVariable = data.selectVariable, isShowSemi = data.isShowSemi, prefixLogo = data.prefixLogo, numberArgument = data.numberArgument, customStyles = data.customStyles;
    var statement = tempJoin('', '', selectVariable);
    var temp = prefixFormat({ selectVariable: selectVariable, prefixLogo: prefixLogo, statement: statement });
    if (numberArgument === NUMBER_ARGUMENT.twoArgument) {
        statement = tempJoin(temp, '', selectVariable);
    }
    else if (numberArgument === NUMBER_ARGUMENT.threeArgument) {
        var styles = stylesTransform(customStyles); // ''
        statement = tempJoin(temp, styles, selectVariable);
    }
    return isShowSemi ? statement + ";" : "" + statement;
};
// log 插入
var insertLogStatement = function (context) {
    console.log('%c AT-[ context ]->', 'font-size:13; background:#de4307; color:#f6d04d;', context);
    var insert = vscode_1.commands.registerCommand('consoleLog.insertLogStatement', function () {
        var editor = vscode_1.window.activeTextEditor;
        if (!editor) {
            showErrorMessage();
            return;
        }
        var selection = editor.selection;
        var text = editor.document.getText(selection); // 选择的字符
        if (text) {
            // 将选择的字符美化后打印
            vscode_1.commands.executeCommand('editor.action.insertLineAfter').then(function () {
                var selectVariable = text.replace(/'|"/g, ''); // 编辑器中选中的文本（要打印的变量）
                var fontSize = getSettingValue('Font Size');
                var colorBg = getSettingValue('Color Bg');
                var color = getSettingValue('Color');
                var prefixLogo = getSettingValue('Prefix Logo');
                var isShowSemi = getSettingValue('Show Semi');
                var numberArgument = getSettingValue('Number Argument');
                // TODO: 后期这里需要开放为用户自定义更多样式
                // 自定义样式
                var customStyles = {
                    fontSize: fontSize,
                    colorBg: colorBg,
                    color: color
                };
                var logToInsert = statementSemi({
                    selectVariable: selectVariable,
                    isShowSemi: isShowSemi,
                    prefixLogo: prefixLogo,
                    numberArgument: numberArgument,
                    customStyles: customStyles
                });
                insertText(logToInsert);
            });
        }
    });
    context.subscriptions.push(insert);
};
var getSettingValue = function (name) {
    var value = vscode_1.workspace.getConfiguration().get("consoleLog." + name);
    var len = SETTINGS_LIST.length;
    for (var i = 0; i < len; i++) {
        var item = SETTINGS_LIST[i];
        if (item.name === name) {
            return value || item.default;
        }
    }
    return '';
};
// 删除页面中全部 log
var deleteAllLog = function (context) {
    var deleteAllLogStatements = vscode_1.commands.registerCommand('consoleLog.deleteAllLogStatements', function () {
        var editor = vscode_1.window.activeTextEditor;
        if (!editor) {
            showErrorMessage();
            return;
        }
        var document = editor.document;
        var documentText = editor.document.getText();
        var logStatements = getAllLogStatements(document, documentText);
        deleteFoundLogStatements(logStatements);
    });
    context.subscriptions.push(deleteAllLogStatements);
};
var activate = function (context) {
    insertLogStatement(context);
    deleteAllLog(context);
};
exports.activate = activate;
var deactivate = function () { };
exports.deactivate = deactivate;
