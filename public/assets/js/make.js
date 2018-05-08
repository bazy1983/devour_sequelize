$(document).ready(function(){

    
    $(".form button").on ("click", function(){
        
        var newBurger = {
            category : $("#formCat").val().trim(),
            name : $("#formName").val().trim(),
            cal : parseInt($("#formCal").val().trim()),
            description : $("#formDesc").val().trim(),
            image : $("#formImage").val().trim()
        };

        $.post("/make", newBurger, function(data){
            location.assign("/");
        })
    })
})