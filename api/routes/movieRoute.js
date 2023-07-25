import express from "express"
import { deleteMovie, readMovie, readAllMovies, updateMovie, createMovie, getRandomMovie} from "../controllers/movieController.js"
import { verifyAdmin, verifyToken } from "../verify.js"
const router = express.Router()

//create
router.post('/', verifyAdmin, createMovie)

//read 
router.get('/find/:id', verifyToken, readMovie)

//readAll
router.get('/', verifyAdmin, readAllMovies)

//getRandom
router.get('/random', verifyToken, getRandomMovie)

//update
router.put('/:id', verifyAdmin, updateMovie)

//delete
router.delete('/:id', verifyAdmin, deleteMovie)

export default router