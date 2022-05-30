import { createContext, useEffect} from "react";
import {useState} from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const FetchApiContext = createContext()

export const FetchApiContextProvider = ({children})=>{
  const [userEmail, setUserEmail] = useState();
  const [userName, setUserName] = useState();
  const [userLastName, setUserLastName] = useState();
  const [password, setPassword]= useState();
  const [repetPassword, setRepetPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [response, setResponse] =useState();
  const [amount, setamount] =useState();
  const[concept, setConcept] = useState();
  const [type, setType] = useState();
  const [idMovement, setIdMovement] = useState()
  const [movements, setMovements] = useState([])
  const [incomes, setIncomes] = useState([])
  const [egress, setEgress] = useState([])
  const[btnAgregar, setBtnAgregar] = useState()
  const[btnEditar, setBtnEditar] = useState();
  const[typeLabel, setTypeLabel] = useState("");
  const [totalBudget,setTotalBudget] = useState(0)
  const [hidden, setHidden] =useState("hidden");
  const [param, setParam] = useState([])
  const [inc, setInc] = useState();
  const [egr, setEgr] = useState()
  const navigate = useNavigate();
  

  const IncomeArray = [];
  const EgressArray = [];



  /* Fetch Login.............. */
  const Login = async()=>{
   const handleClick = () => {
      navigate("/home");
    }

  var myHeaders = new Headers();  
  myHeaders.append("Content-Type", "application/json");
        
  var raw = JSON.stringify({
      "email": userEmail,
      "password": password
    });
    
  var requestOptions = {
   method: 'POST',
   headers: myHeaders,
   body: raw,
   redirect: 'follow'
  };
 try {
  fetch("http://localhost:3000/login", requestOptions)

  .then(response => {
     return response
  })
  .then(result=>{
    if(result.status == 200){
      setErrorMessage("")
      result.json().then((token)=>{
        console.log(token)
        localStorage.setItem("token", `Bearer ${token.token}`)
        localStorage.setItem("id", token.id)
        handleClick() 
      })
    }else{
      result.json().then((message)=>{
        setErrorMessage(message)
      })
    }
  })
 } catch (error) {
   setErrorMessage(error.message)}
 }



 /* Fetch Registro.............. */
 const SignIn = async()=>{
  const redirect = () => {
    navigate("/");
  }

  var myHeaders = new Headers();
  myHeaders.append("Authorization", localStorage.getItem("token"));
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "name": userName,
    "lastName": userLastName,
    "email": userEmail,
    "password": password,
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
try { 
  fetch("http://localhost:3000/newUser", requestOptions)
  

  .then(response => {
    return response
 })
 .then(result=>{
   console.log(result.status)
   if(result.status === 201){
     setErrorMessage("")
     result.json().then((res)=>{
       setResponse(res)
          setTimeout(() => {
            redirect()
            setResponse("")
       },2000);
     })
   }else{
     result.json().then((message)=>{
       console.log(message)
     })
   }
 })

  
} catch (error) {
 setErrorMessage(error.message)}

 }
 

/*FETCH GET MOVIMIENTOS */
 
 const GetMovimiento= async()=>{
  var myHeaders = new Headers();
  myHeaders.append("Authorization", localStorage.getItem("token"));
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch("http://localhost:3000/budget", requestOptions)
    .then(response => response.json())
    .then(result =>{ 
      const lastMovements  = result.reverse()
      setMovements(result.reverse())
      setParam(lastMovements.slice(-10))
      let counter = 0;
      let ingresos = [];
      let egresos = []

     result.forEach(move=>{
      if(move.type ==="INCOME"){
      IncomeArray.push(move);
      ingresos.push(parseInt(move.amount))
      counter = counter + parseInt(move.amount);
     } else if(move.type === "EGRESS"){
      EgressArray.push(move);
      egresos.push(parseInt(move.amount))
     counter = counter - parseInt(move.amount);
     }})
      setTotalBudget(counter) 
      setEgress(EgressArray);
      setIncomes(IncomeArray)
      console.log(ingresos);
      console.log(egresos)
      let incomess = 0
      ingresos.forEach(ingreso=>{
        incomess = incomess + ingreso
      })
      let egress = 0
      egresos.forEach(egreso=>{
        egress= egress + egreso
      })

       setInc(incomess)
       setEgr(egress)


    })
    .catch(error => console.log('error', error));

}
 
  /* Fetch AGREGAR MOVIMIENTOS.............. */
const AgregarMovimiento = async()=>{
 var myHeaders = new Headers();
 myHeaders.append("Authorization", localStorage.getItem("token"));
 myHeaders.append("Content-Type", "application/json");

 var raw = JSON.stringify({
  "type": type,
  "amount": amount,
  "concept": concept,
  "user_id":localStorage.getItem("id")
 });

 var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
 };

 fetch("http://localhost:3000/budget", requestOptions)
  .then(response => response.json())
  .then(result => console.log(result), GetMovimiento())
  .catch(error => console.log('error', error));
}
 
const DeleteMovement = async(id)=>{
  var myHeaders = new Headers();
  myHeaders.append("Authorization", localStorage.getItem("token"));

 var requestOptions = {
  method: 'DELETE',
  headers: myHeaders,
  redirect: 'follow'
  };

 fetch(`http://localhost:3000/budget/${id}`, requestOptions)
  .then(response => response.json())
  .then(result => GetMovimiento())
  .catch(error => console.log('error', error));
}


const EditMovement= async(id) =>{
  var myHeaders = new Headers();
  myHeaders.append("Authorization", localStorage.getItem("token"));
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "amount": amount,
    "concept": concept
  });
  
  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch(`http://localhost:3000/budget/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => GetMovimiento())
    .catch(error => console.log('error', error));
 }








 
 
 
 
 
 
 return <FetchApiContext.Provider value={{Login,
   userEmail, setUserEmail, password, setPassword,userName, setUserName,userLastName,
   setUserLastName,SignIn,repetPassword, setRepetPassword,errorMessage, setErrorMessage,
   response, setResponse, AgregarMovimiento,amount, setamount,concept, setConcept,
   type, setType, AgregarMovimiento,movements, setMovements,GetMovimiento,DeleteMovement,hidden, 
   setHidden,btnAgregar, setBtnAgregar,btnEditar, setBtnEditar,idMovement, setIdMovement,
    EditMovement,totalBudget,setTotalBudget,incomes, setIncomes,egress, setEgress,param,
     setParam,typeLabel, setTypeLabel,egr, setEgr,inc, setInc}}>{children}
    </FetchApiContext.Provider>
}