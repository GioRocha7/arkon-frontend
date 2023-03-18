import { useEffect, useState } from "react";
import * as EventoServer from "./EventoServer"
import { useNavigate ,useParams} from 'react-router-dom';
import '../../styles/BoletoForm.css'
const BoletoForm=()=>{
    const navigate=useNavigate();
    const params=useParams();
    console.log(params)
    const initialStateEvento={id:0,key_evento:"",
    Nombre:"",
    fecha_inicio:"",
    hora_inicio:"",
    fecha_fin:"",
    hora_fin:"",
    max_boletos:1}
    const initialStateBoleto={
    id_evento_id:0,
    key_boleto:"",
    comprador:"",
    boletos:0,
    status_canjeo:false,
    status_active:false}
    const [evento,setEvento]=useState(initialStateEvento);
    const [boleto,setBoleto]=useState(initialStateBoleto);
    const [cantidad,setCantidad]=useState(0)
    const [msgError,setMsgError]=useState("")
    const [keysButton,setKeysButton]=useState({
        comprador:false,
        cantidad:false})

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
        
        setBoleto({...boleto,[e.target.name]:e.target.value})
        
        switch(e.target.name){
            case 'boletos': cantidad_validate(e)
                     break;
            case 'comprador': setKeysButton({...keysButton,['comprador']:true});
            validate_btn()
            break;
    
            default:break;
        }
    }
    function validate_btn(){
        console.log(keysButton['comprador']+" | "+keysButton['cantidad'])
        if(keysButton['comprador']===true &&  keysButton['cantidad']===true ){
            document.getElementById("btnComprar").removeAttribute("disabled")
        }else{
            document.getElementById("btnComprar").setAttribute("disabled","disabled") 
        }
    }
    const handleSubmit= async (e)=>{
        if(boleto.boletos<=(evento.max_boletos-cantidad)){
            e.preventDefault();
       
        try{
            document.getElementById("formBoleto").classList.add("d-none")
            document.getElementById("Encabezado").innerHTML="Guardando"
                let res;
                boleto.key_boleto=genkey()
                console.log(boleto.key_boleto)
                console.log(boleto)
                res=await EventoServer.registerBoleto(boleto)
                const data = await res.json()
                if(data.message==="Success"){
                    setBoleto(initialStateBoleto);
                    navigate('/');
                }
            
        }catch(error){
            console.log(error)
        }
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
    const cantidad_validate=(e)=>{
        console.log("verifica boletos")
        console.log(e.target.value+"<"+(evento.max_boletos-cantidad))
        if(e.target.value<=(evento.max_boletos-cantidad)){
        console.log("validate fecha"+e.target.name)
        setKeysButton({...keysButton,[e.target.name]:true})
        document.getElementById("alertError").classList.add("d-none")
        
        setKeysButton({...keysButton,['cantidad']:true})
        validate_btn()
        
        }else{
            setMsgError("cantidad de boletos no valida")
            document.getElementById("alertError").classList.remove("d-none")
            setKeysButton({...keysButton,['cantidad']:false})
            validate_btn()
        }
    }
    
    
    useEffect(()=>{
        if(params.id){
            getEvento(params.id)
            getCantidad(params.id)
        }
        // eslint-disable-next-line
    },[])
    useEffect(()=>{
       
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
        
      
        setBoleto({...boleto,['id_evento_id']:(params.id?params.id:params.id)})
        
        // eslint-disable-next-line
    },[])
 
    
const getCantidad=async(EventoId)=>{
    try{
        const res=await EventoServer.boletosEvento(EventoId)
        const data=await res.json()
        console.log(data.boletos)
        let eventos=data.boletos
        console.log("leng")
        console.log(eventos.length)
        setCantidad(eventos.length)
    }catch(error){

    }
}
console.log(keysButton)
    return(
        
        <div className="container" id="boletoForm">
 <div className="row mb-4 mt-2 w-75">
            <div className="card card-body " id="cardBoleto">
                <div className="card d-flex flex-row card-Nombre">
                    <h3 className="  card-title">{evento.Nombre}</h3>
                    
                </div>
                <div className="card card-body d-block">
                    
                    <div className=" d-flex flex-row justify-content-around">
                        <p className="card-text ms-2"><strong>fecha inicio: </strong>{evento.fecha_inicio}</p>
                        <p className="card-text"><strong>hora inicio: </strong>{evento.hora_inicio}</p>
                    </div>
                    <div className=" d-flex flex-row justify-content-around">
                        <p className="card-text ms-2"><strong>fecha fin: </strong>{evento.fecha_inicio}</p>
                        <p className="card-text ms-2"><strong>hora fin: </strong>{evento.hora_inicio}</p>
                    </div>
                    <div className=" d-flex flex-row justify-content-around">
                        <p className="card-text ms-2"><strong>boletos disponibles: </strong>{evento.max_boletos-cantidad-boleto.boletos}</p>
                        <p className="card-text"><strong>boletos vendidos: </strong>{cantidad}</p>
                    </div>
                

                </div>
                <h2 className="mb-3 text-center" id="Encabezado">SELECCIONE SUS BOLETOS</h2>
                <div className="col-md-6 mx-auto">
            
            <form onSubmit={handleSubmit} id="formBoleto">
            <input type="hidden"  name='id_evento'value={params.id}></input>
                <input type="hidden"  name='key_boleto'value={boleto.key_evento}></input>
                <div className="mb-3">
                    <label for="comprador" className="form-label">Comprador</label>
                    <input type="text" name="comprador" value={boleto.comprador} onChange={handleInputChange} className="form-control" autoFocus required/>
                </div>
                

                <div className="mb-3 ">
                    <label className="form-label" for="boletos">Cantidad</label>
                    <input type="number" min="1"  value={boleto.boletos} max={evento.max_boletos-cantidad} name="boletos"  onChange={handleInputChange} className="form-control" required/>
                </div>
                <div className="d-grid gap-2">
                {
                        evento.key_evento===""?(
                            <h3>CARGANDO...</h3>
                        ):(
                            <button type="submit" className="btn btn-block btn-success" id="btnComprar"disabled>Comprar</button>
                        )
                        
                    }
                   
                </div>
                
            </form>
            <div className="alert alert-danger d-flex align-items-center d-none" role="alert" id="alertError">
                <div id="msgError" >
                    {msgError}
                </div>
            </div>
        </div>
                
                
                
            </div>
        </div>
        </div>
        
    )
}

export default BoletoForm;