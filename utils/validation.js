const {check, validationResult} = require('express-validator');


const signupValidationRules = () => {
    return [
        check('username').isLength({min:4}).isAlphanumeric(),
        check('password').isLength({min:6}),
        check('fullname').isString().isLength({min:4}),
        check('bio').optional({nullable: true}),
        check('city').optional({nullable: true}),
        check('email').notEmpty().isEmail(),
    ]
}


const loginValidationRules = ()=>{
    return [
        check('email').notEmpty().isEmail(),
        check('password').trim().isLength({min:6})
    ]
}

const tweetValidationRules = ()=>{
    return [
        check('content').isLength({min:1})
    ]
}




const validate = (req, res, next) =>{
    const errors = validationResult(req);
    
    // If No Errors 
    if (errors.isEmpty()) {
        return next();
    }

    // Catch  errors!!
    
    const exractedErrors = [];
    
    errors.array().map(err=> exractedErrors.push({[err.param] : err.msg}));

    res.status(422).json({
        errors: exractedErrors
    });
}

module.exports = {
    signupValidationRules,
    loginValidationRules,
    tweetValidationRules,
    validate
}