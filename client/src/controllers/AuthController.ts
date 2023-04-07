class AuthController {

    static accessToken: string = '';
    static refreshToken: string = '';

    static async login(email: string, password: string): Promise<Response> {
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'BLAH': 'BLAH'
                },
                mode: 'cors',
                body: JSON.stringify({ email, password })
            });

            this.accessToken = response.headers.get('auth-token') || "";
            this.refreshToken = response.headers.get('refresh-token') || "";

            console.log("ACCESS: ", this.accessToken)
            console.log("REFRESH: ", this.refreshToken)


            return response;
        } catch (error: any) {
            return error.response;
        }
    }


    static async registration(email: string, password: string, role: string): Promise<Response> {
        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, type: role })
            });

            return response;
        } catch (error: any) {
            return error.response;
        }
    }

    static getAuthHeader(): Headers {
        return new Headers({
            'Content-Type': 'application/json',
            'authorization': `Access:${this.accessToken} Refresh:${this.refreshToken}`
        });
    }
}

export default AuthController;
