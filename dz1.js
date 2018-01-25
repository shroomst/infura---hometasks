function listMethods() {

    let request = new XMLHttpRequest();

    request.open('GET', 'https://api.infura.io/v1/jsonrpc/ropsten/methods');

    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Accept', 'application/json');

    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        console.log('Status:', this.status);
        console.log('Headers:', this.getAllResponseHeaders());
        console.log('Body:', this.responseText);
        let response = JSON.parse(this.responseText);
        console.log('Response:', response);
        if (response['error']) {
            document.getElementById("error").innerHTML  = "Error! "+ response['error']['message'];
            document.getElementById("methodslisted").innerHTML = "";
        }
        else{
            document.getElementById("error").innerHTML  = "";
            document.getElementById("methodslisted").innerHTML = "<h3 style='color:red'>GET: </h3>" 
                            + response['get'].toString().split(",").join("<br/>") 
                            + "<br /><h3 style='color:red'> POST: </h3>" 
                            + response['post'].toString().split(",").join("<br/>");
        }
      }
    };

    request.send();
}

function checkBalance() {

    let request = new XMLHttpRequest();

    let wallet = document.getElementById("walletBalance").value;

    let params = [wallet, "latest"];

    request.open('GET', 'https://api.infura.io/v1/jsonrpc/ropsten/eth_getBalance?params=' + encodeURIComponent(JSON.stringify(params)));

    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Accept', 'application/json');

    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        console.log('Status:', this.status);
        console.log('Headers:', this.getAllResponseHeaders());
        console.log('Body:', this.responseText);
        let response = JSON.parse(this.responseText);
        console.log('Response:', response['error']);
        if (response['error']) {
            document.getElementById("error").innerHTML  = "Error! "+ response['error']['message'];
            document.getElementById("methodslisted").innerHTML = "";
        }
        else{
            document.getElementById("error").innerHTML  = "";
            document.getElementById("methodslisted").innerHTML = "Balance for "+ wallet+" is: " + parseInt(response['result'],16);
        }
      }
    };

    request.send();
}