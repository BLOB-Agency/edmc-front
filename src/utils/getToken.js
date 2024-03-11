/**
 * @param {string} email
 * @param {string} password
 * @returns {Promise} - Promise object represents the token
 *
 */

const getToken = async (email, password) => {
  return await fetch("https://api/demo/user/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
            return res;
    });
};

export default getToken;
