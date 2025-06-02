import { useEffect, useState } from "react";
import "../css/newadvertisement.css";
import { selectIsLoggedIn, selectCurrentUser } from '../features/auth/authSlice';
import { useSelector } from 'react-redux';
import axios from "axios";
import { selectCurrentToken } from "../features/auth/authSlice";


function Newadvertisement() {
    const url = "http://127.0.0.1:8000/savedata";

    const token = useSelector(selectCurrentToken);
    const currentUser = useSelector(selectCurrentUser);

    const [category, setCategory] = useState("");
    const [city, setCity] = useState("");
    const [title, setTitle] = useState("");
    const [describe, setDescribe] = useState(""); // Benutze 'describe' für das Feld, 'info' für Backend-Parameter

    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null); // Für die Bildvorschau

    const handleChange = (e) => {
        setCategory(e.target.value);
    };

    const handleChangeCity = (e) => {
        setCity(e.target.value);
    };

    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleArea = (e) => {
        setDescribe(e.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file); // Die tatsächliche Datei speichern
            const url = URL.createObjectURL(file);
            setImageUrl(url); // URL für die Vorschau erzeugen
        } else {
            setImageFile(null); // Falls keine Datei ausgewählt wurde
            setImageUrl(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(currentUser)

        // Alle benötigten Felder prüfen, inklusive des Bildes
        if (title && city && category && imageFile && currentUser && currentUser.id) {
            const formData = new FormData();
            formData.append("user_id", currentUser.id);
            formData.append("title", title);
            formData.append("info", describe); 
            formData.append("category", category);
            formData.append("city", city); 
            formData.append("picture", imageFile); 

            formData.forEach((value, key) => {
                console.log(key, value);
});


            try {
                const response = await axios.post(url, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"

                    },
                });

                console.log("Advertisement created:", response.data);
                // Formularfelder nach erfolgreicher Übertragung zurücksetzen
                setTitle("");
                setCategory("");
                setDescribe("");
                setCity("");
                setImageFile(null);
                setImageUrl(null);
            } catch (error) {
                console.error("Error creating advertisement:", error.response ? error.response.data : error.message);
                alert("Failed to create advertisement. Please try again."); // Benutzerfreundliche Meldung
            }
        } else {
            alert("Please fill in all required fields and select an image.");
        }
    };

    const isLoggedIn = useSelector(selectIsLoggedIn);

    return (
        <div className="new-advertisement">
            <h1>Create a New Advertisement</h1>

            <form className="containerForm container" onSubmit={handleSubmit}>
                <div>
                    <h5>Title *</h5>
                    {/* name="title" hinzugefügt */}
                    <input value={title} name="title" id="title" required onChange={handleChangeTitle} />
                </div>

                <div>
                    <h5>Category *</h5>
                    {/* name="category" hinzugefügt */}
                    <select value={category} name="category" onChange={handleChange} required>
                        <option value="">-- Select Category --</option>
                        <option value="vehicles">Vehicles</option>
                        <option value="electronics">Electronics</option>
                        <option value="real_estate">Real Estate</option>
                        <option value="fashion">Fashion</option>
                        <option value="services">Services</option>
                        <option value="baby_kids">Baby & Kids</option>
                        <option value="animals">Animals</option>
                        <option value="home_living">Home & Living</option>
                        <option value="hobbies">Hobbies & Leisure</option>
                        <option value="diy_tools">DIY & Tools</option>
                        <option value="misc">Miscellaneous</option>
                    </select>
                </div>

                <div>
                    <h5>City *</h5>
                    {/* name="city" hinzugefügt */}
                    <select value={city} name="city" onChange={handleChangeCity} required>
                        <option value="">-- Select City --</option>
                        <option value="Berlin">Berlin</option>
                        <option value="Hamburg">Hamburg</option>
                        <option value="München">München</option>
                        <option value="Köln">Köln</option>
                        <option value="Frankfurt">Frankfurt</option>
                        <option value="Stuttgart">Stuttgart</option>
                        <option value="Düsseldorf">Düsseldorf</option>
                        <option value="Leipzig">Leipzig</option>
                        <option value="Dortmund">Dortmund</option>
                        <option value="Essen">Essen</option>
                        <option value="Bremen">Bremen</option>
                        <option value="Dresden">Dresden</option>
                        <option value="Hannover">Hannover</option>
                        <option value="Nürnberg">Nürnberg</option>
                        <option value="Bonn">Bonn</option>
                    </select>
                </div>

                <div>
                    <h5>Describe</h5>
                    {/* name="info" hinzugefügt, passend zum Backend-Parameter */}
                    <textarea value={describe} name="info" id="describe" rows="10" maxLength="3000" className="text optional form-control w-50" onChange={handleArea}></textarea>
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
                        <div>
                            <h5>Picture *</h5> {/* Markiert als erforderlich */}
                            <button type="button" onClick={() => document.getElementById("fileInput").click()}>Bild auswählen</button>
                        </div>

                        {imageUrl && (
                            <div style={{ marginTop: "20px" }}>
                                <img src={imageUrl} alt="Uploaded" width="300px" />
                            </div>
                        )}
                    </div>
                )}

                <button type="submit">Absenden</button>
            </form>
        </div>
    );
}
export default Newadvertisement;