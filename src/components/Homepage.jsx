import { Button } from "react-bootstrap";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'; 
import { selectIsLoggedIn, logout } from '../features/auth/authSlice'; 
import { useEffect, useState } from "react";
import axios from "axios";
import { selectCurrentToken } from "../features/auth/authSlice";
import "../css/homepage.css"
import { useNavigate } from "react-router-dom";
import {jwtDecode}  from "jwt-decode"

function Homepage() {


        const [newdata,setNewData] = useState()
        const [tempData,setTempData] = useState()


        const navigate = useNavigate();

         const url = "http://127.0.0.1:8000/getdata";

    const isLoggedIn = useSelector(selectIsLoggedIn);
      const token = useSelector(selectCurrentToken)
    const dispatch = useDispatch(); 

useEffect(() => {

    if (!token) {
        dispatch(logout());
        return;
    }

    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Aktuelle Zeit in Sekunden
        console.log(decodedToken)

        if (decodedToken.exp < currentTime) {
            // Fall: Token ist abgelaufen
            dispatch(logout());
            alert("Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.");
            navigate("/login")
        }
    } catch (error) {
        // Fall: Token ist ungültig oder konnte nicht dekodiert werden (z.B. manipuliert)
        console.error("Fehler beim Dekodieren des Tokens:", error);
        dispatch(logout());
        alert("Ein Fehler ist aufgetreten. Bitte melden Sie sich erneut an.");
    }
}, [dispatch, token]);


 useEffect(() => {
    const fetchData = async () => {
   try {
          const response = await axios.get(url);
          console.log(response);
          setNewData(response.data)
          setTempData(response.data)
        } catch (error) {
          console.error("Fehler beim Abrufen der Daten:", error); 
        }
    };

    fetchData();
  }, []);


  const handleChange = (e)=>{
    const data = e.target.value.toLowerCase();
    
     const filtered = tempData?.filter(item =>
    item.title.toLowerCase().includes(data)
  );

  setNewData(filtered);
    
  }

  const handleClick = (value) =>{
       const val = value.toLowerCase();
       const filtered = tempData?.filter(item => item.category.toLowerCase() === val)
         setNewData(filtered);
  }


    const handleClickCard = (id) =>{
        localStorage.setItem("itemId",id)
        navigate("/item");
    }


    const handleLogout = () => {
        dispatch(logout()); 
        alert("You have been logged out."); 
    };

    return (
        <div>
            <h1 className="werbung"> </h1>

            <div className="options">
                <div className="nameKatalog d-flex justify-content-around w-25">
                    <div style={{ cursor: "pointer" }}>
                        <RxHamburgerMenu className="fs-2 text-danger" />
                    </div>
                    <div>Gratis.com</div>
                </div>

                <div className="d-flex w-50">
                    <input
                        type="text"
                        className="form-control"
                        style={{ borderRadius: "0.5rem", minWidth: "150px" }}
                        placeholder="Search..."
                        onChange={handleChange}
                    />
                    
                </div>

                {!isLoggedIn ? (
                    <>
                        <Link to={"/login"} className="login">login</Link>
                        <Link to={"/register"} className="login" style={{ background: "green" }}>register</Link>
                    
                    </>
                ) : (
                    <>
                        {/* If logged in, show a logout button and potentially other user-specific links */}
                        <Link to={"/newadvertisement"} className="login">New advertisement</Link>
                        <Button onClick={handleLogout} className="login" style={{ background: "red" }}>Logout</Button>
                    </>
                )}
            </div>

            <div className="text-center text-danger fs-3">{!isLoggedIn && "login to share something"}</div>  
            <div className="myContainer container">

    <div className="catalogImages">
    <div onClick={()=>handleClick("vehicles")}>
        <img src="https://cdn.pixabay.com/photo/2016/03/31/20/01/auto-1295461_640.png" alt="Vehicles" />
        <h5>Vehicles</h5>
    </div>
    <div  onClick={()=>handleClick("electronics")}>
        <img src="https://hniesfp.imgix.net/8/images/detailed/786/ZGM-00040.jpg?fit=fill&bg=0FFF&w=1500&h=1000&auto=format,compress" alt="Electronics" />
        <h5>Electronics</h5>
    </div>
    <div onClick={()=>handleClick("Real Estate")}>
        <img src="https://site-api.bankofbaku.com/storage/6e44c1bc-bb66-4053-910c-15da7e3124dd" alt="Real Estate" />
        <h5>Real Estate</h5>
    </div>
    <div onClick={()=>handleClick("Fashion")}>
        <img src="https://media.istockphoto.com/id/1067767654/photo/womens-clothes-set-isolated-female-clothing-collage.jpg?s=1024x1024&w=is&k=20&c=xi8AUUjTicdjR2GuJo9XjQ8a3w4omoLx-r9mE1cuM7o=" alt="Fashion" />
        <h5>Fashion</h5>
    </div>
    <div onClick={()=>handleClick("Services")}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs7gIT1U4LhjsprJJW1LD1o20i8V0AG8O_CeuCj-qrpCgQ-GCEaGvHlOGkEuqDb96eItw&usqp=CAU" alt="Services" />
        <h5>Services</h5>
    </div>
    <div onClick={()=>handleClick("Baby & Kids")}>
        <img src="https://bubmania.com.au/cdn/shop/files/BabyhoodDiddleeDoo3in1WalkerRocker-Turquoise2_1200x.png?v=1707718586" alt="Baby & Kids" />
        <h5>Baby & Kids</h5>
    </div>
    <div onClick={()=>handleClick("Animals")}>
        <img src="https://i.pinimg.com/474x/89/cf/9c/89cf9cb4591f96ab855efdee6f920aa9.jpg" alt="Animals" />
        <h5>Animals</h5>
    </div>
        <div onClick={()=>handleClick("Home & Livingt")}>
        <img src="https://essenziale-hd.com/wp-content/uploads/2016/05/small-apartment-1.jpg" alt="Home & Living" />
        <h5>Home & Livingt</h5>
    </div>
        <div onClick={()=>handleClick("Hobbies & Leisure")}>
        <img src="https://www.casita.com/images/files/public/05072023011757PM-shutterstock_2136659695.jpg" alt="Hobbies & Leisure" />
        <h5>Hobbies & Leisure</h5>
    </div>
        <div onClick={()=>handleClick("DIY & Tools")}>
        <img src="https://th.bing.com/th/id/OIP.XiPHChaJ4qv7OBbm15mYhAHaFv?rs=1&pid=ImgDetMain" alt="DIY & Tools" />
        <h5>DIY & Tools</h5>
    </div>
    <div onClick={()=>handleClick("Miscellaneous")}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT9WSBh5VTEO1EW5yulVFZn1FIgZ3bVpslqw&s" alt="Miscellaneous " />
        <h5>Miscellaneous</h5>
    </div>

</div>

<div className="card-container">
  {newdata?.map((item, key) => (
    <div className="card" key={key}  onClick={()=>handleClickCard(item.ID)}>
      <img src={item.picture} alt={item.title} className="card-image" />
      <h3 className="card-title">{item.title}</h3>
      <p className="card-info">{item.info}</p>
    </div>
  ))}
</div>
            </div>



        </div>
    );
}

export default Homepage;