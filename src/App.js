import {
  createBrowserRouter, 
  RouterProvider,
  Route, Router, Routes
} from 'react-router-dom';
import Rejestracja from "./components/rejestracja";
import Login from "./components/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>
  },
  {
    path: "/rejestracja",
    element: <Rejestracja/>
  }
])

function App() {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App;