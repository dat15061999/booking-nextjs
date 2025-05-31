import { create } from "zustand/react";
import { API_URL } from "@/lib/apiService";
import { Authenticate } from "@/lib/types";

export const AUTH_TOKEN = "AUTH_TOKEN";

export const useQuestion = create(() => ({
  login: async () => {
    try {
      const data: Authenticate = await fetch(API_URL + "login")
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
          return res.text();
        })
        .catch((err) => console.log(err));
      localStorage.setItem(AUTH_TOKEN, data.token ?? "");
    } catch (error) {
      console.log(error);
    }
  },
  logout: async () => {
    try {
      await fetch(API_URL + "logout")
        .then((res) => {
          if (res.status === 200) {
            localStorage.removeItem(AUTH_TOKEN);
            return res.json();
          }
          return res.text();
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  },
}));
