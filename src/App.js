import { ToastContainer, toast as oldToast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Selfie from "./components/Selfie";

var showToast, getApiUrl;


function App() {

  showToast = (message) => {
    oldToast.dark(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <Selfie/>
      <ToastContainer />
    </>
  );
}
export default App;
export { showToast, getApiUrl };