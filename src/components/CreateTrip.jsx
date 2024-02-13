import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

function CreateTrip() {
  const [tripName, setTripName] = useState('');

  const handleCreateTrip = async () => {
    if (tripName.trim() !== '') {
      const tripsRef = firebase.firestore().collection('trips');
      await tripsRef.add({ tripName });
      setTripName('');
      // Redirect or show success message
    } else {
      // Show error message
    }
  };

  return (
    <div>
      <h2>Create Trip</h2>
      <input type="text" value={tripName} onChange={(e) => setTripName(e.target.value)} />
      <button onClick={handleCreateTrip}>Create</button>
    </div>
  );
}

export default CreateTrip;
