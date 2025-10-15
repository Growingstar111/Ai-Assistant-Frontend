import axios from "axios";

export const http = axios.create({
  baseURL: "https://ephemeral-lebkuchen-eee5f2.netlify.app/api",
});
