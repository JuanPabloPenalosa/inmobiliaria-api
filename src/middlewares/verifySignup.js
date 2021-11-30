import User from "../models/User";
import { ROLES } from "../models/Role";

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
   //Valida si el ususario ya esta creado
    if (user)
      return res.status(400).json({ message: "El user ya existe en la DB" });
    const email = await User.findOne({ email: req.body.email });
   //Valida si el email ya existe
    if (email)
      return res.status(400).json({ message: "El email ya existe asociado" });
    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).json({
          message: `Role: ${req.body.roles[i]} no existe`,
        });
      }
    }
  }

  next();
};

export { checkDuplicateUsernameOrEmail, checkRolesExisted };
