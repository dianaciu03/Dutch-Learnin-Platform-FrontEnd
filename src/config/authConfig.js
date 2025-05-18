export const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_AZURE_CLIENT_ID,
    authority: 'https://slimstudieapp.ciamlogin.com/slimstudieapp.onmicrosoft.com',
    redirectUri: 'http://localhost:3001',
    postLogoutRedirectUri: 'http://localhost:3001',
    navigateToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation: 'sessionStorage', 
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case 0:
            console.error(message);
            return;
          case 1:
            console.warn(message);
            return;
          case 2:
            console.info(message);
            return;
          case 3:
            console.debug(message);
            return;
          default:
            return;
        }
      },
      piiLoggingEnabled: false,
      logLevel: 3,
    },
  },
};

export const loginRequest = {
  scopes: ['openid', 'profile', 'email', 'offline_access'],
  prompt: 'login',
  responseType: 'id_token',
  extraQueryParameters: {
    p: 'Default'
  }
};

export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
}; 