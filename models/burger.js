module.exports = function(sequelize, DataTypes) {
    var burger = sequelize.define("burger_list", {
      category: DataTypes.STRING,
      name: DataTypes.STRING,
      cal : DataTypes.INTEGER,
      description : DataTypes.INTEGER,
      image : DataTypes.STRING
    },{
        freezeTableName : true,
        timestamps : false
    });
    burger.associate = function(models){
      burger.hasMany(models.devour_tbl, {
        onDelete: "cascade"
      });
    }
    return burger;
  };