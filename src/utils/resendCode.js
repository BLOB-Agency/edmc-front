
import { editUser } from './editUser';

const BASE_URL = "http://localhost:3000"; // Adjust the URL based on your JSON server address
const generateCode = () => {
  // Generate a random 4-digit verification code
  return Math.floor(1000 + Math.random() * 9000).toString();
};
const resendCode = async (email) => {
  try {
    // Fetch user data using a unique identifier, like email
    const response = await fetch(`${BASE_URL}/users?email=${email}`);
    const users = await response.json();

    // Check if the user exists
    if (users.length === 0) {
      throw new Error('User not found');
    }

    const user = users[0];
    const verificationCode = generateCode();
    
    // Proceed to update the user with the new code
    const updatedUserData = { ...user, verificationCode, isVerified: false };
    await editUser(updatedUserData);

  } catch (error) {
    console.error("Error in resendCode:", error.message);
  }
};

export default resendCode;