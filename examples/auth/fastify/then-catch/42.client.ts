import {AuthorizeAccessInformation, OAuth2Api} from "@benjaminnoufel/node-oauth2-client";
import fastify, {FastifyInstance, FastifyRequest, FastifyReply, RouteShorthandOptions} from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({
    logger: true
})

const opts: RouteShorthandOptions = {
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

server.get('/42/auth', opts, function (request: FastifyRequest, reply: FastifyReply) {
    const code = request.query.code;

    new OAuth2Api()
        .setClientId("0123456789abcdef")
        .setClientSecret("0123456789abcdef")
        .setBaseUrl("https://api.intra.42.fr")
        .setCode(code)
        .setRedirectUri("http://localhost")
        .setTokenUrl("/oauth/token")
        .setGrantType("authorization_code")
        .auth()
        .then(function (oauth2: OAuth2Api) {
            const token: AuthorizeAccessInformation = oauth2.getCredential();
            if (token) {
                reply.code(200).send({token: token.access_token});
                return;
            }
            reply.code(500).send({error: "An error was occured"})
        })
        .catch(function (err: Error) {
            console.error(err.message);
            reply.code(500).send({error: "An error was occured"})
        });
})

server.listen(3000, function (err: Error, address: string) {
    if (err) {
        server.log.error(err.message)
        process.exit(1)
    }
    server.log.info(`server listening on ${address}`)
})

// Using es6

server.get('/42/auth', opts, (request: FastifyRequest, reply: FastifyReply) => {
    const {code} = request.query;

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
                reply.code(200).send({token: token.access_token});
                return;
            }
            reply.code(500).send({error: "An error was occured"})
        })
        .catch((err: Error) => {
            console.error(err.message);
            reply.code(500).send({error: "An error was occured"})
        });
})

server.listen(3000, (err: Error, address: string): void => {
    if (err) {
        server.log.error(err.message)
        process.exit(1)
    }
    server.log.info(`server listening on ${address}`)
})
