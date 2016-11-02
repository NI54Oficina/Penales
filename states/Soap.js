var url =  "http://"+document.domain+"/games";



function GetSession(callback) {
	$.post (url+"/getSession", function (response) {
		callback(JSON.parse(response));
	});
}

function SubtractCredit(userId, gameId, callback) {
	$.post (url+"/subtractCredit",{ id: userId,game: gameId}, function (response) {
		callback(JSON.parse(response));
	});
}

function SendScore (score, partidaId, callback) {
	$.post (url+"/sendScore",{score: score, id: partidaId}, function (response) {
		callback(JSON.parse(response));
	});
}

/*var url = './soap/soap.php';
function GetSession(callback) {
	var hardCodedResponse = [];
	var objectHardCoded = {};
	objectHardCoded.id = 1;
	objectHardCoded.username = "Pepito";
	objectHardCoded.credits = 3000;
	objectHardCoded.points = 3000;
	hardCodedResponse.push (objectHardCoded);
	callback (hardCodedResponse);
}

function SubtractCredit(userId, gameId, callback) {
	var hardCodedResponse = [];
	var objectHardCoded = {};
	objectHardCoded.id = 123;
	objectHardCoded.score = 20;
	objectHardCoded.index = Math.floor((Math.random() * 12));
	hardCodedResponse.push (objectHardCoded);
	callback (hardCodedResponse);
}

function SendScore (score, partidaId, callback) {
	var hardCodedResponse = [];
	var objectHardCoded = {};
	objectHardCoded.saved = 1;
	hardCodedResponse.push (objectHardCoded);
	callback (hardCodedResponse);
}*/