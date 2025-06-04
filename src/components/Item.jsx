import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import axios from "axios";
import { selectCurrentToken } from "../features/auth/authSlice";
import { Link } from "react-router-dom";

function Item() {
  const [newdata, setNewData] = useState(null); 
  const [user, setUser] = useState(null);
  const [formatted, setFormatted] = useState("");

const dataId = localStorage.getItem("itemId");
const id = dataId ? parseInt(dataId, 10) : null;

  const token = useSelector(selectCurrentToken);
  const urlforitem = `http://127.0.0.1:8000/getonedata/${id}`;

  useEffect(() => {
    const fetchData = async () => {
      if (token && dataId) { 
        try {
          const response = await axios.get(urlforitem, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setNewData(response.data);

          if (response.data && response.data.user_id) {
            fetchUser(response.data.user_id);
          }

          if (response.data && response.data.created_at) {
            const date = new Date(response.data.created_at);
            const formattedDate = date.toLocaleString("de-DE", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            });
            setFormatted(formattedDate);
          }

        } catch (error) {
          console.error("Fehler beim Abrufen der Daten:", error);
          setNewData(null); 
          setUser(null);
          setFormatted("");
        }
      }
    };
    fetchData();
  }, [token, dataId, urlforitem]); 

  const fetchUser = async (userId) => {
    const urlForUser = `http://127.0.0.1:8000/getuserbyid/${userId}`;
    if (token && userId) {
      try {
        const response = await axios.get(urlForUser, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
      } catch (error) {
        console.error("Fehler beim Abrufen der Userdaten:", error);
        setUser(null);
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8">
          {newdata ? (
            <>
              <img  
                src={`http://localhost:8000${newdata.picture}`}
                alt={newdata.title}
                className="img-fluid mb-3 d-block mx-auto"
                style={{ maxHeight: "400px", objectFit: "contain" }}
              />
              <p className="text-center">{formatted}</p>
              <h3 className="text-center">{newdata.title}</h3>
              <p className="text-center">{newdata.info}</p>

                                               <Link to={"/"} className="fs-4 text-decoration-none">homepage</Link>

            </>
          ) : (
            <p className="text-center">Login to see moreinformation about this item!</p> 
            
            
          )}
        </div>

        <div className="col-md-4">
          <div className="border p-3 rounded bg-light">
            {user ? (
              <>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Surname:</strong> {user.surname}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>User-Number:</strong> {user.number}</p>
                <p><strong>Street:</strong> {user.street}</p>
                <p><strong>Street number:</strong> {user.street_number}</p>

              </>
              
            ) : (
              <p><Link to={"/login"}>Login</Link></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;