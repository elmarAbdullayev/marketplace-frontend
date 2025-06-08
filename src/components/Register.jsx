import { useState } from "react";
import "../css/register.css"
import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

function Register(){

      const [info, setInfo] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: "",
        street: "",
        street_number: "",
        phone_number: "",
        role:"user"
      });
      const [error, setError] = useState("");

       const navigate = useNavigate(); 

     const url = "https://marketplace-backend-zzu6.onrender.com/register";

     const handleChange = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        });
      }; 

      const handleSubmit = async (e) => { 
        e.preventDefault();

        if (!info.name || !info.surname || !info.email || !info.password || !info.street || !info.street_number || !info.phone_number) {
          alert("Please fill in all fields.");
          return;
        }
        if (info.password !== info.confirmPassword) {
          alert("Passwords do not match.");
          return;
        }
        if (info.password.length < 6) {
          alert("Password must be at least 6 characters long.");
          return;
        }
        if (!/^\d+$/.test(info.street_number)) {
          alert("Street number must be a valid number.");
          return;
        }
        if (!/^\d{10}$/.test(info.phone_number)) {
          alert("Phone number must be exactly 10 digits.");
          return;
        }
        if (!/^[a-zA-Z]+$/.test(info.name) || !/^[a-zA-Z]+$/.test(info.surname)) {
          alert("Name and surname must contain only letters.");
          return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email)) {
          alert("Please enter a valid email address.");
          return;
        }

        try {
            const request = await axios.post(url,info);

        console.log("Registration successful:", request.data);

        navigate("/login"); 



        } catch (error) {
            console.error("Fehler bei der Registrierungaaaaa:", error); // Immer den vollen Fehler loggen

            // Prüfen, ob der Fehler eine Server-Antwort enthält
            if (error.response) {
                // Wenn der Server eine 'detail'-Nachricht gesendet hat (wie bei FastAPI HTTPException)
                if (error.response.data && error.response.data.detail) {
                    setError(error.response.data.detail);
                } else {
                    // Wenn der Server geantwortet hat, aber kein 'detail'-Feld vorhanden ist
                    alert("Fehler vom Server: " + error.response.status + " " + error.response.statusText);
                }
            } else if (error.request) {
                // Die Anfrage wurde gesendet, aber es kam keine Antwort vom Server
                alert("Keine Antwort vom Server. Bitte versuchen Sie es später erneut.");
            } else {
                // Etwas anderes ist schiefgelaufen (z.B. ein Problem im Frontend-Code selbst)
                alert("Ein unerwarteter Fehler ist aufgetreten: " + error.message);
            }
        }

        
      };


    return(
        <div className="aaa">

    <form className="containerStyle container" onSubmit={handleSubmit}>

    <h3 className="text-white text-center ">Welcome</h3>
        
<div className="d-flex gap-4 parentInput justify-content-center">

  <div className="d-flex flex-column gap-2">
    <input type="text" placeholder="name.." name="name" value={info.name}
    onChange={handleChange}/>
    <input type="text" placeholder="surname.." name="surname" value={info.surname}  onChange={handleChange}/>
    <input type="email" placeholder="email.." name="email" value={info.email}  onChange={handleChange}/>
    <input type="password" placeholder="password.." name="password" value={info.password}  onChange={handleChange}/>
  </div>

  <div className="d-flex flex-column gap-2 ">
    <input type="password" placeholder="confirm password.." name="confirmPassword" value={info.confirmPassword}  onChange={handleChange}/>
    <input type="text" placeholder="street.." name="street" value={info.street}  onChange={handleChange}/>
    <input type="text" placeholder="street_number.." name="street_number" value={info.street_number}  onChange={handleChange}/>
    <input type="text" placeholder="phone number.." name="phone_number" value={info.phone_number}  onChange={handleChange}/>
  </div>

</div>
<div className="text-white fw-bold text-center fs-4">{error && error}</div>
<div className="d-flex justify-content-center align-items-center mt-4">
  <Button className="w-50 bg-white text-black" type="submit">Register</Button>
</div>


    </form>
        </div>
    )
}



export default Register;





