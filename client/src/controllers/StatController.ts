import Stat from "../models/Stats";
import AuthController from "./AuthController";

class StatsController {

    static async getStats(): Promise<Stat[]> {
        try {
            const res = await fetch("http://localhost:5000/stats", {
                method: "GET",
                headers: AuthController.getAuthHeader()
            });
            const data = await res.json();
            console.log("STATS DATA", data)
            return data
        } catch (error) {
            console.error(error);
            return [];
        }
    }

}

export default StatsController;