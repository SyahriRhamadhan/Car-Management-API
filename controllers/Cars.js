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
    const { name, harga,size} = req.body;
    if(req.user.role !== "admin" && req.user.role !== "superadmin") {
        return res.status(400).json({
            success: false,
            message: "Kamu gak bisa nambah mobil dengan role member",
        });
    }
    try {
        await Cars.create({
            name: name,
            harga: harga,
            size: size
        });
        return res.status(200).json({
            success: true,
            message: "Mobil Berhasil ditambahkan",
        });
    } catch (error) {
        console.log(error);
    }
}

export const updateCars = async(req, res) => {
    const { id } = req.params;
    const { name, harga, size} = req.body;
    if(req.user.role !== "admin" && req.user.role !== "superadmin") {
        return res.status(400).json({
            success: false,
            message: "Kamu gak bisa update data mobil dengan role member",
        });
    }
        try {
            await Cars.update(
                { name: name, harga: harga, size: size },
                {
                where: { id: id},
                }
            );
            return res.status(200).json({
                success: true,
                message: "Cars Berhasil diupdate",
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
    if(req.user.role !== "admin" && req.user.role !== "superadmin") {
        return res.status(400).json({
            success: false,
            message: "Kamu gak bisa menghapus data mobil",
        });
    }
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
    