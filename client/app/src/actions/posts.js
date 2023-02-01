import * as api from "../api"

export const getPosts = () => async(dispatch) => {
    try{
    const {data} = await api.fetchPosts()
    const action = {type: 'FETCH_ALL', payload: data}
    dispatch(action)
    }
    catch(error){
        console.log(error)
    }
}

export const createPost = (post) => async(dispatch) => {
    try {
        const {data} = await api.createPost(post)
        dispatch({type: 'CREATE', payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const updatePost = (id, updatedPost) => async(dispatch) =>{
    try {
        const {data} = await api.updatePost(id, updatedPost)
        dispatch({type: 'UPDATE', payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = (id) => async(dispatch) =>{
    try {
        const response = await api.deletePost(id)
        dispatch({type: 'DELETE', payload: id})
    } catch (error) {
        console.log(error)
    }
}

export const likePost = (id) => async(dispatch)=>{
    try {
        const {data} = await api.likePost(id)
        dispatch({type: 'LIKE', payload: data})
    } catch (error) {
        console.log(error)
    }
}