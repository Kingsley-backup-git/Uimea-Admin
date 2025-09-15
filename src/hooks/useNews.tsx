import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"

import { NewsService } from "../services/newsService"
const useNews = () => {
    const addNewsMutation = useMutation({
        mutationFn: async (values:FormData) => {
            return await new NewsService().addNews(values)
        },
        onMutate() {
            toast.loading("Request Loading", {toastId : "news"})
        },
        onSuccess(data) {
            console.log(data)
            toast.dismiss("news")
            toast.success("Successfully added news")
        
        },
        onError(error) {
              toast.dismiss("news")
            toast.error(error?.message)
        }
    })

    const doAddNews = async(values:FormData) => {
        return await addNewsMutation.mutateAsync(values)
    }






    //Delete News


    
    const deleteNewsMutation = useMutation({
        mutationFn: async (id:string) => {
            return await new NewsService().deleteNews(id)
        },
        onMutate() {
            toast.loading("Request Loading", {toastId : "news"})
        },
        onSuccess(data) {
            console.log(data)
            toast.dismiss("news")
            toast.success("Successfully deleted news")
        
        },
        onError(error) {
              toast.dismiss("news")
            toast.error(error?.message)
        }
    })

    const doDeleteNews = async(id:string) => {
        return await deleteNewsMutation.mutateAsync(id)
    }



    return {
        addNewsMutation,
        doAddNews,
        doDeleteNews
    }
}

export default useNews
