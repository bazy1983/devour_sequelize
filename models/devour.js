module.exports = function(sequelize, DataTypes) {
    var devour = sequelize.define("devour_tbl", 
    {
      burger_id: DataTypes.STRING,
      name: DataTypes.STRING,
      cal : DataTypes.INTEGER,
      burger_img : DataTypes.STRING,
      devoured : {
        type: DataTypes.BOOLEAN,
        defaultValue : false
      },
    },{
        freezeTableName : true,
    });
    return devour;
  };