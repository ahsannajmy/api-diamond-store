import pool from '../database.js';
import { nanoid } from 'nanoid';
import passwordHasher from '../utils/passwordHasher.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config(); 

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

    const token = jwt.sign({id, username},process.env.JWT_KEY);
    
    res.status(201).json({
      status : "success",
      message : "User successfully created",
      user : {
        id : id,
        username : username,
        token
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

const loginUserHandler = async (req,res) => {
  const { username , password } = req.body;
  
  try {
    const user = await pool.query(
      `SELECT * from users where username = $1`,
      [username]
    )

    if (user.rows.length === 0) {
      return res.status(401).json({
        status : "failed",
        message : `Invalid username`
      });
    }

    const checkMatch = await bcrypt.compare(password, user.rows[0].password);

    if (!checkMatch) {
      return res.status(401).json({
        status : "failed",
        message : "Invalid password"
      });
    }

    const token = jwt.sign({ id : user.rows[0].id , username }, process.env.JWT_KEY);

    res.status(200).json({
      status : "success",
      message : "Login successfull",
      token
    })

  } catch(err) {
    console.log(err);
    res.status(500).json({
      status : "failed",
      message : "INTERNAL SERVER ERROR"
    })
  }
};

export default {
  registerUserHandler,
  loginUserHandler
}