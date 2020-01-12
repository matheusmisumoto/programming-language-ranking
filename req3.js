/********************************************
 **  RANKING DE LINGUAGENS DE PROGRAMAÇÃO  **
 **                  v1.0                  **
 ********************************************
 **  CREATED BY:                           **
 **                                        **
 **  Felipe Fernandes                      **
 **  https://github.com/felipe507          **
 **  ------------------------------------- **
 **  Matheus Misumoto                      **
 **  https://matheusmisumoto.jor.br        **
 **  https://github.com/matheusmisumoto    **
 **  ------------------------------------- **     
 **  Matheus Oliveira                      **
 **  https://github.com/MathOli            **
 **                                        **
 ********************************************/

$(criarEvento);

function criarEvento(){
	var btns = document.querySelectorAll("button")
	let img = document.querySelector("img")

	var languages = ['javascript', 'scala', 'python', 'haskell', 'ruby'];
	table = [];
	for(let i in languages){
		table[i] = [ languages[i] ];
		sendReq('https://github.com/search?q=language%3A'+languages[i],i)
	}

	setTimeout(function() { montaTabela(table); }, 5000);

    btns[0].addEventListener("click", function(){
		var lista = document.querySelector("#lista")
		lista.innerHTML = ""

		
		img.src = "Github.svg"
		img.alt = "Github"
		var languages = ['javascript', 'scala', 'python', 'haskell', 'ruby'];
		table = [];
		for(let i in languages){
			table[i] = [ languages[i] ];
			sendReq('https://github.com/search?q=language%3A'+languages[i],i)
		}

		setTimeout(function() { montaTabela(table); }, 5000);
	})

	btns[1].addEventListener("click", function(){
		var lista = document.querySelector("#lista")
		lista.innerHTML = ""

		img.src = "Google.svg"
		img.alt = "Google"

		var languages = ['javascript', 'scala', 'python', 'haskell', 'ruby'];
		table = [];
		for(let i in languages){
			table[i] = [ languages[i] ];
			sendReq('https://google.com/search?q='+languages[i]+'&sourceid=chrome&ie=UTF-8',i);
		}

		setTimeout(function() { montaTabela(table); }, 5000);
	})

	btns[2].addEventListener("click", function(){
		var lista = document.querySelector("#lista")
		lista.innerHTML = ""

		img.src = "stack_overflow.png"
		img.alt = "Stack overFlow"

		var languages = ['javascript', 'scala', 'python', 'haskell', 'ruby'];
		table = [];
		for(let i in languages){
			table[i] = [ languages[i] ];
			sendReq('https://stackoverflow.com/questions/tagged/'+languages[i],i);
		}

		setTimeout(function() { montaTabela(table); }, 4500);
	})
}

function montaTabela(ordenados){
	ordenados.sort(function (a, b) {
		if (a[1] > b[1]) {
		  return -1;
		}
		if (a[1] < b[1]) {
		  return 1;
		}
		return 0;
	  });
	let struct = ''
	for (var i = 0; i < ordenados.length; i++){
	
		let colocacao = ""
		let nomeLinguagem =""
		let ling = "" 
	
		colocacao = i+1;
		nomeLinguagem = ordenados[i][0];
		ling = ordenados[i][1];

		 struct += `
			<li class="border">
				<div class="content">
					<span>${colocacao}</span>
					<h2>${nomeLinguagem}</h2>
					<ul>
						<li>${ling}</li>
					</ul>
				</div>
			</li>
		`
	}
	document.querySelector("#lista").innerHTML = struct
	
	document.querySelector('header > span').innerHTML = 'Gerado em ' + new Date().toLocaleString('pt-BR');
}

function rasparPagina(documento, url, s){

	if(url.split('/')[2] == 'google.com'){
		let linhaContador = documento.querySelector('#resultStats');
			let filtro = linhaContador.innerHTML.replace('Aproximadamente ', '');
			filtro = filtro.replace(/[ ,.]/g, "");;
			table[s][1] = parseInt(filtro.split('resultados')[0]);
	}
	else if(url.split('/')[2] == 'stackoverflow.com'){
		let linhaContador = documento.querySelector('.fs-body3');
			let filtro = linhaContador.innerText.replace(/\s/g, '');
			table[s][1] = parseInt(filtro.replace(/[ ,.]/g, ""));
	}
	else if(url.split('/')[2] == 'github.com'){
		let linhaContador = documento.querySelector('.pb-3 > h3 > span.v-align-middle');
			let filtro = linhaContador.innerHTML.split('a')[0];
			filtro = filtro.replace(/(\r\n|\n|\r)/gm,"")
			filtro = filtro.replace(/[ ,.]/g, "");
			table[s][1] = parseInt(filtro.replace("Showing", ""));
	}
}

function sendReq(url,i){	
	var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					var parser = new DOMParser();
					var documento = parser.parseFromString(this.responseText, 'text/html');
					rasparPagina(documento, url, i);
		}
	};
    xhttp.open('GET', 'https://cors-anywhere.herokuapp.com/'+url, true);
    xhttp.send();
}