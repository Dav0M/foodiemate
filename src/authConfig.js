import { PublicClientApplication } from '@azure/msal-browser';

const msalConfig = {
    auth: {
        clientId: "6ac158fd-ac90-40c5-995f-bcfa7248f6c3",
        authority: "https://delulutenant.b2clogin.com/delulutenant.onmicrosoft.com/B2C_1_login",
        redirectUri: process.env.NODE_ENV === 'production'
            ? "https://purple-coast-041010610.5.azurestaticapps.net/.auth/login/aadb2c/callback"
            : "http://localhost:3000/.auth/login/aadb2c/callback",
        knownAuthorities: ["delulutenant.b2clogin.com"]
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    }
};

export const msalInstance = new PublicClientApplication(msalConfig);

console.log(process.env.NODE_ENV);