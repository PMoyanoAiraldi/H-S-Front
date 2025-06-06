import React from 'react';
import styles from './Carousel.module.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const products = [
    { id: 1, name: 'Soluciones hidráulicas para cada necesidad', image: 'https://res.cloudinary.com/dl7hjkrhq/image/upload/v1748557815/soluciones_hidraulicas_ynxygl.png' },
    { id: 2, name: 'Comprometidos con el agro, la industria y la movilidad', image: 'https://res.cloudinary.com/dl7hjkrhq/image/upload/v1748642844/comprometidos_con_el_agro_-_separadas_t4bpyx.png' },
    { id: 3, name: 'Productos importados, calidad garantizada', image: 'https://res.cloudinary.com/dl7hjkrhq/image/upload/v1748646548/importado_cy32ps.png' },
    { id: 4, name: 'Cobertura en todo el país, envíos ágiles y seguros', image: 'https://res.cloudinary.com/dl7hjkrhq/image/upload/v1748900750/camion-logistica-edb_ilyy6w.png' },
    ];



const Carousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,          // que pase solo
        autoplaySpeed: 4000,     // cada 4 segundos (ajustable)
        pauseOnHover: true,      // pausa si paso el mouse encima
        pauseOnFocus: true,      // pausa si hago foco en los botones
        arrows: true ,            // para que los botones prev/next estén visibles y funcionen
        //centerMode: true,           // para mostrar parte del siguiente slide
        centerPadding: '10%',       // "piquito" del siguiente
    };


    return (
        <section className={styles.carouselContainer}>
        <Slider {...settings}>
            {products.map(product => (
            <div key={product.id} className={styles.slide}>
                <img src={product.image} alt={product.name} className={styles.backgroundImage}/>
                
                <div className={styles.overlay}>
                <h2>{product.name}</h2>
            </div>
                </div>
            
            ))}
        </Slider>
        {/* <div className={styles.placeholder}>
            Carrusel de productos aquí
        </div> */}
        </section>
    );
};

export default Carousel;