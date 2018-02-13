## Last.fm navigator [work in progress]

Last.fm navigator sample. <BR />
It is but a simple artist navigator, build with React/Redux. <BR />
Backend should use Firebase for auth and its FireStore for saving user-specific data. <BR />
It's been bootstrapped using `create-react-app`.

**Optionally**, local server, DB and CI support might be added later (Node, Mongo, GraphQL/Apollo, CircleCI).

#### Usage

Clone project to your local drive, navigate to project folder and run `yarn` or `npm install` to install dependencies.

To start project locally, run `yarn start` or `npm run start`.

To run ESLint check, run `yarn lint` or `npm run lint`.

To run Flow type checking, run `yarn flow` or `npm run flow`.

_Keep in mind that Prettier, ESLint and Flow are interconnected._

##### TODO list:

1. **WIP: Connect Firebase actions to Redux and add starring logic**
   _(user can favorite artists and see list later)_
2. Fix and organize styles
3. Add tests where applicable
4. Add NodeJS server and MongoDB _(optional)_
5. Add GraphQL/Apollo _(optional)_
6. Add CircleCI _(optional)_
