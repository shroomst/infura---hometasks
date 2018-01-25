//https://gist.github.com/raineorshine/c8b30db96d7532e15f85fcfe72ac719c  good ref

var tx = require('ethereumjs-tx');

function sendRaw(rawTx) {
    var privateKey = new Buffer(keyTx, 'hex');
    var transaction = new tx(rawTx);
    transaction.sign(privateKey);
    var serializedTx = transaction.serialize().toString('hex');
    web3.eth.sendRawTransaction(
        '0x' + serializedTx, function(err, result) {
            if(err) {
                console.log('error');
                console.log(err);
            } else {
                console.log('success');
                console.log(result);
            }
        });
}

if (document.getElementById("privatekey").value)
	var keyTx = document.getElementById("privatekey").value
else
	alert ("Enter private key");

if (document.getElementById("walletTx").value.length() == 40)
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

var fromTx = web3.eth.accounts.privateKeyToAccount(keyTx); //getting public key for nonce calc
console.log(fromTx);         

web3init('infura');

var nonceTx = web3.toHex(web3.eth.getTransactionCount(fromTx));   

var txData = {
	'value' : web3.toHex(valueTX),
	'to': walletTx,
	'from': fromTx,
	'nonce': nonceTx,
	'chainId': 3, //ropsten
    'gasPrice': web3.toHex(1000000000),//"0x9184e72a000"gas price set
	'gas-limit': web3.toHex(gasLimit)
}

try {
sendRaw(txData);
document.getElementById("result").innerHTML = "Success";
document.getElementById("error").innerHTML = "";
} catch  (err) {
	document.getElementById("result").innerHTML = "";
    document.getElementById("error").innerHTML = "Error: " + err;
}