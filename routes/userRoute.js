const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const jwtsecret = "vouchdigital";
const fetchuser = require('../middleware/fetchlogin');


// Route 1: Method :'POST' , Register or Create a New User. 
router.post('/createuser', [
    body('name').isLength({ min: 4 }),
    body('email').isEmail(),
    body('phone').isLength({ min: 3 }),
    body('password').isLength({ min: 2 }),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email });
        let success = false;
        if (user) {
            return res.status(400).json({ success, error: "Enter the Valid Credentials0000" });
        }
        user = await User.create({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            password: req.body.password,
            tokens: ""
        })

        success = true;
        res.json({ success })

    } catch (error) {
        console.error(error.message, "---error in token");
        res.status(500).send("Some Internal Server**** Error1");
    }
})

// Route 2: Method :'POST' , Login the Existing User.
router.post('/loginuser', [
    body('email', 'Enter a Valid Email').isEmail(),
    body('password', 'Password cannot be blank').isLength({ min: 2 }),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        //,
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Enter the Valid Credentials1" });
        }
        const PassComp = await password.localeCompare(user.password);
        if (PassComp !== 0) {
            success = false;
            return res.status(400).json({ success, error: "Enter the Valid Credentials" });
        }
        let data = user.id;
        // console.log(data);
        const authToken = jwt.sign(data, jwtsecret);
        // console.log(authToken);
        const result = await User.findByIdAndUpdate({ _id: data }, {
            $set: {
                tokens: authToken
            }
        });
        success = true;
        res.json({ success, authToken })

    } catch (error) {
        console.error(error.message, "*******error in token");
        res.status(500).send("Some Internal Server---- Error");
    }

})

// ROUTE 3: Get Loggedin user details using: GET
router.get('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user;
        const user = await User.findById(userId);

        res.json(user);
        // console.log(dataname);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Internal Server Error");
    }
})

// ROUTE 4: Update Loggedin user details using: PUT
router.put('/updateuser', fetchuser, [
    body('name').isLength({ min: 4 }),
    body('email').isEmail(),
    body('phone').isLength({ min: 3 }),
    body('password').isLength({ min: 2 }),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {
        let data = req.user;
        const result = await User.findByIdAndUpdate({ _id: data }, {
            $set: {
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
                password: req.body.password,
            }
        });
        res.json(result);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Internal Server Error***///");
    }
})

// ROUTE 5: Delete the Loggedin user details using: DELETE
router.delete('/deleteuser', fetchuser, async (req, res) => {
    try {
        let data = req.user;
        const result = await User.findByIdAndDelete({ _id: data });
        res.json(result);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Internal Server Error---//");
    }
})

module.exports = router;
