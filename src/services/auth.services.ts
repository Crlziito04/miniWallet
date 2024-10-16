import { credentialRepository, userRepository } from "../config/config.mySql";
import { usersDto } from "../dto/userRegister.dto";
import bcrypt from "bcrypt";
import ICredential from "../interfaces/credential.interface";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envs";

export const authService = {
  createUser: async (userData: usersDto) => {
    try {
      const existEmail = await credentialRepository.findOne({
        where: { email: userData.email },
      });
      if (existEmail) {
        throw {
          message: "Ya existe un usuario con este correo electrónico",
          code: 409,
        };
      }

      const hashedPassword = await bcrypt.hash(userData.password, 10);

      const newUser = await userRepository.create({
        name: userData.name,
        lastname: userData.lastname,
        phone: userData.phone,
      });

      const newCredential: Omit<ICredential, "id"> = {
        email: userData.email,
        password: hashedPassword,
        userId: newUser.id,
      };

      await credentialRepository.create(newCredential);

      return { message: "Usuario creado exitosamente" };
    } catch (error) {
      throw error;
    }
  },
  loginUser: async (email: string, password: string) => {
    try {
      const userEmail = await credentialRepository.findOne({
        where: { email },
        include: [userRepository],
      });
      if (!userEmail) {
        throw {
          message: "Correo electrónico o contraseña incorrectos",
          code: 401,
        };
      }

      const passwordMatch = await bcrypt.compare(password, userEmail.password);
      if (!passwordMatch) {
        throw {
          message: "Correo electrónico o contraseña incorrectos",
          code: 401,
        };
      }

      const token = jwt.sign(
        {
          userId: userEmail.userId,
          email: userEmail.email,
          admin: userEmail.user.isAdmin,
        },
        JWT_SECRET,
        { expiresIn: "72h" }
      );

      userEmail.updatedAt = new Date();
      await credentialRepository.update(
        { updatedAt: userEmail.updatedAt },
        { where: { id: userEmail.id } }
      );

      return {
        message: "Inicio de sesión exitoso",
        refreshToken: token,
      };
    } catch (error) {
      throw error;
    }
  },
};
