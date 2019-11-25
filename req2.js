$(criarEvento);


function criarEvento(){
		var languages = ['javascript', 'java', 'php', 'haskell', 'ruby'];
		table = [];
		for(let s in languages){
			table[s] = [ languages[s] ];

			//var itemLinguagens = document.createElement('li');
			//itemLinguagens.innerHTML = languages;

			//listaResultado = document.createElement('ul');
			sendReq('https://google.com/search?q='+languages[s]+'&sourceid=chrome&ie=UTF-8',s);
			sendReq('https://stackoverflow.com/questions/tagged/'+languages[s],s);
			setTimeout(function() { sendReq('https://github.com/search?q=language%3A'+languages[s],s) }, 2500);

			//listaLinguagens.appendChild(itemLinguagens);
			//listaLinguagens.appendChild(listaResultado);
			//document.body.appendChild(listaLinguagens);
		}

		setTimeout(function() { montaTabela(table); }, 5000);
 	    // retorna um array onde:
		// table = [ [ linguagem, google, stackoverflow, github ], ... ]
}

function montaTabela(ordenados){
	var lista = document.querySelector('#lista');
	ordenados.sort(function (a, b) {
		if (a[3] > b[3]) {
		  return -1;
		}
		if (a[3] < b[3]) {
		  return 1;
		}
		// a must be equal to b
		return 0;
	  });
	
	for (let i = 0; i < ordenados.length; i++){
		var item = document.createElement('li');
		item.className = 'border';
	
		var boxConteudo = document.createElement('div');
		boxConteudo.className = 'content';
	
		var colocacao = document.createElement('span');
		var nomeLinguagem = document.createElement('h2');
		var listaNumeros = document.createElement('ul');
	
		var google = document.createElement('li');
		var stackoverflow = document.createElement('li');
		var github = document.createElement('li'); 
	
		colocacao.innerHTML = i+1;
		nomeLinguagem.innerHTML = ordenados[i][0];
		google.innerHTML = ordenados[i][1];
		stackoverflow.innerHTML = ordenados[i][2];
		github.innerHTML = ordenados[i][3];

		listaNumeros.appendChild(github);
		listaNumeros.appendChild(stackoverflow);
		listaNumeros.appendChild(google);
		
		boxConteudo.appendChild(colocacao);
		boxConteudo.appendChild(nomeLinguagem);
		boxConteudo.appendChild(listaNumeros);
		
		item.appendChild(boxConteudo);
		lista.appendChild(item);
	}
	
	// atualiza horário
	document.querySelector('header > span').innerHTML = 'Gerado em ' + new Date().toLocaleString('pt-BR');
}

function rasparPagina(documento, url, s){

	// Como cada site precisa de uma regra específica, é necessário 
	// determinar de qual site estamos raspando os dados
	if(url.split('/')[2] == 'google.com'){
		let linhaContador = documento.querySelector('#resultStats');
			// Deixa só os números do resultado
			let filtro = linhaContador.innerHTML.replace('Aproximadamente ', '');
			filtro = filtro.replace(/[ ,.]/g, "");;
			table[s][1] = parseInt(filtro.split('resultados')[0]);

			//let itemResultado = document.createElement('li');
			//itemResultado.innerHTML = 'Google: '+filtro;
			//listaResultado.appendChild(itemResultado);
	}
	else if(url.split('/')[2] == 'stackoverflow.com'){
		let linhaContador = documento.querySelector('.fs-body3');
			// Deixa só os números do resultado
			let filtro = linhaContador.innerText.replace(/\s/g, '');
			table[s][2] = parseInt(filtro.replace(/[ ,.]/g, ""));

			//let itemResultado = document.createElement('li');
			//itemResultado.innerHTML = 'StackOverflow: '+filtro;
			//listaResultado.appendChild(itemResultado);
	}
	else if(url.split('/')[2] == 'github.com'){
		let linhaContador = documento.querySelector('.pb-3 > h3 > span.v-align-middle');
			// Deixa só os números do resultado
			let filtro = linhaContador.innerHTML.split('a')[0];
			filtro = filtro.replace(/(\r\n|\n|\r)/gm,"")
			filtro = filtro.replace(/[ ,.]/g, "");
			table[s][3] = parseInt(filtro.replace("Showing", ""));
			table[s][4] = table[s][1] + table[s][2] + table[s][3];
					
			//let itemResultado = document.createElement('li');
			//itemResultado.innerHTML = 'GitHub: '+filtro;
			//listaResultado.appendChild(itemResultado);
	}
}

function sendReq(url,s){	
	var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					var parser = new DOMParser();
					var documento = parser.parseFromString(this.responseText, 'text/html');
					rasparPagina(documento, url, s);
		}
	};
	//https://cors-anywhere.herokuapp.com/
    xhttp.open('GET', 'https://cors-anywhere.herokuapp.com/'+url, true);
    xhttp.send();
}


