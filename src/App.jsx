import { RouterProvider } from "react-router-dom";

import { router } from "./routes";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <RouterProvider router={router} />
        <ToastContainer autoClose={3000} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
