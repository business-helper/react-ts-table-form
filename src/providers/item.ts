import axios from "axios";
import { IItem } from "types";

export const getAllItemsReq = async () => {
  return axios
    .get("/assets/items.json")
    .then(({ data }) => data?.collection?.items as IItem[]);
};
