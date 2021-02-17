// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const baseUrl = 'http://localhost:8080/carapp';
export const environment = {
  production: false,
  baseUrl,
  auth: {
    domain: 'dev-04zom-rc.us.auth0.com',
    clientId: 'ZBg0YCTgMaEBnCcunLo5zph8l78y0htE',
    redirectUri: `${window.location.origin}/login`,
    httpInterceptor: {
      allowedList: [`${baseUrl}/*`],
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
