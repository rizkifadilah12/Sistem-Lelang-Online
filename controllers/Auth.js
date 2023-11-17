import User from "../models/UserModel.js";
import argon2 from "argon2";
import Masyarakat from "../models/MasyarakatModel.js";
export const Login = async (req, res) =>{

    const user = await User.findOne({
        where: {
            email: req.body.email,
        }
    });
    if(!user) return res.status(404).json({msg: "User Tidak Di temukan"});
    const match = await argon2.verify(user.password, req.body.password);
    const st  = (user.status == 1);
    if (!st) return res.status(400).json({msg: "Akun Di Non Aktifkan"})
    if(!match) return res.status(400).json({msg: "Wrong Password"});
    req.session.userId = user.uuid;

    const uuid = user.uuid;
    const name = user.name; 
    const email = user.email;
    const role = user.role;
    res.status(200).json({uuid, name, email, role});
} 
export const LoginFront = async (req, res) =>{
    const mas = await Masyarakat.findOne({
        attributes:
        ['id','uuid','nik','password','nama','jk','email','no_hp','alamat','createdAt','status'],
        where: {
            email: req.body.email,
        }
    });
    if(!mas) return res.status(404).json({msg: "User tidak ditemuka"});
    const match = await argon2.verify(mas.password, req.body.password);
    const st  = (mas.status == 1);
    if (!st) return res.status(400).json({msg: "Akun Di Non Aktifkan"})
    if(!match) return res.status(400).json({msg: "Wrong Password"});
    req.session.userId = mas.id;
    const uuid = mas.uuid;
    const idM = mas.id;
    const name = mas.nama; 
    const email = mas.email;
    res.status(200).json({uuid, name, email,idM});
} 

export const Me = async (req, res) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon login ke akun Anda!"});
    }
    const user = await User.findOne({
        attributes:['uuid','name','email','role'],
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemuka"});
    res.status(200).json(user);
}
export const MeFront = async (req, res) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon login ke akun Anda!"});
    }
    const user = await Masyarakat.findOne({
        attributes:['id','uuid','nama','email'],
        where: {
            id: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemuka"});
    res.status(200).json(user);
}

export const logOut = (req, res) =>{
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg: "Tidak dapat logout"});
        res.status(200).json({msg: "Anda telah logout"});
    });
}