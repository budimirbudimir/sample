## Last.fm navigator [work in progress]

Deployed App URL: https://budimir-sample.firebaseapp.com

Last.fm navigator sample. <BR />
It is but a simple artist navigator, build with React/Redux. <BR />
Backend uses Firebase for auth and its RealtimeDB for saving user-specific data. <BR />
It's been bootstrapped using `create-react-app`.

**Optionally**, local server (NodeJS) & DB (MongoDB) might be added later.

---

#### Usage

<BR />_Commands:_

* `yarn` or `npm install` to install dependencies
* `yarn start` or `npm run start` to start project locally
* `yarn test` or `npm run test` to run Jest unit tests
* `yarn test:coverage` or `npm run test:coverage` to check for test coverage on project
* `yarn storybook` or `npm run storybook` to run Storybook dev environment
* `yarn build` or `npm run build` to build production version
* `yarn deploy` or `npm run deploy` to deploy project fully on Firebase hosting
* `yarn deploy:host` or `npm run deploy:host` to deploy build folder to Firebase hosting

---

##### Notes:

* Project can be modified to use external module, such as `react-redux-firebase` if codebase will grow.
* ESLint rules are quite basic, there's plenty of space to improve them if there's time left.

---

##### TODO list:

1. Fix favorite action
1. Organize `findArtist()`, `fetchArtist()` and `setArtist()` functions better
2. Drop classes for functional components & recompose/hooks
2. Reorganize folder structure
2. Add `redux-saga` and finish missing logic
3. Add proper typechecking/test/storybook coverage **[in progress]**
4. Figure how to deploy to custom host and integrate CI/CD _optional_
