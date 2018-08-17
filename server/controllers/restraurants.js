require('../models/restaurant.js');

module.exports = {
    all: function(req, res){
        Restaurant.find({}).sort('createdAt').exec(function(err, restaurants){
            if(err){
                console.log('Something went wrong when getting all restaurants');
                res.json({message: 'Error', error: err});
            }else{
                res.json({message: 'Success', data: restaurants});
            }
        });
    },
    one: function(req, res){
        Restaurant.findOne({_id: req.params.id}, function(err, restaurant){
            if(err){
                console.log('Something went wrong when getting a single restaurant');
                res.json({message: 'Error', error: err});
            }else{
                res.json({message: 'Success', data: restaurant});
            }
        });
    },
    create: function(req, res){
        Restaurant.create(req.body, function(err){
            if(err){
                console.log('Something went wrong when creating a restaurant, detail: ', err);
                res.json({message: 'Error', error: err});   
            }else{
                res.redirect('/rest');
            }
        });
    },
    update: function(req, res){
        Restaurant.findByIdAndUpdate({_id: req.params.id}, {$set: req.body}, { runValidators: true }, function(err){
            if(err){
                console.log('Something went wrong when updating a restaurant, detail: ', err);
                res.json({message: 'Error', error: err});
            }else{
                res.redirect(303, '/rest');
            }
        });
    },
    remove: function(req, res){
        Restaurant.findOneAndRemove({_id: req.params.id}, function(err){
            if(err){
                console.log('Something went wrong when removing a restaurant');
                res.json({message: 'Error', error: err});
            }else{
                Restaurant.find({}, function(err, restaurants){
                    if(err){
                        console.log('Something went wrong when getting all restaurants');
                        res.json({message: 'Error', error: err});
                    }else{
                        res.json({message: 'Success', data: restaurants});
                    }
                });
            }
        });
    },
    create_r: function(req, res){
        Review.create(req.body, function(err, review){
            if(err){
                console.log('Something went wrong when creating reviews.', err);
                res.json({message: 'Error', error: err});
            }
            else{
                Restaurant.findByIdAndUpdate({_id: req.params.id}, {$push: {reviews: review}}, function(err){
                    if(err){
                        console.log('Something went wrong when adding a review to a restaurant.');
                        res.redirect('/rest');
                    }else{
                        res.redirect('/rest');
                    }
                });
            }
        });
    }
}