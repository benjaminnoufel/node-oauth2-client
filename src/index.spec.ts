// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {OAuth2Api} from "./index";

interface UserTest {
    id: number;
    email: string;
    login: string;
    first_name: string;
    last_name: string;
}

describe("testing oauth request", (): void => {
    describe("testing auth method without set", (): void => {
        it("should have no baseUrl set", async (): Promise<void> => {
            expect.assertions(1);
            try {
                const OAuth = new OAuth2Api();
                await OAuth.auth();
            } catch (err) {
                expect(err.message).toStrictEqual("baseUrl must be set");
            }
        });
        it("should have no tokenUrl set", async (): Promise<void> => {
            expect.assertions(1);
            try {
                const OAuth = new OAuth2Api();
                OAuth.setBaseUrl("http://localhost:4242");
                await OAuth.auth();
            } catch (err) {
                expect(err.message).toStrictEqual("tokenUrl must be set");
            }
        });
        it("should have no code set", async (): Promise<void> => {
            expect.assertions(1);
            try {
                const OAuth = new OAuth2Api();
                OAuth.setBaseUrl("http://localhost:4242");
                OAuth.setTokenUrl("0123456789abcdef");
                OAuth.setGrantType("authorization_code");
                await OAuth.auth();
            } catch (err) {
                expect(err.message).toStrictEqual("code must be set");
            }
        });
        it("should have no redirectUri set", async (): Promise<void> => {
            expect.assertions(1);
            try {
                const OAuth = new OAuth2Api();
                OAuth.setBaseUrl("http://localhost:4242");
                OAuth.setTokenUrl("0123456789abcdef");
                OAuth.setGrantType("authorization_code");
                OAuth.setCode("0123456789abcdef");
                await OAuth.auth();
            } catch (err) {
                expect(err.message).toStrictEqual("redirectUri must be set");
            }
        });
    });
    describe("testing setter method", (): void => {
        describe("test setRefreshToken", (): void => {
            it("should be have a string on parameter", (): void => {
                expect.assertions(1);
                const OAuth = new OAuth2Api();
                expect(() => OAuth.setRefreshToken(42)).toThrow(new TypeError("refreshToken must be a string"));
            });
            it("should be return this", (): void => {
                expect.assertions(1);
                const OAuth = new OAuth2Api();
                expect(OAuth.setRefreshToken("42")).toStrictEqual(OAuth);
            });
        });

        describe("test setBaseUrl", (): void => {
            it("should be have a string on parameter", (): void => {
                expect.assertions(1);
                const OAuth = new OAuth2Api();
                expect(() => OAuth.setBaseUrl(42)).toThrow(new TypeError("baseUrl must be a string"));
            });
            it("should be return this", (): void => {
                expect.assertions(1);
                const OAuth = new OAuth2Api();
                expect(OAuth.setBaseUrl("42")).toStrictEqual(OAuth);
            });
        });

        describe("test setTokenUrl", (): void => {
            it("should be have a string on parameter", (): void => {
                expect.assertions(1);
                const OAuth = new OAuth2Api();
                expect(() => OAuth.setTokenUrl(42)).toThrow(new TypeError("tokenUrl must be a string"));
            });
            it("should be return this", (): void => {
                expect.assertions(1);
                const OAuth = new OAuth2Api();
                expect(OAuth.setTokenUrl("42")).toStrictEqual(OAuth);
            });
        });

        describe("test setHeader", (): void => {
            it("should be have a string on property parameter", (): void => {
                expect.assertions(1);
                const OAuth = new OAuth2Api();
                expect(() => OAuth.setHeader(42, "Salut")).toThrow(new TypeError("property params must be a string"));
            });
            it("should be have a string on value parameter", (): void => {
                expect.assertions(1);
                const OAuth = new OAuth2Api();
                expect(() => OAuth.setHeader("42", 42)).toThrow(new TypeError("value params must be a string"));
            });
            it("should be return this", (): void => {
                expect.assertions(1);
                const OAuth = new OAuth2Api();
                expect(OAuth.setHeader("Content-Type", "Application/json")).toStrictEqual(OAuth);
            });
        });


        describe("test setAuthHeader", (): void => {
            it("should be have a string on property parameter", (): void => {
                expect.assertions(1);
                const OAuth = new OAuth2Api();
                expect(() => OAuth.setHeader(42, "Salut")).toThrow(new TypeError("property params must be a string"));
            });
            it("should be have a string on value parameter", (): void => {
                expect.assertions(1);
                const OAuth = new OAuth2Api();
                expect(() => OAuth.setHeader("42", 42)).toThrow(new TypeError("value params must be a string"));
            });
            it("should be return this", (): void => {
                expect.assertions(1);
                const OAuth = new OAuth2Api();
                expect(OAuth.setHeader("Content-Type", "Application/json")).toStrictEqual(OAuth);
            });
        });

        describe("test setData", (): void => {
            it("should be have a string on property parameter", (): void => {
                expect.assertions(1);
                const OAuth = new OAuth2Api();
                expect(() => OAuth.setData(42, "Salut")).toThrow(new TypeError("property params must be a string"));
            });
            it("should be have a string on value parameter", (): void => {
                expect.assertions(1);
                const OAuth = new OAuth2Api();
                expect(() => OAuth.setData("42", 42)).toThrow(new TypeError("value params must be a string"));
            });
            it("should be return this", (): void => {
                expect.assertions(1);
                const OAuth = new OAuth2Api();
                expect(OAuth.setData("prompt", "client")).toStrictEqual(OAuth);
            });
        });

        describe("test setCode", (): void => {
            it("should be have a string on parameter", (): void => {
                expect.assertions(1);
                const OAuth = new OAuth2Api();
                expect(() => OAuth.setCode(42)).toThrow(new TypeError("code must be a string"));
            });
            it("should be return this", (): void => {
                expect.assertions(1);
                const OAuth = new OAuth2Api();
                expect(OAuth.setCode("42")).toStrictEqual(OAuth);
            });
        });

        describe("test setClientId", (): void => {
            it("should be have a string on parameter", (): void => {
                expect.assertions(1);
                const OAuth = new OAuth2Api();
                expect(() => OAuth.setClientId(42)).toThrow(new TypeError("clientId must be a string"));
            });
            it("should be return this", (): void => {
                expect.assertions(1);
                const OAuth = new OAuth2Api();
                expect(OAuth.setClientId("42")).toStrictEqual(OAuth);
            });
        });


        describe("test setClientSecret", (): void => {
            it("should be have a string on parameter", (): void => {
                expect.assertions(1);
                const OAuth = new OAuth2Api();
                expect(() => OAuth.setClientSecret(42)).toThrow(new TypeError("clientSecret must be a string"));
            });
            it("should be return this", (): void => {
                expect.assertions(1);
                const OAuth = new OAuth2Api();
                expect(OAuth.setClientSecret("42")).toStrictEqual(OAuth);
            });
        });

        describe("test setRedirectUri", (): void => {
            it("should be have a string on parameter", (): void => {
                expect.assertions(1);
                const OAuth = new OAuth2Api();
                expect(() => OAuth.setRedirectUri(42)).toThrow(new TypeError("redirectUri must be a string"));
            });
            it("should be return this", (): void => {
                expect.assertions(1);
                const OAuth = new OAuth2Api();
                expect(OAuth.setRedirectUri("42")).toStrictEqual(OAuth);
            });
        });

        describe("test setGrantType", (): void => {
            it("should be have a string on parameter", (): void => {
                expect.assertions(1);
                const OAuth = new OAuth2Api();
                expect(() => OAuth.setGrantType(42)).toThrow(new TypeError("grant_type can only set to authorization_code or client_credentials or refresh_token"));
            });
            it("should be have a correct parameter", (): void => {
                expect.assertions(1);
                const OAuth = new OAuth2Api();
                expect(() => OAuth.setGrantType("42")).toThrow(new TypeError("grant_type can only set to authorization_code or client_credentials or refresh_token"));
            });
            it("should be return this", (): void => {
                expect.assertions(1);
                const OAuth = new OAuth2Api();
                expect(OAuth.setGrantType("authorization_code")).toStrictEqual(OAuth);
            });
        });
        describe("testing auth and get method", (): void => {
            it("should be return an user 42", async (): Promise<void> => {
                expect.assertions(5);
                try {
                    const OAuth = new OAuth2Api();
                    const {
                        TEST_CLIENT_ID,
                        TEST_CLIENT_SECRET,
                        TEST_BASEURL,
                        TEST_AUTH_TOKEN,
                        TEST_GRANT_TYPE,
                        TEST_TESTING_ROUTE
                    } = process.env;
                    await OAuth
                        .setClientId(TEST_CLIENT_ID)
                        .setClientSecret(TEST_CLIENT_SECRET)
                        .setBaseUrl(TEST_BASEURL)
                        .setTokenUrl(TEST_AUTH_TOKEN)
                        .setGrantType(TEST_GRANT_TYPE)
                        .auth();
                    const user = await OAuth.get<UserTest>(TEST_TESTING_ROUTE);
                    expect(user.data.id).toStrictEqual(42424);
                    expect(user.data.email).toStrictEqual("3b3-42424@student.42.fr");
                    expect(user.data.login).toStrictEqual("3b3-42424");
                    expect(user.data.first_name).toStrictEqual("3b3");
                    expect(user.data.last_name).toStrictEqual("42424");
                } catch (err) {
                    throw new Error(err.message);
                }
            });
        });


        describe("testing auth and get method with another header", (): void => {
            it("should be check header sent", async (): Promise<void> => {
                expect.assertions(8);
                try {
                    const OAuth = new OAuth2Api();
                    const {
                        TEST_CLIENT_ID,
                        TEST_CLIENT_SECRET,
                        TEST_BASEURL,
                        TEST_AUTH_TOKEN,
                        TEST_GRANT_TYPE,
                        TEST_TESTING_ROUTE
                    } = process.env;
                    await OAuth
                        .setClientId(TEST_CLIENT_ID)
                        .setClientSecret(TEST_CLIENT_SECRET)
                        .setBaseUrl(TEST_BASEURL)
                        .setTokenUrl(TEST_AUTH_TOKEN)
                        .setGrantType(TEST_GRANT_TYPE)
                        .setHeader("another", "header")
                        .setHeader("and", "me")
                        .auth();
                    const user = await OAuth.get<UserTest>(TEST_TESTING_ROUTE);
                    expect(user.data.id).toStrictEqual(42424);
                    expect(user.data.email).toStrictEqual("3b3-42424@student.42.fr");
                    expect(user.data.login).toStrictEqual("3b3-42424");
                    expect(user.data.first_name).toStrictEqual("3b3");
                    expect(user.data.last_name).toStrictEqual("42424");
                    expect(user.data.last_name).toStrictEqual("42424");
                    expect(user.config.headers.another).toStrictEqual("header");
                    expect(user.config.headers.and).toStrictEqual("me");
                } catch (err) {
                    throw new Error(err.message);
                }
            });
        });
    });
});
