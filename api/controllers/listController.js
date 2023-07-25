import List from "../models/ListSchema.js"

const createList = async (req, res) => {
    try{
        const list = new List(req.body)
        const savedList = await list.save()
        res.status(200).json(savedList)
    }
    catch(err){
        res.status(500).json(err)
    }
}

const readLists = async (req, res) => {
    let type = req.query.type
    let genre = req.query.genre
    if(type){
        if(genre){
            try{
                const list = await List.aggregate([
                    {$match: {type: type, genre: genre}},
                    {$sample: {size: 10}}
                ])
                res.status(201).json(list)
            }
            catch(err){
                res.status(504).json(err)
            }
        }
        else{
            try{
                const list = await List.aggregate([
                    {$match: {type: type}},
                    {$sample: {size: 10}}
                ])
                res.status(201).json(list)
            }
            catch(err){
                res.status(504).json(err)
            }
        }
    }
    else{
        try{
            const randomLists = await List.aggregate([
                {$sample: {size: 10}}
            ]) 
            res.status(201).json(randomLists)
        }
        catch(err){
            res.status(504).json(err)
        }
    }
}

const deleteList = async (req ,res) => {
    try{
        await List.findByIdAndDelete(req.params.id)
        res.send("List deleted")
    }
    catch(err){
        res.status(500).json(err)
    }
}

const updateList = async (req, res) => {
    try{
        const list = await List.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.status(201).json(list)
    }
    catch(err){
        res.status(404).json(err)
    }
}

export { deleteList, readLists, updateList, createList }