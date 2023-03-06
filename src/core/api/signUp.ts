import axios from "axios";

export async function authEmail(props:FormData) {
  const formData=props;

  try {
    const data = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/etc/auth-mail`,formData,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    data && console.log(data);
    return data
  } catch (e) {
    console.log(e);
  }
}



