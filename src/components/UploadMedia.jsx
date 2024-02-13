import React, { useState, useContext } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

import { AuthContext } from './AuthContext.jsx'; // Assuming you have an AuthContext set up

const categories = [
  { label: 'All Photos', value: 'all_photos' },
  { label: 'Individual Family Photos', value: 'individual_family_photos' },
  { label: 'Group Photos', value: 'group_photos' },
  { label: 'Scenic Views', value: 'scenic_views' },
  // Add more categories as needed
];

function UploadMedia({ tripId }) {
  const { currentUser } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleUpload = async () => {
    if (file && category !== '' && currentUser) {
      const storageRef = firebase.storage().ref(`${tripId}/${category}/${file.name}`);
      const uploadTask = storageRef.put(file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setUploadProgress(progress);
        },
        (error) => {
          console.error(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
            // Save downloadURL to Firestore
            try {
              const mediaRef = firebase.firestore().collection('media').doc();
              await mediaRef.set({
                tripId,
                category,
                url: downloadURL,
                uploadedBy: currentUser.displayName, // Include the authenticated user's name
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              });
            } catch (error) {
              console.error('Error saving downloadURL to Firestore:', error);
            }
          });
        }
      );
    } else {
      // Show error message
      console.log('Error saving'); //
    }
  };

  return (
    <div>
      <h2>Upload Media</h2>
      <input type="file" onChange={handleFileChange} />
      <select value={category} onChange={handleCategoryChange}>
        <option value="">Select Category</option>
        {categories.map(cat => (
          <option key={cat.value} value={cat.value}>{cat.label}</option>
        ))}
      </select>
      <button onClick={handleUpload}>Upload</button>
      {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
    </div>
  );
}

export default UploadMedia;
