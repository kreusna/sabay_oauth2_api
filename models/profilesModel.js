const mongoose = require('mongoose')
const ProfileSchema = new mongoose.Schema({
  mysabay_user_id: {
    type: Number,
    index: { unique: true }
  },
  enable_local_pay: {
    type: Number,
    default: 0
  },
  given_name: {
    type: String,
    default: null
  },
  family_name: {
    type: String,
    default: null
  },
  fail_login_attempt: {
    type: Number,
    default: 0
  },
  language_preference: {
    type: String,
    default: 'en'
  },
  gender: {
    type: String,
    default: ''
  },
  date_of_birth: {
    type: Number,
    default: null
  },
  national_id: {
    type: String,
    default: null
  },
  profile_pic: {
    type: String,
    default: null
  },
  status: {
    type: Number,
    default: 1
  },
  sc_display_currency: {
    type: String,
    default: 'KHR'
  },
  contact: {
    phone_number_1: {
      type: String,
      default: null
    },
    phone_number_2: {
      type: String,
      default: null
    },
    phone_verified: {
      type: Number,
      default: 0
    },
    email: {
      type: String,
      default: null
    },
    email_verified: {
      type: Number,
      default: 0
    },
    facebook: {
      type: String,
      default: null
    },
    mysabay: {
      type: String,
      default: null
    }
  },
  address: {
    house_number: {
      type: String,
      default: null
    },
    street_number: {
      type: String,
      default: null
    },
    commune: {
      type: String,
      default: null
    },
    district: {
      type: String,
      default: null
    },
    city: {
      type: String,
      default: null
    },
    province: {
      type: String,
      default: null
    },
    country: {
      type: String,
      default: null
    }
  },
  wallet: [
    {
      balance: {
        type: Number,
        default: 0
      },
      asset_code: {
        type: String,
        require: true
      },
      psp_code: {
        type: String,
        default: null
      },
      pre_auth_pk: {
        type: String,
        default: null
      }
    }
  ],
  reseller_wallet: [
    {
      balance: {
        type: Number,
        default: 0
      },
      asset_code: {
        type: String,
        require: true
      },
      reseller_id: {
        type: Number,
        require: true
      }
    }
  ],
  logins: [
    {
      username: {
        type: String,
        require: true
      },
      password: {
        type: String,
        default: null
      },
      provider: {
        type: String,
        enum: ['sabay', 'phone', 'facebook', 'cookie']
      },
      status: {
        type: Boolean,
        default: 1
      },
      fail_login_attempt: {
        type: Number,
        default: 0
      }
    }
  ],
  data_pictures: [
    {
      key: {
        type: String,
        require: true
      },
      value: {
        type: String
      }
    }
  ],
  pre_auth_key: {
    type: String,
    default: null
  },
  pre_auths: [
    {
      merchant_pk: {
        type: String,
        required: true
      },
      psp_pk: {
        type: String,
        required: true
      },
      asset_code: {
        type: String,
        required: true
      }
    }
  ],
  security_password: {
    type: String,
    default: ''
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
  }
})

ProfileSchema.set('toObject', { getters: true })
ProfileSchema.set('toJSON', { getters: true })


module.exports = mongoose.model('profiles', ProfileSchema)
