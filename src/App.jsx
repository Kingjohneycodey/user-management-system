import { RouterProvider } from "react-router-dom";
import "./App.css";
import "./index.css";
import routes from "./router";
import { Toaster } from "react-hot-toast";

function App() {

  return (
    <>
      <Toaster position="top-center" />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
