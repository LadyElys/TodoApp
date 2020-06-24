// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const firebaseConfig = {
  apiKey: "AIzaSyAoEG_QwZrgGfMU7bPYtPUerbb9vP5HrN8",
  authDomain: "sign-in-and-sign-up-5bc5b.firebaseapp.com",
  databaseURL: "https://sign-in-and-sign-up-5bc5b.firebaseio.com",
  projectId: "sign-in-and-sign-up-5bc5b",
  storageBucket: "sign-in-and-sign-up-5bc5b.appspot.com",
  messagingSenderId: "760246710485",
  appId: "1:760246710485:web:a8e9f12ee859b2fa63725c",
  measurementId: "G-Y1C5DWKEQW"
};

export const environment = {
  production: false,
  firebaseConfig
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
