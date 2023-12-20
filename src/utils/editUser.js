/**
 *
 * @param {string} userName
 * @param {string} color
 * @param {string} token
 * @returns {Promise} - Promise object represents the userdata
 */

const editUser = async (userName, color, token) => {
  return await fetch("https://api/demo/user/edit", {
    method: "POST",
    body: JSON.stringify({
      userName: userName,
      color: color,
    }),
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

export default editUser;
