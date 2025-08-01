import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'; 

export const store = configureStore({
  reducer: {
    auth: authReducer, // Hier registrieren wir unseren Auth-Slice
    // Weitere Slices würden hier hinzugefügt werden (z.B. user, products, etc.)
  },
});