//Efeito visual na página index
function mostraBotaoLtc(){
	document.getElementById('botao-ltc').style.display = "inline";
}
function fechaBotaoLtc(){
	document.getElementById('botao-ltc').style.display = "none";
}
function mostraBotaoBtc(){
	document.getElementById('botao-btc').style.display = "inline";
}
function fechaBotaoBtc(){
	document.getElementById('botao-btc').style.display = "none";
}
//A partir daqui verifica a cotação de ltc ao carregar a página

function cotacaoLtc(){
	$.get("https://chain.so/api/v2/get_price/LTC/USD", function(response){
	$("body")
		// .append("Name " + response.data.prices[3].exchange + "<br />")
		// .append("Cotação " + response.data.prices[3].price + "<br />")
		document.getElementById("exchange").innerHTML = response.data.prices[3].exchange
		document.getElementById("cotacaoLtc").innerHTML = response.data.prices[3].price
	}, "json");
}

//A partir daqui carrega tabela com infos de endereço de litecoin
function infosLtc(){	
	document.getElementById("loading").style = "margin-top:40px; margin-left: 45px; width: 300px;";
	function criarTabela(conteudo) {
		var tabela = document.createElement("table");
		var thead = document.createElement("thead");
		var tbody=document.createElement("tbody");
		var thd=function(i){return (i==0)?"th":"td";};
  		for (var i=0;i<conteudo.length;i++) {
		    var tr = document.createElement("tr");
		    for(var o=0;o<conteudo[i].length;o++){
		    var t = document.createElement(thd(i));
		    var texto=document.createTextNode(conteudo[i][o]);
		    t.appendChild(texto);
		    tr.appendChild(t);	
		    }
		    (i==0)?thead.appendChild(tr):tbody.appendChild(tr);
		}
  	tabela.appendChild(thead);
  	tabela.appendChild(tbody);
  	return tabela;
	}

			var endereco = document.getElementById('endereco').value;
			if (endereco == '') {
				alert("Digite um endereço para pesquisar.");
			}
			$.get("https://chain.so/api/v2/get_tx_received/LTC/" + endereco, function(response){
				$("body")
				//Preenche um array com as informaçoes de valor, confirmação e data
				document.getElementById("tabela").appendChild(criarTabela([['Valor: ', 'Confirmação: ',  'Data: ']]));
				for (var i = 0; i<response.data.txs.length; i++){
					var vvalor = response.data.txs[i].value
					var cconf = response.data.txs[i].confirmations

					var time = parseInt(response.data.txs[i].time + '000')
					var data = new Date(time);

					var dia = data.getDate();
					var mes = data.getMonth() + 1;
					var ano = data.getFullYear();
					
					var formataData =   dia +'/'+ mes +'/'+ ano;

					document.getElementById("tabela").appendChild(criarTabela([[vvalor, cconf,formataData]]));
				}		
				document.getElementById("loading").style = "display:none;";	
			}, "json");
		
}
