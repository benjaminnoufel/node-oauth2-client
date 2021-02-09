const {OAuth2Api} = require("@benjaminnoufel/node-oauth2-client");
const fastify = require("fastify");

const server = fastify({
    logger: true
})

const opts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    token: {
                        type: 'string'
                    }
                }
            }
        }
    }
}

// Using es5 or less

server.get('/42/auth', opts, async function (_request, reply) {
    const code = request.query.code;

    try {
        const oauth2: OAuth2Api = await new OAuth2Api()
            .setClientId("0123456789abcdef")
            .setClientSecret("0123456789abcdef")
            .setBaseUrl("https://api.intra.42.fr")
            .setCode(code)
            .setRedirectUri("http://localhost")
            .setTokenUrl("/oauth/token")
            .setGrantType("authorization_code")
            .auth();
        const token = oauth2.getCredential();
        if (token) {
            reply.code(200).send({token: token.access_token});
            return;
        }
    } catch (e) {
        console.error(e.message);
        reply.code(500).send({error: "An error was occured"})
    }
})

server.listen(3000, function (err, address) {
    if (err) {
        server.log.error(err.message)
        process.exit(1)
    }
    server.log.info(`server listening on ${address}`)
})

// Using es6

server.get('/42/auth', opts, async (_request, reply) => {
    const {code} = request.query;

    try {
        const oauth2: OAuth2Api = await new OAuth2Api()
            .setClientId("0123456789abcdef")
            .setClientSecret("0123456789abcdef")
            .setBaseUrl("https://api.intra.42.fr")
            .setCode(code)
            .setRedirectUri("http://localhost")
            .setTokenUrl("/oauth/token")
            .setGrantType("authorization_code")
            .auth();
        const token = oauth2.getCredential();
        if (token) {
            reply.code(200).send({token: token.access_token});
            return;
        }
        reply.code(500).send({error: "An error was occured"})
    } catch (e) {
        console.error(e.message);
        reply.code(500).send({error: "An error was occured"})
    }
})

server.listen(3000, (err, address) => {
    if (err) {
        server.log.error(err.message)
        process.exit(1)
    }
    server.log.info(`server listening on ${address}`)
})
