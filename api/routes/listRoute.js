import express from "express"
import { createList, deleteList, readLists, updateList } from "../controllers/listController.js"
import { verifyAdmin, verifyToken } from "../verify.js"
const router = express.Router()

//create
router.post('/', verifyAdmin, createList)

//readLists
router.get('/', verifyToken, readLists)

//update
router.put('/:id', verifyAdmin, updateList)

//delete
router.delete('/:id', verifyAdmin, deleteList)

export default router