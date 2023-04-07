class AuthController {
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
}

export default AuthController;
