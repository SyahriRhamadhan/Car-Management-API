import Cars from "../models/CarModel.js";
import jwt from "jsonwebtoken";
import Users from "../models/UserModel.js";

export const getCars = async(req, res) => {
        const cars = await Cars.findAll({
            attributes:['id','name','harga','size']
        });
        res.json(cars);
}

export const getCarsById = async(req, res) => {
    const { id } = req.params;
    const cars = await Cars.findOne({
        where: { id: id },
    });
    res.json(cars);
}

export const createCars = async(req, res) => {
    const { name, harga, role} = req.body;
    if(role !== "admin" || role !=="superadmin") return res.status(400).json({msg: "Tidak dapat mengakses konten ini kamu bukan admin"});
    try {
        await Cars.create({
            name: name,
            harga: harga,
            size: size
        });
        return res.status(200).json({
            success: true,
            message: "Buku Berhasil ditambahkan",
        });
    } catch (error) {
        console.log(error);
    }
}

export const updateCars = async(req, res) => {
    const { id } = req.params;
    const { name, harga, role} = req.body;
    if(role !== "admin" || role !=="superadmin") return res.status(400).json({msg: "Tidak dapat mengakses konten ini kamu bukan admin"});
        try {
            await Cars.update(
                { name: name, harga: harga, size: size },
                {
                where: { id: id},
                }
            );
            return res.status(200).json({
                success: true,
                message: "Buku Berhasil diupdate",
            });
        } catch (error) {
            console.log(error);
        }
}

export const deleteCars = async(req, res) => {
    const { id } = req.params;
    const dataBeforeDelete = await Cars.findOne({
    where: { id: id },
    });
// if(tokenUser.role !="superadmin"){res.json()}
    const parsedDataProfile = JSON.parse(JSON.stringify(dataBeforeDelete));

    if (!parsedDataProfile) {
        return res.status(400).json({
            success: false,
            message: "Cars doesn't exist or has been deleted!",
        });
    }

    await Cars.destroy({
        where: { id },
    });

    return res.status(200).json({
        success: true,
        message: "Delete Data Successfully",
    });
}
    