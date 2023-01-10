import axios from "axios";
import { useMutation } from "react-query";
import { UploadDataType } from "../../type/uploadDataType";

export async function getTrackInfo(props:number) {
  const state=props
  try {
    const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/tracks/${state}`,
    {
      headers: {
        Authorization: `Bearer ${`${process.env.REACT_APP_PRODUCER_ACCESSTOKEN}`}`,
      },
    });
    // data && console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function getComment(props:number) {
  const state=props
  try {
    const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/tracks/comments/8?page=1&limit=20`, 
    {
      headers: {
        Authorization: `Bearer ${`${process.env.REACT_APP_PRODUCER_ACCESSTOKEN}`}`,
      },
    });
    // data && console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function postComment(formData:any) {
  try {
     const data=await axios.post(`${process.env.REACT_APP_BASE_URL}/tracks/8`, formData,
    {
      headers: {
        'Content-Type': 'amultipart/form-data',
        Authorization: `Bearer ${`${process.env.REACT_APP_VOCAL_ACCESSTOKEN}`}`,
      },
    });
    data && console.log(data);
  } catch (e) {
    console.log(e);
  }
}

// export const postCommentMutation = () => {
//   return useMutation(postComment) 
// }

export async function getAudioFile() {
  try {
    const data = await axios.get("/tracks/:beatId/download");
    data && console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
}