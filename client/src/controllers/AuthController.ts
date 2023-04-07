import axios, { AxiosResponse } from 'axios'

class AuthController {
    static async login(email: string, password: string): Promise<AxiosResponse | undefined> {
        try {
            return (await axios.post('http://localhost:5000/auth/login', { email, password }))
        } catch (error) {
            console.error(error);
        }
    }

}

export default AuthController;