import express from "express"
import { deleteUser, read, readAll, updateUser } from "../controllers/userController.js"
import { verifyAdmin, verifyUser } from "../verify.js"
const router = express.Router()

//read 
router.get('/:id', verifyUser, read)

//readAll
router.get('/', verifyAdmin, readAll)

//update
router.put('/:id', verifyUser, updateUser)

//delete
router.delete('/:id', verifyUser, deleteUser)

export default router