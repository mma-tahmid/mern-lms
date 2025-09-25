var bcrypts = require('bcrypt');
var jwt = require('jsonwebtoken');
const userModel = require("../models/userModel")


exports.Registration = async (req, res) => {

    try {
        const { email, fullName, password } = req.body

        // if (!fullName || !email || !password) {
        //     return res.send({ message: "All fields are required" })
        // }
        const requiredFields = { email, fullName, password };

        for (const [field, value] of Object.entries(requiredFields)) {
            if (!value) {
                return res.send({ message: `${field} is required` });
            }
        }

        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: "User already exist with this email"
            })
        }


        const hashedPassword = await bcrypts.hash(password, 10)

        const createUser = await userModel.create({
            fullName,
            email,
            password: hashedPassword
        })

        return res.status(200).send({
            success: true,
            message: 'Accoount Created  successfully',
            output: createUser

        });


    }

    catch (error) {

        console.log(error)

        return res.status(500).send({
            success: false,
            message: 'Error in Registration',
        });

    }
}



// const { password, ...userWithoutPassword } = createUser._doc;

// return res.status(200).send({
//     success: true,
//     message: 'Account created successfully',
//     output: userWithoutPassword
// });


exports.Login = async (req, res) => {

    try {

        const { email, password } = req.body

        const requiredFields = { email, password };

        for (const [field, value] of Object.entries(requiredFields)) {
            if (!value) {
                return res.send({ message: `${field} is required` });
            }
        }

        const existingUser = await userModel.findOne({ email });

        if (!existingUser) {
            return res.status(400).send({
                success: false,
                message: "Incorrect Email or Password" // invalid email
            })
        }

        const isPasswordMatch = await bcrypts.compare(password, existingUser.password)
        // compare input field password & database Password

        if (!isPasswordMatch) {
            return res.status(400).send({
                success: false,
                message: "Incorrect Email or Password" // invalid email
            })
        }

        // Generate Token & Cookie Part
        //If take user Id & email in token
        // const createToken = jwt.sign({ userTokeId: existingUser._id, email: existingUser.email }, process.env.SECRET_KEY, {
        //     expiresIn: "1d"
        // })

        // here only take user Id in Token
        const createToken = jwt.sign({ userTokeId: existingUser._id }, process.env.SECRET_KEY, {
            expiresIn: "1d"
        })

        const { password: excludedPassword, ...otherDetails } = existingUser.toObject();

        return res.status(200).cookie(
            "access_token",
            createToken,
            {
                expires: new Date(Date.now() + 6 * 3600000), // 3 hours
                //expires: new Date(Date.now() + 24 * 3600000), // one day
                httpOnly: true,
                sameSite: 'strict'
            }
        ).send({
            success: true,
            message: "Login Successfully completed",
            output: otherDetails,
            token: createToken
        })



    }

    catch (error) {
        console.log(error)

        return res.status(500).send({
            success: false,
            message: 'Error in Login',
        });

    }

}