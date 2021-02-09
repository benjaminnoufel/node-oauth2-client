const {OAuth2Api} = require("@benjaminnoufel/node-oauth2-client");
const express = require("express");

const app = express();

// Using es5 or less

app.get("/42/auth", async function (req, res) {
    new OAuth2Api()
        .setClientId("0123456789abcdef")
        .setClientSecret("0123456789abcdef")
        .setBaseUrl("https://api.intra.42.fr")
        .setTokenUrl("/oauth/token")
        .setGrantType("client_credentials")
        .auth()
        .then(function (oauth2) {
            const token = oauth2.getCredential();
            if (token) {
                res.status(200).json({access_token: token.access_token});
                return;
            }
            res.status(500).json({error: "An error was occured"});
        })
        .catch(function (err) {
            console.error(err.message)
            res.status(500).json({error: "An error was occured"});
        });
});

app.listen(3000, function () {
    console.log("Server is listening on http://127.0.0.1:3000");
});

// Using es6

app.get("/42/auth", async (req, res) => {
    new OAuth2Api()
        .setClientId("0123456789abcdef")
        .setClientSecret("0123456789abcdef")
        .setBaseUrl("https://api.intra.42.fr")
        .setTokenUrl("/oauth/token")
        .setGrantType("client_credentials")
        .auth()
        .then(oauth2 => {
            const token = oauth2.getCredential();
            if (token) {
                res.status(200).json({access_token: token.access_token});
                return;
            }
            res.status(500).json({error: "An error was occured"});
        })
        .catch(err => {
            console.error(err.message)
            res.status(500).json({error: "An error was occured"});
        });
});

app.listen(3000, () => {
    console.log("Server is listening on http://127.0.0.1:3000");
});
