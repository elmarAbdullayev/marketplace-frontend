import "../css/login.css"
import { Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../features/auth/authSlice"; 
import { useDispatch } from "react-redux";
 
 function Login(){

    const [info, setInfo] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [error2, setError2] = useState("");     

           const dispatch = useDispatch(); 

     const url = "http://127.0.0.1:8000/login";

    const navigate = useNavigate();


    
    const handleChange = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        });
    };  

const handleClick = (e) => {
  e.preventDefault();
  if (!info.username || !info.password) {
    setError("Bitte füllen Sie alle Felder aus.");
    return;
  }
  setError("");

 const fetchData = async () => {
try {
  const response = await axios.post(url, info, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
  console.log("Response:", response.data);

          if (response.data && response.data.access_token) {
                dispatch(setCredentials({ 
                    token: response.data.access_token, 
                    user: response.data.user // Optional: Wenn Benutzerdetails zurückkommen
                }));
                alert("Registrierung erfolgreich! Sie sind jetzt eingeloggt.");
                 navigate("/")
            } else {
                alert("Registrierung erfolgreich, aber kein Login-Token erhalten.");
            }
  
  // Erfolgreiche Antwort:
  console.log("Response data:", response.data);
} catch (error) {
  // Fehler behandeln
  if (error.response) {
    // Antwort vom Server mit Fehlerstatus
    console.error("Server antwortet mit Fehler:", error.response.status);
    console.error("Fehlerdaten:", error.response.data);
    setError2(error.response.data.detail);
  }
  else if (error.request) {
    // Anfrage wurde gesendet, aber keine Antwort erhalten
    console.error("Keine Antwort vom Server:", error.request);
  } else {
    // Fehler beim Einrichten der Anfrage
    console.error("Fehler bei der Anfrage:", error.message);
  }
}
};

  fetchData(); 
};


    return(

        

        <div className="loginContainer ">
            <div className="container">

<div className="inputStyle d-flex flex-column w-100 gap-3 text-white
 justify-content-center align-items-center ">


    <div className="bg-white p-5 rounded-3 d-flex flex-column gap-3 w-50">


          <form action=""  onSubmit={handleClick}>
        <h3 className="text-center text-dark">Welcome</h3>

   <label className="text-dark" htmlFor="Email">Email</label>
            <input
                type="email"
                name="username"
                placeholder="..."
                className="rounded-lg"
                value={info.username}
                onChange={handleChange}
                required
            />

            <label className="text-dark" htmlFor="password">Password</label>
            <input
                type="password"
                name="password"
                placeholder="..."
                className="rounded-lg"
                value={info.password}
                onChange={handleChange}
                required
            />
            {error && <div className="text-danger">{error}</div>}
            <div className="text-danger fw-bold text-center fs-4">{error2 && error2}</div>

            <div className="d-flex justify-content-between">
                 <Button type="submit">Login</Button>
                 <Button> <a className="text-white text-decoration-none" href="/register">Register</a></Button>
             </div>
       


          </form>

         


    </div>

           </div>


            </div>


        </div>

    )
 }

 export default Login;