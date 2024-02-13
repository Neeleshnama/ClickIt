// import React, { useState, useEffect } from 'react';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// import 'firebase/compat/storage';
// import ImagePreviewModal from './ImagePreviewModal';

// function MediaGallery({ tripId, category }) {
//   const [media, setMedia] = useState([]);
//   const [selectedImage, setSelectedImage] = useState(null);

//   useEffect(() => {
//     const fetchMedia = async () => {
//       const mediaRef = firebase.firestore().collection('media')
//         .where('tripId', '==', tripId)
//         .where('category', '==', category);
//       const snapshot = await mediaRef.get();
//       const mediaData = snapshot.docs.map(doc => doc.data());
//       setMedia(mediaData);
//       console.log(mediaData);
//     };
//     fetchMedia();
//   }, [tripId, category]);

//   const handlePreview = (imageUrl, uploader, timestamp) => {
//     setSelectedImage({ imageUrl, uploader, timestamp });
//   };

//   const handleClosePreview = () => {
//     setSelectedImage(null);
//   };

//   return (
//     <div className="media-gallery">
//       <h3>{category}</h3>
//       <div className="image-grid">
//         {media.map((item, index) => (
//             //console.log(item.url)
//           <div key={index} className="image-container">
//             {console.log(item.url)}
//             <img
//               src={item.url}
//               alt={`Media ${index}`}
//               onClick={() => handlePreview(item.url, item.uploadedBy, item.createdAt)}
//             />
//           </div>
//         ))}
//       </div>
//       {selectedImage && (
//         <ImagePreviewModal
//           imageUrl={selectedImage.imageUrl}
//           uploader={selectedImage.uploader}
//           timestamp={selectedImage.timestamp}
//           onClose={handleClosePreview}
//         />
//       )}
//     </div>
//   );
// }

// export default MediaGallery;
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import ImagePreviewModal from './ImagePreviewModal';

function MediaGallery({ tripId, category }) {
  const [media, setMedia] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const mediaRef = firebase.firestore().collectionGroup('media')
          .where('tripId', '==', tripId)
          .where('category', '==', category);
        const snapshot = await mediaRef.get();
        const mediaData = snapshot.docs.map(doc => doc.data());
        setMedia(mediaData);
        setLoading(false);
        console.log('Media data:', mediaData);
      } catch (error) {
        setError(error.message);
        setLoading(false);
        console.error('Error fetching media:', error);
      }
    };
    fetchMedia();
  }, [tripId, category]);

  const handlePreview = (imageUrl, uploader, timestamp) => {
    setSelectedImage({ imageUrl, uploader, timestamp });
  };

  const handleClosePreview = () => {
    setSelectedImage(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="media-gallery">
      <h3>{category}</h3>
      <div className="image-grid">
        {media.map((item, index) => (
          <div key={index} className="image-container">
            <img
              src={item.url}
              alt={`Media ${index}`}
              onClick={() => handlePreview(item.url, item.uploadedBy, item.createdAt)}
            />
          </div>
        ))}
      </div>
      {selectedImage && (
        <ImagePreviewModal
          imageUrl={selectedImage.imageUrl}
          uploader={selectedImage.uploader}
          timestamp={selectedImage.timestamp}
          onClose={handleClosePreview}
        />
      )}
    </div>
  );
}

export default MediaGallery;
