$(document).ready(function () {
    var burgerInfo; //get burger information when user clicks on
    var userInfo; // get user information
    $("#userReg").on("click", function(){
        var newUser = $("#username").val().trim();

        if (newUser != "" && !/\d/.test(newUser)){
            // send name to database
            $.post("/user", {name : newUser}, function(data){
                $(".screen").addClass("hidden")
                userInfo = data;
                $("#customer").text(data.name)
            })
        } else {
            //if empty string or has digits show invalid
            $(this).text("Invalid");
            setTimeout(function(){
                $("#userReg").text("Register")
            }, 1000)
            
        }
    })
    //click on customer name, send request for new page
    $("#customer").on("click", function(){
        $.get("/customer", {id : userInfo.id})
    })


    // get and desplay burger info after choosing a bruger from menu on .right div 
    $(".burgerItem").on("click", function () {
        $(".right").empty();
        var id = { id: $(this).attr("value") };
        $.get("/burger", id, function (data) {
            if (!$(".right").hasClass("extendRight")) {
                $(".right").addClass("extendRight");
            }
            var nameCal = $("<div class = 'nameCal'>");
            var clearFix = $("<div class = 'clearfix'>");
            nameCal.append($("<p class = 'burgerName'>").text(data.name));
            nameCal.append($("<p class = 'burgerCal'>").text(data.cal + " Caloies"));
            var image = $("<div class = 'image'>")
            image.append($("<img>").attr({ src: data.image, alt: data.name }));
            var description = $("<div class = 'desc'>")
            description.append("<p>").text(data.description);
            $(".right")
            .append(nameCal)
            .append($("<div class = 'clearFix'>"))
            .append("<br>")
            .append(image)
            .append(description)
            .append($("<i class = 'fas fa-plus-circle'>").attr("value", data.id));
            burgerInfo = data;
        })
    })

    $(".right").on("click", "i", function(){ //clicking on plus button
        let orderBurger = {
            burger_id : burgerInfo.id,
            burger_img : burgerInfo.image,
            name : burgerInfo.name,
            cal : burgerInfo.cal,
            customerId : userInfo.id,
            burgerListId : burgerInfo.id
        }
        $.post("/order", orderBurger, function(data){
            $(".notification").addClass("slideInOut")
            setTimeout(function(){
                $(".notification").removeClass("slideInOut")
            },2500)
            $(".slider").click();
        })
    

    })

    // opens order and devour box
    $(".slider").on("click", function(){
        $.get("/devour", function(data){
            $(".devoured").empty();
            $(".burgerOrdered").empty();
            //data coming back from server is array inside of array
            //data = data[0] is attempt to extract array from inside array
            data = data[0];
            for (let i = 0; i <data.length; i++){
                if (data[i].devoured){
                    //right side
                    $(".devoured").append($("<img>").attr({
                        src : data[i].burger_img,
                        alt : data[i].name
                    }))
                } else {
                    //left side
                    $(".burgerOrdered").append($("<img>").attr({
                        src : data[i].burger_img,
                        alt : data[i].name,
                        val : data[i].burger_id
                    }))
                }
            }
        })
        $(".allOrders").addClass("slideDown")
    })

    $(".burgerOrdered").on("click", "img", function(){
        //add selected class to clicked on
        $(this).addClass("selected").siblings().removeClass("selected")
    })

    $(".allOrders button").on("click", function(){
        var burger = $(".selected");
        var id = burger.attr("val");
        console.log("selected: " + id)
        $.ajax({
            url : ("/devoured"),
            type: "PUT",
            data : {burger_id : id}
        })
        .then(function(data){
            console.log(data)
        })
        //moving image from ordered div to devoured
        $(".selected").remove()
        $(".devoured").append(burger)
        $(".selected").removeClass("selected")
    })
})

