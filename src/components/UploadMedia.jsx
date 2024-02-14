// import React, { useState, useContext } from 'react';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// import 'firebase/compat/storage';

// import { AuthContext } from './AuthContext.jsx'; // Assuming you have an AuthContext set up

// const categories = [
//   { label: 'All Photos', value: 'all_photos' },
//   { label: 'Individual Family Photos', value: 'individual_family_photos' },
//   { label: 'Group Photos', value: 'group_photos' },
//   { label: 'Scenic Views', value: 'scenic_views' },
//   // Add more categories as needed
// ];

// function UploadMedia({ tripId }) {
//   const { currentUser } = useContext(AuthContext);
//   const [file, setFile] = useState(null);
//   const [category, setCategory] = useState('');
//   const [uploadProgress, setUploadProgress] = useState(0);

//   const handleFileChange = (e) => {
//     if (e.target.files[0]) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const handleCategoryChange = (e) => {
//     setCategory(e.target.value);
//   };

//   const handleUpload = async () => {
//     if (file && category !== '' && currentUser) {
//       const storageRef = firebase.storage().ref(`${tripId}/${category}/${file.name}`);
//       const uploadTask = storageRef.put(file);

//       uploadTask.on(
//         'state_changed',
//         (snapshot) => {
//           const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
//           setUploadProgress(progress);
//         },
//         (error) => {
//           console.error(error);
//         },
//         () => {
//           uploadTask.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
//             // Save downloadURL to Firestore
//             try {
//               const mediaRef = firebase.firestore().collection('media').doc();
//               await mediaRef.set({
//                 tripId,
//                 category,
//                 url: downloadURL,
//                 uploadedBy: currentUser.displayName, // Include the authenticated user's name
//                 createdAt: firebase.firestore.FieldValue.serverTimestamp(),
//               });
//             } catch (error) {
//               console.error('Error saving downloadURL to Firestore:', error);
//             }
//           });
//         }
//       );
//     } else {
//       // Show error message
//       console.log('Error saving'); //
//     }
//   };

//   return (
//     <div>
//       <h2>Upload Media</h2>
//       <input type="file" onChange={handleFileChange} />
//       <select value={category} onChange={handleCategoryChange}>
//         <option value="">Select Category</option>
//         {categories.map(cat => (
//           <option key={cat.value} value={cat.value}>{cat.label}</option>
//         ))}
//       </select>
//       <button onClick={handleUpload}>Upload</button>
//       {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
//     </div>
//   );
// }

// export default UploadMedia;
// import React, { useState } from 'react';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// import 'firebase/compat/storage';

// const categories = [
//   { label: 'All Photos', value: 'all_photos' },
//   { label: 'Individual Family Photos', value: 'individual_family_photos' },
//   { label: 'Group Photos', value: 'group_photos' },
//   { label: 'Scenic Views', value: 'scenic_views' },
//   // Add more categories as needed
// ];

// function UploadMedia({ tripId}) {
//   const [file, setFile] = useState(null);
//   const [error, setError] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [category, setCategory] = useState('');
//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     setFile(selectedFile);
//   };
//   const handleCategoryChange = (e) => {
//         setCategory(e.target.value);
//        };
    
//   const handleUpload = async () => {
//     if (!file) {
//       setError('Please select a file to upload.');
//       return;
//     }

//     const storageRef = firebase.storage().ref();
//     const mediaRef = storageRef.child(`media/${tripId}/${category}/${file.name}`);

//     // Set metadata for the file
//     const metadata = {
//       contentType: file.type, // Use the file's type as the content type
//     };

//     // Upload the file with metadata
//     const uploadTask = mediaRef.put(file, metadata);

//     // Update progress bar
//     uploadTask.on('state_changed',
//       (snapshot) => {
//         const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
//         setUploadProgress(progress);
//       },
//       (error) => {
//         setError('Error uploading file: ' + error.message);
//         console.error('Error uploading file:', error);
//       },
//       () => {
//         // Upload completed successfully
//         console.log('File uploaded successfully!');
//         // Clear the file input after successful upload
//         setFile(null);
//         setUploadProgress(0);
//       }
//     );
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <select value={category} onChange={handleCategoryChange}>
//         <option value="">Select Category</option>
//          {categories.map(cat => (
//           <option key={cat.value} value={cat.value}>{cat.label}</option>
//         ))}
//       </select>
//       <button onClick={handleUpload}>Upload</button>
//       {uploadProgress > 0 && <progress value={uploadProgress} max="100" />}
//       {error && <div>{error}</div>}
//     </div>
//   );
// }

// export default UploadMedia;
// import React, { useState } from 'react';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// import 'firebase/compat/storage';

// const categories = [
//   { label: 'All Photos', value: 'all_photos' },
//   { label: 'Individual Family Photos', value: 'individual_family_photos' },
//   { label: 'Group Photos', value: 'group_photos' },
//   { label: 'Scenic Views', value: 'scenic_views' },
//   // Add more categories as needed
// ];

// function UploadMedia({ tripId }) {
//   const [file, setFile] = useState(null);
//   const [error, setError] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [category, setCategory] = useState('');

//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     setFile(selectedFile);
//   };

//   const handleCategoryChange = (event) => {
//     setCategory(event.target.value);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setError('Please select a file to upload.');
//       return;
//     }
//     if (!category) {
//       setError('Please select a category.');
//       return;
//     }

//     const storageRef = firebase.storage().ref();
//     const mediaRef = storageRef.child(`media/${tripId}/${category}/${file.name}`);

//     // Set metadata for the file
//     const metadata = {
//       contentType: file.type, // Use the file's type as the content type
//     };

//     try {
//       // Upload the file with metadata
//       const uploadTask = mediaRef.put(file, metadata);

//       // Update progress bar
//       uploadTask.on('state_changed',
//         (snapshot) => {
//           const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
//           setUploadProgress(progress);
//         },
//         (error) => {
//           setError('Error uploading file: ' + error.message);
//           console.error('Error uploading file:', error);
//         },
//         async () => {
//           // Upload completed successfully
//           console.log('File uploaded successfully!');
//           // Fetch download URL for the uploaded file
//           const downloadURL = await mediaRef.getDownloadURL();
//           // Clear the file input after successful upload
//           setFile(null);
//           setUploadProgress(0);
//           // Pass download URL and other file data to media gallery component
//           // You can handle this data in the parent component where UploadMedia is used
//           // For example: You can pass it as a prop to the parent component's state
//           console.log('Download URL:', downloadURL);
//         }
//       );
//     } catch (error) {
//       setError('Error uploading file: ' + error.message);
//       console.error('Error uploading file:', error);
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <select value={category} onChange={handleCategoryChange}>
//         <option value="">Select Category</option>
//         {categories.map((cat) => (
//           <option key={cat.value} value={cat.value}>{cat.label}</option>
//         ))}
//       </select>
//       <button onClick={handleUpload}>Upload</button>
//       {uploadProgress > 0 && <progress value={uploadProgress} max="100" />}
//       {error && <div>{error}</div>}
//     </div>
//   );
// }

// export default UploadMedia;


// new 
import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const categories = [
  { label: 'All Photos', value: 'all_photos' },
  { label: 'Individual Family Photos', value: 'individual_family_photos' },
  { label: 'Group Photos', value: 'group_photos' },
  { label: 'Scenic Views', value: 'scenic_views' },
  // Add more categories as needed
];

const members = ['John Doe', 'Jane Doe', 'Alice', 'Bob']; // List of members

function UploadMedia({ tripId }) {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [category, setCategory] = useState('');
  const [uploader, setUploader] = useState('');
  
  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    setFiles(selectedFiles);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  
  const handleUploaderChange = (event) => {
    setUploader(event.target.value);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setError('Please select one or more files to upload.');
      return;
    }
    if (!category) {
      setError('Please select a category.');
      return;
    }
    if (!uploader) {
      setError('Please select an uploader.');
      return;
    }

    const storageRef = firebase.storage().ref();

    // Iterate through each selected file
    for (const file of files) {
      const mediaRef = storageRef.child(`media/${tripId}/${category}/${file.name}`);

      // Set metadata for the file
      const metadata = {
        contentType: file.type, // Use the file's type as the content type
        customMetadata: {
          uploader: uploader,
          timestamp: new Date().toISOString(), // Set current timestamp
        },
      };

      try {
        // Upload the file with metadata
        const uploadTask = mediaRef.put(file, metadata);

        // Update progress bar
        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setUploadProgress(progress);
          },
          (error) => {
            setError('Error uploading file: ' + error.message);
            console.error('Error uploading file:', error);
          },
          async () => {
            // Upload completed successfully
            console.log('File uploaded successfully!');
            // Fetch download URL for the uploaded file (optional)
            const downloadURL = await mediaRef.getDownloadURL();
            // You can use the download URL as needed
          }
        );
      } catch (error) {
        setError('Error uploading file: ' + error.message);
        console.error('Error uploading file:', error);
      }
    }

    // Clear selected files and reset state after upload
    setFiles([]);
    setUploadProgress(0);
    setError(null);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} multiple />
      <select value={category} onChange={handleCategoryChange}>
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.value} value={cat.value}>{cat.label}</option>
        ))}
      </select>
      <select value={uploader} onChange={handleUploaderChange}>
        <option value="">Select Uploader</option>
        {members.map((member) => (
          <option key={member} value={member}>{member}</option>
        ))}
      </select>
      <button onClick={handleUpload}>Upload</button>
      {uploadProgress > 0 && <progress value={uploadProgress} max="100" />}
      {error && <div>{error}</div>}
    </div>
  );
}

export default UploadMedia;
