import React from 'react';
import styles from './ProductsPreview.module.css';

const ProductsPreview = () => {
    return (
    <section className={styles.products}>
        <h2>Productos Destacados</h2>
        <div className={styles.grid}>
            {/* Aquí renderizarías un map de productos */}
            <div className={styles.card}>Producto 1</div>
            <div className={styles.card}>Producto 2</div>
            <div className={styles.card}>Producto 3</div>
        </div>
        </section>
    );
};

export default ProductsPreview;
