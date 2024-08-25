import pool from '../database.js';
import { nanoid } from 'nanoid';
import passwordHasher from '../utils/passwordHasher.js';

const registerUserHandler = async (req, res) => {
  const { username, password, email, phone } = req.body;
  const id = nanoid(16);
  

  try {
    const hashPassword = await passwordHasher(password);
    const newUser = await pool.query(
      `INSERT INTO 
      users(id, username, password, email, phone) 
      values($1, $2, $3, $4, $5)
      RETURNING *`,
      [id, username, hashPassword, email, phone]
    );
    res.status(201).json({
      status : "success",
      message : "Data berhasil tersimpan",
      user : {
        id : id,
        username : username
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status : "failed",
      message : "INTERNAL SERVER ERROR"
    })
  }


};


export default {
  registerUserHandler
}