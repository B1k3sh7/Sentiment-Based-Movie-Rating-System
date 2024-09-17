import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOutSuccess } from "../redux/user/userSlice";

function useLogout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleLogout() {
    try {
      const response = await auth.delete("/logout", { withCredentials: true });

      if (response.status === 204) {
        localStorage.removeItem("accessToken");
        //cookies.remove('jwt')
        dispatch(logOutSuccess());
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      localStorage.removeItem("accessToken");
      //cookies.remove('jwt')
      dispatch(logOutSuccess());
      navigate("/");
    }
  }

  return handleLogout;
}

export default useLogout;
