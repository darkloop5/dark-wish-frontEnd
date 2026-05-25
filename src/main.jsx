import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";

import { RouterProvider } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import { store } from "./redux/store";
import { router } from "./routes/router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <Toaster />
  </Provider>,
);
