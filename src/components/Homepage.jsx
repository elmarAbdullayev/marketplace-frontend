import "../css/homepage.css";
import { Button } from "react-bootstrap";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'; // Import Redux hooks
import { selectIsLoggedIn, logout } from '../features/auth/authSlice'; // Import selector and logout action
import { useState } from "react";

function Homepage() {


      const [imageUrl, setImageUrl] = useState(null);


        const handleImageChange = (e) => {
    const file = e.target.files[0]; // Nur 1 Bild
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };


    // Read the login status from the Redux store
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const dispatch = useDispatch(); // Get the dispatch function to dispatch actions

    const handleLogout = () => {
        dispatch(logout()); // Dispatch the logout action
        alert("You have been logged out."); // Optional: provide user feedback
        // You might want to redirect the user to the homepage or login page here
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
                    />
                    <Button>search</Button>
                </div>

                {!isLoggedIn ? (
                    <>
                        <Link to={"/login"} className="login">login</Link>
                        <Link to={"/register"} className="login" style={{ background: "green" }}>register</Link>
                    </>
                ) : (
                    <>
                        {/* If logged in, show a logout button and potentially other user-specific links */}
                        <Link to={"/newadvertisement"} className="login">New advertisement</Link> {/* Example: a link to user profile */}
                        <Button onClick={handleLogout} className="login" style={{ background: "red" }}>Logout</Button>
                    </>
                )}
            </div>

            <div className="myContainer container">

                <div className="catalogImages">
                    <div>
                        <img src="https://cdn.pixabay.com/photo/2016/03/31/20/01/auto-1295461_640.png" alt="Cars" />
                        <h5>Cars</h5>
                    </div>
                    <div>
                        <img src="https://hniesfp.imgix.net/8/images/detailed/786/ZGM-00040.jpg?fit=fill&bg=0FFF&w=1500&h=1000&auto=format,compress" alt="Electronics" />
                        <h5>Elektroniko</h5>
                    </div>
                    <div>
                        <img src="https://site-api.bankofbaku.com/storage/6e44c1bc-bb66-4053-910c-15da7e3124dd" alt="Real Estate" />
                        <h5>Dasinmaz emlak</h5>
                    </div>
                    <div>
                        <img src="https://media.istockphoto.com/id/1067767654/photo/womens-clothes-set-isolated-female-clothing-collage.jpg?s=1024x1024&w=is&k=20&c=xi8AUUjTicdjR2GuJo9XjQ8a3w4omoLx-r9mE1cuM7o=" alt="Clothes" />
                        <h5>Clothes</h5>
                    </div>
                    <div>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs7gIT1U4LhjsprJJW1LD1o20i8V0AG8O_CeuCj-qrpCgQ-GCEaGvHlOGkEuqDb96eItw&usqp=CAU" alt="Services" />
                        <h5>Services</h5>
                    </div>
                    <div>
                        <img src="https://bubmania.com.au/cdn/shop/files/BabyhoodDiddleeDoo3in1WalkerRocker-Turquoise2_1200x.png?v=1707718586" alt="Babyhood" />
                        <h5>Babyhood</h5>
                    </div>
                    <div>
                        <img src="https://i.pinimg.com/474x/89/cf/9c/89cf9cb4591f96ab855efdee6f920aa9.jpg" alt="Animals" />
                        <h5>Animals</h5>
                    </div>
                    <div>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT9WSBh5VTEO1EW5yulVFZn1FIgZ3bVpslqw&s" alt="Other" />
                        <h5>other</h5>
                    </div>
                </div>


                {isLoggedIn && (
                <div className="uploadImageContainer">
              <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
        id="fileInput"
      />

           <button onClick={() => document.getElementById("fileInput").click()}>
        Bild auswählen
      </button>

      {imageUrl && (
        <div style={{ marginTop: "20px" }}>
          <img src={imageUrl} alt="Hochgeladen" width="300px" />
        </div>
      )}
                </div>
            )}
            </div>



        </div>
    );
}

export default Homepage;