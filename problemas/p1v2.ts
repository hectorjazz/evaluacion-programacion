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

import data from "./src/input-p1.json"
import { Nodo } from "./src/Nodo"

type Criteria = {
	sede?:string,
	curso?:string
	seccion?:string,
	oferta?:string
}

interface ITree{
	searchSedes (condition:Criteria):Array<string>|'none'
	countNodesWhithoutChilds():number
	countNodesWhithNChilds(n:number):number
	countAllNodes():number
}

class Tree implements ITree{
	private data:any
	private qtyNodes:number

	constructor(data:any){
		this.data = data
		this.qtyNodes = 0
	}

	/*
	 * metodo que devuelve la cuenta de todos los nodos que no tienen hijos
	 * @params void
	 *
	 * @return qtyNodes:number
	 */
	countNodesWhithoutChilds():number{
		this.qtyNodes = 0
		this.countNodes(this.data,0)
		return this.qtyNodes
	}

	/*
	 * metodo que devuelve la cuenta de todos los nodos que tienen N hijos
	 * @params n:number
	 * 
	 * @return qtyNodes:number
	 */
	countNodesWhithNChilds(n:number):number{
		this.qtyNodes = 0
		this.countNodes(this.data,n,false)
		return this.qtyNodes
	}

	/*
	 * metodo que devuelve la cuenta de todos los nodos del arbol
	 * @params void
	 *
	 * @return qtyNodes:number
	 */
	countAllNodes():number{
		this.qtyNodes = 0
		this.countNodes(this.data,-1,true)
		return this.qtyNodes
	}

	/*
     * funncion que devuelve las sedes que cumplen con determinaod criterio
	 * @params filters:Criteria
	 *
	 * @return sedes:string[]
	 */
	searchSedes(filters:Criteria):string[]|'none'{
		let sedes:Array<string> = []
		let _continue
		let count = 0
		this.data.hijos.forEach(function(sede){ 
			let s = sede
			_continue = false
			if(!filters.sede || filters.sede == sede.nombre){
			sede.hijos.forEach(function(curso){
				if(_continue) return;
				
				if(!filters.curso || filters.curso == curso.nombre){
					curso.hijos.forEach(function(seccion){
						if(_continue) return;
						if(!filters.seccion || filters.seccion == seccion.nombre){
							seccion.hijos.forEach(function(oferta){
								if(_continue) return;
								if(!filters.oferta || filters.oferta == oferta.nombre){
									sedes.push(sede.nombre)
									_continue = true
									count++
								}
							})
						}
					})
				}
			})
			}
		})
	return (sedes.length) ? sedes : 'none'
	}

	/*
 	 * funcion que cuenta nodos según la cantidad de hijos pasados, o bien los cuenta todos
	 * @params data treeObject
	 * @params nChilds:number
	 * @params all:boolean
	 *
	 * @return void
	 */
	private countNodes(data:any, nChilds:number, all: boolean = false) :void{
		if(data.hijos.length == nChilds || all){
			this.qtyNodes++
		}
		data.hijos.forEach((node)=>{
			this.countNodes(node, nChilds, all)
		})
	}
}

let tree = new Tree(data)

let countNodesWhithoutChilds = tree.countNodesWhithoutChilds()
let countNodesWhithNChilds	 = tree.countNodesWhithNChilds(5)
let countAllNodes = tree.countAllNodes()

let filters:Criteria = {
	curso:"4 Medio",
	oferta:"Tecnología"
}
let sedes = tree.searchSedes(filters)

console.log("cantidad de nodos sin hijos = "+countNodesWhithoutChilds)
console.log("cantidad de nodos con 5 hijos = "+countNodesWhithNChilds)
console.log("cantidad total de nodos = "+countAllNodes)
console.log("sedes con oferta tecnológica en cuarto medio = "+sedes)
