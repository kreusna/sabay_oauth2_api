const mongoose = require('mongoose')
const PersonaSchema = new mongoose.Schema(
  {
    mysabay_user_id: {
      type: Number,
      require: true
    },
    uuid: {
      type: String,
      default: ''
    },
    service_code: {
      type: String,
      default: ''
    },
    is_default: {
      type: Number,
      default: 0
    },
    status: {
      type: Number,
      default: 1
    },
    last_login: {
      type: Number,
      default: 0
    },
    service_data: [
      {
        key: {
          type: String
        },
        value: {
          type: String
        }
      }
    ],
    created_at: {
      type: Number,
      default: Math.floor(Date.now() / 1000)
    },
    updated_at: {
      type: Number,
      default: Math.floor(Date.now() / 1000),
      set: function () {
        return Math.floor(Date.now() / 1000)
      }
    }
  },
  {}
)

PersonaSchema.set('toObject', { getters: true })
PersonaSchema.set('toJSON', { getters: true })

module.exports = mongoose.model('personas', PersonaSchema)
