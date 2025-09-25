
// var jwt = require('jsonwebtoken');

// exports.generateJwtToken = (res, existingUser, message) => {

//     const createToken = jwt.sign({ userTokeId: existingUser._id }, process.env.SECRET_KEY, {
//         expiresIn: "1d"
//     })

//     return res.status(200).cookie(
//         "access_token",
//         createToken,
//         {
//             expires: new Date(Date.now() + 6 * 3600000), // 3 hours
//             //expires: new Date(Date.now() + 24 * 3600000), // one day
//             httpOnly: true,
//             sameSite: 'strict'
//         }
//     ).send({
//         success: true,
//         message,
//         existingUser

//     })

// }