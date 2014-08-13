var mongoose = require('mongoose');
mongoose.connect('mongodb://medcabdbowner:123456@localhost/medcabdb');

module.exports=mongoose.connection;

/* mongo commande to create a db with the owner :

db.createUser(
  {
    user: "medcabdbowner",
    pwd: "123456",
    roles:
    [
      {
        role: "dbOwner",
        db: "medcabdb"
      }
    ]
  }
);*/