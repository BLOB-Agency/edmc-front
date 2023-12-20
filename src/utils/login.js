/**
 *
 * @param {string} token
 * @returns {Promise} - Promise object represents the userdata
 */

const login = async (token) => {
  return await fetch("https://api/demo/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      return res;
    });
};

export default login;
