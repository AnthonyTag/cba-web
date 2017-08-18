// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyBtcs4JuR_EKY9zfrUDFYJzJXnxoo81U5U",
    authDomain: "cba-web.firebaseapp.com",
    databaseURL: "https://cba-web.firebaseio.com",
    projectId: "cba-web",
    storageBucket: "cba-web.appspot.com",
    messagingSenderId: "115016171349"
  }
};
