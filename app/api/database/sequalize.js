const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("my-little-notes", "MyLittleNotes", "12345", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

class Note extends Model {}
Note.init(
  {
    // attributes
    id: {
      type: Sequelize.STRING, 
      primaryKey: true,
      allowNull: false
    },
    title: {
      type: Sequelize.STRING
      // allowNull defaults to true
    },
    body: {
      type: Sequelize.STRING
      // allowNull defaults to true
    }
  },
  {
    sequelize,
    modelName: "note"
    // options
  }
);

Note.sync({ force: true }).then(() => {
  return Note.create({
    id: "12345qwerty",
    title: "Note1",
    body: "Note One"
  });
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
