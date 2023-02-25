import axios from "axios";

import { baseUrl } from "../url";

export async function postRequest(data) {
  const token = localStorage.getItem("token");
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.post(
      `${baseUrl}${data.url}`,
      data.formData,
      headers
    );
    // console.log(response)
    const resData = response?.data;

    if (response.status === 200) {
      return resData;
    }
  } catch (err) {
    console.log(err);
    if (err?.code === "ERR_NETWORK") {
      throw new Error("Check Network Settings or Server Down");
    }
    if (err?.response?.status === 401) {
      throw new Error("Wrong credentials.");
    }
    if (err?.response?.status === 500) {
      throw new Error(" 500! Internal Server Error ");
    }
    if (err?.response?.status === 404) {
      throw new Error("404! Bad request");
    }
  }
}

export async function getRequest(url) {
  const token = localStorage.getItem("token");
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.get(`${baseUrl}${url}`, headers);
    const resData = response?.data;

    if (response.status === 200) {
      return resData;
    }
    return resData;
  } catch (err) {
    if (err?.code === "ERR_NETWORK") {
      throw new Error("Please check network connection");
    }
    if (err?.response?.status === 404) {
      throw new Error("404");
    }
    if (err?.response?.status === 401) {
      throw new Error("Not authenticated ");
    }
  }
}
