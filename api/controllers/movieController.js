import Movie from "../models/movieSchema.js"

const createMovie = async (req, res) => {
    try{
        const movie = new Movie(req.body)
        const savedMovie = await movie.save()
        res.status(200).json(savedMovie)
    }
    catch(err){
        res.status(500).json(err)
    }
}

const readMovie = async (req ,res) => {
    const id = req.params.id
    try{
        const movie = await Movie.findById(id)
        res.status(200).json(movie)
    }
    catch(err){
        res.status(500).json(err)
    }
}

const readAllMovies = async (req, res) => {
    try{
        const movies = await Movie.find()
        res.status(201).json(movies.reverse())
    }
    catch(err){
        res.json(err)
    }
}

const getRandomMovie = async (req, res) => {
    const type = req.query.type
    if(type && type === 'series'){
        try{
            const series = await Movie.find({isSeries: true})
            const randomIndex = Math.floor(Math.random() * series.length)
            res.status(201).send(series[randomIndex])
        }
        catch(err){
            res.status(504).json(err)
        }
    }
    else{
        try{
            const movies = await Movie.find({isSeries: false})
            const randomIndex = Math.floor(Math.random() * movies.length)
            res.status(201).send(movies[randomIndex])
        }
        catch(err){
            res.status(504).json(err)
        }
    }
}

const deleteMovie = async (req ,res) => {
    try{
        await Movie.findByIdAndDelete(req.params.id)
        res.send("Movie deleted")
    }
    catch(err){
        res.status(500).json(err)
    }
}

const updateMovie = async (req, res) => {
    try{
        const movie = await Movie.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.status(201).json(movie)
    }
    catch(err){
        res.status(404).json(err)
    }
}

export { deleteMovie, readMovie, readAllMovies, updateMovie, createMovie, getRandomMovie }