
module.exports = (sequelize, Sequelize) => {
    const LocationModel = sequelize.define("location", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      location_pincode: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
    },{
        timestamps: true
    });

    return LocationModel;
  };