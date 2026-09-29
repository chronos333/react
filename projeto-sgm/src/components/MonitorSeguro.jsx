//nesse componenete vou demonstrar um problema no useEffect
//gerar um looping infinito ao não utilizar um dos elementos

import { useEffect, useState } from "react";

function MonitorSeguro() {
    const [contador, setContador] = useState(0);

    //use effect com Erro Grave: sem array de dependência 
    useEffect(() => {
        const intervalo = setInterval(()=>{
        console.log("Executando efeito sem array ...");
        setContador((prev)=> prev + 1);},1000)
    
    return () => clearInterval(intervalo);
},[]);

    return <div>Contador em Colapso: {contador}</div>
}


export default MonitorSeguro;