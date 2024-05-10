import { RouterProvider } from "react-router-dom";
import "./App.css";
import React from "react";
import Layout from "./assets/components/Layout";
import { createBrowserRouter } from "react-router-dom";
import Allpost from "./assets/features/Allpost";
import Addpost from "./assets/features/Addpost";
import store from "./assets/slice/store";
import { Provider } from "react-redux";
import Viewpage from "./assets/features/page";
import Editpage from "./assets/features/Editpage";
import Userpage from "./assets/features/user/Userpage";
import Userpagelist from "./assets/features/user/Page";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Allpost />,
          index: true,
        },
        {
          path: "/posts/addpost",
          element: <Addpost />,
        },
        {
          path: "post/viewpost/:id",
          element: <Viewpage />,
        },
        {
          path: "/post/editpost/:id",
          element: <Editpage />,
        },
        {
          path: "/user",
          element: <Userpage />,
        },
        {
          path: "/user/:userId",
          element: <Userpagelist />,
        },
      ],
    },
  ]);
  return (
    <>
      <div className="App">
        <Provider store={store}>
          <RouterProvider router={router}>
            <Layout />
          </RouterProvider>
        </Provider>
      </div>
    </>
  );
}

export default App;
