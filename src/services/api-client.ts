import axios from "axios";

export default axios.create({
    baseURL: "https://api.rawg.io/api",
    params: {
      key: "e00f5f5d1ad446d68c06dc3ef1721baf"
    }
})