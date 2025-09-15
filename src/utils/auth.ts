import Cookies from "js-cookie"
import { jwtDecode, type JwtPayload } from "jwt-decode";
export function checkAuth() {

    try {
        const token = Cookies.get("token")
         if (!token) {
            return false
         }
        if (token) {
            const decodedToken = jwtDecode<JwtPayload>(token)

             if (!decodedToken.exp) {
    
      return false;
    }
            const exp = decodedToken?.exp * 1000;
          if (Date.now() >= exp) {
      
      return false;
          }
            
            
        }

       return true;
      
    } catch (err:any) {
     console.error(err);
    return false;
    }
}