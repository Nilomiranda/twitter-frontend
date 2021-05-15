import {httpClient} from "../config/queryClient";
import axios, {AxiosResponse} from "axios";
import {User} from "../interfaces/user";

export const prefetchSession = async (req): Promise<AxiosResponse<{ user: User }>> => {
  return axios.get<{ user: User }>('http://localhost:3000/sessions', {
    headers: req?.headers
  })
}
