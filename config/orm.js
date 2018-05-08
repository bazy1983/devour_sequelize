var connection = require("./connection.js")

var orm = {

    selectAllBurger: function (table, callback) { //return all burger types to home page
        let query = "SELECT * FROM ??"
        connection.query(query, table, function (err, sqlResults) {
            console.log("SQL selectAllBurger line 8")
            if (err) throw err;
            callback(sqlResults); //callback function to send data to controller js
        })
    },

    selectOneBurger: function (table, id, callback){
        let query = "SELECT * FROM ?? WHERE id = ?";
        connection.query(query, [table, id], function(err, sqlResult){
            console.log("selectOneBurger line 17")
            if (err) throw err;
            callback(sqlResult);
        })
    },

    OdrderBurger : function(table, clientData, callback){
        
        let sqlQuery = "INSERT INTO ?? SET ?"
        //clientData is object that hold burger info
        connection.query(sqlQuery, [table, clientData], function(err, sqlResult){
            console.log("OrderBurger line 28")
            if (err) throw err;
            callback(sqlResult);
        })
    },

    allOrders : function(table, callback){
        
        let sqlQuery = "SELECT * FROM ?? WHERE DATE(created_at) = curdate()"
        connection.query(sqlQuery, table, function(err, sqlResult){
            console.log("AllOrders line 38")
            if (err) throw err;
            callback(sqlResult);
        })
    },

    devour : function(table, clientData, callback){
        let sqlQuery = "UPDATE ?? SET ? WHERE ?"
        connection.query(sqlQuery, [table, {devoured : true}, clientData], function(err, sqlResult){
            console.log("devour line 47")
            if (err) throw err;
            callback(sqlResult)
        })
    },

    makeNewBurger : function(table, clientData, callback){
        let sqlQuery = "INSERT INTO ?? SET ?"
        connection.query(sqlQuery, [table, clientData], function(err, sqlResult){
            console.log("makeNewBurger line 56")
            if (err) throw err;
            callback()
        })
    }
}




module.exports = orm;
