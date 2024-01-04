/**
 *
 * @param {*} email
 * @param {*} password
 * @param {*} color
 * @param {*} username
 * @returns {Promise}
 */

const BASE_URL = "http://localhost:3000"; // Adjust the URL based on your JSON server address

export const signUp = async (userData) => {
  console.log("userData: ", userData);
  console.log("BASE_URL: ", BASE_URL);
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: userData.firstName,
        lastName: userData.lastName,
        username: userData.username,
        email: userData.email,
        password: userData.password,
        color: userData.color,
        verificationCode: userData.verificationCode,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    console.log("response from API: ", JSON.stringify(response));
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error in signUp:", error);
    throw error;
  }
};

export default signUp;
