
const mongoose = require(`mongoose`)
const device = require(`./src/controllers/ModbusTCPClass.js`)
const express = require('express')
const route = express.Router()
const DeviceModel = require('./src/model/modbusdevicemodel.js')
const DeviceMDTCP = require('./src/controllers/ModbusTCPClass.js')

route.post('/Compressor1',DeviceModel)

module.exports = route