const mongoose = require("mongoose")

const personSchema = new mongoose.Schema({
  email: {
    type: String,
  },
})

const userSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  object: {
    type: String,
  },
  type: {
    type: String,
  },
  avatar_url: {
    type: String,
  },
  workspace: {
    type: Boolean,
  },
  person: personSchema,
})


const ownerSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  user : userSchema
})

const tokenSchema = new mongoose.Schema({
  request_id: {
    type: String,
    required: true,
  },
  access_token: {
    type: String,
    required: true,
  },
  token_type: {
    type: String,
    required: true,
  },
  bot_id: {
    type: String,
    required: true,
  },
  workspace_id: {
    type: String,
    required: true,
  },
  workspace_name: {
    type: String,
    required: true,
  },
  workspace_icon: {
    type: String,
  },
  duplicated_template_id: {
    type: String,
  },
  owner: ownerSchema,
})

const TokenData = mongoose.model("tokenData", tokenSchema)

module.exports = {
    TokenData,
  };
