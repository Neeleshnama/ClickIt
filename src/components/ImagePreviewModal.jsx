// import React from 'react';
import './ImagePreviewModal.css';

// function ImagePreviewModal({ imageUrl, uploader, timestamp, onClose }) {
//   const handleDownload = () => {
//     const downloadLink = document.createElement('a');
//     downloadLink.href = imageUrl;
//     downloadLink.download = 'image';
//     document.body.appendChild(downloadLink);
//     downloadLink.click();
//     document.body.removeChild(downloadLink);
//   };

//   return (
//     <div className="image-preview-modal-overlay" onClick={onClose}>
//       <div className="image-preview-modal-content" onClick={(e) => e.stopPropagation()}>
//         <img src={imageUrl} alt="Preview" />
//         <div className="image-details">
//           <p>Uploaded by: {uploader}</p>
//           <p>Uploaded at: {timestamp}</p>
//           <button onClick={handleDownload}>Download</button>
//         </div>
//         <button onClick={onClose}>Close</button>
//       </div>
//     </div>
//   );
// }

// export default ImagePreviewModal;
import React from 'react';

function ImagePreviewModal({ imageUrl, metadata, onClose }) {
  console.log(metadata);
  const downloadImage = async (imageUrl) => {
    try {
      // Fetch the image data
      const response = await fetch(imageUrl);
      const blob = await response.blob();
  
      // Create a temporary anchor element
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(new Blob([blob]));
      link.download = imageUrl.split('/').pop(); // Set the download attribute to the image's filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };
  const handleDownload = () => {
    
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = imageUrl.split('/').pop(); // Set the download attribute to the image's filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
  };

  return (
    

<div className="image-preview-modal-overlay" onClick={onClose}>
       <div className="image-preview-modal-content" onClick={(e) => e.stopPropagation()}>
        <img  className="img_preview" src={imageUrl} alt="Preview" />
         <div className="image-details">
         <p>Uploader: {metadata ? metadata.customMetadata.uploader : ''}</p>
        <p>Timestamp: {metadata ? new Date(metadata.customMetadata.timestamp).toLocaleString() : ''}</p>
        <p>Download: <button onClick={handleDownload}>Download</button></p>
         </div>
         
       </div>
     </div>
  );
}

export default ImagePreviewModal;
