const mongoose = require("mongoose")

const contextSchema = new mongoose.Schema({

    workspace_id: {
        type: String,
        required: true,
      },
      data: [{
        // Use dynamic keys for the object properties
        title : {
          type: String,
          required: true,
        },
        data : {
          type: String,
          required: true,
        }
      }]
})

const contextData = mongoose.model("context", contextSchema)

module.exports = {
    contextData
};
