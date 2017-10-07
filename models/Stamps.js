module.exports = function (sequelize, DataTypes) {
  var Stamps = sequelize.define("Stamp", {
    UID: {
      type: DataTypes.STRING,
      notNull: true,
      notEmpty: true,
    },
    Username: {
      type: DataTypes.STRING,
      notNull: true,
      notEmpty: true
    },
    Country: {
      type: DataTypes.STRING,
      notNull: true,
      notEmpty: true
    }
  }, {
    tableName: "Stamps"
  });
  return Stamps;
};