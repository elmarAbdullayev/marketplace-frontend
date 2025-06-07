import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { selectCurrentToken,selectCurrentUser } from '../features/auth/authSlice';
import { logout } from '../features/auth/authSlice'; 
import { useEffect } from "react";
import "../css/homepage.css"
import {jwtDecode}  from "jwt-decode"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';


 function Adminpanel() {

      const token = useSelector(selectCurrentToken)
      const user = useSelector(selectCurrentUser)

      const url = "https://marketplace-backend-zzu6.onrender.com/getuser"; 

      const [role,setRole] = useState()
      const [users,setNewUsers] = useState()
      const [check,setCheck] = useState(false)


      const dispatch = useDispatch()
      const navigate = useNavigate()


      useEffect(() => {
      
          if (!token) {
              dispatch(logout());
              return;
          }
      
          try {
              const decodedToken = jwtDecode(token);
              const currentTime = Date.now() / 1000; // Aktuelle Zeit in Sekunden
              console.log(decodedToken)
              setRole(decodedToken.role)
      
              if (decodedToken.exp < currentTime) {
                  // Fall: Token ist abgelaufen
                  dispatch(logout());
                  alert("Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.");
                  navigate("/login")
              }
                const fetchData = async () => {
                    if (decodedToken.role === "admin") {
                        try {
                         const api = await axios.get(url, {
                             headers: { Authorization: `Bearer ${token}` }
                                 });
                               console.log("aaaa",api.data);
                               setNewUsers(api.data)
                               setCheck(true)
                            } catch (error) {
                             console.error("Fehler beim Abrufen der Daten:", error);
                            }
                        }
                            };

                                fetchData();
          } catch (error) {
              // Fall: Token ist ungültig oder konnte nicht dekodiert werden (z.B. manipuliert)
              console.error("Fehler beim Dekodieren des Tokens:", error);
              dispatch(logout());
              alert("Ein Fehler ist aufgetreten. Bitte melden Sie sich erneut an.");
          }
      }, [dispatch, token]);

  return (

    <div>
  <h1 style={{textAlign:"center"}}>Users</h1>
{check ? (

  users.map((item,key)=>{
    return(

      <div key={key} className='d-flex gap-4 mb-2'>

            <div>Id: {item.ID}</div>
             <div>Created at: {item.created_at}</div>
            <div>Email: {item.email}</div>
            <div>Name: {item.name}</div>
            <div>Surname: {item.surname}</div>
             <div>Number: {item.number}</div>
             <div>Role: {item.role}</div>
              <div>Street: {item.street}</div>
              <div>Street Number: {item.street_number}</div>

      </div>

              
    )
  })

) : (
  <div>Only Admin.</div>
)}

<Link to={"/"}>homepage</Link>

    
    </div>

  )
}

export default Adminpanel;
