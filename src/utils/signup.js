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
  return fetch(`${BASE_URL}/users`, {
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
    }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    console.log("response from API: ", response);
    return response.json();
  });
};

export default signUp;
