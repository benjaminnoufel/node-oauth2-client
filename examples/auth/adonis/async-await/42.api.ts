import {AuthorizeAccessInformation, OAuth2Api} from "@benjaminnoufel/node-oauth2-client";
import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async ({response}) => {
    try {
        const oauth2: OAuth2Api = await new OAuth2Api()
            .setClientId("0123456789abcdef")
            .setClientSecret("0123456789abcdef")
            .setBaseUrl("https://api.intra.42.fr")
            .setTokenUrl("/oauth/token")
            .setGrantType("client_credentials")
            .auth();
        const token: AuthorizeAccessInformation = oauth2.getCredential();
        if (token) {
            return {access_token: token.access_token}
        }
        throw new Error("An error was occured")
    }  catch (e) {
        console.error(e.message);
        response.status(500).json({error: "An error was occured"});
    }
})
