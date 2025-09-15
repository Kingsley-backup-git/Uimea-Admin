import { userInstance } from "../utils/axios";

export class NewsService {
    constructor() {

    }

    /**
     * 
     * @param values 
     * @returns 
     */
  

    addNews = async (values : FormData) => {
        try {
const res = await userInstance.post("/api/news/add", values, {headers : {'Content-Type' : "multipart/form-data"}});
        
            return res.data
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            
            console.log("An error occurred registering: ", error);
            throw Error(error?.error)
        }
    }



    getNews = async () => {
        try {
const res = await userInstance.get("/api/news/");
        
            return res.data
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            
            console.log("An error occurred registering: ", error);
            throw Error(error?.error)
        }
    }


      deleteNews = async (id:string) => {
        try {
const res = await userInstance.delete(`/api/news/${id}`);
        
            return res.data
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            
            console.log("An error occurred registering: ", error);
            throw Error(error?.error)
        }
    }
}