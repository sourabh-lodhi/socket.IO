const connection = require("./dbConnection")

const createTable = async(table)=>{
  try{
      const createTable = await connection.query(`CREATE TABLE IF NOT EXISTS ${table}(
       id int (12) AUTO_INCREMENT PRIMARY KEY,
       name varchar(255) NOT NULL,
       email varchar(255) NOT NULL,
       password varchar (255) NOT NULL
      )`)
    //   console.log(createTable)
  }catch(error){
    console.log("error:",error)
  }

}

const createDatabase = async(db)=>{
    try{
        const createDatabase = await connection.query(`CREATE DATABASE IF NOT EXISTS ${db}`)
        // console.log(createDatabase)
    }catch(error){
      console.log("error:",error)
    }
  
}
module.exports = {createDatabase, createTable}