import { createSlice } from '@reduxjs/toolkit';

// Initialer Zustand des Authentifizierungs-Slices
// Versuche, den Token aus localStorage zu laden, falls vorhanden
const initialToken = localStorage.getItem('authToken');

const authSlice = createSlice({
  name: 'auth', // Name des Slices
  initialState: {
    token: initialToken || null, // Speichert den JWT-Token
    user: null, // Könnte Benutzerdetails speichern (z.B. ID, Name, Rolle)
    isLoggedIn: !!initialToken, // Ein boolescher Wert, der anzeigt, ob der Benutzer eingeloggt ist
  },
  reducers: {
    // Reducer für das Einloggen / Setzen von Anmeldeinformationen
    setCredentials: (state, action) => {
      const { token, user } = action.payload; // Erwarte Token und optional User-Daten
      state.token = token;
      state.user = user;
      state.isLoggedIn = true; // Setzt isLoggedIn auf true
      localStorage.setItem('authToken', token); // Token im localStorage speichern
      // Optional: Speichere auch User-Infos, wenn sie vom Backend kommen und nützlich sind
      // if (user) localStorage.setItem('currentUser', JSON.stringify(user));
    },
    // Reducer für das Ausloggen
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isLoggedIn = false; // Setzt isLoggedIn auf false
      localStorage.removeItem('authToken'); // Token aus localStorage entfernen
      // Optional: Entferne auch User-Infos, wenn sie gespeichert wurden
      // localStorage.removeItem('currentUser');
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

