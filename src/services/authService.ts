import { authInstance } from "../utils/axios";

export class AuthService {
    constructor() {

    }

    /**
     * 
     * @param values The registration form values. email, password.
     * @returns The newly registered user data
     */
    login = async (values: {email:string, password:string}) => {
        try {
            const res = await authInstance.post("/api/auth/login", values);
        
            return res.data
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            
            console.log("An error occurred registering: ", error);
            throw Error(error?.error)
        }
    }

  
}