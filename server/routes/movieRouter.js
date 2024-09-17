import express from "express"
import { createMovie, getMovies, getMovie } from "../controllers/movieController.js"

const router = express.Router()

// get Movies
router.get('/', getMovies)
router.get('/getMovie/:movieId', getMovie)

// create new movie
router.post('/create', createMovie)

export default router;