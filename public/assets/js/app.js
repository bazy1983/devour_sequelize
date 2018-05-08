$(document).ready(function () {
    var burgerInfo;
    // display burger details on .right div
    $(".burgerItem").on("click", function () {
        $(".right").empty();
        var id = { id: $(this).attr("value") };
        $.get("/burger", id, function (data) {
            if (!$(".right").hasClass("extendRight")) {
                $(".right").addClass("extendRight");
            }
            var nameCal = $("<div class = 'nameCal'>");
            var clearFix = $("<div class = 'clearfix'>");
            nameCal.append($("<p class = 'burgerName'>").text(data[0].name));
            nameCal.append($("<p class = 'burgerCal'>").text(data[0].cal + " Caloies"));
            var image = $("<div class = 'image'>")
            image.append($("<img>").attr({ src: data[0].image, alt: data[0].name }));
            var description = $("<div class = 'desc'>")
            description.append("<p>").text(data[0].description);
            $(".right")
            .append(nameCal)
            .append($("<div class = 'clearFix'>"))
            .append("<br>")
            .append(image)
            .append(description)
            .append($("<i class = 'fas fa-plus-circle'>").attr("value", data[0].id));
            burgerInfo = data;
        })
    })

    $(".right").on("click", "i", function(){ //clicking on plus button
        let orderBurger = {
            burger_id : burgerInfo[0].id,
            burger_img : burgerInfo[0].image,
            name : burgerInfo[0].name,
            cal : burgerInfo[0].cal
        }
        $.post("/order", orderBurger, function(data){
            $(".notification").addClass("slideInOut")
            setTimeout(function(){
                $(".notification").removeClass("slideInOut")
            },2500)
        })
        $(".slider").click();
    

    })

    // opens order and devour box
    $(".slider").on("click", function(){
        $.get("/devour", function(data){
            $(".devoured").empty();
            $(".burgerOrdered").empty();
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

