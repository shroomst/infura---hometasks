// https://github.com/ethereum/web3.js/blob/develop/example/contract.html
// https://ethereum.stackexchange.com/questions/22983/web3-eth-contract-is-not-a-function-when-making-contract web3 version changes
// https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#eth-contract web3 manual
// https://github.com/ethereum/wiki/wiki/JavaScript-API#contract-methods JS api

//https://blog.infura.io/getting-started-with-infura-28e41844cc89 infura examples

// get eth_call through proxy - байткод
// eth_call создавать транзу и подписывать
// let request = new XMLHttpRequest();

//    request.open('GET', 'https://api.infura.io/v1/jsonrpc/ropsten/methods');

//    request.setRequestHeader('Content-Type', 'application/json');
//    request.setRequestHeader('Accept', 'application/json');


var web3;

if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
            console.log("Web 3 Detected!")
          } else {
            //web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/AJIkbhOE6PprIaonxYSS"))
            web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
            var version = web3.version.api;
            console.log("Web 3 not found. Intialized. Version: "+ version);
          }

function CreateAccount() {

try {

  let pass = document.getElementById("createPass").value;
  console.log("PassPhrase: " + pass);
  web3.eth.personal.newAccount(pass)
    .then(function(env) {
      document.getElementById("resultEventAcc").innerHTML = "Account created! <br>Address: " + env + " <br>Passphrase: " + pass;
      document.getElementById("error").innerHTML = "";
  });

  } catch (err) {
  document.getElementById("resultEventAcc").innerHTML = "";
  document.getElementById("error").innerHTML = error;
  }


}

function Unblock() {

try {
  let pass = document.getElementById("createPass").value;
  let acc = document.getElementById("accountNumber").value;
  console.log("Account to Unlock: " + acc);
  console.log("PassPhrase: " + pass);
  console.log("Web3 Object: " + JSON.stringify(web3));
  web3.eth.personal.TimedUnlock(acc, pass, 60);
  document.getElementById("resultEventAcc").innerHTML = "Successfully unlocked for 1 minute";
  document.getElementById("error").innerHTML = "";
  } catch (error) {
    document.getElementById("resultEventAcc").innerHTML = "";
    document.getElementById("error").innerHTML = error;
  }
}

function block() {

  try {
  let acc = document.getElementById("accountNumber").value;
  console.log("Account to lock: " + acc);
  web3.eth.personal.Lock(acc, pass, 60);
  document.getElementById("resultEventAcc").innerHTML = "Successfully unlocked for 1 minute";
  document.getElementById("error").innerHTML = "";
  } catch (error) {
    document.getElementById("resultEventAcc").innerHTML = "";
    document.getElementById("error").innerHTML = error;
  }

}
