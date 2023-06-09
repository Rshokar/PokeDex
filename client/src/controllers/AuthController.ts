class AuthController {

    static accessToken: string = '';
    static refreshToken: string = '';

    static async login(email: string, password: string): Promise<Response> {
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: 'cors',
                body: JSON.stringify({ email, password })
            });

            this.accessToken = response.headers.get('auth-token') || "";
            this.refreshToken = response.headers.get('refresh-token') || "";

            console.log(this.accessToken)
            console.log(this.refreshToken)

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
                body: JSON.stringify({ email, password, role })
            });

            return response;
        } catch (error: any) {
            return error.response;
        }
    }

    // Logs a user out of the application
    static async logOut(): Promise<Response> {

        console.log("REFRESH TOKEN", this.refreshToken)
        try {
            const res = await fetch('http://localhost:5000/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken: this.refreshToken })
            });
            return res
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
