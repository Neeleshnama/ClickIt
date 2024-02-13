import React, { useContext ,useState,useEffect} from 'react';
import {Route,Navigate,Routes} from "react-router-dom"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { AuthContextProvider, AuthContext } from './components/AuthContext.jsx';
import Authentication from './components/Authentication';
import CreateTrip from './components/CreateTrip';
import ShowAllTripsPage from './components/ShowAllTripsPage';
import TripDetailsPage from './components/TripDetailsPage';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBVhhYy5kzoEjKRV7nLCkCbt9rR3ZwJDcM",
  authDomain: "clickit-63eb8.firebaseapp.com",
  projectId: "clickit-63eb8",
  storageBucket: "clickit-63eb8.appspot.com",
  messagingSenderId: "3720583226",
  appId: "1:3720583226:web:f36b8c71c76eac1aea3d03",
  measurementId: "G-XQL6MQ12BT"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}


// function App() {
//   const { currentUser } = useContext(AuthContext);

//   return (
//     <AuthContextProvider>
     
//         <Routes>
//           <Route exact path="/login" element={currentUser ? <Navigate to="/" /> : <Authentication />}/>
         
//           <Route exact path="/create-trip"
//             element={currentUser ? <CreateTrip /> : <Navigate to="/login" />}
//           />
//           <Route exact path="/trip/:tripId"
//             element={currentUser ? <TripDetailsPage /> : <Navigate to="/login" />}
//             />
//           <Route exact path="/"
//            element= {currentUser ? <ShowAllTripsPage /> : <Navigate to="/login" />}
//             />
//         </Routes>
      
//     </AuthContextProvider>
//   );
// }
function App() {
  const [user, setUser] = useState(null);

useEffect(() => {
  const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    setUser(user);
  });

  return () => unsubscribe();
}, []);
  return (
    <AuthContextProvider>
      {/* <Routes>
        <Route path="/login" element={<Authentication />} />
       <Route <PrivateRoute path="/" element={<ShowAllTripsPage />}/> />
        <PrivateRoute path="/create-trip" element={<CreateTrip />} />
        <PrivateRoute path="/trip/:tripId" element={<TripDetailsPage />} />
      </Routes> */}
      <Routes>
      <Route exact path="/login" element = {user ? <Navigate to="/" /> : <Authentication />}
            
            />
            <Route path="/" element= {user ? <ShowAllTripsPage /> : <Navigate to="/" />}/>
              
           
            <Route path="/create-trip" element= {user ?<CreateTrip />: <Navigate to="/" />} />
              
            
            <Route path="/trip/:tripId"  element= {user ? <TripDetailsPage  /> : <Navigate to="/" />}/>
              
            </Routes>
              
           

    </AuthContextProvider>
  );
}

function PrivateRoute({ element }) {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? element : <Navigate to="/login" />;
}


export default App;
