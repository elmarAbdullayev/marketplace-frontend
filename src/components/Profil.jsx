import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser, selectCurrentToken, selectIsLoggedIn } from '../features/auth/authSlice';
import { jwtDecode } from 'jwt-decode';
import { data, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';

function Profil() {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);

  //  const url = `http://127.0.0.1:8000/getusersdata/${user.id}`
const url = `https://marketplace-backend-zzu6.onrender.com/getusersdata/${user.id}`


  useEffect(() => {
  if (!token) {
    alert("Bitte melden Sie sich an, um Ihr Profil zu sehen.");
    return navigate("/login");
  }

  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;

    if (decoded.exp < now) {
      alert("Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.");
      return navigate("/login");
    }

    const fetchData = async () => {
      try {
        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserData(res.data);
      } catch (err) {
        console.error("Fehler beim Abrufen der Benutzerdaten:", err);
        alert("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
      }
    };

    fetchData();
  } catch (err) {
    console.error("Fehler beim Dekodieren des Tokens:", err);
    alert("Ein Fehler ist aufgetreten. Bitte melden Sie sich erneut an.");
    navigate("/login");
  }
}, [token, user, navigate,url]); 

const handleClick = async (id) => {
  const deleteurl = `https://marketplace-backend-zzu6.onrender.com/deletedata/${id}`;
  if (!window.confirm("Sind Sie sicher, dass Sie diesen Eintrag löschen möchten?")) {
    return;
  }
  try {
    const response = await axios.delete(deleteurl, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (response.status === 200) {
      alert("Data erfolgreich gelöscht.");
      setUserData((prev) => prev.filter(item => item.ID !== id));
    } else {
      alert("Fehler beim Löschen der Data.");
    }
  } catch (error) {
    console.error("Fehler beim Löschen der Daten:", error);
    alert("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
  }
};


  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const handleEditClick = (e,id) => {
  e.preventDefault();
  setEdit(edit => !edit);

}

const handleSubmit = async (e) => {
  e.preventDefault();

}

  return (
    <div className='container mt-5'>
      {isLoggedIn && user ? (
        <>
          <h2>Willkommen, {user.role}!</h2>
          <p>Email: {user.email}</p>

          {edit && (

            <form action="" className='container' onSubmit={handleSubmit}>
               <div className='w-100 justify-content-center align-items-center d-flex flex-column gap-3 mb-5'>

            <h5>Was Willst du ändern?</h5>
            <input type="text" placeholder='titel,category...'/>
            <input type="text" placeholder='neue Datei'/>
            <Button type='submit'>submit</Button>
          </div>
            </form>

          )}

 

<div className='d-flex flex-wrap justify-content-between '> 
 {userData.map((item, index) => (
            <div key={index} className='card mb-3'>
              <div className='card-body'>
                <img src={item.picture} alt="Bild" width="150" />
                <h5 className='card-title'>Titel: {item.title}</h5>
                <h5 className='card-title'>Kategorie: {item.category}</h5>
                <h5 className='card-title'>Stadt: {item.city}</h5>
                <h5 className='card-title'>Erstellt am: {formatDate(item.created_at)}</h5>
                <h5 className='card-title'>Info: {item.info}</h5>
                <h5 className='card-title'>Aktualisiert am: {formatDate(item.updated_at)}</h5>

         <div className='d-flex justify-content-between mt-3'>
            <Button onClick={()=>handleClick(item.ID)}>Delete</Button>
            <Button onClick={(e)=>handleEditClick(e,item.ID)}>Edit</Button>  
          </div>
              </div>
            </div>

      
          ))}
</div>
         

    

        </>
      ) : (
        <h2>Bitte melden Sie sich an, um Ihr Profil zu sehen.</h2>
      )}

      <Link to="/">Zurück zur Homepage</Link>
    </div>
  );
}

export default Profil;
