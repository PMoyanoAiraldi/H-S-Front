import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import styles from "../RecoverPassword/RecoverPassword.module.css"


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3010';

const RecoverPassword = () =>{
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const [input, setInput] = useState({
        username: '',
        password: '',
        cPassword: ''
    });

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };

    const onRecoverPassword = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        // Validación 1: Campos vacíos
        if (!input.username || !input.password || !input.cPassword) {
            Swal.fire({
                icon: 'warning',
                title: 'Campos incompletos',
                text: 'Por favor completa todos los campos'
            });
            return;
        }

        // Validación 2: Las contraseñas deben coincidir
        if (input.password !== input.cPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Las contraseñas no coinciden',
                text: 'Por favor verifica que ambas contraseñas sean iguales'
            });
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[=!@#$%^&*])[A-Za-z\d=!@#$%^&*]{8,15}$/;
        if (!passwordRegex.test(input.password)) {
            Swal.fire({
                icon: 'error',
                title: 'Contraseña inválida',
                html: `
                    <p>La contraseña debe cumplir con:</p>
                    <ul style="text-align: left; margin: 1rem auto; max-width: 300px;">
                        <li>Entre 8 y 15 caracteres</li>
                        <li>Al menos una letra minúscula</li>
                        <li>Al menos una letra mayúscula</li>
                        <li>Al menos un número</li>
                        <li>Al menos un carácter especial (!@#$%^&*=)</li>
                    </ul>
                `
            });
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/users/recover`, {
                username: input.username,
                password: input.password,
                cPassword: input.cPassword
            });

            console.log("RESPUESTA DEL BACKEND:", response.data);

            // Mostrar mensaje de éxito
            await Swal.fire({
                icon: 'success',
                title: '¡Contraseña actualizada!',
                text: 'Tu contraseña ha sido cambiada exitosamente. Por favor inicia sesión con tu nueva contraseña.',
                confirmButtonText: 'Ir al login',
                confirmButtonColor: '#00ADEF'
            });

            // Limpiar cualquier token existente
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            // Redirigir al login
            navigate('/login');

        } catch (error) {
            console.error('Error al recuperar contraseña:', error);

            let errorMessage = 'No se pudo cambiar la contraseña';
            let errorTitle = 'Error';

            // Manejo específico de errores
            if (error.response?.status === 404) {
                errorTitle = 'Usuario no encontrado';
                errorMessage = 'No existe un cliente con ese nombre. Por favor verifica el nombre o contacta con administración.';
            } else if (error.response?.status === 403) {
                errorTitle = 'Acceso denegado';
                errorMessage = 'No tienes permisos para realizar esta acción. Solo los clientes pueden recuperar su contraseña. Contacta con administración.';
            } else if (error.response?.status === 400) {
                errorTitle = 'Datos inválidos';
                errorMessage = error.response.data.message || 'Verifica que los datos sean correctos';
            } else if (error.response?.data?.message) {
                errorMessage = Array.isArray(error.response.data.message) 
                    ? error.response.data.message.join(', ')
                    : error.response.data.message;
            }

            Swal.fire({
                icon: 'error',
                title: errorTitle,
                text: errorMessage,
                footer: '<a href="tel:+549340415535058">¿Necesitas ayuda? Contacta con administración</a>'
            });
        }
    };

    const isButtonDisabled = input.username === '' || input.password === '' || input.cPassword === '';
    
    return(
        <div className={styles.container}>
        <h1 className={styles.title}>Recupera tus credenciales </h1>
        <form className={styles.form} onSubmit={onRecoverPassword}>
        
        <div className={styles.inputContainer}>
        <input className={styles.input} type="text" name="username" id="username"
        placeholder="Cliente" 
        onChange={handleChange} 
        value={input.username}
        autoComplete="username"
        />
        
         {/*los input tienen la propiedad onChange, que se ejcuta cada vez que hay un cambio, se ejecuta por cada caracter que ingrese al input  */}
        </div>
        
        <div className={styles.inputContainer}>
        <input className={styles.inputWithIcon} type={showPassword ? "text" : "password"} name="password" id="password"
        placeholder="Contraseña" 
        onChange={handleChange} 
        value={input.password}
        autoComplete="new-password"
        />{/*el value indica el estado inicial de cada campo antes del cambio, enlazamos el estado con el valor */}
        
        <span
                className={styles.icon}
                onClick={() => setShowPassword(!showPassword)}
            >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
        </span>
        </div>

        <div className={styles.inputContainer}>
        <input className={styles.inputWithIcon} type={showConfirmPassword ? "text" : "password"} name="cPassword" id="cPassword"
        placeholder="Confirmar contraseña" 
        onChange={handleChange} 
        value={input.cPassword}
        autoComplete="new-password"
        />{/*el value indica el estado inicial de cada campo antes del cambio, enlazamos el estado con el valor */}
        
        <span
                className={styles.icon}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
                <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
        </span>
        </div>
        
                <div className={styles.buttonContainer}>
                    <button 
                        type="submit" 
                        className={styles.button} 
                        disabled={isButtonDisabled}
                    >
                        Guardar
                    </button>
                    <Link to="/">
                        <button type="button" className={styles.button}>
                            Cancelar
                        </button>
                    </Link>
                </div>

                <p className={styles.helpText}>
                    ¿No estás registrado? 
                    <a href="tel:+54123456789"> Comunícate con administración</a>
                </p>
            </form>
        </div>
    )
}

export default RecoverPassword;