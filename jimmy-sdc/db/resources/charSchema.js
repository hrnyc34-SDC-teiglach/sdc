db.runCommand( {
  collMod: "characteristics",
  validator: { $jsonSchema: {
     bsonType: "object",
     required: [ "id", "product_id", "name" ],
     properties: {
        id: {
           bsonType: "int",
           description: "must be a number and is required"
        },
  product_id: {
           bsonType: "int",
           description: "must be a number and is required"
        },
        name: {
           bsonType: "string",
           description: "must be a string and is required"
        }
     }
  } },
  validationLevel: "moderate"
} )