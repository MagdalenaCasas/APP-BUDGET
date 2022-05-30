import imgTacho from '../assets/trash-can-solid.svg';
import imgEdit from '../assets/pen-solid.svg';
import {FetchApiContext} from "../Context/FetchApiContext";
const { Fragment, useContext} = require("react");

function TableMov({mov}){
    const{DeleteMovement, setHidden,setamount,setConcept,setType, setBtnAgregar,setIdMovement, setTypeLabel, setBtnEditar} = useContext(FetchApiContext);
    function PreEdit(id, amount, concept, type){
        setHidden("");
        setTypeLabel("hidden")
        setBtnAgregar("hidden")
        setBtnEditar("");
        setamount(amount);
        setConcept(concept);
        setType(type);
        setIdMovement(id)

    }
    return(
        < Fragment>
         
        <div className="table-column"> {mov.type}</div>
        <div className="table-column"> $ {mov.amount}</div>
        <div className="table-column"> {mov.concept}</div>
        <div className="table-column">{mov.createdAt}</div>
        <div className ="buttnon-table-container">
            <div className='button-table delete'onClick={()=>{DeleteMovement(mov.id)}}><img src={imgTacho} alt="delete" /></div>
            <div className='button-table edit'onClick={()=>{PreEdit(mov.id, mov.amount, mov.concept, mov.type)}}><img src={imgEdit} alt="edit" /></div>
        </div>
        </Fragment>
    )
}

export default TableMov;