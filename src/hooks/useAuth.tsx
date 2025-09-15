import { useMutation } from "@tanstack/react-query"
import { AuthService } from "../services/authService"
import { toast } from "react-toastify"
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom"
const useAuth = () => {
    const navigate= useNavigate()
    const LoginMutation = useMutation({
        mutationFn: async (values:{email:string, password:string}) => {
            return await new AuthService().login(values)
        },
        onMutate() {
            toast.loading("Request Loading", {toastId : "login"})
        },
        onSuccess(data) {
            toast.dismiss("login")
            toast.success("Successfully Logged In")
            Cookies.set("token", data?.accessToken)
            navigate("/dashboard")
        },
        onError(error) {
              toast.dismiss("login")
            toast.error(error?.message)
        }
    })

    const doLogin = async(values:{email:string, password:string}) => {
        return await LoginMutation.mutateAsync(values)
    }
    

    return {
        LoginMutation,
        doLogin
    }
}

export default useAuth
