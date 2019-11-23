$(criarEvento);


function criarEvento(){
	$('button').click(function(){
		var languages = ['JavaScript'];
		for(let s in languages){
			var listaLinguagens = document.createElement('ul');
			var itemLinguagens = document.createElement('li');
			itemLinguagens.innerHTML = languages;

			listaResultado = document.createElement('ul');
			sendReq('https://www.google.com/search?q='+languages[s]+'&sourceid=chrome&ie=UTF-8');
			sendReq('https://www.stackoverflow.com/questions/tagged/'+languages[s]);
			sendReq('https://www.github.com/search?q=language%3A'+languages[s]);

			listaLinguagens.appendChild(itemLinguagens);
			listaLinguagens.appendChild(listaResultado);
			document.body.appendChild(listaLinguagens);
		}
	});
}


function rasparPagina(documento, url){

	// Como cada site precisa de uma regra específica, é necessário 
	// determinar de qual site estamos raspando os dados
	if(url.split('.')[1] == 'google'){
		let linhaContador = documento.querySelectorAll('#resultStats');
		linhaContador.forEach(function(inf){
			// Deixa só os números do resultado
			let filtro = inf.innerHTML.replace('Aproximadamente ', '');
			filtro = filtro.split('resultados')[0];

			let itemResultado = document.createElement('li');
			itemResultado.innerHTML = 'Google: '+filtro;

			listaResultado.appendChild(itemResultado);
		});
	}
	else if(url.split('.')[1] == 'stackoverflow'){
		let linhaContador = documento.querySelectorAll('.fs-body3');
		linhaContador.forEach(function(inf){
			// Deixa só os números do resultado
			let filtro = inf.innerText.replace('questions', '');

			let itemResultado = document.createElement('li');
			itemResultado.innerHTML = 'StackOverflow: '+filtro;

			listaResultado.appendChild(itemResultado);
		});
	}
	else if(url.split('.')[1] == 'github'){
		let linhaContador = documento.querySelectorAll('h3 > span');
		linhaContador.forEach(function(inf){
			// Deixa só os números do resultado
			let filtro = inf.innerHTML.split('a')[0];
			filtro = filtro.replace('Showing', '');
					
			let itemResultado = document.createElement('li');
			itemResultado.innerHTML = 'GitHub: '+filtro;

			listaResultado.appendChild(itemResultado);
		});
	}
}

function sendReq(url){	
	var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					var parser = new DOMParser();
					var documento = parser.parseFromString(this.responseText, 'text/html');
					rasparPagina(documento, url);
		}
	};
	//https://cors-anywhere.herokuapp.com/
    xhttp.open('GET', 'https://cors-anywhere.herokuapp.com/'+url, true);
    xhttp.send();
}


