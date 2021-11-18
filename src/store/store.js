import createSagaMiddleware from "@redux-saga/core";
import { applyMiddleware, compose, createStore } from "redux";
import logger from "redux-logger";
import allReducers from "./root-reducer";
import rootSaga from "./root-saga";

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const sagaMiddleWare = createSagaMiddleware();
  export const store = createStore(
    allReducers,
    composeEnhancers(applyMiddleware(sagaMiddleWare, logger))
  );

  sagaMiddleWare.run(rootSaga);

export default {store};
