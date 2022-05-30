const Budget = require("./budget");
const User = require("./usuarios");


User.hasMany(Budget, {
  foreignKey: "user_id",
});




// mas importante la que soluciona el dashboard, los favoritos, estado de un pedido de un usuario
// 30%



module.exports = {
  Budget,
  User,
};
