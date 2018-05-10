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
            .catch(function(err){
                console.log("index is not found")
                res.send("404 NOT FOUND")
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
            .catch(function(err){
                console.log("get one burger failed")
                console.log(err)
                res.send("404 NOT FOUND")
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
            console.log("getting all orders failed")
            console.log(err)
            res.send("404 NOT FOUND")
        })
    })

    app.post("/order", function (req, res) {
        console.log("order made")
        db.devour_tbl.create(req.body)
            .then(function (data) {
                res.send(req.body)
            })
            .catch(function(err){
                console.log("create new order failed")
                console.log(err)
                res.send("404 NOT FOUND")
            })

    })

    app.put("/devoured", function (req, res) {
        db.devour_tbl.update(
            {devoured: 1},
            {where : {burger_id : req.body.burger_id}})
            .then(function () {
                res.send(req.body)
            })
            .catch(function(err){
                console.log("updating order to devoured failed")
                console.log(err)
                res.send("404 NOT FOUND")
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
        .catch(function(err){
            console.log("making new burger failed")
            console.log(err)
            res.send("404 NOT FOUND")
        })
    })

    app.post("/user", function(req, res){
        db.customer.create(req.body)
        .then(function(data){
            res.send(data)
        })
        .catch(function(err){
            console.log("registering new user failed");
            console.log(err)
            res.send("404 NOT FOUND")
        })
    })

    app.get("/customer", function(req, res){
        //console.log(req.query)
        db.customer.findAll({
            where : {id : req.query.id},
            include :  [db.devour_tbl]
        })
        .then(function(data){
           //building data from sequelize to be rendered
            var custBurgArr = [];
            for (let i = 0; i < data[0].devour_tbls.length; i++){
                custBurgArr.push(data[0].devour_tbls[i].dataValues)
            }
            //console.log(custBurgArr)
            var customerOrders = {
                CustName : data[0].dataValues.name,
                orders : custBurgArr
            };
            res.render("orders", customerOrders);
        })
        .catch(function(err){
            console.log("tried to redirect from address bar!!")
            res.send("404 NOT FOUND")
        })
        
    })
}

