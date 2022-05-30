import styles from "../Styles/register.module.css";
import {FetchApiContext} from "../Context/FetchApiContext"
const { Fragment, useContext, useEffect } = require("react");

function RegisterForm(){
    const{userEmail, setUserEmail,password, setPassword,userLastName, setUserLastName,userName, setUserName,SignIn,repetPassword, setRepetPassword,errorMessage, setErrorMessage,response, setResponse} = useContext(FetchApiContext)

    console.log(userEmail)
    console.log(userLastName);
    console.log(userName);
    console.log(password)
  
    function Register(){
     if(password === repetPassword){
       SignIn()
     }else{
      setErrorMessage("las contraseñas no son iguales")
     }
    }

    return(
    <Fragment>
     <section className={styles.sectionRegister}>
     <h1 className={styles.registerTitle}>Bienvenido</h1>
     <form action="" id='login-form' method="POST">
    <div className={styles.formGroup}>
          <label>Name</label>
          <input type="input" className="form-control" placeholder="William" required onChange={event=>{setUserName(event.target.value)}} />
        </div>
        <div className={styles.formGroup}>
          <label>Last Name</label>
          <input type="input" className="form-control" placeholder="Jefferson" required onChange={event=>{setUserLastName(event.target.value)}} />
        </div>
        <div className={styles.formGroup}>
          <label>Email</label>
          <input type="input" className="form-control" placeholder="ejemplo@gmail" required onChange={event=>{setUserEmail(event.target.value)}}  />
        </div>
        <div className={styles.formGroup}>
          <label>Password</label>
          <input type="password"  className="form-control" placeholder="password" required  onChange={event=>{setPassword(event.target.value)}}/>
        </div>
        <div className={styles.formGroup}>
          <label>Repeat Password</label>
          <input type="password"  className="form-control" placeholder="repeat password" required  onChange={event=>{setRepetPassword(event.target.value)}}/>
        </div>
        <div className={styles.registerBtn} onClick={()=>{Register()}}>Register</div>
        <div>{errorMessage}</div>
        <div>{response}</div>

      </form>
  </section>
</Fragment> 

    )
}

export default RegisterForm;