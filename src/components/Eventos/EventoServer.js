const API_URL_EVENTO="http://127.0.0.1:8000/api/eventos/"
const API_URL_BOLETO="http://127.0.0.1:8000/api/boletos/"
const API_URL_BOLETOEVENTO="http://127.0.0.1:8000/api/boletosEvento/"
const API_URL_SEARCHEVENTO="http://127.0.0.1:8000/api/searchEvento/?Nombre="
export const listEventos=async()=>{
    return await fetch(API_URL_EVENTO)
}
export const getEvento=async(eventoId)=>{
    console.log(`${API_URL_EVENTO}${eventoId}`)
    return await fetch(`${API_URL_EVENTO}${eventoId}`)
    //return await fetch(API_URL_EVENTO)
}

export const registerEvento=async (newEvento)=>{
    return await fetch(API_URL_EVENTO,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            "Nombre":String(newEvento.Nombre).trim(),
            "max_boletos":parseInt(newEvento.max_boletos),
            "key_evento":String(newEvento.key_evento).trim(),
            "fecha_inicio":String(newEvento.fecha_inicio).trim(),
            "hora_inicio":String(newEvento.hora_inicio).trim(),
            "fecha_fin":String(newEvento.fecha_fin).trim(),
            "hora_fin":String(newEvento.hora_fin).trim(),

        })
    })
}
export const updateEvento=async (eventoId,updatedEvento)=>{
    return await fetch(`${API_URL_EVENTO}${eventoId}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            "Nombre":String(updatedEvento.Nombre).trim(),
            "max_boletos":parseInt(updatedEvento.max_boletos),
            "key_evento":String(updatedEvento.key_evento).trim(),
            "fecha_inicio":String(updatedEvento.fecha_inicio).trim(),
            "hora_inicio":String(updatedEvento.hora_inicio).trim(),
            "fecha_fin":String(updatedEvento.fecha_fin).trim(),
            "hora_fin":String(updatedEvento.hora_fin).trim(),

        })
    })
}

export const deleteEvento=async (eventoId)=>{
    return await fetch(`${API_URL_EVENTO}${eventoId}`,{
        method:'DELETE',
       
    })
}


export const registerBoleto=async (newBoleto)=>{
    return await fetch(API_URL_BOLETO,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            "comprador":String(newBoleto.comprador).trim(),
            "id_evento_id":parseInt(newBoleto.id_evento_id),
            "key_boleto":String(newBoleto.key_boleto).trim(),
            "status_canjeo":false,
            "status_active":false,
            "boletos":parseInt(newBoleto.boletos),

        })
    })
}


export const boletosEvento=async(eventoId)=>{
        console.log(`${API_URL_BOLETOEVENTO}${eventoId}`)
        return await fetch(`${API_URL_BOLETOEVENTO}${eventoId}`)
        //return await fetch(API_URL_EVENTO)
    }

export const searchEvento=async(Nombre)=>{
        console.log(`${API_URL_SEARCHEVENTO}${Nombre}`)
        return await fetch(`${API_URL_SEARCHEVENTO}${Nombre}`)
        //return await fetch(API_URL_EVENTO)
    }