import axios from "axios";
import { getCookie } from "../../utils/cookie";

export async function getTrackInfo(props: number) {
  const state = props;
  console.log(state);
  try {
    const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/tracks/${state}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    });
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function getComment(page: number, beatId: number) {
  try {
    const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/tracks/comments/${beatId}?page=${page}&limit=5`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken")}`,
        beatId: beatId,
      },
    });
    return data?.data.data;
  } catch (e) {
    console.log(e);
  }
}

export async function postComment(formData: any) {
  try {
    const data = await axios.post(`${process.env.REACT_APP_BASE_URL}/tracks/8`, formData, {
      headers: {
        "Content-Type": "amultipart/form-data",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    });
  } catch (e) {
    console.log(e);
  }
}

export async function getAudioFile() {
  try {
    const data = await axios.get("/tracks/:beatId/download");
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function patchProfile(beatId: any) {
  try {
    const data = await axios.patch(`${process.env.REACT_APP_BASE_URL}/tracks/${beatId}/closed`, {
      headers: {
        "Content-Type": "amultipart/form-data",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    });
    data && console.log(data);
    if (data.status === 200) {
      window.location.replace("/");
    }
  } catch (e) {
    console.log("문제발생");
    console.log(e);
  }
}
