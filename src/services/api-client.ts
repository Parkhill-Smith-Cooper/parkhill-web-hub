import axios from "axios";

export default axios.create({
    baseURL: "https://api.rawg.io/api",
    params: {
      key: "615a114035714c06b43f4dd34cce6f94"
    }
})