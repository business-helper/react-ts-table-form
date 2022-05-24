import axios from "axios";
import { IForm } from "types";

export const getFormInfoReq = async () => {
  return axios
    .get("/assets/form.json")
    .then(({ data }) => data?.forms as IForm[]);
};
