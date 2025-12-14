'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch products on mount
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setLoading(false);
        }
    };

    const addProduct = async (productData) => {
        // productData is expecting simple object, but for file upload we need FormData
        // We will refactor this to handle FormData construction if not already passed, 
        // or expect the calling component to pass object and we convert.
        // Actually, Admin component is easier to control. 
        // Let's expect the Admin component to construct FormData if it has a file, 
        // but to keep Context clean, let's accept an object and clean it here.

        const formData = new FormData();
        formData.append('name', productData.name);
        formData.append('price', productData.price);
        formData.append('description', productData.description);
        if (productData.image instanceof File) {
            formData.append('image', productData.image);
        } else {
            formData.append('image', 'null');
        }

        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                body: formData,
            });
            if (res.ok) {
                const newProduct = await res.json();
                setProducts((prev) => [...prev, newProduct]);
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
            setProducts((prev) => prev.filter((product) => product.id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const updateProduct = async (productData) => {
        const formData = new FormData();
        formData.append('id', productData.id);
        formData.append('name', productData.name);
        formData.append('price', productData.price);
        formData.append('description', productData.description);

        if (productData.image instanceof File) {
            formData.append('image', productData.image);
        } else {
            // If it's a string (existing URL), pass it in a separate field or handle in logic
            formData.append('existingImage', productData.image);
        }

        try {
            const res = await fetch('/api/products', {
                method: 'PUT',
                body: formData,
            });
            if (res.ok) {
                const updatedProduct = await res.json();
                setProducts((prev) =>
                    prev.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))
                );
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <ProductsContext.Provider value={{ products, addProduct, deleteProduct, updateProduct, loading }}>
            {children}
        </ProductsContext.Provider>
    );
}

export function useProducts() {
    return useContext(ProductsContext);
}
