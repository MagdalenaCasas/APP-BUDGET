import { Fragment, useEffect, useContext } from "react";
import MovementsTable from "../../Component/movimientos";
import PopUpMovimientos from "../../Component/popup";
import {FetchApiContext} from "../../Context/FetchApiContext"

function HomePage(){
    const{GetMovimiento} = useContext(FetchApiContext);   
  useEffect(()=>{
    GetMovimiento()
  },[])

    return(
        <Fragment>
         <PopUpMovimientos></PopUpMovimientos>
         <MovementsTable></MovementsTable>
        </Fragment>
    )
}

export default HomePage;