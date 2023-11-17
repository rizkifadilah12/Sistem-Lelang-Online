import Gambar from "../models/GambarModel.js"

export const getGambar = async (req, res) =>{
    
}
export const getGambarById = async(req, res) =>{
    try {
        const response = await Gambar.findAll({
            attributes:['uuid','id','image','url'],
            where: {
                barangId: req.params.id
            },
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
} 

export const createGambar = async(req, res) =>{
   
}

export const updateGambar = async(req, res) =>{
    
}

export const deleteGambar = async(req, res) =>{ 
    const user = await Gambar.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    try {
        await Gambar.destroy({
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg: "User Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

