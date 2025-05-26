import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './Carousel.module.css';

const products = [
    { id: 1, name: 'Soluciones hidráulicas para cada necesidad', image: 'https://res.cloudinary.com/dl7hjkrhq/image/upload/v1748295738/soluciones_hidraulicas_r8vath.png' },
    { id: 2, name: 'Válvula de control', image: 'https://res.cloudinary.com/dl7hjkrhq/image/upload/v1746567434/product/bombaparatractorpng.png' },
    { id: 3, name: 'Cilindro hidráulico', image: 'https://res.cloudinary.com/dl7hjkrhq/image/upload/v1746567434/product/bombaparatractorpng.png' },
    ];

export default function Carousel() {
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
    arrows: true             // para que los botones prev/next estén visibles y funcionen
    };

    return (
        <div className={styles.carouselContainer}>
        <Slider {...settings}>
            {products.map(product => (
            <div key={product.id} className={styles.slide}>
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
            </div>
            ))}
        </Slider>
        </div>
    );
    }