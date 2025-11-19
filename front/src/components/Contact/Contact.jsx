import React, { useRef, useEffect, useState } from "react";
import emailjs from "emailjs-com";
import styles from "./Contact.module.css";

const Contact = () => {
    const form = useRef();

    const [loading, setLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");
    const [statusType, setStatusType] = useState(""); // "success" o "error"

    useEffect(() => {
        if (statusMessage) {
            const timer = setTimeout(() => {
            setStatusMessage("");
            }, 6000);
            return () => clearTimeout(timer);
        }
}, [statusMessage]);

    const sendEmail = (e) => {
        e.preventDefault();
        setLoading(true);
        setStatusMessage("");
        setStatusType("");

        emailjs
        .sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,// ← reemplazar por tu Service ID real
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,    // ← reemplazar por tu Template ID real  
            form.current,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY     // ← reemplazar por tu Public Key (API Key)
        )
        .then(
            () => {
            setStatusMessage("Mensaje enviado correctamente ");
            setStatusType("success");
            form.current.reset();
            },
            () => {
            setStatusMessage("Hubo un error al enviar el mensaje");
            setStatusType("error");
        }
        )
        .finally(() => {
            setLoading(false);
        });
    };

    return (
        <>
        <div className={styles.container}>
        <div className={styles.containerContact}>
        <h1 className={styles.titleContact}>Envianos tu consulta</h1>
        <form ref={form} onSubmit={sendEmail} className={styles.form}>
        <input
            type="text"
            name="name"
            placeholder="Nombre y Apellido"
            required
        />
        <input
            type="email"
            name="email"
            placeholder="Tu email"
            required
        />
        <input
            type="text"
            name="locality"
            placeholder="Localidad"
            required
        />
        <textarea
            name="message"
            placeholder="Escribí tu mensaje..."
            required
        />
        <button className={styles.button} type="submit" disabled={loading}>
        {loading ? "Enviando..." : "Enviar"}
        </button>
        </form>
        </div>
        </div>

        {statusMessage && (
        <div className={`${styles.popup} ${statusType === "success" ? styles.successBox : styles.errorBox}`}>
        <p>{statusMessage}</p>
            <span className={styles.closeButton} onClick={() => setStatusMessage("")}>
        &times;
    </span>
    
        </div>
    )}
    </>
    );
};

export default Contact;
