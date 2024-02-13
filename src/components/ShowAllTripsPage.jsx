// import React, { useState, useEffect } from 'react';
// import { Navigate } from 'react-router-dom';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';


// function ShowAllTripsPage() {
//   const [trips, setTrips] = useState([]);

//   useEffect(() => {
//     const fetchTrips = async () => {
//       const tripsRef = firebase.firestore().collection('trips');
//       const snapshot = await tripsRef.get();
//       const tripsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setTrips(tripsData);
//     };
//     fetchTrips();
//   }, []);

//   return (
//     <div>
//       <h1>All Trips</h1>
//       <ul>
//         {trips.map(trip => (
//           <li key={trip.id}>
//             <Navigate to={`/trip/${trip.id}`}/>{trip.tripName}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ShowAllTripsPage;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Navigate and Link from react-router-dom
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


function ShowAllTripsPage() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      const tripsRef = firebase.firestore().collection('trips');
      const snapshot = await tripsRef.get();
      const tripsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTrips(tripsData);
    };
    fetchTrips();
  }, []);

  return (
    <div>
      <h1>All Trips</h1>
      <ul>
        {trips.map(trip => (
          <li key={trip.id}>
            <Link to={`/trip/${trip.id}`}>{trip.tripName}</Link> {/* Changed Navigate to Link */}
          </li>
        ))}
      </ul>
      <Link to="/create-trip">Create Trip</Link> {/* Button to navigate to create trip page */}
    </div>
  );
}

export default ShowAllTripsPage;

