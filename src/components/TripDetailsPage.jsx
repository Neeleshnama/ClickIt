import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Modal from './Modal.jsx'; // Modal component to display UploadMedia
import UploadMedia from './UploadMedia.jsx';
import MediaGallery from './MediaGallery.jsx'; // Component to display media gallery (images and videos)
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const categories = ['All Photos', 'Individual Family Photos', 'Group Photos', 'Scenic Views'];

function TripDetailsPage( ) {
  const { tripId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddMedia = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>Trip Details</h1>
      <button onClick={handleAddMedia}>Add Media</button>
      {categories.map(category => (
        <div key={category}>
          <h2>{category}</h2>
          <MediaGallery tripId={tripId} category={category} />
        </div>
      ))}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <UploadMedia tripId={tripId} />
      </Modal>
    </div>
  );
}

export default TripDetailsPage;
