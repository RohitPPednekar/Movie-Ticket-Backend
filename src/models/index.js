const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
//const sequelize = new Sequelize(dbConfig.HOST)
const sequelize = new Sequelize('sqlite::memory:');
const User = require("./user.model")(sequelize, Sequelize);
const Location = require("./location.model")(sequelize, Sequelize);
const Cinema = require("./cinema.model")(sequelize, Sequelize);
const MovieShows = require("./movie-shows.model")(sequelize, Sequelize);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;



//Associations
Location.hasMany(Cinema);
Cinema.belongsTo(Location);

Cinema.hasMany(MovieShows);
//Cinema.belongsTo(Location);

db.user = User;
db.cinema = Cinema;
db.location = Location;
db.movieShows = MovieShows;



db.sequelize.sync().then(() => {
    console.log("Synced db.");
}).catch((err) => {
    console.log("Failed to sync db: " + err.message);
});


module.exports = db;