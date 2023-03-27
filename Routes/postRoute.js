
const express = require("express")
const { PostModel } = require("../Model/postModel")
const postRoute = express.Router()
const jwt = require("jsonwebtoken")

const { auth } = require("../middleware/auth.middleware")

postRoute.use(auth)

postRoute.get("/", async (req, res) => {
    const token = req.headers.authorization
    const decoded = jwt.verify(token, "Evaluation")
    try {
        if (decoded) {
            const posts = await PostModel.find({ "userID": decoded.userID })
            res.status(200).send(posts)
        }

    } catch (err) {
        res.status(400).send({ "msg": err.message })
    }
})




postRoute.post("/add", async (req, res) => {
    try {
        const post = new PostModel(req.body)
        await post.save()
        res.status(200).send({ "msg": "new post has been added" })
    } catch (err) {
        res.status(400).send({ "msg": err.message })
    }
    res.status(200).send("Hello")
})



postRoute.patch("/update", async (req, res) => {

    const payload = req.body
    try {
        if (postID) {
            await PostModel.findByIdAndDelete(payload)
            res.status(200).send({ "msg": "New Post has been deleted" })
        } else {
            res.status(400).send({ "msg": "Login first" })
        }

    } catch (err) {
        res.status(400).send({ "msg": err.message })
    }


})


postRoute.delete("/delete", async (req, res) => {
    const postID = req.params.postID
    try {
        await PostModel.findByIdAndDelete({ _id: postID })
        res.status(200).send({ "msg": "New Post has been deleted" })

    } catch (err) {
        res.status(400).send({ "msg": err.message })
    }

})

module.exports = {
    postRoute
}