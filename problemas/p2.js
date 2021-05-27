/**
 * Problema número 2.
 * 
 * Genera un script/algoritmo/función que sea capaz de transformar los datos de input-p2.csv
 * en un arból de estructura similar al problema de p1 utilizando la estructura de Nodo.js
 */

const Nodo = require("./src/Nodo");
var tree = new Nodo("root", "Raíz");

const csv = require('csv-parser')
const fs = require('fs')
const results = [];

//Agregar a tree toda la estructura solicitada.
//...
let auxiliar = []
let indexes  = []
	
fs.createReadStream('src/input-p2.csv').pipe(csv()).on('data', (data) => results.push(data)).on('end', () => {	
	results.forEach(function(element){
		//add sede
		let sede = element.Sede.match(/[a-zA-Z0-9]+/g).join("");
		if(typeof auxiliar[sede] === 'undefined'){
			let nodo = new Nodo(element.Sede,"Sede",[])
			tree.hijos.push(nodo)

			auxiliar[sede] = []
			indexes[sede] = {index: tree.hijos.length-1, "cursos":[]}
		}

		//add curso
		let curso = element.Curso.match(/[a-zA-Z0-9]+/g).join("");
		if(typeof auxiliar[sede][curso] === 'undefined'){
			let nodo = new Nodo(element.Curso,"Curso",[])
			tree.hijos[indexes[sede].index]
				.hijos.push(nodo)	

			auxiliar[sede][curso] = []
			indexes[sede].cursos[curso] = {index: tree.hijos[indexes[sede].index].hijos.length-1,secciones:[]}
			console.log(sede)
			console.log(tree.hijos[indexes[sede].index].hijos.length)
		}
	
		//add section
		let seccion = element.Seccion.match(/[a-zA-Z0-9]+/g).join("");
		if(typeof auxiliar[sede][curso][seccion] === 'undefined'){
			let nodo = new Nodo(element.Seccion,"Seccion",[])
			tree.hijos[indexes[sede].index]
				.hijos[indexes[sede].cursos[curso].index]
				.hijos.push(nodo)		

			auxiliar[sede][curso][seccion] = []
			indexes[sede].cursos[curso].secciones[seccion] = {index: tree.hijos[indexes[sede].index].hijos[indexes[sede].cursos[curso].index].hijos.length-1, ofertas: []}
		}			
	
		//add oferta
		let oferta = element.Oferta.match(/[a-zA-Z0-9]+/g).join("");
		if(typeof auxiliar[sede][curso][seccion][oferta] === 'undefined'){
			let nodo = new Nodo(element.Oferta,"Oferta",[])
			tree.hijos[indexes[sede].index]
				.hijos[indexes[sede].cursos[curso].index]
				.hijos[indexes[sede].cursos[curso].secciones[seccion].index]
				.hijos.push(nodo)
					
			auxiliar[sede][curso][seccion][oferta] = []
		}
	})	
	console.log(JSON.stringify(tree))
});
