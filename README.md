## Last.fm navigator [work in progress]

Last.fm navigator sample. <BR />
It is but a simple artist navigator, build with React/Redux. <BR />
Backend should use Firebase for auth and its RealtimeDB for saving user-specific data. <BR />
Also, Firebase Functions will be used as API/GraphQL server. <BR />
It's been bootstrapped using `create-react-app`.

**Optionally**, local server, DB and CI support might be added later (GraphQL/Apollo, Firebase (Functions), CircleCI).

---

#### Usage

Clone project to your local drive, navigate to project folder and run `yarn` or `npm install` to install dependencies.<BR />
To start project locally, run `yarn start` or `npm run start`.<BR />
To run ESLint check, run `yarn lint` or `npm run lint`.<BR />
To run Flow type checking, run `yarn flow` or `npm run flow`.<BR />

For GraphQL implementation using Firebase Functions (just bootstrapped, still WIP), see docs/GraphiQL: https://us-central1-budimir-sample.cloudfunctions.net/api/graphiql

_Keep in mind that Prettier, ESLint and Flow are interconnected._

---

##### Notes:

* Project can be modified to use external module, such as `react-redux-firebase` if codebase will grow.
* Redux files might be bulky at the moment, but will be split eventually.
* Linting rules are quite basic, there's plenty of space to improve them if there's time left.

---

##### TODO list:

1. **[WIP] Add Firebase actions error handling and starring logic**
   _(user can favorite artists and see list later)_
2. **[WIP]** Add GraphQL/Apollo
3. Fix and organize styles
4. Add tests where applicable
5. Add CircleCI _(optional)_
