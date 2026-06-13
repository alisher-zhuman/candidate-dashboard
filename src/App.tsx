import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { router } from "./routes";

export const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="bottom-right" richColors />
    </>
  );
};
