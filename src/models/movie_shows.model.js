
module.exports = (sequelize, Sequelize) => {
    const movieShows = sequelize.define("movie_shows", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      movie_show: {
        type: Sequelize.STRING
      },
      movie_show_time: {
        type: Sequelize.DATE
      },
      seats: {
        type: Sequelize.INTEGER
      },
    },{
        timestamps: true
    });
  
    return movieShows;
  };