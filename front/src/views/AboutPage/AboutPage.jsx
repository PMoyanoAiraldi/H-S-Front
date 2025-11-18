import React from "react";
import styles from './AboutPage.module.css';

export default function AboutPage() {
    return (
        <div className={styles.container}>
        <div className={styles.containerAbout}>
        <h1 className={styles.titleAbout}>Sobre nosotros</h1>
        <p className={styles.textAbout}> En Hidráulica HS SRL contamos con más de 13 años de trayectoria en el país, consolidándonos como una empresa joven pero con amplia experiencia en el rubro. Nos especializamos en la compra y venta de repuestos hidráulicos para los sectores agropecuario, vial, industrial y automotriz.
        Nuestro principal objetivo es brindar a nuestros clientes soluciones rápidas, eficientes y al mejor precio. Para lograrlo, ofrecemos una atención personalizada, una logística ágil y un amplio stock que nos permite responder de forma inmediata a sus necesidades.
        Trabajamos constantemente en la innovación y mejora de nuestros procesos, con el compromiso de superar las expectativas de quienes nos eligen. Porque para nosotros, la confianza de nuestros clientes es nuestro mayor logro.</p> 

        <h3 className={styles.mapTitle}>📍 Encuéntranos</h3>
        <div className={styles.mapContainerAbout}>
        <iframe
            title="Ubicación de Hidráulica HS SRL"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11091.943568020188!2d-61.24752524035151!3d-32.03387641326586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95cad2dc3df998c3%3A0x5f86cd36e41cb944!2sSarmiento%20129%2C%20S2252IKC%20G%C3%A1lvez%2C%20Santa%20Fe!5e0!3m2!1ses-419!2sar!4v1716135400973!5m2!1ses-419!2sar"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
        </div>
        </div>
    );
}