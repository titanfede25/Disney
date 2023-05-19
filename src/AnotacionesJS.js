let n = 7
if(7)-{/*si tiene un valor*/

}

const obj = {edad: 10, nombre:"jorge"}
obj = {... {peso: 12, edad:5}}/*se borra todo y se agrega esto*/
const obj2 = {altura:5}
obj = {...obj, ...obj2}/*al objeto actual lo fusiono con otro*/

console.log(obj?.otraprop)/*el signo de pregunta pregunta por si existe        devuelve undefinded en este*/

console.log(obj?.otraprop ?? "Error") /*en caso de encontrar error retorna "error"*/

console.log(obj/*!*/.hola) /*esto es de typeScript, acceso forzado*/