import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Auth } from "./components";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <QueryClientProvider client={new QueryClient()}>
        <BrowserRouter>
          <Routes>
            <Route path="/auth/signup" element={<Auth isSignUpPage />} />
            <Route
              path="/auth/signin"
              element={<Auth isSignUpPage={false} />}
            />
            <Route path="/blogs" element={<div>All Blogss page</div>} />
            <Route path="/" element={<div>Welcome to medium app</div>} />
          </Routes>
        </BrowserRouter>

        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </QueryClientProvider>
    </>
  );
}

export default App;
