module.exports = init

var Emitter = require('events').EventEmitter
  , mqtt = require('mqtt')

function init(callback) {
  callback(null, 'mqtt', Mqtt)
}

function Mqtt(automait, logger, config) {
  Emitter.call(this)
  this.automait = automait
  this.logger = logger
  this.config = config
  this.client = null
}

Mqtt.prototype = Object.create(Emitter.prototype)

Mqtt.prototype.init = function () {
  this.client = mqtt.connect('mqtt://' + this.config.connString)

  this.client.on('connect', function () {
    this.client.subscribe('#')
  }.bind(this))

  // this.client.on('message', function (topic, message) {
  //   console.log(message.toString())
  // }.bind(this))
}

Mqtt.prototype.publish = function (topic, message) {
  this.client.publish(topic, message)
}


