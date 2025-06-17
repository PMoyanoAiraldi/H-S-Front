    import React from 'react';
    import styles from './Footer.module.css';
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
    import { faClock, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
    import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className={styles.footer}>
        <div className={styles.footerInner}>
        <div className={styles.infoSection}>

        <div className={styles.contactSection}>
                    <p><FontAwesomeIcon icon={faClock} /> Lunes a Viernes: </p>
                    <p>8:00 a 12:00 - 15:00 a 19:00 Hs</p>
                    <p><FontAwesomeIcon icon={faEnvelope} /> hidraulicahs@hotmail.com</p>
                    <p><FontAwesomeIcon icon={faMapMarkerAlt} /> Sarmiento 129, Gálvez - Santa Fe</p>
        </div>


            <div>
            <h4>VENTAS</h4>
            <p><FontAwesomeIcon icon={faWhatsapp} style={{ color: '#333' }} /> (03404) 15535056 </p>
            <p><FontAwesomeIcon icon={faWhatsapp} style={{ color: '#333' }} /> (03404) 15535060 </p>
            <p><FontAwesomeIcon icon={faWhatsapp} style={{ color: '#333' }} /> (03404) 15536624</p>
            </div>

            <div>
            <h4>COMPRAS</h4>
            <p><FontAwesomeIcon icon={faWhatsapp} style={{ color: '#333' }} /> (03404) 15535037 </p>
            </div>

            <div>
            <h4>LOGÍSTICA</h4>
            <p><FontAwesomeIcon icon={faWhatsapp} style={{ color: '#333' }} /> (03404) 15579700 </p>
            </div>

            <div>
            <h4>ADMINISTRACIÓN</h4>
            <p><FontAwesomeIcon icon={faWhatsapp} style={{ color: '#333' }} /> (03404) 15535058 </p>
            <p><FontAwesomeIcon icon={faWhatsapp} style={{ color: '#333' }} /> (03404) 15510486 </p>
            </div>

            <div>
            <h4>GERENCIA</h4>
            <p><FontAwesomeIcon icon={faWhatsapp} style={{ color: '#333' }} /> (03404) 15501797 </p>
            </div>
        </div>

    

        <hr className={styles.divider} />

        <div className={styles.bottom}>
            <p>© 2025 Hidráulica HS SRL. Todos los derechos reservados.</p>
        </div>
        </div>
        </footer>
    );
    };

export default Footer;
