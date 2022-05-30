import styles from "../Styles/popupMovements.module.css";
import imgCancell from '../assets/xmark-solid.svg';
import {FetchApiContext} from "../Context/FetchApiContext"
const { Fragment, useContext } = require("react");
function PopUpMovimientos(){
    const{errorMessage,amount, setamount, setConcept, setType, AgregarMovimiento,concept, type, hidden,btnEditar,btnAgregar,idMovement,  setHidden, EditMovement,GetMovimiento,typeLabel} = useContext(FetchApiContext)

 return(
    <Fragment>
    <section className={"section-login popUp " + hidden}>
    <div className={styles.buttonCancel} onClick={()=>{setHidden("hidden")}}><img className={styles.buttonCancel} src={imgCancell} alt="cancelar" /></div>
    <h1 className="login-title">Ingresa tu Movimieto</h1>
    <form action="" id='login-form' method="POST">
         <div className={"tableDiv form-group " + typeLabel}>
                            <label>Type</label>
                            <select name="Type" className="input-type" value={type} onChange={event=>{setType(event.target.value)}}>
                                <option value="" disabled selected>Seleccionar Tipo</option>
                                <option value="EGRESS" >EGRESS</option>
                                <option value="INCOME" >INCOME</option>
                            </select>
        </div> 
        <div className="form-group">
          <label>Concept</label>
          <input type="input" className="form-control" placeholder="shopping" required  value={concept} onChange={event=>{setConcept(event.target.value)}} />
        </div>
        <div className="form-group">
          <label>Amount</label>
          <input type="text" className="form-control" placeholder="$300" required value={amount} onChange={(event)=>{
            if(!isNaN(event.target.value)){
              setamount(event.target.value)
            }
          }}/>
        </div>
        <div className="popUp-btns">
        <div className={"btn " + btnAgregar } onClick={()=>{ AgregarMovimiento ();setHidden("hidden"); GetMovimiento()}}>Agregar</div>
        </div>

        <div className={"btn " + btnEditar } onClick={()=>{ EditMovement(idMovement);   setHidden("hidden");}}>Editar</div>
      </form>
      <div>{errorMessage}</div>
  </section>
</Fragment>
 )
}

export default PopUpMovimientos;