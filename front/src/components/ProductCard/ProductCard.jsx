import styles from "./ProductCard.module.css"

export default function ProductCard({product}) {
        return (
    <div className={styles.container}>
        <img 
            src={product.imageUrl} 
            alt={product.name} 
            className={styles.productImage}
        />
        <h2 className={styles.productName}>{product.name}</h2>
        <p className={styles.productDescription}>{product.description}</p>
        {/* <p className={styles.productPrice}>${product.price}</p>  !solo para clientes */}
        </div>
    );
}