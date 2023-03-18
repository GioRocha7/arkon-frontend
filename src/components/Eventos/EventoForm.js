import { useEffect, useState } from "react";
import * as EventoServer from "./EventoServer"
import { useNavigate ,useParams} from 'react-router-dom';
import '../../styles/EventoForm.css'
import { keyboard } from "@testing-library/user-event/dist/keyboard";
const EventoForm=()=>{
    const navigate=useNavigate();
    const params=useParams();
    console.log(params)
    const initialState={id:0,key_evento:"",
    Nombre:"",
    fecha_inicio:"",
    hora_inicio:"",
    fecha_fin:"",
    hora_fin:"",
    max_boletos:1}
    const [evento,setEvento]=useState(initialState);
    const [minDate,setMindate]=useState("")
    const [keysButton,setKeysButton]=useState({Nombre:false,
    fecha_inicio:false,
    hora_inicio:false,
    fecha_fin:false,
    hora_fin:false,
    max_boletos:false})

    function genkey() {
        var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var charLength = chars.length;
        var result = '';
        for ( var i = 0; i < 10; i++ ) {
           result += chars.charAt(Math.floor(Math.random() * charLength));
        }
        return result;
     }
    const handleInputChange=(e)=>{
        
        setEvento({...evento,[e.target.name]:e.target.value})
        
        switch(e.target.name){
            case 'Nombre':setKeysButton({...keysButton,['Nombre']:true});
                validate_btn()
                break;
            case 'fecha_inicio': fecha_inicio_validate(e)
                     break;
            case 'fecha_fin': fecha_fin_validate(e)
                     break;
            case 'hora_inicio':hora_inicio_validate(e)
                    break;
            case 'hora_fin':hora_fin_validate(e)
                    break;
            case 'max_boletos':setKeysButton({...keysButton,['max_boletos']:true});
                    validate_btn()
                    break;
            default:break;
        }
    }
    const handleSubmit= async (e)=>{
        e.preventDefault();
        try{
            document.getElementById("formEvento").classList.add("d-none")
            document.getElementById("Encabezado").innerHTML="Guardando"
            let res;
            if(!params.id){
                res=await EventoServer.registerEvento(evento)
                const data = await res.json()
                if(data.message==="Success"){
                    setEvento(initialState);
                    navigate('/');
                }
            }else{
                await EventoServer.updateEvento(params.id,evento)
                navigate('/');
            }
            
            
        }catch(error){
            console.log(error)
        }
    }
    const getEvento=async(EventoId)=>{
        try{
            const res=await EventoServer.getEvento(EventoId)
            const data=await res.json()
            console.log(data.evento)
            const {key_evento,Nombre,max_boletos,fecha_inicio,hora_inicio,fecha_fin,hora_fin}=data.evento
            
            setEvento({key_evento,Nombre,max_boletos,fecha_inicio,hora_inicio,fecha_fin,hora_fin})
        }catch(error){

        }
    }
    const fecha_inicio_validate=(e)=>{
        console.log("validate fecha"+e.target.name)
        setKeysButton({...keysButton,[e.target.name]:true})
        document.getElementById("fecha_fin").removeAttribute("disabled")
        console.log(evento.fecha_inicio+" > "+evento.fecha_fin)
        if((evento.fecha_fin!=="") && (evento.fecha_inicio>evento.fecha_fin)){
            setKeysButton({...keysButton,['fecha_fin']:false})
            setEvento({...evento,['fecha_fin']:e.target.value})
            validate_btn()
        }
    }
    const hora_inicio_validate=(e)=>{
        console.log("validate fecha"+e.target.name)
        setKeysButton({...keysButton,[e.target.name]:true})
        document.getElementById("hora_fin").removeAttribute("disabled")
        console.log(evento.fecha_inicio+" > "+evento.fecha_fin)
        if((evento.fecha_fin!=="") && (evento.fecha_inicio==evento.fecha_fin)){
            if((evento.hora_fin!=="") && (evento.hora_inicio>evento.hora_fin)){
                setKeysButton({...keysButton,['hora_fin']:false})
                setEvento({...evento,['hora_fin']:e.target.value})
                validate_btn()
            }
        }

        
    }
    const fecha_fin_validate=(e)=>{
        console.log("validate "+e.target.name)
        setKeysButton({...keysButton,[e.target.name]:true})
        validate_btn()
        
    }
    const hora_fin_validate=(e)=>{
        console.log("validate "+e.target.name)
        setKeysButton({...keysButton,[e.target.name]:true})
        validate_btn()
        
    }
    function validate_btn(){
        if(keysButton['Nombre']==true &&
        keysButton['fecha_inicio']==true &&
        keysButton['hora_inicio']==true &&
        keysButton['fecha_fin']==true &&
        keysButton['hora_fin']==true &&
        keysButton['max_boletos']==true){
            document.getElementById("btnSubmit").removeAttribute("disabled")
        }else{
            if(!params.id){
                document.getElementById("btnSubmit").setAttribute("disabled","disabled") 
            }
            
        }
    }
    useEffect(()=>{
        if(params.id){
            getEvento(params.id)
        }else{
            setEvento(initialState);
        }
        // eslint-disable-next-line
    },[])
    useEffect(()=>{
        const hoy = new Date();
        console.log(hoy.getDate())
        let mes=""+((hoy.getMonth()+1)<10)?"0"+(hoy.getMonth()+1):(hoy.getMonth()+1)
        let dia;
        if (hoy.getDate()<10){
            dia="0"+hoy.getDate()
        }else{
            dia=hoy.getDate()
        }
        let today=hoy.getFullYear()+"-"+mes+"-"+dia
        
        setMindate(today)
        setEvento({...evento,['key_evento']:(params.id?evento.key_evento:genkey())})
        
        // eslint-disable-next-line
    },[])
 console.log(keysButton)

    return(
        <div className="card card-body " id="cardEvento">
        <div className="col-md-10 mx-auto">
            
                {
                    params.id?( <h2 className="mb-6 text-center" id='Encabezado' >ACTUALIZAR EVENTO</h2>):(<h2 className="mb-6 text-center" id='Encabezado' >CREAR EVENTO</h2>)
                }
               
            <form onSubmit={handleSubmit} id="formEvento" className=" ">
                <input type="hidden"  name='key_evento'value={evento.key_evento}></input>
                <div className="mb-3">
                    <label for="Nombre" className="form-label">Nombre</label>
                    <input type="text" name="Nombre" value={evento.Nombre} onChange={handleInputChange} className="form-control" autoFocus required/>
                </div>
                <div className="mb-3">
                    <label for="fecha_inicio" className="form-label" >Fecha inicio</label>
                    <input type="date" name="fecha_inicio" min={minDate} value={evento.fecha_inicio} onChange={handleInputChange} className="form-control" required/>
                </div>
                <div className="mb-3 ">
                    <label className="form-label" for="hora_inicio">Hora inicio</label>
                    <input type="time" name="hora_inicio" value={evento.hora_inicio} onChange={handleInputChange} className="form-control" required/>
                </div>
                <div className="mb-3">
                    <label for="fecha_fin" className="form-label">Fecha fin</label>
                    <input type="date" name="fecha_fin" id='fecha_fin' disabled min={evento.fecha_inicio} value={evento.fecha_fin} onChange={handleInputChange} className="form-control" required/>
                </div>
                <div className="mb-3 ">
                    <label className="form-label" for="hora_fin">Hora fin</label>
                    <input type="time" name="hora_fin" id='hora_fin' disabled value={evento.hora_fin} onChange={handleInputChange} className="form-control" required/>
                </div>

                <div className="mb-3 ">
                    <label className="form-label" for="max_boletos">Numero maximo de boletos</label>
                    <input type="number" min="1"  value={evento.max_boletos} max="300" name="max_boletos"  onChange={handleInputChange} className="form-control" required/>
                </div>
                <div className="d-grid gap-2">
                    {
                        params.id?(
                            <button type="submit" className="btn btn-block btn-primary" id='btnSubmit' >Update</button>
                        ):(
                            <button type="submit" className="btn btn-block btn-success" id='btnSubmit'  disabled>Submit</button>
                        )
                    }
                   
                </div>
                
            </form>
        </div>
        </div>
    )
}

export default EventoForm;