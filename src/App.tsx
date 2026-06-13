import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { router } from "./routes";

export const App = () => (
  <>
    <RouterProvider router={router} />

    <Toaster position="top-right" richColors />
  </>
);
