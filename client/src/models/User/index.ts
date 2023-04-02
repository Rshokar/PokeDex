class User {
    id: number;
    email: string;
    role: "admin" | "user";

    constructor(id: number, email: string, role: "admin" | "user") {
        this.id = id;
        this.email = email;
        this.role = role;
    }

}

export default User;