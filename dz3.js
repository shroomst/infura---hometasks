// https://github.com/ethereum/web3.js/blob/develop/example/contract.html
// https://ethereum.stackexchange.com/questions/22983/web3-eth-contract-is-not-a-function-when-making-contract web3 version changes
// https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#eth-contract web3 manual
// https://github.com/ethereum/wiki/wiki/JavaScript-API#contract-methods JS api

//https://blog.infura.io/getting-started-with-infura-28e41844cc89 infura examples

var Web3 = require('web3');
var web3;


function web3init(who) {

     if (typeof web3 !== 'undefined') {
          web3 = new Web3(web3.currentProvider);
          console.log("Web 3 Detected!")
        } else {
          if (who == 'etherscan') 
            web3 = new Web3(new Web3.providers.HttpProvider())
          else
            web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/AJIkbhOE6PprIaonxYSS"));
          var version = web3.version.api;
          console.log("Web 3 not found. Intialized. Version: "+ version);
        }
}

function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
  }

function changevalue(){

    var tokenContractAddress = (document.getElementById("ContractAddress").value)
            ? document.getElementById("ContractAddress").value
            : 0xa6439DBB7355458bb022c4eB12ffD78D3977aC70;

    var abi = (document.getElementById("ContractABI").value)
            ? document.getElementById("ContractABI").value
            : [{"constant":false,"inputs":[{"name":"key","type":"string"},{"name":"value","type":"string"}],"name":"setData","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"key","type":"string"}],"name":"getData","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}];

    var key = (document.getElementById("setKey").value)
            ? document.getElementById("setKey").value
            : 0x7d02E99f7f9e19aC37d762c367F55E2fBcc4bbfd;

    var ValueForKey = (document.getElementById("setValue").value)
            ? document.getElementById("setValue").value
            : randomInteger(10, 10000);          

    //-----------------ETHERSCAN------------------

    if ($('input[name=chooseMethod]:checked').val() == "etherscan") {//etherscan
      document.getElementById("comment").innerHTML = "Using Etherscan to retrieve ABI of STORJ 0xb64ef51c888972c908cfacf59b47c1afbc0ab8ac";

      web3init('etherscan');

      var account = web3.eth.defaultAccount = 0x7d02E99f7f9e19aC37d762c367F55E2fBcc4bbfd;
      //http://api.etherscan.io/api?module=contract&action=getabi&address=0xb64ef51c888972c908cfacf59b47c1afbc0ab8ac&apikey=E3FR1YA69VDU5H44SND3T1NSMTYD8CDNE2      
      $.getJSON('http://api.etherscan.io/api?module=contract&action=getabi&address=0xb64ef51c888972c908cfacf59b47c1afbc0ab8ac&apikey=E3FR1YA69VDU5H44SND3T1NSMTYD8CDNE2', function (data) {
          var contractABI = "";
          contractABI = JSON.parse(data.result);
          if (contractABI != ''){
              let MyContract = web3.eth.contract(contractABI);
              let myContractInstance = MyContract.at(tokenContractAddress);
              //var result = myContractInstance.memberId(account);
              //console.log("ABI for STORJ : " + result);            
              //var result = myContractInstance.members(1);
              console.log("ABI : " + data.result);
              document.getElementById("result").innerHTML = data.result;
              document.getElementById("error").innerHTML = "";
          } else {
              console.log("Error. Abi not retrieved." );
              document.getElementById("error").innerHTML = 'Error. Abi not retrieved.';
              document.getElementById("result").innerHTML = "";
          }            
      });
     

    } 
    //----------------INFURA--------------------
    else { // web3infura
      document.getElementById("comment").innerHTML = "Using Infura.";
      web3init('infura');
      var account = web3.eth.defaultAccount = 0x7d02E99f7f9e19aC37d762c367F55E2fBcc4bbfd;

      try {    

          var myContractInstance = new web3.eth.contract(abi).at(tokenContractAddress);

          //alert(JSON.stringify(myContractInstance));
          //var Mycontract = new web3.eth.Contract(abi, tokenContractAddress); older version compiles

          

          myContractInstance.methods.setData().call(key, ValueForKey, {value: 0, gas: 20000, from: account}); // Cannot read property 'eth' of undefined

          //myContractInstance.methods.setData(key, ValueForKey).call({value: 0, gas: 20000, from: account}); // Cannot read property 'eth' of undefined

          //myContractInstance.setData(key, ValueForKey, {value: 0, gas: 20000, from: account}); //is not a function wtf

          let result1 = myContractInstance.getData(key);// this._eth.call is not a function

          //myContractInstance.getData(tokenContractAddress, function(result1){
          //    document.getElementById("result").innerHTML = "Loaded value: " + result1;
          //    });

          document.getElementById("result").innerHTML = "Loaded value: " + result1;
          document.getElementById("error").innerHTML = "";

          

          //Mycontract.getData.call({'key': account});
          /*
           tx = {
            value: '0x0', 
            from: account,
            to: tokenContractAddress,
            data: Mycontract.methods.getData(account).encodeABI(),  
          }
          */
          } catch (err) {
              document.getElementById("result").innerHTML = "";
              document.getElementById("error").innerHTML = err;
          }
    }
  }