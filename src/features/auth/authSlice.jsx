import { createSlice } from '@reduxjs/toolkit';

const initialToken = localStorage.getItem('authToken');
const storedUser = localStorage.getItem("myUser");
const initialUser = storedUser ? JSON.parse(storedUser) : null;


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: initialToken || null, 
    user:initialUser ,
    isLoggedIn: !!initialToken, // Ein boolescher Wert, der anzeigt, ob der Benutzer eingeloggt ist
  },
  reducers: {
    // Reducer für das Einloggen / Setzen von Anmeldeinformationen
    setCredentials: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
      state.isLoggedIn = true; 
      localStorage.setItem('authToken', token); 
      localStorage.setItem('myUser', JSON.stringify(user));   
    },
    // Reducer für das Ausloggen
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isLoggedIn = false; 
      localStorage.removeItem('authToken'); 
      localStorage.removeItem('myUser');
      localStorage.removeItem("itemId")
    },
  },
});

// Exportiere die Actions (werden automatisch von createSlice generiert)
export const { setCredentials, logout } = authSlice.actions;

// Exportiere den Reducer als Standard-Export
export default authSlice.reducer;

// Exportiere Selektoren (Funktionen zum Abrufen von Daten aus dem State)
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;   

