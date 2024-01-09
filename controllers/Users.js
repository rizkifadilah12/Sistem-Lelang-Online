import User from "../models/UserModel.js";
import argon2 from "argon2";

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: ["id", "uuid", "nip", "name", "email", "role", "status"],
    });
    res.status(200).json(response);

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      attributes: ["uuid", "name", "email", "role", "nip", "password"],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password, confPassword, nip, role } = req.body;
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password tidak cocok" });
  const hashPassword = await argon2.hash(password);
  try {
    await User.create({
      name: name,
      email: email,
      password: hashPassword,
      nip: nip,
      role: role,
    });
    res.status(201).json({ msg: "Data Berhasil Ditambahkan" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
export const blokUser = async (req, res) => {
  const user = await User.findOne({
    attributes: ["id", "uuid", "status"],
    where: {
      id: req.params.id,
    },
  });
  try {
    await User.update(
      {
        status: 0,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json({ msg: "User Bloked!" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
export const unBlockUser = async (req, res) => {
  const user = await User.findOne({
    attributes: ["id", "uuid", "status"],
    where: {
      id: req.params.id,
    },
  });
  try {
    await User.update(
      {
        status: 1,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json({ msg: "User Bloked!" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
export const updateUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemuka" });
  const { name, email, password, confPassword, nip, role } = req.body;
  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);
  }
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password tidak cocok" });
  try {
    await User.update(
      {
        name: name,
        email: email,
        password: hashPassword,
        nip: nip,
        role: role,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  try {
    await User.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json({ msg: "User Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
export const updatePassword = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  const { password, confPassword } = req.body;
  const match = await argon2.verify(user.password, req.body.currentPass);
  if (!match)
    return res.status(400).json({ msg: "Password Lama Anda Tidak sesuai" });
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password tidak cocok" });
  const hashPassword = await argon2.hash(password);
  try {
    await User.update(
      {
        password: hashPassword,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json({ msg: "Success Updated" });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};
