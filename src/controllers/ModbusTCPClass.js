
const mongoose = require('mongoose')
const DeviceModel = require('../model/modbusdevicemodel.js')
const modbus = require('jsmodbus')
const net = require('net')
const netServer = new net.Server()
const server = new modbus.server.TCP(netServer, {
})

const startindex = 0
const offset = 8
let status = 0
let oleoPressure = 0
let deltaPFilter = 0
let outletPressure = 0

class DeviceReadModbusTCP {
    constructor(devicename, status, oleoPressure, deltaPFilter, outletPressure) {
        this.devicename = devicename
        this.status = status
        this.oleoPressure = oleoPressure
        this.deltaPFilter = deltaPFilter
        this.outletPressure = outletPressure
    }

    modbusregisters() {

        const commmodbustcp = () => {
          
            const date = new Date()
            server.on('postWriteMultipleRegisters', (value) => {

                const register = server.holding.buffer.slice(startindex, offset)
                const buff = Buffer.from(register)
                const json = buff.toJSON()
                this.devicename,
                this.status = json.data[1]
                this.oleoPressure = json.data[3]
                this.deltaPFilter = json.data[5]
                this.outletPressure = json.data[7]
            },
            DeviceModel.create({
                DeviceName: this.devicename,
                Status: this.status,
                OleoPressure: this.oleoPressure,
                DeltaPFilter: this.deltaPFilter,
                OutletPressure: this.outletPressure,
                TimeStamp: date
            }).then((dados) => {
                console.log(dados)
            }).catch(e => {
                console.log(e)
            })
            )
        }
        commmodbustcp()
    }
}

const Device = new DeviceReadModbusTCP('Compressor1', status, oleoPressure, deltaPFilter, outletPressure)

function StartComm() {
    fasetime = 900;
    console.log("Gravando no Banco")
    Device.modbusregisters()
    setTimeout(() => {
        DoneComm()
    }, fasetime);
}
function DoneComm() {
    fasetime = 100;
    setTimeout(() => {
        console.log('Concluido')
        StartComm()
    }, fasetime);
}

StartComm()


module.exports = Device
netServer.listen(502)
