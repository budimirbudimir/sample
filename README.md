## Last.fm navigator [work in progress]

Last.fm navigator sample.
It is but a simple artist navigator, build with React/Redux.
Backend should use Firebase for auth and its FireStore for saving user-specific data.
It's been bootstrapped using `create-react-app`.
Optionally, local server, DB and CI support might be added later (Node, Mongo, GraphQL/Apollo, CircleCI).

#### Usage

Clone project to your local drive, navigate to project folder and run `yarn` or `npm install` to install dependencies.

To start project locally, run `yarn start` or `npm run start`.

To run Flow type checking, run `yarn flow` or `npm run flow`.

#### TODO

1. Add linter (ESLint)
2. Add tests where applicable
3. Add Router and routes (needed for auth)
4. Add auth and DB functionality (via Firebase/FireStore)
5. Add NodeJS server and MongoDB *(optional)*
6. Add GraphQL/Apollo *(optional)*
7. Add CircleCI *(optional)*
