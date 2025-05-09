export default function ProductCard({ product }) {
    return (
        <div className="border rounded-xl p-4 shadow hover:shadow-lg transition">
            <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover rounded-md" />
            <h2 className="mt-2 font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.category}</p>
            <p className="text-red-600 font-bold">${product.price}</p>
        </div>
        );
    }