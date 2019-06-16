#### Quick explanation

Making rootReducer and actionTypeContainer, in order to be able to traverse whole action/reducer tree later.
This will open a few nice possibilities for improvement later, and costs little boilerplate.

Primary idea is to visualize state data and actions for better readability and "onboarding" (also just for fun).
Ideally, we'd have a root saga here too, once redux-saga implemented.
