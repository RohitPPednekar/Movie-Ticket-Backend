module.exports = {
    HOST: "postgres://ulieggum:jzMBk6ZRaI9IYs7Y-2m1dOey35sNPCQJ@drona.db.elephantsql.com/ulieggum",
    USER: "ulieggum",
    PASSWORD: "jzMBk6ZRaI9IYs7Y-2m1dOey35sNPCQJ",
    DB: "ulieggum",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  };