import {AuthorizeAccessInformation, OAuth2Api} from "@benjaminnoufel/node-oauth2-client";
import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async ({request, response}) => {
    const { code } = request.get();

    new OAuth2Api()
        .setClientId("0123456789abcdef")
        .setClientSecret("0123456789abcdef")
        .setBaseUrl("https://api.intra.42.fr")
        .setCode(code)
        .setRedirectUri("http://localhost")
        .setTokenUrl("/oauth/token")
        .setGrantType("authorization_code")
        .auth()
        .then((oauth2: OAuth2Api) => {
            const token: AuthorizeAccessInformation = oauth2.getCredential();
            if (token) {
                response.status(200).json({access_token: token.access_token});
                return;
            }
            response.status(500).json({error: "An error was occured"});
        })
        .catch((err: Error) => {
            console.error(err.message)
            response.status(500).json({error: "An error was occured"});
        });
})
