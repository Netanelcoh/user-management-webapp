import axios from "axios";

export const fetchData = () => {
  return axios
    .get("http://localhost:3000/api/users")
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return error;
    });
};
