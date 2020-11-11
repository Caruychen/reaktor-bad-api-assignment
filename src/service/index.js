import axios from "axios";

const badApiHTTP = axios.create({
  baseURL: "https://bad-api-assignment.reaktor.com/"
});

// badApiHTTP.defaults.headers.common["x-force-error-mode"] = "all";

badApiHTTP.interceptors.response.use(
  response => {
    const originalConfig = response.config;

    // Resend availability requests that returned with an empty array
    if (originalConfig.url.includes("availability")) {
      const availabilityRes = response.data.response
      if (availabilityRes.length <= 0 || availabilityRes === "[]") {
        // originalConfig.headers["x-force-error-mode"] = ""
        return badApiHTTP(originalConfig);
      }
    }

    return response;
  },
  error => {
    console.log(error)
  }
)

export { badApiHTTP };