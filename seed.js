var mongoose    = require("mongoose"),
    Campgrounds = require("./models/campground"),
    Comments    = require("./models/comment"),
    User        = require("./models/user");


var campList = [
    {
        name:           "Wanaka",
        image:          "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
        description:    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non urna bibendum dolor vehicula condimentum quis sed magna. Curabitur mattis sem lorem, eu tincidunt mi pretium facilisis. Vestibulum aliquam sollicitudin condimentum. Sed feugiat tortor vel ligula dictum finibus. Curabitur laoreet risus a turpis consequat rhoncus. Integer varius commodo nunc, quis auctor magna blandit eu. Sed ligula quam, ultricies in sodales at, accumsan ut velit. Sed convallis lorem ac dolor auctor, eu gravida odio faucibus. Morbi vitae eros odio. Duis vel luctus leo, et hendrerit massa. Mauris vitae condimentum nisi. In hac habitasse platea dictumst. Proin nec urna ullamcorper, ornare sapien a, accumsan quam. Aliquam lobortis vitae augue laoreet placerat. Nunc eu tempus diam, ac tincidunt metus. Donec ut interdum tortor. "
    }, {
        name:           "Queenstown",
        image:          "https://images.unsplash.com/photo-1483381719261-6620dfa2d28a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
        description:    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non urna bibendum dolor vehicula condimentum quis sed magna. Curabitur mattis sem lorem, eu tincidunt mi pretium facilisis. Vestibulum aliquam sollicitudin condimentum. Sed feugiat tortor vel ligula dictum finibus. Curabitur laoreet risus a turpis consequat rhoncus. Integer varius commodo nunc, quis auctor magna blandit eu. Sed ligula quam, ultricies in sodales at, accumsan ut velit. Sed convallis lorem ac dolor auctor, eu gravida odio faucibus. Morbi vitae eros odio. Duis vel luctus leo, et hendrerit massa. Mauris vitae condimentum nisi. In hac habitasse platea dictumst. Proin nec urna ullamcorper, ornare sapien a, accumsan quam. Aliquam lobortis vitae augue laoreet placerat. Nunc eu tempus diam, ac tincidunt metus. Donec ut interdum tortor. "
    }, {
        name:           "Te Anau",
        image:          "https://images.unsplash.com/photo-1487750404521-0bc4682c48c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
        description:    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non urna bibendum dolor vehicula condimentum quis sed magna. Curabitur mattis sem lorem, eu tincidunt mi pretium facilisis. Vestibulum aliquam sollicitudin condimentum. Sed feugiat tortor vel ligula dictum finibus. Curabitur laoreet risus a turpis consequat rhoncus. Integer varius commodo nunc, quis auctor magna blandit eu. Sed ligula quam, ultricies in sodales at, accumsan ut velit. Sed convallis lorem ac dolor auctor, eu gravida odio faucibus. Morbi vitae eros odio. Duis vel luctus leo, et hendrerit massa. Mauris vitae condimentum nisi. In hac habitasse platea dictumst. Proin nec urna ullamcorper, ornare sapien a, accumsan quam. Aliquam lobortis vitae augue laoreet placerat. Nunc eu tempus diam, ac tincidunt metus. Donec ut interdum tortor. "
    }
];

var comment = {
    text:   "This place is great, but I wish there was internet",
    author: "Homer"
};

function seedDB(){
    // Remove all users from the DB
    // User.deleteMany({}, function(err){
    //     if (err)
    //         console.log(err);
    // });
    // Remove all campgrounds from DB
    Campgrounds.deleteMany({}, function(err){
        // Removing callback function
        if (err)
            console.log(err);
        else {
            console.log("All campsites deleted from the DB");
            campList.forEach(function(campsite){
                Campgrounds.create(campsite, function(err, campsite){
                    // Creation callback function
                    if(err)
                        console.log(err);
                    else {
                        console.log("Campsite added to the DB:");
                        Comments.create(comment, function(err, comment){
                            if (err)
                                console.log(err);
                            else {
                                campsite.comments.push(comment);
                                campsite.save(campsite);
                                console.log("New comment created");
                            }
                        });
                    }
                });
            });
        }
    });

    // Add campground list
}

module.exports = seedDB;