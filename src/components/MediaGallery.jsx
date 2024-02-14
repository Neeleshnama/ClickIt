
// import React, { useState, useEffect } from 'react';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// import 'firebase/compat/storage';
// import ImagePreviewModal from './ImagePreviewModal';

// function MediaGallery({ tripId, category }) {
//   const [media, setMedia] = useState([]);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchMedia = async () => {
//       try {
//         const storageRef = firebase.storage().ref();
//         const mediaRef = storageRef.child(`media/${tripId}/${category}`);

//         // List all files in the specified directory
//         const fileList = await mediaRef.listAll();

//         // Get download URLs and metadata for each file
//         const mediaData = await Promise.all(fileList.items.map(async (fileRef) => {
//           const downloadURL = await fileRef.getDownloadURL();
//           const metadata = await fileRef.getMetadata();
//           return { url: downloadURL, metadata };
//         }));

//         setMedia(mediaData);
//         console.log(mediaData);
//         setLoading(false);
//       } catch (error) {
//         setError('Error fetching media: ' + error.message);
//         console.error('Error fetching media:', error);
//         setLoading(false);
//       }
//     };

//     fetchMedia();
//   }, [tripId, category]);

//   const handlePreview = (imageUrl, metadata) => {
//     setSelectedImage({ imageUrl, metadata });
//   };

//   const handleClosePreview = () => {
//     setSelectedImage(null);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="media-gallery">
//       <h3>{category}</h3>
//       <div className="image-grid">
//         {media.map((item, index) => (
//           <div key={index} className="image-container">
//             <img
//               src={item.url}
//               alt={`Media ${index}`}
//               onClick={() => handlePreview(item.url, item.metadata)}
//             />
//           </div>
//         ))}
//       </div>
//       {selectedImage && (
//         <ImagePreviewModal
//           imageUrl={selectedImage.imageUrl}
//           metadata={selectedImage.metadata}
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
import './mediagallery.css';

function MediaGallery({ tripId, category }) {
  const [media, setMedia] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllImages, setShowAllImages] = useState(false);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const storageRef = firebase.storage().ref();
        const mediaRef = storageRef.child(`media/${tripId}/${category}`);

        // List all files in the specified directory
        const fileList = await mediaRef.listAll();

        // Get download URLs and metadata for each file
        const mediaData = await Promise.all(fileList.items.map(async (fileRef) => {
          const downloadURL = await fileRef.getDownloadURL();
          const metadata = await fileRef.getMetadata();
          return { url: downloadURL, metadata };
        }));

        setMedia(mediaData);
        setLoading(false);
      } catch (error) {
        setError('Error fetching media: ' + error.message);
        console.error('Error fetching media:', error);
        setLoading(false);
      }
    };

    fetchMedia();
  }, [tripId, category]);

  const handlePreview = (imageUrl, metadata) => {
    setSelectedImage({ imageUrl, metadata });
  };

  const handleClosePreview = () => {
    setSelectedImage(null);
  };

  const handleSeeMore = () => {
    setShowAllImages(true);
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
        {media.slice(0, 36).map((item, index) => (
          <div key={index} className="image-container">
            <img
              src={item.url}
              alt={`Media ${index}`}
              onClick={() => handlePreview(item.url, item.metadata)}
            />
          </div>
        ))}
      </div>
      {media.length > 36 && !showAllImages && (
        <button onClick={handleSeeMore}>See More</button>
      )}
      {selectedImage && (
        <ImagePreviewModal
          imageUrl={selectedImage.imageUrl}
          metadata={selectedImage.metadata}
          onClose={handleClosePreview}
        />
      )}
    </div>
  );
}

export default MediaGallery;
