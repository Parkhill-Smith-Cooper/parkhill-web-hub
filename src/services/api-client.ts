import axios from "axios";

export default axios.create({
    baseURL: "https://api.rawg.io/api",
    params: {
      key: "4efbf814d182480980c34f6bd3c534ca"
    }
})