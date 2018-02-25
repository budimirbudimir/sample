## Last.fm navigator [work in progress]

Deployed App URL: https://budimir-sample.firebaseapp.com

Last.fm navigator sample. <BR />
It is but a simple artist navigator, build with React/Redux. <BR />
Backend uses Firebase for auth and its RealtimeDB for saving user-specific data. <BR />
Also, Firebase Functions are used as API/GraphQL server. <BR />
It's been bootstrapped using `create-react-app`.

**Optionally**, local server (NodeJS) & DB (MongoDB) might be added later.

---

#### Usage

<BR />_Commands:_

* `yarn` or `npm install` to install dependencies
* `yarn start` or `npm run start` to start project locally
* `yarn lint` or `npm run lint` to run ESLint check
* `yarn flow` or `npm run flow` to run Flow type checking
* `yarn test` or `npm run test` to run Jest unit tests
* `yarn test:coverage` or `npm run test:coverage` to check for test coverage on project
* `yarn storybook` or `npm run storybook` to run Storybook dev environment
* `yarn build` or `npm run build` to build production version
* `firebase deploy` to deploy project fully on Firebase (functions & hosting)
* `firebase deploy --only functions` to deploy Firebase Functions
* `firebase deploy --only hosting` to deploy build folder to Firebase hosting

For GraphQL implementation using Firebase Functions **[still WIP]**, see docs/GraphiQL: https://us-central1-budimir-sample.cloudfunctions.net/api/graphiql

_Keep in mind that Prettier, ESLint and Flow are interconnected._

---

##### Notes:

* Project can be modified to use external module, such as `react-redux-firebase` if codebase will grow.
* ESLint rules are quite basic, there's plenty of space to improve them if there's time left.

---

##### TODO list:

1. Add proper typechecking/test/storybook coverage **[in progress]**
2. Finish CircleCI implementation properly _(optional)_
