
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
      per_seat_price: {
        type: Sequelize.INTEGER
      },
      movie_duration_time: {
        type: Sequelize.STRING
      },
      movie_show_end_time: {
        type: Sequelize.DATE
      },
    },{
        timestamps: true
    });
  
    return movieShows;
  };