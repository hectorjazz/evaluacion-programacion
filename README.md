# Postulación tuclase.cl

## Problema 1

Este problema tiene 2 versiones, una en javascript simple y otra en typescript

para compilar la version typescript, ejecute 
```
npm run build
```
y se generará un archivo `problemas/p1v2.js`

para ejecutarlo:

```
node problemas/p1v2.js
```

La version de javascript pura usa solo funciones para resolver cada una de las problmáticas.

los 3 primeros problemas usa funciones recursivas para atravesar el árbol

`getNodesWithNoChilds(data)`
`getNodesWithXChilds(data)`
`getTotalNodes(data)`

y variables globales para almacenar la cuenta de cada solucion

`nodesWithNoChilds`, `nodesWithXChilds` y `totalNodes` respectivamente

para la cuarta pregunta se optó por una funcion iterativa
`getSedes()` con break a la primera ocurrencia, para en el mejor de los casos no tener que recorrer el arbol entero.

Esta funcion devuelve los nombres de las sedes que cumplen con el criterio dado.

## Problema 1 version2
Hay una versión typescript para el priblema1, hace lo mismo pero encapsula todo en una clase con el comportamiento específico de cada pregunta dada por una interfaz publica.

Además se hace uso de un tipo espacial criterio usado para responder la cuarta pregunta

```typescript
type Criteria = {
...
}

interface ITree{
...
}

class Tree implements ITree{
...
}
```
luego se utiliza la clase y su interfaz

que internamente usan la misma estrategia que la version de javascript, recursividad y variables de clase (globales)
```typescript
let tree = new Tree(data)

tree.countNodesWhithoutChilds()
tree.countNodesWhithNChilds(5) 
tree.countAllNodes()
```

La cuarta pregunta presenta una generalizacion al problema, 
pudiendo pasar un argumento de tipo Criteria, el cual es un objeto para discriminar que sedes serán devueltas.
Cabe destacar que estos criterios son simples y poco flexibles, pero aumentan las posibilidades sin tener que modificar el código.

```typescript
let filters = {
   curso:"4 Medio",
   oferta:"Tecnología"
}

tree.getSedes(filters)
```

## Problema 2

El segundo problema se enuentra en `problemas/p2.ts`

La estrategia es leer el csv linea a linea y llevar un tracking en memoria de los nodos basado eníndices, para saber donde se debe insertar cada nuevo nodo en el arbol, crea el nodo y lo agrega como hijo al nodo correspondiente.
De esta forma no depende del orden en que aparecen los datos en el excel.

Se utilizó la librería `https://www.npmjs.com/package/csv-parser` para leer linea a linea el csv

por lo que antes de ejecutar este programa debe ejecutar
```
npm install
```


;)
