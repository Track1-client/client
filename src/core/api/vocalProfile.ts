import axios from "axios";
import { getCookie } from "../../utils/cookie";

export async function getVocalProfile(vocalId: number, page: number) {
  try {
    const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/profile/vocal/${vocalId}?page=${page}&limit=5`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    });
    console.log(data);
    return data?.data.data;
  } catch (e) {
    console.log(e);
  }
}

export async function postVocalPortfolio() {
  try {
    await axios.post("/mypage/vocal");
  } catch (e) {
    console.log(e);
  }
}

export async function patchVocalrProfile(editData: any) {
  try {
    const data = await axios.patch(`${process.env.REACT_APP_BASE_URL}/profile/vocal`, editData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    });
    console.log(data);
  } catch (e) {
    console.log(e);
  }
}
