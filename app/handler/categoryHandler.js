import pool from '../database.js';

const retrieveCategoryHandler = async (req, res) => {
  const categories = await pool.query(
    'SELECT * from category'
  )

  res.status(200).json({
    status : "success",
    message : "Data successfully retrieved",
    data : categories.rows
  })
};

export default {
  retrieveCategoryHandler
}