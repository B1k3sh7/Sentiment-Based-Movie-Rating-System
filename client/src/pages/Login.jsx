import React, { useEffect, useState } from "react";
import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import auth from "../api/auth.js";
import Input from "../components/Input";
import OAuth from "../components/OAuth";
import MainPageBackdrop from "../components/MainPageBackdrop";
import { useDispatch } from "react-redux";
import { signInSuccess, signInFailure } from "../redux/user/userSlice.js";

function Login(props) {
  const [form, setForm] = useState([
    {
      id: "email",
      name: "email",
      type: "email",
      placeholder: "Email",
      validate: ["isNotEmpty", "isEmail"],
      isValidated: false,
      errorFormName: "Email",
      error: "",
    },
    {
      id: "password",
      name: "password",
      type: "password",
      placeholder: "Password",
      validate: ["isNotEmpty"],
      isValidated: false,
      errorFormName: "Password",
      error: "",
    },
  ]);

  const data = useActionData();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLogginIn = navigation.state === "submitting";

  useEffect(() => {
    if (data && data.success) {
      dispatch(signInSuccess(data.error));
      navigate("/");
    } else if (data && data.error) {
      dispatch(signInFailure(data.error));
    }
  }, [data, dispatch, navigate]);

  return (
    <div className="App">
      <MainPageBackdrop backdrop_path="/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg" />
      <div className="pt-20 absolute top-0 left-0 right-0 mx-auto lg:min-h-screen font-poppins bg-primary-red-500 bg-intro-mobile lg:bg-intro-desktop overflow-hidden bg-desktop-intro lg:flex py-12">
        <div className="max-w-[1240px] mx-auto container flex flex-grow">
          <div className="px-3 py-20 lg:py-0 w-full lg:w-1/2 h-full flex flex-col justify-center items-center">
            <div className="text-white space-y-8 my-auto xl:w-10/12">
              <h1 className="text-4xl lg:text-5xl text-center lg:text-left font-bold">
                Welcome back, Movie Lover.
              </h1>
              <p>
                Log in to explore your personalized movie recommendations and
                ratings. Discover a world of cinematic wonders curated just for
                you.
              </p>
            </div>
          </div>
          <div className="px-3 w-full lg:w-1/2 flex items-center">
            <div className="space-y-8 w-full">
              <Form
                methof="post"
                className="bg-white rounded-lg shadow-hard-gray"
              >
                <div className="p-8 text-sm space-y-2">
                  {data && !data.success && data.errors && (
                    <ul>
                      {Object.values(data.error).map((err) => (
                        <li key={err}>{err}</li>
                      ))}
                    </ul>
                  )}
                  {data && !data.success && data.error.message && (
                    <p className="text-center text-red-600">
                      {data.error.message}
                    </p>
                  )}
                  {form.map((_form, _index) => {
                    return (
                      <Input
                        key={`form-${_index}`}
                        id={_form.id}
                        name={_form.type}
                        type={_form.type}
                        placeholder={_form.placeholder}
                        isValidated={_form.isValidated}
                        error={_form.error}
                      />
                    );
                  })}
                  <button
                    disabled={isLogginIn}
                    className="bg-[#ff5100] hover:bg-[#c63600] font-semibold text-white py-4 px-3 rounded-lg text-center w-full uppercase"
                  >
                    {isLogginIn ? "Logging In" : "Login"}
                  </button>
                  <OAuth />
                  <p className="text-center text-neutral-grayish-blue-500 text-[12px]">
                    By clicking the button, you are agreeing to our
                    <a
                      href="/"
                      className="text-primary-red-500 font-semibold ml-1"
                      onClick={(e) => e.preventDefault()}
                    >
                      Terms and Services
                    </a>
                  </p>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

export async function action({ request, params }) {
  const data = await request.formData();

  const user = {
    email: data.get("email"),
    password: data.get("password"),
  };
  console.log(user);

  try {
    const response = await auth.post("/login", user, {
      withCredentials: true,
    });

    let responseOk =
      response && response.status === 201 && response.statusText === "Created";
    if (responseOk) {
      const accessToken = response.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      return response.data;
    }
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return error.response.data;
    }
  }
}
