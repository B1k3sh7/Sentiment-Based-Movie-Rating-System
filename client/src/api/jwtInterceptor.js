import axios from "axios"
import auth from "./auth"

const jwtInterceptor = axios.create({})

jwtInterceptor.interceptors.response.use(
  (response) =>{
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      try {
        const response = await auth.get(
          "http://localhost:5000/users/refresh-token",
          { withCredentials: true }
        )

        localStorage.removeItem("accessToken");
        localStorage.setItem("accessToken", response.data.accessToken)

        error.config.headers.Authorization = `Bearer ${response.data.accessToken}`
        return axios(error.config)
      } catch (refreshTokenApiError) {
        return Promise.reject(refreshTokenApiError)
      }
    }

    return Promise.reject(error)
  }
)

export default jwtInterceptor