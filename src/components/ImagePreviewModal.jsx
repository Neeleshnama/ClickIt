import React from 'react';
import './ImagePreviewModal.css';

function ImagePreviewModal({ imageUrl, uploader, timestamp, onClose }) {
  const handleDownload = () => {
    const downloadLink = document.createElement('a');
    downloadLink.href = imageUrl;
    downloadLink.download = 'image';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="image-preview-modal-overlay" onClick={onClose}>
      <div className="image-preview-modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={imageUrl} alt="Preview" />
        <div className="image-details">
          <p>Uploaded by: {uploader}</p>
          <p>Uploaded at: {timestamp}</p>
          <button onClick={handleDownload}>Download</button>
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default ImagePreviewModal;
