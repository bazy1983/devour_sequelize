var orm = require("../config/orm.js");
var path = require("path");
module.exports = function (app) {



    app.get('/', function (req, res) {
        //selectAllBurger takes in table name and a callback to retreive data
        orm.selectAllBurger("burger_list", function (data) {
            let alldata = {
                burgers: data,
                title : "Devour 'em All"
            }
            res.render("index", alldata)
        })
    })

    app.get("/test", function(req, res){
        res.sendFile(path.join(__dirname, "../public/test.html"))
    })

    app.get("/burger", function(req, res){
        orm.selectOneBurger("burger_list", req.query.id, function(sqlData){
         res.send(sqlData);   
        })
        
    })

    app.get("/devour", function(req, res){
        orm.allOrders ("devour_tbl", function(sqlData){
            res.send(sqlData);
        })
    })

    app.post("/order", function(req, res){
        orm.OdrderBurger("devour_tbl", req.body, function(sqlData){
            if(sqlData.affectedRows){
                res.send(req.body);
            }
        })

    })

    app.put("/devoured", function(req, res){
        //something
        orm.devour("devour_tbl", req.body, function (sqlData) {
            res.send(req.body)
            
        })
    })


    // routes for making new burger
    app.get("/makeburger", function(req, res){
        res.render("burger")
    })

    app.post("/make", function(req, res){
        orm.makeNewBurger ("burger_list", req.body, function(){
        })
        res.status(200).end();
    })

}

