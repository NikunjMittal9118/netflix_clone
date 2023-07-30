import express from "express"
import { deleteUser, getStats, read, readAll, updateUser } from "../controllers/userController.js"
import { verifyAdmin, verifyUser } from "../verify.js"
const router = express.Router()

//read 
router.get('/find/:id', verifyUser, read)

//readAll
router.get('/', verifyAdmin, readAll)

//update
router.put('/:id', verifyUser, updateUser)

//delete
router.delete('/:id', verifyUser, deleteUser)

//getUserStats
router.get('/stats', getStats)

export default router