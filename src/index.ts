import {stringify} from "querystring";
import axios, {AxiosError, AxiosInstance, AxiosResponse} from "axios";

type GrantType = "client_credentials" | "authorization_code" | "refresh_token";

interface OAuth2 {
    setBaseUrl: (baseUrl: string) => this;
    setTokenUrl: (tokenUrl: string) => this;
    setCode: (code: string) => this;
    setScope: (scope: string) => this;
    setClientId: (clientId: string) => this;
    setClientSecret: (clientSecret: string) => this;
    setRedirectUri: (redirectUri: string) => this;
    setGrantType: (grantType: GrantType) => this;
    setHeader: (property: string, value: string) => this;
    setAuthHeader: (property: string, value: string) => this;
    setData: (property: string, value: string) => this;
    auth: () => Promise<Error | void>;
    get: <T>(url: string) => Promise<AxiosResponse<T>>;
    post: <T, D>(url: string, body: D) => Promise<AxiosResponse<T>>;
    patch: <T, D>(url: string, body: D) => Promise<AxiosResponse<T>>;
    delete: <T>(url: string) => Promise<AxiosResponse<T>>;
}

interface A {
    [key: string]: string;
}

interface OAuth2Request extends Partial<A> {
    grant_type: string;
    client_id: string;
    client_secret: string;
    scope: string;
    code?: string;
    redirect_uri?: string;
    refresh_token?: string;
}

interface AuthorizeAccessInformation {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    created_at: number;
    expires_at: number;
}

const sleep = (wait: number): Promise<void> => new Promise(resolve => setTimeout(() => resolve(), wait * 1000));

class OAuth2Api implements OAuth2 {
    #refreshToken?: string;

    #baseUrl: string | null = null;

    #clientId: string | null = null;

    #clientSecret: string | null = null;

    #grantType: GrantType = "client_credentials";

    #scope: string = "public";

    #tokenUrl: string | null = null;

    #code?: string;

    #redirectUri?: string;

    #autorizeAccess?: AuthorizeAccessInformation;

    #headers?: Record<string, string> = {};

    #authHeaders?: Record<string, string> = {};

    #dataRequest: Record<string, string> = {};


    /**
     * private method
     * set request data
     * @returns {OAuth2Request}
     */
    #setRequestData = (): OAuth2Request => {
        if ("string" !== typeof this.#clientId) {
            throw new TypeError("clientId must be set");
        }
        if ("string" !== typeof this.#clientSecret) {
            throw new TypeError("clientId must be set");
        }
        let dataRequest: OAuth2Request = {
            grant_type: this.#grantType,
            client_id: this.#clientId,
            client_secret: this.#clientSecret,
            scope: this.#scope
        };
        if ("authorization_code" === this.#grantType) {
            dataRequest = {
                ...dataRequest,
                code: this.#code,
                redirect_uri: this.#redirectUri
            };
        }
        if (this.#autorizeAccess && this.#autorizeAccess.refresh_token && "string" === typeof this.#refreshToken && "refresh_token" === this.#grantType) {
            dataRequest = {
                ...dataRequest,
                refresh_token: this.#refreshToken
            };
        }
        if (Object.keys(this.#dataRequest).length) {
            dataRequest = {
                ...dataRequest,
                ...this.#dataRequest
            };
        }
        return dataRequest;
    };

    /**
     * private method
     * Create own config for axios
     * @returns {AxiosInstance}
     */
    #axios = (): AxiosInstance => {
        if ("string" !== typeof this.#baseUrl) {
            throw new TypeError("baseUrl must be set");
        }
        if ("undefined" === typeof this.#autorizeAccess) {
            throw new TypeError("You must be auth on API with auth() method");
        }
        const instance = axios.create({
            baseURL: this.#baseUrl,
            headers: {
                Authorization: `${this.#autorizeAccess.token_type} ${this.#autorizeAccess.access_token}`,
                ...this.#headers
            }
        });

        return instance;
    };

    /**
     * private method
     * set Authorize Access
     * @param {AuthorizeAccessInformation} accessToken
     */
    #setAuthorizeAccess = (accessToken: AuthorizeAccessInformation): void => {
        if ("undefined" === typeof accessToken) {
            throw new TypeError("accessToken can not be undefined");
        }
        this.#autorizeAccess = {
            ...accessToken,
            expires_at: accessToken.expires_in + accessToken.created_at
        };
        if ("authorization_code" === this.#grantType && "undefined" !== typeof this.#autorizeAccess.refresh_token) {
            this.setRefreshToken(this.#autorizeAccess.refresh_token);
        }
    };

    /**
     * private method
     * refresh token data
     * @returns {Promise<void>}
     */
    #refreshTokenAccess = async (): Promise<void> => {
        if ("undefined" === typeof this.#autorizeAccess) {
            throw new Error("You must be auth on API with auth() method");
        }
        if (Math.round(new Date().getTime() / 1000) >= this.#autorizeAccess.expires_at) {
            await this.auth();
        } else if ("authorization_code" === this.#grantType && "undefined" !== this.#autorizeAccess.refresh_token) {
            this.setGrantType("refresh_token");
            await this.auth();
        }
    };

    /**
     * public method
     * set request data
     * @param {string} property
     * @param {string} value
     * @returns {this}
     */
    public setData = (property: string, value: string): this => {
        if ("string" !== typeof property) {
            throw new TypeError("property params must be a string");
        }
        if ("string" !== typeof value) {
            throw new TypeError("value params must be a string");
        }

        this.#dataRequest = {
            ...this.#dataRequest,
            [property]: value
        };
        return this;
    };

    /**
     * public method
     * set header
     * @param {string} property
     * @param {string} value
     * @returns {this}
     */
    public setHeader = (property: string, value: string): this => {
        if ("string" !== typeof property) {
            throw new TypeError("property params must be a string");
        }
        if ("string" !== typeof value) {
            throw new TypeError("value params must be a string");
        }
        this.#headers = {
            ...this.#headers,
            [property]: value
        };
        return this;
    };

    /**
     * public method
     * set Auth header
     * @param {string} property
     * @param {string} value
     * @returns {this}
     */
    public setAuthHeader = (property: string, value: string): this => {
        if ("string" !== typeof property) {
            throw new TypeError("property params must be a string");
        }
        if ("string" !== typeof value) {
            throw new TypeError("value params must be a string");
        }
        this.#authHeaders = {
            ...this.#authHeaders,
            [property]: value
        };
        return this;
    };

    /**
     * public method
     * set refreshToken
     * @param {string} refreshToken
     * @returns {this}
     */
    public setRefreshToken(refreshToken: string): this {
        if ("string" !== typeof refreshToken) {
            throw new TypeError("refreshToken must be a string");
        }
        this.#refreshToken = refreshToken;
        return this;
    }

    /**
     * public method
     * set base url
     * @param {string} baseUrl
     * @returns {this}
     */
    public setBaseUrl(baseUrl: string): this {
        if ("string" !== typeof baseUrl) {
            throw new TypeError("baseUrl must be a string");
        }
        this.#baseUrl = baseUrl;
        return this;
    }

    /**
     * public method
     * set token url
     * @param {string} tokenUrl
     * @returns {this}
     */
    public setTokenUrl(tokenUrl: string): this {
        if ("string" !== typeof tokenUrl) {
            throw new TypeError("tokenUrl must be a string");
        }
        this.#tokenUrl = tokenUrl;
        return this;
    }

    /**
     * public method
     * set code
     * @param {string} code
     * @returns {this}
     */
    public setCode(code: string): this {
        if ("string" !== typeof code) {
            throw new TypeError("code must be a string");
        }
        this.#code = code;
        return this;
    }

    /**
     * public method
     * set scope
     * @param {string} scope
     * @returns {this}
     */
    public setScope(scope: string): this {
        if ("string" !== typeof scope) {
            throw new TypeError("scope must be a string");
        }
        this.#scope = scope;
        return this;
    }

    /**
     * public method
     * set client id
     * @param {string} clientId
     * @returns {this}
     */
    public setClientId(clientId: string): this {
        if ("string" !== typeof clientId) {
            throw new TypeError("clientId must be a string");
        }
        this.#clientId = clientId;
        return this;
    }

    /**
     * public method
     * set client secret
     * @param {string} clientSecret
     * @returns {this}
     */
    public setClientSecret(clientSecret: string): this {
        if ("string" !== typeof clientSecret) {
            throw new TypeError("clientSecret must be a string");
        }
        this.#clientSecret = clientSecret;
        return this;
    }

    /**
     * public method
     * set redirect url
     * @param {string} redirectUri
     * @returns {this}
     */
    public setRedirectUri(redirectUri: string): this {
        if ("string" !== typeof redirectUri) {
            throw new TypeError("redirectUri must be a string");
        }
        this.#redirectUri = redirectUri;
        return this;
    }

    /**
     * public method
     * set grant type
     * @param {GrantType} grantType
     * @returns {this}
     */
    public setGrantType(grantType: GrantType): this {
        if ("client_credentials" !== grantType && "authorization_code" !== grantType && "refresh_token" !== grantType) {
            throw new TypeError("grant_type can only set to authorization_code or client_credentials or refresh_token");
        }
        this.#grantType = grantType;
        return this;
    }

    /**
     * public method
     * Oauth2 authentification request
     * Auth method
     * @returns {Promise<Error | void>}
     */
    public auth = async (): Promise<Error | void> => {
        try {
            if ("string" !== typeof this.#baseUrl) {
                throw new TypeError("baseUrl must be set");
            }
            if ("string" !== typeof this.#tokenUrl) {
                throw new TypeError("tokenUrl must be set");
            }
            if ("authorization_code" === this.#grantType && "undefined" === typeof this.#code) {
                throw new TypeError("code must be set");
            }
            if ("authorization_code" === this.#grantType && "undefined" === typeof this.#redirectUri) {
                throw new TypeError("redirectUri must be set");
            }

            const data: AxiosResponse = await axios(this.#tokenUrl, {
                method: "POST",
                url: this.#tokenUrl,
                baseURL: this.#baseUrl,
                data: stringify({...this.#setRequestData()}),
                headers: {
                    ...this.#authHeaders
                }
            });
            if ("undefined" !== typeof data.data.error_description) {
                throw new Error(data.data.error_description);
            }
            this.#setAuthorizeAccess(data.data);
            return;
        } catch (e) {
            const axiosError = e as unknown as AxiosError;
            if (axiosError.isAxiosError) {
                if (429 === axiosError.response?.status) {
                    if ("undefined" === typeof axiosError.response.headers["retry-after"]) {
                        await sleep(2);
                    } else {
                        await sleep(Number(axiosError.response.headers["retry-after"]));
                    }
                    await this.auth();
                    return;
                }
            }
            const error = e as unknown as Error;
            throw new Error(error.message);
        }
    };

    /**
     * public method
     * get method
     * @param {string} url
     * @returns {Promise<AxiosResponse<T>>}
     */
    public get = async <T>(url: string): Promise<AxiosResponse<T>> => {
        try {
            if ("string" !== typeof url) {
                throw new TypeError("url params must be a string");
            }
            await this.#refreshTokenAccess();
            const data: AxiosResponse<T> = await this.#axios().get(url);
            return data;
        } catch (e) {
            const axiosError = e as unknown as AxiosError;
            if (axiosError.isAxiosError) {
                if (429 === axiosError.response?.status) {
                    if ("undefined" === typeof axiosError.response.headers["retry-after"]) {
                        await sleep(2);
                    } else {
                        await sleep(Number(axiosError.response.headers["retry-after"]));
                    }
                    return this.get(url);
                }
            }
            const error = e as unknown as Error;
            throw new Error(error.message);
        }
    };

    /**
     * public method
     * Post method
     * @param {string} url
     * @param {D} body
     * @returns {Promise<AxiosResponse<T>>}
     */
    public post = async <T, D>(url: string, body: D): Promise<AxiosResponse<T>> => {
        try {
            if ("string" !== typeof url) {
                throw new TypeError("url params must be a string");
            }
            await this.#refreshTokenAccess();
            const data: AxiosResponse<T> = await this.#axios().post(url, body);
            return data;
        } catch (e) {
            const axiosError = e as unknown as AxiosError;
            if (axiosError.isAxiosError) {
                if (429 === axiosError.response?.status) {
                    if ("undefined" === typeof axiosError.response.headers["retry-after"]) {
                        await sleep(2);
                    } else {
                        await sleep(Number(axiosError.response.headers["retry-after"]));
                    }
                    return this.post(url, body);
                }
            }
            const error = e as unknown as Error;
            throw new Error(error.message);
        }
    };

    /**
     * public method
     * Patch method
     * @param {string} url
     * @param {D} body
     * @returns {Promise<AxiosResponse<T>>}
     */
    public patch = async <T, D>(url: string, body: D): Promise<AxiosResponse<T>> => {
        try {
            if ("string" !== typeof url) {
                throw new TypeError("url params must be a string");
            }
            await this.#refreshTokenAccess();
            const data: AxiosResponse<T> = await this.#axios().patch(url, body);
            return data;
        } catch (e) {
            const axiosError = e as unknown as AxiosError;
            if (axiosError.isAxiosError) {
                if (429 === axiosError.response?.status) {
                    if ("undefined" === typeof axiosError.response.headers["retry-after"]) {
                        await sleep(2);
                    } else {
                        await sleep(Number(axiosError.response.headers["retry-after"]));
                    }
                    return this.patch(url, body);
                }
            }
            const error = e as unknown as Error;
            throw new Error(error.message);
        }
    };

    /**
     * public method
     * Delete method
     * @param {string} url
     * @returns {Promise<AxiosResponse<T>>}
     */
    public delete = async <T>(url: string): Promise<AxiosResponse<T>> => {
        try {
            if ("string" !== typeof url) {
                throw new TypeError("url params must be a string");
            }
            await this.#refreshTokenAccess();
            const data: AxiosResponse<T> = await this.#axios().delete(url);
            return data;
        } catch (e) {
            const axiosError = e as unknown as AxiosError;
            if (axiosError.isAxiosError) {
                if (429 === axiosError.response?.status) {
                    if ("undefined" === typeof axiosError.response.headers["retry-after"]) {
                        await sleep(2);
                    } else {
                        await sleep(Number(axiosError.response.headers["retry-after"]));
                    }
                    return this.delete(url);
                }
            }
            const error = e as unknown as Error;
            throw new Error(error.message);
        }
    };
}

export {OAuth2Api};
