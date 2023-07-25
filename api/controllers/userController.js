import User from "../models/userSchema.js"
import bcrypt from "bcryptjs"

const read = async (req ,res) => {
    const id = req.params.id
    try{
        const user = await User.findById(id)
        res.status(200).json(user)
    }
    catch(err){
        res.status(500).json(err)
    }
}

const readAll = async (req, res) => {
    try{
        const users = await User.find()
        res.status(201).json(users)
    }
    catch(err){
        res.json(err)
    }
}

const deleteUser = async (req ,res) => {
    try{
        await User.findByIdAndDelete(req.params.id)
        res.send("User deleted")
    }
    catch(err){
        res.status(500).json(err)
    }
}

const updateUser = async (req, res) => {
    if(req.body.password){
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password,salt)
        req.body.password = hash
    }
    try{
        const user = await User.findByIdAndUpdate(req.user.id, {$set: req.body}, {new: true})
        res.status(201).json(user)
    }
    catch(err){
        res.status(404).json(err)
    }
}

export { read, readAll, deleteUser, updateUser }