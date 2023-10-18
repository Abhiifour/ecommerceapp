import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api",
  headers: {
    common: {
      Authorization:
        "Bearer 21bda154e4a6961fc08e110bb698aa75518b54bb533e3e1d6b64e2e79edd0bc98e05f35fe0d799547148c90619050450fe828be3f913c231d05b05a43b1a4444c377c4f28604d2b1154a82fb4fde86393f33dfaa62d6bcb30a1bc2085295bd4ce70ea1f35f56129c30d9492a6e32779c1ca2803e88249b70d155399b3f2562e9",
    },
  },
});
