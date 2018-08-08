var nodeMap = new Map();

var commandSet = new Set();
var keywordSet = new Set();
var headerSet = new Set();
var datatypeSet = new Set();
var operatorSet = new Set();

function initializeOperatorSet(){
    operatorSet.add("+");
    operatorSet.add("=");
    operatorSet.add("-");
    operatorSet.add("/");
    operatorSet.add("*");
    operatorSet.add("x");
    operatorSet.add("plus");
    operatorSet.add("minus");
    operatorSet.add("mutiply");
    operatorSet.add("divide");
    operatorSet.add("equals");
}

function initializedatatypeSet(){
    datatypeSet.add("integer");
    datatypeSet.add("float");
    datatypeSet.add("bool");
    datatypeSet.add("character");
    datatypeSet.add("double");
    //datatypeSet.add("character pointer");

}

function initializeCommandSet() {
    commandSet.add("start");
    commandSet.add("remove");
    commandSet.add("stop");
    commandSet.add("finish");
    commandSet.add("import");
    commandSet.add("function");
    commandSet.add("include");
    commandSet.add("print");
    commandSet.add("next");
    commandSet.add("percent");
    commandSet.add(",");
    commandSet.add("comma");
    commandSet.add("coma");
    commandSet.add("call");
}

function initializeKeywordSet() {
    keywordSet.add("for");
    keywordSet.add("while");
    keywordSet.add("if");
    keywordSet.add("else");
    keywordSet.add("return");
}

function initializeHeaderSet() {
    //headerSet.add("std");
    //headerSet.add("conio");
    //headerSet.add("math");
}

function isDatatype(input){
    if(datatypeSet.has(input)){
        return true;
    }
    return false;
}

function isCommand(input){
    if(commandSet.has(input)){
        return true;
    }
    return false;
}

function isNumber(input){
    return (typeof input == "number");
}


function isString(input){
    return (typeof input == "string");
}

function isKeyword(input){
    if(keywordSet.has(input)){
        return true;
    }
    return false;
}

function isHeader(input){
    if(headerSet.has(input)){
        return true;
    }
    return false;
}

function isOperator(input){
    if(operatorSet.has(input)){
        return true;
    }
    return false;
}

function detectType(input){

    if(isOperator(input)){
        return "OPE";
    } else if(isDatatype(input)){
        return "DAT";
    }else if(isCommand(input)){
        return "COM";
    }else if(isNumber(input)){
        return "NUM";
    }else if(isHeader(input)){
        return "HEA";
    }else if(isKeyword(input)){
        return "KEY";
    }else if(isString(input)){
        return "STR";
    }
    return "NOTYPE";
}

initializeCommandSet();
initializeKeywordSet();
initializeHeaderSet();
initializedatatypeSet();
initializeOperatorSet();

//-----------------------------------HEADERS-------------------------------------------

var actualCommand_Output = new Map();
actualCommand_Output.set("import", [1, "#include < "]);
actualCommand_Output.set("include", [1, "#include < "]);
actualCommand_Output.set("function", [3, "/*No output for function*/"]);
var type_OutputCommand = new Map();
type_OutputCommand.set("COM", actualCommand_Output);
nodeMap.set(0, type_OutputCommand);


var actualCommand_Output = new Map();
actualCommand_Output.set("STR", [2, "STR.H"]);
var type_OutputCommand = new Map();
type_OutputCommand.set("STR", actualCommand_Output);
nodeMap.set(1, type_OutputCommand);


var actualCommand_Output = new Map();
actualCommand_Output.set("import", [1, "#include < "]);
actualCommand_Output.set("include", [1, "#include < "]);
var type_OutputCommand = new Map();
type_OutputCommand.set("COM", actualCommand_Output);
nodeMap.set(2, type_OutputCommand);

//---------------------------------HEADERS DONE---------------------------------------------

//----------------------------------FUNCTION------------------------------------------------

//var actualCommand_Output = new Map();
actualCommand_Output.set("function", [3,"/*NO output for function*/"]);
//var type_OutputCommand = new Map();
//type_OutputCommand.set("COM", actualCommand_Output);
//nodeMap.set(2, type_OutputCommand);


var actualCommand_Output = new Map();
actualCommand_Output.set("DAT", [4,"DAT"]);
var type_OutputCommand = new Map();
type_OutputCommand.set("DAT", actualCommand_Output);
nodeMap.set(3, type_OutputCommand);

var actualCommand_Output = new Map();
actualCommand_Output.set("STR", [5,"STR("]);
var type_OutputCommand = new Map();
type_OutputCommand.set("STR", actualCommand_Output);
nodeMap.set(4, type_OutputCommand);

var actualCommand_Output = new Map();
actualCommand_Output.set("DAT", [6,"DAT"]);
actualCommand_Output.set("finish", [9,")"]);
var type_OutputCommand = new Map();
type_OutputCommand.set("DAT", actualCommand_Output);
type_OutputCommand.set("COM", actualCommand_Output);
nodeMap.set(5, type_OutputCommand);


var actualCommand_Output = new Map();
actualCommand_Output.set("STR", [7,"STR"]);
var type_OutputCommand = new Map();
type_OutputCommand.set("STR", actualCommand_Output);
nodeMap.set(6, type_OutputCommand);


var actualCommand_Output = new Map();
actualCommand_Output.set("DAT", [8,",DAT"]);
actualCommand_Output.set("finish", [9,")"]);
var type_OutputCommand = new Map();
type_OutputCommand.set("DAT", actualCommand_Output);
type_OutputCommand.set("COM", actualCommand_Output);
nodeMap.set(7, type_OutputCommand);

var actualCommand_Output = new Map();
actualCommand_Output.set("STR", [7,"STR"]);
var type_OutputCommand = new Map();
type_OutputCommand.set("STR", actualCommand_Output);
nodeMap.set(8, type_OutputCommand);


var actualCommand_Output = new Map();
actualCommand_Output.set("function", [3,"SEMNEW"]);
actualCommand_Output.set("start", [10,"OPEN"]);
var type_OutputCommand = new Map();
type_OutputCommand.set("COM", actualCommand_Output);
nodeMap.set(9, type_OutputCommand);

var actualCommand_Output = new Map();
actualCommand_Output.set("print", [24,"PRINTF"]);
actualCommand_Output.set("stop", [10,"STOP"]);
actualCommand_Output.set("STR", [12,"STR"]);
actualCommand_Output.set("DAT", [11,"DAT"]);
actualCommand_Output.set("return", [13,"STR"]);
actualCommand_Output.set("function", [3,""]);
actualCommand_Output.set("call", [15,"/*Call executed*/"]);
var type_OutputCommand = new Map();
type_OutputCommand.set("COM", actualCommand_Output);
type_OutputCommand.set("STR", actualCommand_Output);
type_OutputCommand.set("DAT", actualCommand_Output);
type_OutputCommand.set("KEY", actualCommand_Output);
nodeMap.set(10, type_OutputCommand);

var actualCommand_Output = new Map();
actualCommand_Output.set("STR", [12,"STR"]);
var type_OutputCommand = new Map();
type_OutputCommand.set("STR", actualCommand_Output);
nodeMap.set(11, type_OutputCommand);


var actualCommand_Output = new Map();
actualCommand_Output.set("=", [13,"EQUALOPE"]);
actualCommand_Output.set("equals", [13,"EQUALOPE"]);
actualCommand_Output.set("STR", [12,",STR"]);
actualCommand_Output.set("DAT", [11,";DAT"]);
actualCommand_Output.set("next", [10,"NEXT"]);
var type_OutputCommand = new Map();
type_OutputCommand.set("OPE", actualCommand_Output);
type_OutputCommand.set("STR", actualCommand_Output);
type_OutputCommand.set("DAT", actualCommand_Output);
type_OutputCommand.set("COM", actualCommand_Output);
nodeMap.set(12, type_OutputCommand);

var actualCommand_Output = new Map();
actualCommand_Output.set("STR", [14,"STR"]);
actualCommand_Output.set("next", [10,"NEXT"]);
actualCommand_Output.set("call", [15,"/*Call executed*/"]);
var type_OutputCommand = new Map();
type_OutputCommand.set("STR", actualCommand_Output);
type_OutputCommand.set("COM", actualCommand_Output);
nodeMap.set(13, type_OutputCommand);

var actualCommand_Output = new Map();
actualCommand_Output.set("+", [13,"PLUSOPE"]);
actualCommand_Output.set("-", [13,"MINUSOPE"]);
actualCommand_Output.set("x", [13,"MULTIPLYOPE"]);
actualCommand_Output.set("/", [13,"DIVIDEOPE"]);
actualCommand_Output.set("plus", [13,"PLUSOPE"]);
actualCommand_Output.set("minus", [13,"MINUSOPE"]);
actualCommand_Output.set("multiply", [13,"MULTIPLYOPE"]);
actualCommand_Output.set("divide", [13,"DIVIDEOPE"]);
actualCommand_Output.set("next", [10,"NEXT"]);
actualCommand_Output.set("STR", [12,",STR"]);
var type_OutputCommand = new Map();
type_OutputCommand.set("OPE", actualCommand_Output);
type_OutputCommand.set("COM", actualCommand_Output);
type_OutputCommand.set("STR", actualCommand_Output);
nodeMap.set(14, type_OutputCommand);

var actualCommand_Output = new Map();
actualCommand_Output.set("STR", [30,"STR("]);
var type_OutputCommand = new Map();
type_OutputCommand.set("STR", actualCommand_Output);
nodeMap.set(15, type_OutputCommand);

var actualCommand_Output = new Map();
actualCommand_Output.set("STR", [17,",STR"]);
actualCommand_Output.set("finish", [14,"FINI)"]);
var type_OutputCommand = new Map();
type_OutputCommand.set("STR", actualCommand_Output);
type_OutputCommand.set("COM", actualCommand_Output);
nodeMap.set(17, type_OutputCommand);

var actualCommand_Output = new Map();
actualCommand_Output.set("STR", [25,"STR"]);
actualCommand_Output.set("stop", [0,"STOP"]);
actualCommand_Output.set("percent", [26,"PERCENT"]);
var type_OutputCommand = new Map();
type_OutputCommand.set("STR", actualCommand_Output);
type_OutputCommand.set("COM", actualCommand_Output);
nodeMap.set(24, type_OutputCommand);

var actualCommand_Output = new Map();
actualCommand_Output.set("STR", [25,"STR"]);
actualCommand_Output.set("finish", [10,"PFIN"]);
actualCommand_Output.set("stop", [0,"STOP"]);
actualCommand_Output.set("percent", [26,"PERCENT"]);
var type_OutputCommand = new Map();
type_OutputCommand.set("STR", actualCommand_Output);
type_OutputCommand.set("COM", actualCommand_Output);
nodeMap.set(25, type_OutputCommand);

var actualCommand_Output = new Map();
actualCommand_Output.set("STR", [27,"STR"]);
var type_OutputCommand = new Map();
type_OutputCommand.set("STR", actualCommand_Output);
nodeMap.set(26, type_OutputCommand);

var actualCommand_Output = new Map();
actualCommand_Output.set("percent", [26,"PERCENT"]);
actualCommand_Output.set("STR", [25,"STR"]);
actualCommand_Output.set(",", [28,"COMMA'"]);
actualCommand_Output.set("comma", [28,"COMMA'"]);
actualCommand_Output.set("coma", [28,"COMMA'"]);
var type_OutputCommand = new Map();
type_OutputCommand.set("COM", actualCommand_Output);
type_OutputCommand.set("STR", actualCommand_Output);
nodeMap.set(27, type_OutputCommand);

var actualCommand_Output = new Map();
actualCommand_Output.set("STR", [29,"STR"]);
var type_OutputCommand = new Map();
type_OutputCommand.set("STR", actualCommand_Output);
nodeMap.set(28, type_OutputCommand);

var actualCommand_Output = new Map();
actualCommand_Output.set("STR", [29,",STR"]);
actualCommand_Output.set("finish", [10,"FINI);"]);
var type_OutputCommand = new Map();
type_OutputCommand.set("COM", actualCommand_Output);
type_OutputCommand.set("STR", actualCommand_Output);
nodeMap.set(29, type_OutputCommand);

var actualCommand_Output = new Map();
actualCommand_Output.set("STR", [17,"STR"]);
actualCommand_Output.set("finish", [14,"FINI)"]);
var type_OutputCommand = new Map();
type_OutputCommand.set("STR", actualCommand_Output);
type_OutputCommand.set("COM", actualCommand_Output);
nodeMap.set(30, type_OutputCommand);


//----------------------------------FUNCTION DONE------------------------------------------------