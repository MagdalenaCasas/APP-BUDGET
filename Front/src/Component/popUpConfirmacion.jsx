import {FetchApiContext} from "../Context/FetchApiContext";
const { useContext} = require("react");
function PopUpConfirmacion({id}){
    const{DeleteMovement,hidden } = useContext(FetchApiContext);
    return(
    <div className={hidden}>
        <h2> ¿Estás te seguro que deseas eliminar este movimiento?</h2>
        <div className='button-table delete'onClick={()=>{DeleteMovement(id)}}>Aceptar</div>
        <div className='button-table cancel'onClick={()=>{}}>Cancelar</div>
    </div>
    )
}

export default  PopUpConfirmacion;