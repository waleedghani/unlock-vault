import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import AuthReducer from "./reducers/AuthReducer";
import AuthServices from "./services/AuthServices";
import CourseServices from "./services/CourseServices";
import LiveStreamServices from "./services/LiveStreamServices";
import ChatService from "./services/ChatServices";
import HomeServices from "./services/HomeServices";
import SubscriptionServices from "./services/SubscriptionServices";
import PaymentServices from "./services/PaymentServices";

const store = configureStore({
  reducer: {
    AuthReducer,
    [AuthServices.reducerPath]: AuthServices.reducer,
    [CourseServices.reducerPath]: CourseServices.reducer,
    [LiveStreamServices.reducerPath]: LiveStreamServices.reducer,
    [ChatService.reducerPath]: ChatService.reducer,
    [HomeServices.reducerPath]: HomeServices.reducer,
    [SubscriptionServices.reducerPath]: SubscriptionServices.reducer,
    [PaymentServices.reducerPath]: PaymentServices.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
      AuthServices.middleware,
      CourseServices.middleware,
      LiveStreamServices.middleware,
      ChatService.middleware,
      HomeServices.middleware,
      SubscriptionServices.middleware,
      PaymentServices.middleware,
    ]),
});

export const persistor = persistStore(store);
export default store;
