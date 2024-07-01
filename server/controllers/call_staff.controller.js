import { io } from "../app.js"

const callStaff = async (req, res) => {
    io.emit("call-staff", { id: req.params.id })
}

export const callStaffController = {
    callStaff
}