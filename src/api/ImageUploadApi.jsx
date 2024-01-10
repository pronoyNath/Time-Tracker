import axios from "axios";

export const imageUpload = async (image) =>{
    const formData = new FormData();
    formData.append('image',image)

    //according to imgbb api using documentation
    const {data} = await axios.post(`https://api.imgbb.com/1/upload?key=b9e1794489de27067163b6706e6d09fa`,formData)

    return data;
}