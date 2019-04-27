//Create a gamesparks object to be used
var gamesparks = new GameSparks();

//Initialse the SDK
function BEinit() {
    gamesparks.initPreview({
        key: "U379209tj7FM", // document.getElementById('apiKey').value, 
        secret: "", // document.getElementById('apiSecret').value,
        credential: "", // document.getElementById('apiCredential').value,
        onNonce: onNonce,
        onInit: onInit,
        onMessage: onMessage,
        // logger: console.log,
    });
}

//Callback function to hmac sha256 a nonce with the secret. It's assumed you will have your own method of securing the secret;
function onNonce(nonce) {
    // return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(nonce, document.getElementById('apiSecret').value));
    // console.log('onNonce');
    let xhttp = new XMLHttpRequest();
    let url = "https://node.automaticom.cloud:9090/" + nonce;
    // xhttp.onreadystatechange = function() {
    //     if (xhttp.readyState == 4 && xhttp.status == 200) {
    //         console.log('Response from xhttp.onreadystatechange: ' + xhttp.responseText);
    //         return xhttp.responseText;
    //     }
    // }
    // xhttp.timeout = 4000;
    xhttp.open("GET", url, false);
    xhttp.send();
    // console.log('Response from xhttp.onreadystatechange: ' + xhttp.responseText);
    return xhttp.responseText;
}

//Callback to handle when the SDK is initialised and ready to go
function onInit() {
    // console.log("Initialised");
    registerDevice();
}

//Callback to handle async messages from the gamesparks platform
function onMessage(message) {
    // console.log("onMessage");
}

//Response handler examples
// function registerResponse(response) {
//     console.log('registerResponse: ' + JSON.stringify(response));
// }

// function loginResponse(response) {
//     console.log('loginResponse: ' + JSON.stringify(response));
// }

function accountDetailsResponse(response) {
    // console.log('accountDetailsResponse: ' + JSON.stringify(response));
}

function customEvent() {
    gamesparks.sendWithData(
        "LogEventRequest", 
        {
            eventKey : "FIRST_EVENT",
            NUMBER_ATTR : 123,
            STRING_ATTR : "this is a string",
            JSON_ATTR : {key1 : 12, key2 : "abc"}
        }, 
        function(response){
            // console.log(JSON.stringify(response));
        }
    );
}

function eventSendScore() {
    // console.log('eventSendScore');
    if (gameStats.score > 0) {
        gamesparks.sendWithData(
            "LogEventRequest", 
            {
                eventKey : "BLOCKOUT_END_GAME_SCORE",
                END_GAME_SCORE: gameStats.score
            }, 
            function(response){
                // console.log(JSON.stringify(response));
            }
        );
    }
}


function registerDevice() {
    var request = {};
		request["deviceId"] = "xxx";
		request["deviceModel"] = "xxx";
		request["deviceName"] = "xxx";
		request["deviceOS"] = "xxx";
		request["deviceType"] = "xxx";
		request["operatingSystem"] = "xxx";
    gamesparks.sendWithData("DeviceAuthenticationRequest", request, registerDeviceResponse);
}

function registerDeviceResponse() {
    requestLeaderboard();
}

function checkName() {
    let input = document.getElementById('playerName').value;
    if (input != '') {
        playerName = input;
        // console.log('register name: ' + playerName);
        gamesparks.authenticationRequest("123", playerName, loginResponse)
    }
    return false;
}

function loginResponse(response) {
    // console.log('loginResponse: ' + JSON.stringify(response));
    if (response.error) {
        gamesparks.registrationRequest(playerName, "123", playerName, registerResponse)
    } else {
        playerName = document.getElementById('playerName').value;
        drawUI.hideNameForm();
    }
}
function registerResponse(response) {
    // console.log('registerResponse: ' + JSON.stringify(response));
    if (response.error) {
        // console.log('FAILED TO REGISTER');
        playerName = '';
        drawUI.showNameForm();
    } else {
        playerName = document.getElementById('playerName').value;
        drawUI.hideNameForm();
    }
}

function requestLeaderboard() {
    var request = {};
		request["entryCount"] = 10;
		request["leaderboardShortCode"] = 'BLOCKOUT_LEADERBOARD';
    gamesparks.sendWithData("LeaderboardDataRequest", request, onLeaderboardResponse);
}
function onLeaderboardResponse(response) {
    console.log('onLeaderboardResponse: ' + JSON.stringify(response));
    game.leaderboard = response.data;
}

// var apiKey = "2974660weiMa";
// var apiSecret = "p5pFVnohi5eWPYETb4aPgeMLtd95bjfJ";
// var myTimer = null;
// var myRTSession = function() {};
// var numCycles = 0;

// myRTSession.started = false;
// myRTSession.onPlayerConnectCB = null;
// myRTSession.onPlayerDisconnectCB = null;
// myRTSession.onReadyCB = null;
// myRTSession.onPacketCB = null;
// myRTSession.session = null;

// myRTSession.start = function(connectToken, host, port) {
//     var index = host.indexOf(":");
//     var theHost;

//     if (index > 0) {
//         theHost = host.slice(0, index);
//     } else {
//         theHost = host;
//     }

//     console.log(theHost + " : " + port);

//     myRTSession.session = GameSparksRT.getSession(connectToken, theHost, port, myRTSession);
//     if (myRTSession.session != null) {
//         myRTSession.started = true;

//         myRTSession.session.start();
//     } else {
//         myRTSession.started = false;
//     }
// };

// myRTSession.stop = function() {
//     myRTSession.started = false;

//       if (myRTSession.session != null) {
//         myRTSession.session.stop();
//       }
// };

// myRTSession.log = function(message) {
//     var peers = "|";

//     for (var k in myRTSession.session.activePeers) { 
//         peers = peers + myRTSession.session.activePeers[k] + "|";
//     }

//     console.log(myRTSession.session.peerId + ": " + message + " peers:" + peers);
// };

// myRTSession.onPlayerConnect = function(peerId) {
//     myRTSession.log(" OnPlayerConnect:" + peerId);

//     if (myRTSession.onPlayerConnectCB != null) {
//         myRTSession.onPlayerConnectCB(peerId);
//     }
// };

// myRTSession.onPlayerDisconnect = function(peerId) {
//     myRTSession.log(" OnPlayerDisconnect:" + peerId);

//     if (myRTSession.onPlayerDisconnectCB != null) {
//         myRTSession.onPlayerDisconnectCB(peerId);
//     }
// };

// myRTSession.onReady = function(ready) {
//     myRTSession.log(" OnReady:" + ready.toString());

//     if (myRTSession.onReadyCB != null) {
//         myRTSession.onReadyCB(ready);
//     }
// };

// myRTSession.onPacket = function(packet) {
//     myRTSession.log(" OnPacket:" + packet.toString());

//     if (myRTSession.onPacketCB != null) {
//         myRTSession.onPacketCB(packet);
//     }
// };

// function testRT() {
//     myRTSession.stop();

//     gamesparks.initPreview({
//         key: apiKey, 
//         secret: apiSecret,
//         credential: "",
//         onNonce: onNonceRT,
//         onInit: onInitRT,
//         onMessage: onMessageRT,
//         logger: console.log,
//     });
// }

// function onNonceRT(nonce) {
//     return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(nonce, apiSecret));
// }

// function onInitRT() {
//     console.log("Initialised");

//     gamesparks.deviceAuthenticationRequest((Math.floor(Math.random() * (999 - 1)) + 1).toString(), null, null, "js", null, null, function(response) {
//         if (response.error) {
//             console.error(JSON.stringify(response.error));
//         } else {
//             sendMatchmakingRequest();
//         }
//     });
// }

// //Callback to handle async messages from the gamesparks platform
// function onMessageRT(message) {
//     //console.log("message " + JSON.stringify(message));
//     if (message["@class"] === ".MatchFoundMessage") {
//         var accessToken = message["accessToken"];
//         var host = message["host"];
//         var port = message["port"];

//         myRTSession.stop();

//         if (myTimer) {
//             clearTimeout(myTimer);
//         }

//         myTimer = setInterval(mainRTLoop, 10);

//         myRTSession.start(accessToken, host, port);
//     } else if (message["@class"] === ".MatchNotFoundMessage") {
//         console.log("MATCH NOT FOUND");

//         sendMatchmakingRequest();
//     }
// }

// function sendMatchmakingRequest() {
//     gamesparks.sendWithData("MatchmakingRequest",
//         {
//             skill: 1,
//             matchShortCode: "Match_STD"
//         },
//         function(response) {
//             if (response.error) {
//                 console.error(JSON.stringify(response.error));
//             } else {
//                 console.log("Match OK...");
//             }
//         }
//     );
// }

// function mainRTLoop() {
//     if (myRTSession.started) {
//         myRTSession.session.update();

//         var data = RTData.get();

//         data.setLong(1, numCycles);

//         myRTSession.session.sendRTData(1, GameSparksRT.deliveryIntent.RELIABLE, data, []);

//         numCycles ++;
//     }
// }