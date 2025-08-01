import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store";
// import { NotificationProvider } from "./Components/Notifications/NotificationProvider";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* <NotificationProvider> */}
      <App />
    {/* </NotificationProvider> */}
  </Provider>
);