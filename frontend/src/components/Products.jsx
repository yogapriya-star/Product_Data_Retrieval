import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Products = () => {
    const [products, setProducts] = useState([]);

    const stripHtmlTags = (htmlString) => {
        return htmlString.replace(/<[^>]+>/g, '');
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

  
    return (
        <div className="container mx-auto py-8">
        <h1 className="text-3xl text-center font-bold mb-4">Shopify Products</h1>
        <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse">
                <thead>
                    <tr>
                        <th className="px-4 py-2 bg-gray-200 text-gray-700">Product ID</th>
                        <th className="px-4 py-2 bg-gray-200 text-gray-700">Product Title</th>
                        <th className="px-4 py-2 bg-gray-200 text-gray-700">Product Description</th>
                        <th className="px-4 py-2 bg-gray-200 text-gray-700">Product Category</th>
                        <th className="px-4 py-2 bg-gray-200 text-gray-700">Product Tags</th>
                        <th className="px-4 py-2 bg-gray-200 text-gray-700">Variant ID</th>
                        <th className="px-4 py-2 bg-gray-200 text-gray-700">Variant Title</th>
                        <th className="px-4 py-2 bg-gray-200 text-gray-700">Variant Price</th>
                        <th className="px-4 py-2 bg-gray-200 text-gray-700">Variant Compared Price</th>
                        <th className="px-4 py-2 bg-gray-200 text-gray-700">Variant SKU</th>
                        <th className="px-4 py-2 bg-gray-200 text-gray-700">Variant Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td className="border px-4 py-2">{product.id}</td>
                            <td className="border px-4 py-2">{product.title}</td>
                            <td className="border px-4 py-2">{stripHtmlTags(product.body_html)}</td>
                            <td className="border px-4 py-2">{product.product_type}</td>
                            <td className="border px-4 py-2">{product.tags}</td>
                            <td className="border px-4 py-2">{product.variants[0].id}</td>
                            <td className="border px-4 py-2">{product.variants[0].title}</td>
                            <td className="border px-4 py-2">{product.variants[0].price}</td>
                            <td className="border px-4 py-2">{product.variants[0].compare_at_price}</td>
                            <td className="border px-4 py-2">{product.variants[0].sku}</td>
                            <td className="border px-4 py-2">{product.variants[0].inventory_quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    );
  };
export default Products