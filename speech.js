var currentState = 0;
var finalStringStack = [];
var TO = -1;
var FROM = -1;

function readOutLoud(message) {
    var speech = new SpeechSynthesisUtterance();

    // Set the text and voice attributes.
    speech.text = message;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}

// Test browser support
window.SpeechRecognition = window.SpeechRecognition       ||
    window.webkitSpeechRecognition ||
    null;

if (window.SpeechRecognition === null) {
    document.getElementById('ws-unsupported').classList.remove('hidden');
    document.getElementById('button-play-ws').setAttribute('disabled', 'disabled');
    document.getElementById('button-stop-ws').setAttribute('disabled', 'disabled');
} else {
    var recognizer = new window.SpeechRecognition();
    var transcription = document.getElementById('transcription');
    var log = document.getElementById('log');

    // Recogniser doesn't stop listening even if the user pauses
    recognizer.continuous = true;

    // Start recognising
    recognizer.onresult = function(event) {
        //transcription.textContent = '';

        for (var i = event.resultIndex; i < event.results.length; i++) {

            var speechString = event.results[i][0].transcript.split(" ");

            if(speechString.length > 0) {
                for (var j = 0; j < speechString.length; j++) {

                    var speechWord = toLowerCase(speechString[j]);

                    if(speechWord.trim() == "remove" ){
                        if(finalStringStack.length > 0){
                            var stackTop = finalStringStack.pop();
                            currentState = stackTop[1];
                            var lengthOfLastCodeword = stackTop[2].length;
                            readOutLoud("Removed " + stackTop[2]);
                            console.log("Codeword from stack: "+ stackTop[2] + "Length: "+lengthOfLastCodeword);
                            var newSubstring = transcription.textContent;
                            var finalString = newSubstring.substring(0, transcription.textContent.length - lengthOfLastCodeword);
                            console.log(finalString);
                            transcription.textContent = finalString;
                        }
                    }
                    else if(speechWord != "") {
                        console.log("Unmapped speechWord: ", speechWord);
                        var typeOfSpeechWord = detectType(speechWord);
                        console.log("Unmapped speechWord type: ", typeOfSpeechWord);
                        var mapOutput;
                        FROM = currentState;
                        try {
                            if (typeOfSpeechWord == "STR" || typeOfSpeechWord == "DAT") {
                                mapOutput = nodeMap.get(currentState).get(typeOfSpeechWord).get(typeOfSpeechWord)[1];
                                currentState = nodeMap.get(currentState).get(typeOfSpeechWord).get(typeOfSpeechWord)[0];
                            }
                            else {
                                mapOutput = nodeMap.get(currentState).get(typeOfSpeechWord).get(speechWord)[1];
                                currentState = nodeMap.get(currentState).get(typeOfSpeechWord).get(speechWord)[0];
                            }
                        }catch(err){
                            console.log("Unrecognized command");
                            readOutLoud("Unrecognized command");
                        }
                        console.log("mapOutput: " + mapOutput);
                        TO = currentState;
                        var codeWord = "-ND-";

                        if(mapOutput.trim() == "FINI)"){
                          codeWord = ")";
                        } else if(mapOutput.trim() == "FINI);"){
                            codeWord = " );\n";
                        } else if(mapOutput.trim() == "COMMA"){
                            codeWord = ", ";
                        } else if(mapOutput.trim() == "COMMA'"){
                            codeWord = "\", ";
                        } else if(mapOutput.trim() == "PERCENT"){
                            codeWord = " %";
                        } else if(mapOutput.trim() == ";DAT"){
                            codeWord = " ;\n";
                            if (speechWord.trim() == "integer") {
                                codeWord += "int ";
                            }else if(speechWord.trim() == "character"){
                                codeWord += "char ";
                            } else {
                                codeWord += speechWord + " ";
                            }
                        } else if(mapOutput.trim() == ",STR"){
                          codeWord = " , " + speechWord;
                        } else if(mapOutput.trim() == "NEXT"){
                          codeWord = " ; \n"
                        } else if(mapOutput.trim() == "DIVIDEOPE"){
                          codeWord = "/ ";
                        } else if(mapOutput.trim() == "MULTIPLYOPE"){
                            codeWord = "* ";
                        } else if(mapOutput.trim() == "PLUSOPE"){
                            codeWord = "+ ";
                        }else if(mapOutput.trim() == "MINUSOPE"){
                            codeWord = "- ";
                        } else if(mapOutput.trim() == "EQUALOPE"){
                            codeWord = " = ";
                        } else if(mapOutput.trim() == "STOP"){
                            codeWord = "}\n";
                        }
                        else if(mapOutput.trim() == "PFIN"){
                            codeWord = "\");\n";
                        } else if(mapOutput.trim() == "PRINTF"){
                                codeWord = "printf(\" ";
                        }else if(mapOutput.trim() == "OPEN"){
                            codeWord = " { \n";
                        }else if(mapOutput.trim() == "SEMNEW"){
                            codeWord = ";\n";
                        } else if(mapOutput == ")"){
                            codeWord = ") ";
                        }else if(mapOutput == ",DAT"){
                            codeWord = " , ";
                            if (speechWord.trim() == "integer") {
                                codeWord += "int ";
                            }else if(speechWord.trim() == "character"){
                                codeWord += "char ";
                            } else {
                                codeWord += speechWord + " ";
                            }
                        }
                        else if(mapOutput == "STR"){
                            codeWord = speechWord + " ";
                        } else if(mapOutput == "STR("){

                            codeWord = speechWord + "( ";

                        }
                        else if (mapOutput == "STR.H") {
                            if (speechWord == "std") {
                                codeWord = "stdio.h >\n";
                            } else {
                                codeWord = speechWord + ".h >\n";
                            }
                        }else if(mapOutput == "DAT"){
                            console.log("Datatype found: " + "SpeechWord: " + speechWord);
                            if (speechWord.trim() == "integer") {
                                codeWord = "int ";
                            } else {
                                codeWord = speechWord + " ";
                            }
                        }else {

                            codeWord = mapOutput;
                        }
                        console.log("CODE WORD: ", codeWord);
                        console.log("------->Current State: ", currentState);
                        if (codeWord !== undefined) {
                            var type = detectType(codeWord);

                            transcription.textContent += codeWord;
                        }


                        var listToPush = new Array(4);
                        listToPush[0] = TO;
                        listToPush[1] = FROM;
                        listToPush[2] = codeWord;
                        readOutLoud(codeWord);
                        finalStringStack.push(listToPush);
                    }
                }
            }
        }
    };

    // Listen for errors
    recognizer.onerror = function(event) {
        log.innerHTML = 'Recognition error: ' + event.message + '<br />' + log.innerHTML;
    };

    document.getElementById('button-play-ws').addEventListener('click', function() {
        // Set if we need interim results
        recognizer.interimResults = document.querySelector('input[name="recognition-type"][value="interim"]').checked;

        try {
            recognizer.start();
            log.innerHTML = 'Recognition started' + '<br />' + log.innerHTML;
        } catch(ex) {
            log.innerHTML = 'Recognition error: ' + ex.message + '<br />' + log.innerHTML;
        }
    });

    document.getElementById('button-stop-ws').addEventListener('click', function() {
        recognizer.stop();
        log.innerHTML = 'Recognition stopped' + '<br />' + log.innerHTML;
    });

    document.getElementById('clear-all').addEventListener('click', function() {
        transcription.textContent = '';
        log.textContent = '';
    });
}