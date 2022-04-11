const mongoose = require('mongoose')
const ServiceSchema = new mongoose.Schema(
  {
    id: {
      type: Number
    },
    service_code: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      default: null
    },
    usdkhr: {
      type: Number,
      default: 4000
    },
    tracking_id: {
      type: String,
      default: null
    },
    secret: {
      type: String,
      default: null
    },
    jwt_life_time: {
      type: String,
      default: '60'
    },
    ssn_account_pk: {
      type: String,
      default: null
    },
    private_key: {
      type: Buffer,
      default: null,
      get: (privateKey) => {
        return privateKey ? privateKey.toString() : privateKey
      }
    },
    public_key: {
      type: Buffer,
      default: null,
      get: (publicKey) => {
        return publicKey ? publicKey.toString() : publicKey
      }
    },
    info: {
      type: String,
      default: null
    },
    active: {
      type: Boolean,
      default: 1
    },
    access_all_microservices: {
      type: Boolean,
      default: 0
    },
    deleted_at: {
      type: Number,
      default: 0
    },
    payment_service_providers: [
      {
        id: {
          type: String,
          required: true,
          unique: true,
          sparse: true
        },
        code: {
          type: String,
          required: true,
          unique: true,
          sparse: true
        },
        name: { type: String, default: null },
        asset_code: { type: String, default: null },
        deeplink: { type: String, default: null },
        net_payout: { type: Number, default: 1 }
      }
    ],
    facebook_app_id: {
      type: String,
      default: null
    },
    facebook_secret: {
      type: String,
      default: null
    },
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
    },
    login_methods: [
      {
        code: {
          type: String,
          required: true,
          unique: true
        },
        name: String
      }
    ],
    allowed_domains: [{
      type: String
    }],
    redirect_uri:{
      type: String,
      default: ''
    },
    logo: {
      type: String,
      default: null
    },
    allow_micoservices: [String]
  },
  {}
)

ServiceSchema.set('toObject', { getters: true })
ServiceSchema.set('toJSON', { getters: true, virtuals: true })

module.exports = mongoose.model('services', ServiceSchema)
