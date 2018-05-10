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
    devour.associate = function(models){
      devour.belongsTo(models.customer,{
        foreignKey : {
          allowNull : false
        }
      });
    }

    devour.associate = function(models){
      devour.belongsTo(models.burger_list, {
        foreignKey : {
          allowNull : false
        }
      });
    }
    return devour;
  };