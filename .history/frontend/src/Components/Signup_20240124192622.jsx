import { useState } from "react";
import "../Css/navbar.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const backendURL = "http://localhost:5173";
  const [data, setData] = useState({});
  const [theme, setTheme] = useState(() => {
    const Dark = localStorage.getItem("Dark");
    return Dark ? JSON.parse(Dark) : true;
  });

  // TOASTS

  const SignupNotify = () =>
    toast.success("Signup successfull!", {
      position: "top-center",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme ? "dark" : "light",
    });

  const ErrorNotify = () =>
    toast.error("Input fields can't be empty.", {
      position: "top-center",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme ? "dark" : "light",
    });

  const EmailErrorNotify = (data) =>
    toast.error(data, {
      position: "top-center",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme ? "dark" : "light",
    });

  const handleInputs = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const SubmitData = async (e) => {
    e.preventDefault();
    if (!data.name || !data.email || !data.password) {
      ErrorNotify();
      return;
    }
    try {
      const response = await fetch(`${backendURL}/signup`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { message, token } = await response.json();
      if (message === "REGISTRATION SUCCESSFUL") {
        SignupNotify();
        localStorage.setItem("userToken", token);
        setTimeout(() => {
          window.location.reload();
          document.body.classList.remove("bg-class");
        }, 2000);
      } else {
        EmailErrorNotify(message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      {/* ... rest of the code */}
    </>
  );
}

export default Signup;
