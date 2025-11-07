import { useParams } from "react-router-dom";

const ProductDetail = () => {
    const { category, brand } = useParams();

    return (
        <section style={{ padding: "2rem" }}>
        <h2>{category}</h2>
        <h3>{brand}</h3>
        <p>Aquí podés mostrar los productos específicos de {brand} dentro de la categoría {category}.</p>
        </section>
    );
};

export default ProductDetail;