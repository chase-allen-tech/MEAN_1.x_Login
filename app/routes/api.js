var User = require('../models/user');

module.exports = function(router) {

    //login  api/users
    router.post('/users', function(req, res){
        var user = new User();
    
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
    
        if(req.body.username == null || req.body.username == '' || 
        req.body.email == null || req.body.email == '' || 
        req.body.password == null || req.body.password == ''){
            res.json({success: false, message: 'All fields are required'});
        } else {
            user.save(function(err){
                if(err){
                    res.json({success: false, message: 'username or email already exists'});
                }
                else{
                    res.json({success: true, message: 'user created successfully'});
                }
            });
        }
    });

    //registration  api/authenticate
    router.post('/authenticate',function(req, res){
        User.findOne({ username: req.body.username })
        .select('email username password')
        .exec(function(err, user){
            if (err) throw err;

            if(!user){
                res.json({ success: false, message: 'Could not authenticate user'});
            } else if (user){
                var validPassword = false;
                if(req.body.password){
                    validPassword = user.comparePassword(req.body.password);

                    if(!validPassword){
                        res.json({ success: false, message: 'Could not authenticate password'});
                    }else{
                        res.json({ success: true, message: 'User authenticated!'});
                    }
                    
                } else {
                    res.json({ success: false, message: 'No password Provided'});
                }


            } 
        });
    });
    return router;
}