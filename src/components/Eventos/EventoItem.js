import React, { useEffect, useState } from "react"
import * as EventoServer from './EventoServer'
import '../../styles/EventoItem.css';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function getToDay(){
    const hoy = new Date();
        
        let mes=""+((hoy.getMonth()+1)<10)?"0"+(hoy.getMonth()+1):(hoy.getMonth()+1)
        let dia;
        if (hoy.getDate()<10){
            dia="0"+hoy.getDate()
        }else{
            dia=hoy.getDate()
        }
        let today=hoy.getFullYear()+"-"+mes+"-"+dia
        return today;
}
const EventoItem =({evento,listEventos})=>{
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    const navigate=useNavigate()
    const [cantidad,setCantidad]=useState(0)
    const handleDelete = async (eventoId)=>{
        await EventoServer.deleteEvento(eventoId);
        listEventos()
    }
    useEffect(()=>{
        
            getEvento(evento.id)
        
        // eslint-disable-next-line
    },[])
    const getEvento=async(EventoId)=>{
        try{
            const res=await EventoServer.boletosEvento(EventoId)
            const data=await res.json()
            console.log(data.boletos)
            let eventos=data.boletos
            setCantidad(eventos.length)
        }catch(error){

        }
    }
    console.log(cantidad)
    return (
        <>
        <div className="row mb-4 mt-2 w-75">
            <div className="card card-body ">
                <div className="card d-flex flex-row card-Nombre">
                    <h3 className="  card-title">{evento.Nombre}</h3>
                    
                </div>
                {
                    
                    (getToDay()>evento.fecha_fin)?(
                        <h3 className="warning-message">EVENTO FINALIZADO</h3>
                    ):(
                        ((evento.max_boletos-cantidad)<=0)?(
                            <h3 className="warning-message">BOLETOS AGOTADOS</h3>
                        ):(
                            <></>
                        )
                       
                    )
                }
               
                <div className="card card-body d-block">
                    <div className=" d-flex flex-row justify-content-around">
                        <p className="card-text ms-2"><strong>fecha inicio:</strong> {evento.fecha_inicio}</p>
                        <p className="card-text"><strong>hora inicio: </strong>{evento.hora_inicio}</p>
                    </div>
                    <div className=" d-flex flex-row justify-content-around">
                        <p className="card-text ms-2"><strong>fecha fin:</strong> {evento.fecha_fin}</p>
                        <p className="card-text ms-2"><strong>hora fin:</strong> {evento.hora_fin}</p>
                    </div>
                    <div className=" d-flex flex-row justify-content-around">
                        <p className="card-text ms-2"><strong>boletos disponibles: </strong>{evento.max_boletos-cantidad}</p>
                        <p className="card-text"><strong>boletos vendidos: </strong>{cantidad}</p>
                    </div>
                

                </div>
                <div className="btn-group my-2 justify-content-around" role="group"  >
                {
                    
                    (getToDay()<=evento.fecha_fin)?(
                        
                        ((evento.max_boletos-cantidad)<=0)?(
                            <>
                           
                            <button type="button" className="btn btn-warning ms-2"onClick={()=>navigate(`/updateEvento/${evento.id}`)}>Actualizar</button>
                            </>
                        ):(
                            <>
                             <button type="button" className="btn btn-primary ms-2" onClick={()=>navigate(`/boletoForm/${evento.id}`)}>Comprar </button>
                            <button type="button" className="btn btn-warning ms-2"onClick={()=>navigate(`/updateEvento/${evento.id}`)}>Actualizar</button>
                            </>
                        )
                    
                        
                        
                    ):(
                        <Button variant="danger" className="ms-2" onClick={handleShow}>
                        Eliminar
                        </Button>
                    )
                    
                }
  {
    ((evento.max_boletos-cantidad)<=0 || cantidad===0)?(
        <Button variant="danger" className="ms-2" onClick={handleShow}>
        Eliminar
        </Button>
    ):(
        <></>
    )
  }
  
  
</div>
            </div>
        </div>
        

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Evento {evento.Nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Serguro que desea eliminar este evento?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={()=>evento.id && handleDelete(evento.id)}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    )
}

export default EventoItem;