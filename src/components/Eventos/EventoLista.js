import React, { useEffect, useState } from "react"

// Componentes
import EventoItem  from "./EventoItem"
import * as EventoServer from './EventoServer'
import '../../styles/EventoLista.css'

const EventoList=()=>{
    const [head,setHead]=useState("BUSCANDO...")
    const [eventos,setEventos]=useState([])
    const [eventSearch,setEventSearch]=useState("")
    const handleInputChange=(e)=>{
        setEventSearch(e.target.value)
        
        
    }
    const clickSearch=()=>{
        setHead("BUSCANDO...")
        
        searchEventos(eventSearch)
    }
    const listEventos=async()=>{
        try{
            const res=await EventoServer.listEventos();
            const data = await res.json();
            console.log(data.eventos)
            setHead("EVENTOS")
            setEventos(data.eventos);
        }catch(error){
            console.log(error);
        }
    }
    const searchEventos=async(Nombre)=>{
        try{
            const res=await EventoServer.searchEvento(Nombre);
            const data = await res.json();
            console.log(data.eventos)
            if(data.eventos===undefined){
                setHead("No se encontraron coinsidencias")
            }else{
                setHead("EVENTOS")
                setEventos(data.eventos);
            }
            
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        listEventos();
    },[]);   
    return(
        <div className="container d-block" id="mainList"> 
        <div class="container-fluid d-flex " Style="margin:10px">
    
      <input class="form-control me-2" type="search" value={eventSearch} placeholder="Buscar Evento" onChange={handleInputChange} aria-label="Search"></input>
      <button class="btn btn-outline-success" type="submit" onClick={clickSearch}>Buscar</button>
   
  </div>
  <div className="main-content d-flex justify-content-center" >
  <div className="containt d-flex" id="headList">
            {head}
        </div>
        </div>
    <div className="main-content d-flex justify-content-center" >
    
    <div className="row d-flex flex-row justify-content-center " id="content-list">
    
            {eventos.map((evento)=>(
                <EventoItem key={evento.id} evento={evento} listEventos={listEventos}/>
            ))}
        </div>
    </div>
    
        </div>
        
    )
}

export default EventoList