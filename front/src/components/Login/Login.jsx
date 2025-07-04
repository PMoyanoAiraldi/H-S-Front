import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import styles from "./Login.module.css"


const Login = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const onLogin = (userData) => {
        axios.post(`http://localhost:3010/auth/login`, userData)
        .then(resp => {
            console.log("RESPUESTA DEL BACKEND:", resp.data.user); 
            if(resp.data.user)  {
                localStorage.setItem('token', resp.data.token);
                dispatch(login({ login: true, user: resp.data.user }));
            } else {
                alert("Credenciales incorrectas");
            }
        })
        .catch(() => {
            Swal.fire('Error', 'Error al registrar los datos', 'error');
            navigate("/login")
            
        });
    };

    const [input, setInput] = useState({
        username: '',
        password: ''
    });
    const handleChange = (e) => { //a la funcion le debemos pasar un evento
        setInput({ //es una promesa
            ...input, //trae todo lo que esta en input
            [e.target.name]:e.target.value //de los cambios que haya en username o password trae el valor, identificamos los campos por name
        })

    }

    const isButtonDisabled = input.username === '' || input.password === '';
    return(
        <div className={styles.containerLogin}>
        <h1 className={styles.titleLogin}>Si eres cliente, ingresa con tus credenciales </h1>
        <form className={styles.form}>
        <div>
        <input className={styles.input} type="text" name="username" id="username"
        placeholder="Cliente" 
        onChange={handleChange} 
        value={input.username}/>
        </div> {/*los input tienen la propiedad onChange, que se ejcuta cada vez que hay un cambio, se ejecuta por cada caracter que ingrese al input  */}
        
        
        <div className={styles.passwordContainer}>
        <input className={styles.inputWithIcon} type={showPassword ? "text" : "password"} name="password" id="password"
        placeholder="Contraseña" 
        onChange={handleChange} 
        value={input.password}/>{/*el value indica el estado inicial de cada campo antes del cambio, enlazamos el estado con el valor */}
        
        <span
                className={styles.icon}
                onClick={() => setShowPassword(!showPassword)}
            >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
        </span>
        
        </div>
        <div>
        <Link to="/products"><button type="button" className={styles.button} onClick={() => onLogin(input)} disabled={isButtonDisabled}>Ingresar</button></Link>
        <Link to="/"><button type="submit" className={styles.button} > Salir</button></Link>
        </div>
        <p> ¿No estás registrado? Comunicate con administración (ver de poner el link del número)</p>
        </form>
        </div>
    )
}

export default Login;