import React from 'react';
import styles from './Carousel.module.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Slider from 'react-slick';


const products = [
    { id: 1, name: 'Soluciones hidráulicas para cada necesidad', image: 'https://res.cloudinary.com/dl7hjkrhq/image/upload/v1749589620/soluciones_hidraulicas_kbbpxx.png' },
    { id: 2, name: 'Comprometidos con el agro, la industria y la movilidad', image: 'https://res.cloudinary.com/dl7hjkrhq/image/upload/v1749589859/comprometidos_con_el_agro_xyixz4.png' },
    { id: 3, name: 'Productos importados, calidad garantizada', image: 'https://res.cloudinary.com/dl7hjkrhq/image/upload/v1749510535/importado_q9qb3m.png' },
    { id: 4, name: 'Cobertura en todo el país, envíos ágiles y seguros', image: 'https://res.cloudinary.com/dl7hjkrhq/image/upload/v1749589079/envio_a_todo_el_pais_mih7sy.png' },
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
        prevArrow: <ChevronLeft className="custom-arrow prev" />,
        nextArrow: <ChevronRight className="custom-arrow next" />,
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
        </section>
    );
};

export default Carousel;