const {Schema, model} = require('mongoose')

const status = new Schema({
    title: {
      type: String,
      enum: ['completed', 'in progress', 'not started'],
      default: 'not started'
    },
    description: String,
  })
  
  module.exports = model('Status', status)