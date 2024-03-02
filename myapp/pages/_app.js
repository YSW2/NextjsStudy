import "@/styles/globals.css";
import Navbar from "./utils/Navbar";
import useAuth from "./hooks/useAuth";

export default function App({ Component, pageProps }) {
  useAuth();
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
