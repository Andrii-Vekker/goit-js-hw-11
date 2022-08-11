import axios from "axios";
export { getImg }
import { name, count } from "./index";
const URL = `https://pixabay.com/api/`
const KEY = `29175258-0e972b66084e1db5719a62740`

async function getImg() {
   try {
     const response = await axios.get
        (`${URL}?key=${KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${count}&per_page=40`);
    return response.data
   } catch (error) {
    console.log(error)
   }
}