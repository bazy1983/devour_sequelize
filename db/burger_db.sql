DROP DATABASE IF EXISTS burger_db;
CREATE DATABASE burger_db;
USE burger_db;

CREATE TABLE burger_list (
id INT AUTO_INCREMENT,
category VARCHAR (15) NOT NULL,
name VARCHAR(30) NOT NULL,
cal  INT (5),
description VARCHAR (300),
image VARCHAR (300),
PRIMARY KEY (id)
);

CREATE TABLE devour_tbl (
id INT AUTO_INCREMENT,
burger_id INT NOT NULL,
name VARCHAR (100),
burger_img VARCHAR (300),
cal INT (5),
devoured BOOLEAN DEFAULT FALSE,
created_at TIMESTAMP NOT NULL,
PRIMARY KEY (id)
);


INSERT INTO burger_list (category , name , description, image, cal) VALUES 
("beaf", "Jr. Burger", "A juicy, 100% pure beef patty,  and crinkle-cut pickles with your choice of mustard, mayo or ketchup." , "https://lh3.googleusercontent.com/i-vHb3CryeDkJrTydwmJFJ1M1HrFtjAGIDC5xI7wI7bkOqV_iV0Zpr6jtm-9Lmv6n1pgkMBhJHSb2Ef1XMxLEQ=s400", 250),
("chicken", "Double cheeze Zinger burger", "An irresistible burger with the rich taste from double cheddar cheese that is well blended with hot taste." , "https://d1yupijb0jmhpf.cloudfront.net/72ef796c-ef3c-4067-adef-f10549d5707c.png", 270),
("chicken", "Tower burger", "Take a bite into the famous Tower burger. Starting with a 100% chicken breast fillet coated in the Colonel’s secret blend of 11 herbs and spices and accompanied with a golden hash brown, tasty tomato mustard sauce, cheese, crisp lettuce and sweet mayo." , "http://www.kfc.co.nz/getattachment/3e0934ae-7d9f-4b14-bb2a-e4e5c79dae03/menu/burger-combos/tower-burger/", 300),
("beaf", "Apollo burger", "Fresh 1/4lb Ground Beef Patty Topped with Thinly Sliced Smoked Pastrami & American Cheese, Freshly Sliced Tomatoes, Butter Leaf Lettuce, Sliced Onions, and Apollo Sauce on a Cornmeal-Topped Bun." , "https://apolloburgers.com/wp-content/uploads/2016/01/Apollo-Burger2.png", 330),
("beef", "Rodeo burger", "The RODEO® KING™ Sandwich features two savory flame-grilled beef patties totaling more than ½ lb.* of beef, topped with 3 half-strips of thick-cut smoked bacon, our signature crispy onion rings, tangy BBQ sauce, American cheese and creamy mayonnaise all on our sesame seed bun." , "https://www.bk.com/sites/default/files/02109-2%20BK_Web_RodeoKing_500x540px.png", 410),
("beaf", "Double quarter pound", "Featuring more than ½ lb.* of flame-grilled 100% beef, topped with all of our classic favorites: American cheese, freshly sliced onions, zesty pickles, ketchup, & mustard all on a toasted sesame seed bun." , "https://www.bk.com/sites/default/files/02568-2%20BK_Web_DblQtrPndKing_500x540px_CR.png", 390);

SELECT * FROM burger_list;



