//https://gist.github.com/raineorshine/c8b30db96d7532e15f85fcfe72ac719c  good ref
//https://github.com/ethereumjs/ethereumjs-tx/blob/master/examples/transactions.js
//http://web3js.readthedocs.io/en/1.0/web3-eth-personal.html#sign

//var tx = require('ethereumjs-tx');

function sendRaw(rawTx) {
	
    var privateKey = new Buffer(keyTx, 'hex'); // Reference Error, Buffer is not defined. проверял в библиотеке ethereum-tx Buffer описан, вроед должно работать, но нет
    											// в мануалах свежих вызывают Buffer.from(key.Tx,'hex') но тоже не работает.
    var transaction = new tx(rawTx); // не совсем ясно обращение здесь new tx ИЛИ new transaction - в разных мануалах по разному описано.
    transaction.sign(privateKey);
    //web3.eth.personal.sign(transaction, "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe", "test password!").then(console.log); онлайн подпись через Web3.JS
    var serializedTx = transaction.serialize().toString('hex');
    console.log('Serialized TX: '+serializedTx);
    var feeCost = transaction.getUpfrontCost();
	transaction.gas = feeCost;
	console.log('Gas cost: '+feeCost);
    web3.eth.sendRawTransaction(
        '0x' + serializedTx, function(err, result) {
            if(err) {
                console.log('Error: ' + err);
                throw(err);
;            } else {
                console.log('Success: ' + result);
                console.log(result);
                return result;
            }
        });
}

function signTransaction() {

	web3init('infura');


	if (document.getElementById("privatekey").value)
		var keyTx = document.getElementById("privatekey").value
	else
		alert ("Enter private key");

	if (document.getElementById("walletTx").value)
		var walletTx = document.getElementById("walletTx").value
	else
		alert ("Enter correct wallet");

	if (document.getElementById("valueTx").value > 0)
		var valueTx = document.getElementById("valueTx").value
	else
		alert ("Enter correct value");

	var gasLimit = (document.getElementById("gasLimit").value > 0)
	            ? document.getElementById("gasLimit").value
	            : 300000;

	//var fromTx = web3.eth.accounts.privateKeyToAccount(keyTx); //getting public key for nonce calc requires node

	fromTx = "0x7d02E99f7f9e19aC37d762c367F55E2fBcc4bbfd";

	console.log('From: '+ fromTx);  
	let nonceCurrent = web3.eth.getTransactionCount(fromTx);
	let nonceTx = web3.toHex(nonceCurrent + 1) ;   
	console.log('Nonce:' + nonceCurrent); // schitaet verno!

	var txData = {
		'value' : web3.toHex(valueTx),
		'to': walletTx,
		'from': fromTx,
		'nonce': nonceTx,
		'chainId': 3, //EIP 155 chainId - mainnet: 1, ropsten: 3
	    'gasPrice': web3.toHex(1000),//gas price set
		'gasLimit': web3.toHex(gasLimit)
	}

	try {
	var resultSend = sendRaw(txData);
	document.getElementById("result").innerHTML = "Success: "+ resultSend;
	document.getElementById("error").innerHTML = "";
	} catch  (err) {
		document.getElementById("result").innerHTML = "";
	    document.getElementById("error").innerHTML = "Error: " + err;
	}
}