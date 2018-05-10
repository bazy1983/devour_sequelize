//var orm = require("../config/orm.js");
var path = require("path");
var db = require("../models")
module.exports = function (app) {



    app.get('/', function (req, res) {
        //selectAllBurger takes in table name and a callback to retreive data
        db.burger_list.findAll({})
            .then(function (data) {
                let alldata = {
                    burgers: data,
                    title: "Devour 'em All"
                }
                res.render("index", alldata)
            })
    })

    app.get("/test", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/test.html"))
    })

    // send one burger data when selected from menu
    app.get("/burger", function (req, res) {
        db.burger_list.find({
            where: {id: req.query.id}
        })
            .then(function (data) {
                res.send(data.dataValues);
            })
    })

    app.get("/devour", function (req, res) {
        // db.devour_tbl.findAll({})
        //     .then(function (data) {
        //         res.send(data)
        //     })
        db.sequelize.query("SELECT * FROM devour_tbl WHERE DATE(updatedAt) = CURDATE()",
        { raw: true })
        .then (function(data){
            var half = data.length/2
            var allData = data.splice(0,half);
            res.send(allData)
        })
        .catch(function(err){
            console.log(err)
        })
    })

    app.post("/order", function (req, res) {
        db.devour_tbl.create(req.body)
            .then(function (data) {
                res.send(req.body)
            })

    })

    app.put("/devoured", function (req, res) {
        db.devour_tbl.update(
            {devoured: 1},
            {where : {burger_id : req.body.burger_id}})
            .then(function () {
                res.send(req.body)
            })
    })


    // routes for making new burger
    app.get("/makeburger", function (req, res) {
        res.render("burger")
    })

    app.post("/make", function (req, res) {
        // orm.makeNewBurger("burger_list", req.body, function () {
        // })
        
        db.burger_list.create(req.body)
        .then(function(){
            
            res.status(200).end();
        })
    })

}

