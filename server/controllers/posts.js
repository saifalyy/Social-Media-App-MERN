import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js"

export const getPosts = async (req,res)=>{
    try{
        const postMessages = await PostMessage.find();
        console.log(postMessages)
        res.status(200).json(postMessages)
    }
    catch(error){
        console.log(error)
        res.status(400).json({message: error.message})
    }
}

export const createPost = async (req,res)=>{
    const post = req.body
    const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()})
    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const updatePost = async(req,res) =>{
    const {id: _id} = req.params
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("No Post With This id")
    }
    try {
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new: true})
        res.json(updatedPost)
    } catch (error) {
        console.log(error.message)
    }
}

export const deletePost = async(req,res) => {
    const {id: _id} = req.params
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("No Post with this ID")
    }
    try {
        await PostMessage.findByIdAndDelete(_id)
        res.json({message: "Post deleted Succesful"})
    } catch (error) {
        console.log(error)
    }
}

export const likePost = async(req,res) => {
    const {id} = req.params;    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send("No Post with this ID")
    }

    if(!req.userId) return res.json({"message":"Unauthenticated"})

    try {
        const post = await PostMessage.findById(id)

        const index = post.likes.findIndex((id)=> id === String(req.userId))

        if(index == -1){
            post.likes.push(req.userId)
        }
        else{
            post.likes.filter((id)=> id !== String(req.userId))
        }

        const updatedPost = await PostMessage.findByIdAndUpdate(id, post , {new: true});
        res.json(updatedPost)
    } catch (error) {
        console.log(error)
    }
}