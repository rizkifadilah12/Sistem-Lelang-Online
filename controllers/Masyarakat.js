import Masyarakat from "../models/MasyarakatModel.js";
import User from "../models/UserModel.js";
import argon2, { verify } from "argon2"

export const getMasyarakat = async (req, res) =>{
   try {
    const response = await Masyarakat.findAll()
    res.status(200).json(response);
   } catch (error) {
    console.log(error);
   }
}
export const getmasyarakatById = async(req, res) =>{
  try {
    const response = await Masyarakat.findOne({
        where: {
            id : req.params.id
        }
    })
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
}

export const createMasyarakat = async(req, res) =>{
    const {email,password,nik,nama,jk,no_hp,alamat} = req.body
    const hashPassword = await argon2.hash(password);
   try {
    await Masyarakat.create({
        email : email,
        password: hashPassword,
        nik: nik,
        nama: nama,
        jk: jk,
        no_hp: no_hp,
        alamat: alamat
    })
    res.status(201).json({msg: "Akun Berhasil Di Tambahkan"})
   } catch (error) {
    res.status(400).json(error)
   }
}

export const updateMasyarakat = async(req, res) =>{
    const {email,nik,nama,no_hp,alamat} = req.body
    const masyarakat = await Masyarakat.findOne({
    where : {
        id: req.params.id
    },
   })
   try {
    await Masyarakat.update({
        email : email,
        nik: nik,
        nama: nama,
        no_hp: no_hp,
        alamat : alamat
    },{
        where: {
            id : masyarakat.id
        }
    })
   } catch (error) {
    
   }
}

export const blokMasyarakat = async(req, res) => {
    const masyarakat = await Masyarakat.findOne({
        where : {
            uuid: req.params.id
        },
       })
       const st = 0;
       try {
        await Masyarakat.update({
            status : st
        },{
            where: {
                id : masyarakat.id
            }
        })
        res.status(200).json({msg : "Success Updateded"})
       } catch (error) {
        res.status(400).json({msg : error})
       }
    
}
export const ublock = async(req, res) => {
    const masyarakat = await Masyarakat.findOne({
        where : {
            uuid: req.params.id
        },
       })
       const st = 1;
       try {
        await Masyarakat.update({
            status : st
        },{
            where: {
                id : masyarakat.id
            }
        })
        res.status(200).json({msg : "Success Updateded"})
       } catch (error) {
        res.status(400).json({msg : error})
       }
    
}
export const updatePassword = async (req,res) => {
    const masyarakat = await Masyarakat.findOne({
        where : {
            id: req.params.id
        },
    })
    const {password,confPassword} = req.body
    const ver = verify(masyarakat.password,req.body.password)
    console.log(ver);
       const match = await argon2.verify(masyarakat.password, req.body.currentPass);
       if(!match) return res.status(400).json({msg : "Password Lama Anda Tidak sesuai"})
       if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
       const hashPassword = await argon2.hash(password);
       try {
        await Masyarakat.update({
            password : hashPassword,
        },{
            where : {
                id : masyarakat.id
            }
        })
        res.status(200).json({msg: "Success Updated"})
       } catch (error) {
        res.status(400).json({msg : error})
       }

}
