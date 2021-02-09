import {AuthorizeAccessInformation, OAuth2Api} from "@benjaminnoufel/node-oauth2-client";
import express, {Request, Response} from "express";

const app: express.Application = express();

// Using es5 or less

app.get("/42/auth", function (_req: Request, res: Response) {
    new OAuth2Api()
        .setClientId("0123456789abcdef")
        .setClientSecret("0123456789abcdef")
        .setBaseUrl("https://api.intra.42.fr")
        .setTokenUrl("/oauth/token")
        .setGrantType("client_credentials")
        .auth()
        .then(function (oauth2: OAuth2Api) {
            const token: AuthorizeAccessInformation = oauth2.getCredential();
            if (token) {
                res.status(200).json({access_token: token.access_token});
                return;
            }
            res.status(500).json({error: "An error was occured"});
        })
        .catch(function (err: Error) {
            console.error(err.message)
            res.status(500).json({error: "An error was occured"});
        });
});

app.listen(3000, function () {
    console.log("Server is listening on http://127.0.0.1:3000");
});

// Using es6

app.get("/42/auth", (_req: Request, res: Response) => {
    new OAuth2Api()
        .setClientId("0123456789abcdef")
        .setClientSecret("0123456789abcdef")
        .setBaseUrl("https://api.intra.42.fr")
        .setTokenUrl("/oauth/token")
        .setGrantType("client_credentials")
        .auth()
        .then((oauth2: OAuth2Api) => {
            const token: AuthorizeAccessInformation = oauth2.getCredential();
            if (token) {
                res.status(200).json({access_token: token.access_token});
                return;
            }
            res.status(500).json({error: "An error was occured"});
        })
        .catch((err: Error) => {
            console.error(err.message)
            res.status(500).json({error: "An error was occured"});
        });
});

app.listen(3000, () => {
    console.log("Server is listening on http://127.0.0.1:3000");
});
