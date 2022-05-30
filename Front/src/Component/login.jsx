import styles from "../Styles/login.module.css";
import { Link } from "react-router-dom";
import {FetchApiContext} from "../Context/FetchApiContext"
const { Fragment, useContext } = require("react");

function LoginForm(){
    const{userEmail, setUserEmail,password, setPassword,Login,errorMessage} = useContext(FetchApiContext)
    console.log(userEmail)
    console.log(password)
    return(
   <Fragment>
        <section className={styles.sectionLogin}>
        <h1 className={styles.loginTitle}>Bienvenido</h1>
        <form action="" id='login-form' method="POST">
            <div className={styles.formGroup}>
              <label>Email</label>
              <input type="input" className="form-control" placeholder="ejemplo@gmail.com" required onChange={event=>{setUserEmail(event.target.value)}} />
            </div>
            <div className={styles.formGroup}>
              <label>Password</label>
              <input type="password"  className="form-control" placeholder="password" required  onChange={event=>{setPassword(event.target.value)}}/>
            </div>
            <div className={styles.btnContainer}>
            <div className={styles.loginBtn} onClick={()=>{Login()}}>Login</div>
            <div className={styles.separador}> /</div>
            <Link to="/register ">
            <div className={styles.loginBtn}>Register</div>
            </Link>
            </div>
          </form>
          <div>{errorMessage}</div>
      </section>
   </Fragment> 

    )
}

export default LoginForm;