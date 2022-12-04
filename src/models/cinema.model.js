
module.exports = (sequelize, Sequelize) => {
    const CinemaModel = sequelize.define("cinema", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cinema_name: {
        type: Sequelize.STRING
      },
    },{
        timestamps: true
    });
  
    return CinemaModel;
  };