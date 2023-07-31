
const mongoose = require(`mongoose`)
//const Device = require("../controllers/ModbusTCPClass")

const DeviceSchema = new mongoose.Schema({
    DeviceName:String,
    Status:Number,
    OleoPressure:Number,
    DeltaPFilter:Number,
    OutletPressure:Number,
    TimeStamp:Date})

const DeviceModel = mongoose.model('Devices',DeviceSchema)

module.exports = DeviceModel