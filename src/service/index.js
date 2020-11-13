import axios from "axios";
import router from "@/router/index.js";

const badApiHTTP = axios.create({
  baseURL: "https://bad-api-assignment.reaktor.com/"
});
/*
Test code:
  badApiHTTP.defaults.headers.common["x-force-error-mode"] = "all";
*/
badApiHTTP.interceptors.response.use(
  response => {
    const originalConfig = response.config;
    // Resend availability requests that returned with an empty array
    if (originalConfig.url.includes("availability")) {
      const availabilityRes = response.data.response
      if (availabilityRes.length <= 0 || availabilityRes === "[]") {
        /*
        Test code:
          originalConfig.headers["x-force-error-mode"] = ""
        */
        return badApiHTTP(originalConfig);
      }
    }
    return response;
  },
  async error => {
    const errResponse = error.response;
    const originalConfig = errResponse.config;
    // Address other potential common errors
    if (errResponse.status === 400 || errResponse.status === 404) {
      if (originalConfig.url.includes("products")) { // Show not found page when product returns 400 or 404 error
        router.push({
          name: "NotFound"
        });
      } else if (originalConfig.url.includes("availability")) {
        return errResponse // BaseAvailability component will register Data not found
      }
    } else if (errResponse.status === 503 || errResponse.status === 504) {
      return await badApiHTTP(originalConfig) // Retry if temporary unavailability or server timeout
    } else {
      return errResponse
    }
  }

)

export { badApiHTTP };