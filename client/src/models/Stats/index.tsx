import { stat } from "fs"

class Stat {
    _id: string
    user: string
    date: Date
    endpoint: string
    method: string
    status: number

    constructor(_id: string, user: string, date: Date, endpoint: string, method: string, status: number) {
        this._id = _id
        this.user = user
        this.date = date
        this.endpoint = endpoint
        this.method = method
        this.status = status
    }
}

export default Stat