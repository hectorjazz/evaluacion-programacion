/**
 * Problema número 1.
 *
 * Necesitamos que obtengas los datos de ./src/input-p1.json y generes funciones que permitan:
 *
 * 1. Retornar todos los nodos que no tienen hijos.
 * 2. Retornar todos los nodos que contienen una cantidad X (parametrizable) de hijos
 * 3. Contabilizar la cantidad de nodos totales
 * 4. Retornar todas las Sedes con 4° Medio que *SI* poseen la *Oferta Tecnología* en sus *Secciones A*
 */

const data = require("./src/input-p1.json")
//const Nodo = require("./src/Nodo")

//para las funciones recursivas 
//que resuelven las 4 primeras preguntas
//utilizé una variable global para no tener que acumular por parámetro, ahorrar stack y hacerlo mas simple ;)

let nodesWithNoChilds = 0
getNodesWithNoChilds(data) 
console.log("cantidad de nodos sin hijos = "+nodesWithNoChilds)


let nodesWithXChilds = 0
getNodesWithXChilds(data,5) 
console.log("cantidad de nodos con 5 hijos = "+nodesWithXChilds)

let totalNodes = 0
getTotalNodes(data) 
console.log("cantidad total de nodos = "+totalNodes)


//para sedes cambiṕe de estrategia y la solución es iterativa con interrupcion a la primera ocurrencia para no recorrer todo innecesariamente
let sedes = getSedes(data)
console.log("sedes con oferta tecnología en cuarto medio = ["+sedes+"]")

function getNodesWithNoChilds(data){
	if(data.hijos.length == 0) nodesWithNoChilds++
	data.hijos.forEach(function(element){getNodesWithNoChilds(element)})
}

function getNodesWithXChilds(data,x){
	if(data.hijos.length == x) nodesWithXChilds++
	data.hijos.forEach(function(element){getNodesWithXChilds(element,x)})
}

function getTotalNodes(data){
	totalNodes++
	data.hijos.forEach(function(element){ getTotalNodes(element)})
} 

//funcion que devuelve el nombre de las sedes que cumplen con el criterio de la pregunta numero 4
function getSedes(sedes){
	let _sedes = []
	
	let _continue
	let count = 0
	sedes.hijos.forEach(function(sede){ 
		let s = sede
		_continue = false
		sede.hijos.forEach(function(curso){
			if(_continue) return;
			if(curso.nombre==="4 Medio"){
				curso.hijos.forEach(function(seccion){
					if(_continue) return;
					seccion.hijos.forEach(function(oferta){
						if(_continue) return;
						if(oferta.nombre==="Tecnología"){
							_sedes.push(sede.nombre)
							_continue = true
							count++
						}
					})
				})
			}
		})
	})
return _sedes
}
