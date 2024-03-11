// Let's make an editUser function that will update the user's data in the database, we'll use fetch again:
// Path: src/utils/editUser.js
const BASE_URL = "http://localhost:3000"; // Adjust the URL based on your JSON server address

export const editUser = async (userData, id) => {
  const url = `${BASE_URL}/users/${id}`;
  
  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};
