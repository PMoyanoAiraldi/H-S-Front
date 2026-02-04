import styles from './Footer.module.css';
    import logo from '../../assets/LOGOHS.png';
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
    import {faClock,faEnvelope,faMapMarkerAlt,} from '@fortawesome/free-solid-svg-icons';
    import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

    const Footer = () => {
        const currentYear = new Date().getFullYear();

        const messages = {
                ventas:
                'Hola 👋 Me comunico desde el sitio web de Hidráulica HS y quisiera consultar por un producto.',
                compras:
                'Hola 👋 Me comunico desde el sitio web de Hidráulica HS y quisiera comunicarme con el área de compras.',
                logistica:
                'Hola 👋 Me comunico desde el sitio web de Hidráulica HS y quisiera hablar con el área de logística.',
                administracion:
                'Hola 👋 Me comunico desde el sitio web de Hidráulica HS y quisiera hablar con administración.',
                gerencia:
                'Hola 👋 Me comunico desde el sitio web de Hidráulica HS y quisiera hablar con gerencia.',
            };

            const createLink = (number, area) => {
            const msg = encodeURIComponent(messages[area]);
            return `https://api.whatsapp.com/send?phone=${number}&text=${msg}`;
        };

        const handleWhatsAppClick = (e, number, area) => {
        e.preventDefault();
        const url = createLink(number, area);
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <footer className={styles.footer}>
        <div className={styles.footerInner}>
    
         {/* Columna 1 */}
        <div className={`${styles.column} ${styles.brandColumn}`}>
            <div className={styles.brandBlock}>
            <img src={logo} alt="Logo Hidráulica HS" className={styles.logo} />
            <p className={styles.message}>
                Comprometidos con la eficiencia y calidad
                en sistemas hidráulicos.
            </p>
        </div>

        <div className={styles.contactInfo}>
            <p><FontAwesomeIcon icon={faClock} /> Lunes a Viernes:</p>
            <p>8:00 a 12:00 / 15:00 a 19:00 Hs</p>
            
            <p>
                <FontAwesomeIcon icon={faEnvelope} /> {' '}
                <a href="mailto:hidraulicahs@hotmail.com" className={styles.link}>
                hidraulicahs@hotmail.com
                </a>
            </p>
        
            <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {' '}
            <a
                href="https://www.google.com/maps?q=Sarmiento+129,+Gálvez,+Santa+Fe"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
            >
            Sarmiento 129, Gálvez - Santa Fe
            </a>
            </p>
            </div>    
        </div>

            {/* Columna 2 */}
            <div className={`${styles.column} ${styles.infoColumn}`}>
            <h4>VENTAS</h4>
            <p>
            <FontAwesomeIcon icon={faWhatsapp} />{' '}
            <a 
                    href={createLink('549340415535056', 'ventas')}
                    onClick={(e) => handleWhatsAppClick(e, '549340415535056', 'ventas')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                >
                    (03404) 15535056
                </a>
            </p>
            <p>
                <FontAwesomeIcon icon={faWhatsapp} />{' '}
                <a href={createLink('549340415535060', 'ventas')} target="_blank" rel="noopener noreferrer" className={styles.link}>
                (03404) 15535060
                </a>
            </p>
            <p>
                <FontAwesomeIcon icon={faWhatsapp} />{' '}
                <a href={createLink('549340415536624', 'ventas')} target="_blank" rel="noopener noreferrer" className={styles.link}>
                (03404) 15536624
                </a>
            </p>

            <p>
                <FontAwesomeIcon icon={faWhatsapp} />{' '}
                <a href={createLink('549340415579696', 'ventas')} target="_blank" rel="noopener noreferrer" className={styles.link}>
                (03404) 15579696
                </a>
            </p>


                <h4>LOGÍSTICA</h4>
            <p>
                <FontAwesomeIcon icon={faWhatsapp} /> {' '}
                <a href={createLink('549340415579700', 'logistica')} target="_blank" rel="noopener noreferrer" className={styles.link}>
                (03404) 15579700
                </a>
            </p>
    
            </div>

            {/* Columna 3 */}
            <div className={`${styles.column} ${styles.infoColumn}`}>
            

            <h4>ADMINISTRACIÓN</h4>
            <p>
                <FontAwesomeIcon icon={faWhatsapp} /> {' '}
                <a href={createLink('549340415535058', 'administracion')} target="_blank" rel="noopener noreferrer" className={styles.link}>
                (03404) 15535058
                </a>
            </p>
            <p>
                <FontAwesomeIcon icon={faWhatsapp} /> {' '}
                <a href={createLink('549340415510486', 'administracion')} target="_blank" rel="noopener noreferrer" className={styles.link}>
                (03404) 15510486
                </a>
            </p>

            <h4>GERENCIA</h4>
            <p>
            <FontAwesomeIcon icon={faWhatsapp} /> 
            <a href={createLink('549340415501797', 'gerencia')} target="_blank" rel="noopener noreferrer" className={styles.link}>
            (03404) 15501797

            </a>
            </p>
            </div>
        </div>

        <hr className={styles.divider} />

        <div className={styles.bottom}>
            <p>© {currentYear} Hidráulica HS SRL. Todos los derechos reservados.</p>
        </div>
        </footer>
    );
    };

    export default Footer;