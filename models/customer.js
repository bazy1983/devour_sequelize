module.exports = function(sequelize, DataTypes){
    var customer = sequelize.define("customer", {
        name : {
            type : DataTypes.STRING,
            allowNull : false
        }
    });

    customer.associate = function(models){
        customer.hasMany(models.devour_tbl, {
            onDelete : "cascade"
        });
    };
    return customer
}