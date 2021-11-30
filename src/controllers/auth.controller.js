import User from "../models/User";
import Role from "../models/Role";

import jwt from "jsonwebtoken";
import config from "../config";

export const signUp = async (req, res) => {
  try {
    // Obteniendo el Request Body
    const username = await req.body.username;
    const phone = await req.body.phone;
    const email = await req.body.email;
    const password =  await req.body.password;
    const roles = await req.body.roles;
    
    // Creando un nuevo User Object
    const newUser = new User({
      username,
      phone,
      email,
      password: await User.encryptPassword(password),
    });

    // Verificando  roles
    if (req.body.roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      newUser.roles = [role._id];
    }

    // Guardando el objeto User en DB Mongodb
    const savedUser = await newUser.save();

    // Creando un token para el usuario
    const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
      expiresIn: 86400, // 24 horas
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const signin = async (req, res) => {
  try {
    // Solicitud de body email, puede ser un email o username
    const userFound = await User.findOne({ email: req.body.email }).populate(
      "roles"
    );

    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });

    const matchPassword = await User.comparePassword(
      req.body.password,
      userFound.password
    );

    if (!matchPassword)
      return res.status(401).json({
        token: null,
        message: "Password Inválido",
      });

    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
      expiresIn: 86400, // 24 hours
    });

    res.json({ token });
  } catch (error) {
    console.log(error);
  }
};
