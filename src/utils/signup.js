/**
 *
 * @param {*} email
 * @param {*} password
 * @param {*} color
 * @param {*} username
 * @returns {Promise}
 */
const signUp = async (email, password, color, username) => {
  return await fetch("https://api/demo/user/signup", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      color,
      username,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      return res;
    });
};

export default signUp;
