const pool = require('../database.js');
const { nanoid } = require('nanoid');

const registerUserHandler = async (req, res) => {
  const { username, password, email, phone } = req.body;
  const id = nanoid(16);

  try {
    const newUser = await pool.query(
      `insert into users (id, username, password, )`
    )
  } catch (err) {

  }
  res.json({
    status : "success",
    message : "Data berhasil tersimpan",
    user : { username : payload.username }
  })
};


module.exports = {
  registerUserHandler
}