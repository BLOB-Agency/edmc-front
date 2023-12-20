// src/utils/auth.js
import { store } from "../store";
import { setAuthToken, clearAuthToken } from "../store/tokenSlice";
import { setUserDetails, clearUserDetails } from "../store/userSlice";

// Example of a sign-in function
export const signIn = async (email, password) => {
  try {
    // Implement your sign-in logic here
    // For example, sending a request to your backend

    // On successful sign-in:
    // Set the auth token in the Redux store
    store.dispatch(setAuthToken("your_auth_token_here"));

    // Set the user details in the Redux store
    store.dispatch(
      setUserDetails({ username: "example", email: "example@email.com" })
    );
  } catch (error) {
    // Handle errors
    console.error(error);
  }
};

// Example of a sign-out function
export const signOut = () => {
  // Clear the auth token and user details from the Redux store
  store.dispatch(clearAuthToken());
  store.dispatch(clearUserDetails());
};

// Additional authentication functions (e.g., signUp, verifyEmail) can be added here
