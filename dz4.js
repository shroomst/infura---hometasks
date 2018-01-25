//https://etherscan.io/apis#logs
 function Events() {
      document.getElementById("commentEvent").innerHTML = "Using Etherscan API to signup for Events";

      web3init('etherscan');

      //var account = web3.eth.defaultAccount = 0x7d02E99f7f9e19aC37d762c367F55E2fBcc4bbfd;
      //http://api.etherscan.io/api?module=contract&action=getabi&address=0xb64ef51c888972c908cfacf59b47c1afbc0ab8ac&apikey=E3FR1YA69VDU5H44SND3T1NSMTYD8CDNE2

      var fromBlock = (document.getElementById("fromBlock").value > 0)
      				? document.getElementById("fromBlock").value
      				: 379224;

      var toBlock = (document.getElementById("toBlock").value > fromBlock)
      				? document.getElementById("toBlock").value
      				: 'latest';	
      var contractAddress = (document.getElementById("contractAddressEvent").value)
      				? document.getElementById("contractAddressEvent").value
      				: "0x7d02E99f7f9e19aC37d762c367F55E2fBcc4bbfd";	

      var apistring = 'https://api.etherscan.io/api?module=logs&action=getLogs&fromBlock='+fromBlock+'&toBlock='+toBlock+'&address='+contractAddress;
      
      if (document.getElementById("topicEvent").value) //search params set
      		apistring = apistring +'&topic0='+document.getElementById("topicEvent").value;

      apistring = apistring + '&apikey=E3FR1YA69VDU5H44SND3T1NSMTYD8CDNE2';

      document.getElementById("commentEvent").innerHTML = document.getElementById("commentEvent").innerHTML + 'ApiString: ' + apistring;

      $.getJSON(apistring, function (data) {

          var subscribedEvents = "";

          var reply = JSON.stringify(data.message);

          console.log("Data : " + reply);

          if (reply == "\"No records found\"") {
            document.getElementById("resultEvent").innerHTML = "No records found!";
              document.getElementById("error").innerHTML = "";
          } else {

            var subscribedEvents = JSON.parse(data.result);

            if (subscribedEvents != ''){
                console.log("Events Subscription : " + data.result);
                document.getElementById("resultEvent").innerHTML = data.result;
                document.getElementById("error").innerHTML = "";
            } else {
                console.log("Error. Abi not retrieved." );
                document.getElementById("error").innerHTML = 'Error. Not subscribed.';
                document.getElementById("resultEvent").innerHTML = "";
            }
          }            
      });

    }