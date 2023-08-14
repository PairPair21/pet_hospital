import Axios from "axios";

const createAxios = (baseUrl) => {
  return Axios.create({
    baseURL: baseUrl,
  });
};

const webUser = createAxios("http://localhost:5500/");

export { webUser };
