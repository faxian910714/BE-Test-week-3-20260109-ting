import React, { useState, useEffect } from 'react';
import { ref, listAll, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './Firebase';

const ImageList = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const storageRef = ref(storage, '/');

    const fetchImages = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await listAll(storageRef);

            if (result.items.length === 0) {
                setImages([]);
                setLoading(false);
                return;
            }

            const imagePromises = result.items.map(async (itemRef) => {
                const url = await getDownloadURL(itemRef);
                return {
                    name: itemRef.name,
                    url: url,
                    fullRef: itemRef
                };
            });

            const imageData = await Promise.all(imagePromises);
            setImages(imageData);
        } catch (err) {
            console.error("Fetch error:", err);
            setError("Could not load images. Check your Firebase Rules.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleDelete = async (imageRef, name) => {
        if (!window.confirm(`Delete "${name}"?`)) return;

        try {
            await deleteObject(imageRef);

            setImages((prev) => prev.filter((img) => img.name !== name));
            alert("Deleted successfully!");
        } catch (err) {
            console.error("Delete error:", err);
            alert("Error deleting image.");
        }
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '20px' }}>Loading your gallery...</div>;

    return (
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Gallery ({images.length} images)</h2>
                <button onClick={fetchImages} style={buttonStyle}>Refresh List</button>
            </div>

            {error && <p style={{ color: 'red', backgroundColor: '#fee', padding: '10px' }}>{error}</p>}

            {images.length === 0 ? (
                <div style={{ border: '2px dashed #ccc', padding: '40px', textAlign: 'center', marginTop: '20px' }}>
                    <p>No images found in your Storage bucket.</p>
                    <p style={{ fontSize: '0.9em', color: '#666' }}>Upload images in the Firebase Console to see them here.</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
                    {images.map((img) => (
                        <div key={img.name} style={cardStyle}>
                            <div style={imageWrapper}>
                                <img src={img.url} alt={img.name} style={imageStyle} />
                            </div>
                            <div style={{ padding: '10px' }}>
                                <p style={fileNameStyle} title={img.name}>{img.name}</p>
                                <button
                                    onClick={() => handleDelete(img.fullRef, img.name)}
                                    style={deleteButtonStyle}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
};

const imageWrapper = {
    width: '100%',
    height: '150px',
    backgroundColor: '#f0f0f0'
};

const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
};

const fileNameStyle = {
    fontSize: '13px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    margin: '0 0 10px 0'
};

const buttonStyle = {
    padding: '8px 16px',
    cursor: 'pointer',
    borderRadius: '4px',
    border: '1px solid #ccc'
};

const deleteButtonStyle = {
    width: '100%',
    padding: '8px',
    backgroundColor: '#ff4d4f',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
};

export default ImageList;