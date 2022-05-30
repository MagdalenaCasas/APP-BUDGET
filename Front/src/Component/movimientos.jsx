import styles from "../Styles/table.module.css";
import {FetchApiContext} from "../Context/FetchApiContext";
import TableMov from './TableMovements';
const { Fragment, useContext, useEffect, useState } = require("react");


function MovementsTable(){
    const{totalBudget,incomes, egress,param, setParam, setHidden,setBtnEditar,setTypeLabel, setamount, setConcept, setType, setBtnAgregar,inc, egr} = useContext(FetchApiContext);

    useEffect(()=>{
      Mov()
    },[param])

    function Mov(){
        return(
            <div className={styles.tableMovements}>
              <div className="table-column"> <h3>Tipo</h3></div>
              <div className="table-column"> <h3>Monto</h3> </div>
              <div className="table-column"> <h3>Concepto</h3> </div>
              <div className="table-column"> <h3>Fecha</h3> </div>
              <div className="table-column"> <h3>Acciones</h3> </div>
            {param.map(mov=>{return(
             <TableMov mov={mov} key={mov.id}></TableMov>
               
            )})}
     </div>
        )
    }

    function reset(){
      setamount("");
      setType("");
      setConcept("");
      setHidden("");
      setBtnAgregar("")
      setBtnEditar("hidden");
      setTypeLabel("")
    }


    return(
        <Fragment>
            <div className={styles.totalBudget}>
              <div className={styles.incomeSection}> <h5>INGRESOS</h5> {"$" + inc}</div>
              <div className={styles.amountBudget}><h3>TOTAL</h3> { "$ " + totalBudget} </div>
              <div className={styles.egressSection}><h5>EGRESOS</h5> {"$" + egr}</div>
            </div>
            <div className={styles.tableButtons}>
              <button className={styles.buttonType}  onClick={()=>{setParam(incomes)}}>ver Ingresos</button>
              <button className={styles.buttonType}  onClick={()=>{setParam(egress)}}>ver Egresos</button>
              <button className={styles.buttonType}  onClick={()=>{reset()}}>Agregar Movimiento</button>
            </div>
           {Mov()}
            
        </Fragment>
    )
}

export default MovementsTable;