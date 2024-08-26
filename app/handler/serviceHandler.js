import pool from '../database.js';

const retrieveServiceHandler = async (req, res) => {
  const services = await pool.query(
    `SELECT 
    category.id as cat_id,
    category.description as cat_desc,
    service.id as serv_id,
    service.description as serv_desc
    from category
    join service
      on category.id = service.categoryid`
  );

  const result = services.rows.map((service) => ({
    id : service.serv_id,
    description : service.serv_desc,
    category : {
      id : service.cat_id,
      description : service.cat_desc
    }
  }));

  res.status(200).json({
    status : "success",
    message : "Data successfully retrieved",
    data : result
  })
}

export default {
  retrieveServiceHandler
}