'use client';

import { useState, useEffect } from 'react';
import { useProducts } from '@/context/ProductsContext';
import styles from './page.module.css';

export default function Admin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('products'); // 'products' or 'gallery'

    // Product Form State
    const [productForm, setProductForm] = useState({ id: null, name: '', price: '', description: '', image: null });
    const [productPreviewUrl, setProductPreviewUrl] = useState(null);
    const [isEditingProduct, setIsEditingProduct] = useState(false);

    // Gallery Form State
    const [galleryFile, setGalleryFile] = useState(null);
    const [galleryDescription, setGalleryDescription] = useState('');
    const [galleryPreviewUrl, setGalleryPreviewUrl] = useState(null);
    const [galleryUploadStatus, setGalleryUploadStatus] = useState('idle');

    // Gallery List State
    const [galleryItems, setGalleryItems] = useState([]);

    const { products, addProduct, updateProduct, deleteProduct } = useProducts();

    // Load gallery items when tab is active
    useEffect(() => {
        if (activeTab === 'gallery') {
            fetchGallery();
        }
    }, [activeTab]);

    const fetchGallery = async () => {
        try {
            const res = await fetch('/api/gallery');
            if (res.ok) {
                const data = await res.json();
                setGalleryItems(data);
            }
        } catch (error) {
            console.error('Failed to fetch gallery:', error);
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
            setIsAuthenticated(true);
        } else {
            alert('Incorrect password');
        }
    };

    // --- Product Handlers ---
    const handleProductFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProductForm({ ...productForm, image: file });
            setProductPreviewUrl(URL.createObjectURL(file));
        }
    };

    const resetProductForm = () => {
        setProductForm({ id: null, name: '', price: '', description: '', image: null });
        setProductPreviewUrl(null);
        setIsEditingProduct(false);
    };

    const handleEditProduct = (product) => {
        setProductForm(product);
        if (typeof product.image === 'string') {
            setProductPreviewUrl(product.image);
        }
        setIsEditingProduct(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteProduct = (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            deleteProduct(id);
        }
    };

    const handleProductSubmit = (e) => {
        e.preventDefault();
        if (productForm.name && productForm.price) {
            const productData = {
                ...productForm,
                image: productForm.image
            };

            if (isEditingProduct) {
                updateProduct(productData);
                alert('Product Updated!');
            } else {
                addProduct(productData);
                alert('Product Added!');
            }
            resetProductForm();
        }
    };

    // --- Gallery Handlers ---
    const handleGalleryFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setGalleryFile(file);
            setGalleryPreviewUrl(URL.createObjectURL(file));
            setGalleryUploadStatus('idle');
        }
    };

    const handleGalleryUpload = async (e) => {
        e.preventDefault();
        if (!galleryFile) return;

        setGalleryUploadStatus('uploading');

        const formData = new FormData();
        formData.append('image', galleryFile);
        formData.append('description', galleryDescription);

        try {
            const res = await fetch('/api/gallery', {
                method: 'POST',
                body: formData,
            });

            if (res.ok) {
                setGalleryUploadStatus('success');
                // Create temporary success feedback
                setTimeout(() => {
                    setGalleryUploadStatus('idle');
                    setGalleryFile(null);
                    setGalleryPreviewUrl(null);
                    setGalleryDescription('');
                    fetchGallery(); // Refresh list
                }, 2000);
            } else {
                setGalleryUploadStatus('error');
            }
        } catch (error) {
            console.error('Error uploading:', error);
            setGalleryUploadStatus('error');
        }
    };

    const handleDeleteGalleryItem = async (id) => {
        if (confirm('Are you sure you want to delete this photo?')) {
            try {
                const res = await fetch(`/api/gallery?id=${id}`, {
                    method: 'DELETE',
                });
                if (res.ok) {
                    setGalleryItems(prev => prev.filter(item => item.id !== id));
                } else {
                    alert('Failed to delete item.');
                }
            } catch (error) {
                console.error('Error deleting gallery item:', error);
            }
        }
    };


    if (!isAuthenticated) {
        return (
            <main className={`container ${styles.main} ${styles.loginContainer}`}>
                <h1 className={styles.title}>Admin Login</h1>
                <form onSubmit={handleLogin} className={styles.form}>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                    />
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </main>
        );
    }

    return (
        <main className={`container ${styles.main}`}>
            <h1 className={styles.title}>Admin Dashboard</h1>

            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === 'products' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('products')}
                >
                    Manage Products
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'gallery' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('gallery')}
                >
                    Manage Gallery
                </button>
            </div>

            {activeTab === 'products' && (
                <>
                    <div className={styles.dashboard}>
                        <h2>{isEditingProduct ? 'Edit Produce' : 'Add New Produce'}</h2>
                        {isEditingProduct && (
                            <button onClick={resetProductForm} className={styles.cancelButton}>Cancel Edit</button>
                        )}
                        <form onSubmit={handleProductSubmit} className={styles.form}>
                            <div className={styles.formGroup}>
                                <label>Product Name</label>
                                <input
                                    type="text"
                                    value={productForm.name}
                                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                                    className={styles.input}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Price</label>
                                <input
                                    type="text"
                                    placeholder="$0.00/unit"
                                    value={productForm.price}
                                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                                    className={styles.input}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Description</label>
                                <textarea
                                    value={productForm.description}
                                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                                    className={styles.textarea}
                                    rows="4"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Product Photo</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleProductFileChange}
                                    className={styles.fileInput}
                                />
                                {productPreviewUrl && (
                                    <div className={styles.previewContainer}>
                                        <img src={productPreviewUrl} alt="Preview" className={styles.previewImage} />
                                    </div>
                                )}
                            </div>
                            <button type="submit" className="btn btn-primary">
                                {isEditingProduct ? 'Update Product' : 'Add Product'}
                            </button>
                        </form>
                    </div>

                    <div className={styles.productListSection}>
                        <h2>Current Products</h2>
                        <div className={styles.productList}>
                            {products.map(product => (
                                <div key={product.id} className={styles.productItem}>
                                    <div className={styles.productInfo}>
                                        <strong>{product.name}</strong>
                                        <span className={styles.productPrice}>{product.price}</span>
                                    </div>
                                    <div className={styles.actions}>
                                        <button onClick={() => handleEditProduct(product)} className={styles.editBtn}>Edit</button>
                                        <button onClick={() => handleDeleteProduct(product.id)} className={styles.deleteBtn}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {activeTab === 'gallery' && (
                <>
                    <div className={styles.dashboard}>
                        <h2>Add to Gallery</h2>
                        <form onSubmit={handleGalleryUpload} className={styles.form}>
                            <div className={styles.formGroup}>
                                <label>Select Photo</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleGalleryFileChange}
                                    className={styles.fileInput}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Caption / Description</label>
                                <textarea
                                    placeholder="Write a caption..."
                                    value={galleryDescription}
                                    onChange={(e) => setGalleryDescription(e.target.value)}
                                    className={styles.textarea}
                                    rows="3"
                                />
                            </div>

                            {galleryPreviewUrl && (
                                <div className={styles.previewContainer}>
                                    <img src={galleryPreviewUrl} alt="Preview" className={styles.previewImage} />
                                </div>
                            )}

                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={galleryUploadStatus === 'uploading' || !galleryFile}
                            >
                                {galleryUploadStatus === 'uploading' ? 'Uploading...' : 'Upload to Gallery'}
                            </button>

                            {galleryUploadStatus === 'success' && (
                                <div className={styles.successMessage}>
                                    ✅ Added to Gallery!
                                </div>
                            )}
                            {galleryUploadStatus === 'error' && (
                                <div className={styles.errorMessage}>
                                    ❌ Upload Failed.
                                </div>
                            )}
                        </form>
                    </div>

                    <div className={styles.productListSection}>
                        <h2>Current Gallery Photos</h2>
                        <div className={styles.galleryList}>
                            {galleryItems.map(item => (
                                <div key={item.id} className={styles.galleryListItem}>
                                    <img src={item.url} alt="Gallery" className={styles.galleryListImage} />
                                    <div className={styles.galleryListInfo}>
                                        <p className={styles.galleryListDesc}>{item.description}</p>
                                        <span className={styles.galleryListDate}>{new Date(item.timestamp).toLocaleDateString()}</span>
                                    </div>
                                    <button onClick={() => handleDeleteGalleryItem(item.id)} className={styles.deleteBtn}>Delete</button>
                                </div>
                            ))}
                            {galleryItems.length === 0 && <p style={{ color: '#888' }}>No photos in gallery.</p>}
                        </div>
                    </div>
                </>
            )}
        </main>
    );
}
