import React from 'react';
import styles from './Hero.module.css';

const Hero = () => {
    return (
        <section className={styles.hero}>
        <div className={styles.overlay}>
            <div className={styles.content}>
            <h1>Soluciones hidráulicas de precisión</h1>
            <p>Equipamiento importado con tecnología de punta para todo el país</p>
            <a href="#productos" className={styles.button}>Ver productos</a>
            </div>
        </div>
        </section>
    );
    };

    export default Hero;

// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import styles from './Hero.module.css';

// const Hero = () => {
//     const productosDestacados = [
//         { id: 1, name: 'Soluciones hidráulicas para cada necesidad', image: 'https://res.cloudinary.com/dl7hjkrhq/image/upload/v1748557815/soluciones_hidraulicas_ynxygl.png' },
//         { id: 2, name: 'Comprometidos con el agro, la industria y la movilidad', image: 'https://res.cloudinary.com/dl7hjkrhq/image/upload/v1748642844/comprometidos_con_el_agro_-_separadas_t4bpyx.png' },
//         { id: 3, name: 'Productos importados, calidad garantizada', image: 'https://res.cloudinary.com/dl7hjkrhq/image/upload/v1748646548/importado_cy32ps.png' },
//         { id: 4, name: 'Cobertura en todo el país, envíos ágiles y seguros', image: 'https://res.cloudinary.com/dl7hjkrhq/image/upload/v1748900750/camion-logistica-edb_ilyy6w.png' },
//     ];

//     const settings = {
//         dots: true,
//         infinite: true,
//         autoplay: true,
//         speed: 500,
//         autoplaySpeed: 4000,
//         slidesToShow: 1,
//         slidesToScroll: 1
//     };

//     return (
//         <Slider {...settings}>
//         {productosDestacados.map((item) => (
//             <div key={item.id} className={styles.slide}>
//             <img src={item.image} alt={item.name} className={styles.slideImg} />
//             <div className={styles.overlay}>
//                 <h2 className={styles.title}>{item.name}</h2>
//             </div>
//             </div>
//         ))}
//         </Slider>
//     );
//     };

//     export default Hero;
