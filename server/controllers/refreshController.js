const jwt = require("jsonwebtoken");
const refreshtokens = require("../constants");
exports.refreshToken = (req, res) => {
    const token = req.body.token;
    console.log(req.body);
    console.log("hi");
    console.log(refreshtokens);
    if (!token) {
        res.send("No refresh token found");
    }
    else if (!refreshtokens.includes(token)) {
        res.send("Invalid refresh token");
    }
    else {
        jwt.verify(token, "secretkeyok", (err, user) => {
            if (err) {
                res.send("Invalid token");
            }
            else {
                const activeToken = jwt.sign({ user }, "secretkey", { expiresIn: "30s" });
                res.send({ "token": activeToken });
            }
        })
    }
}