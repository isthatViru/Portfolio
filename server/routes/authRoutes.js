const express=require('express')
const { signUp, logIn } = require('../controllers/authControllers')
const Router=express.Router()


Router.post('/signup',signUp)
Router.post('/login',logIn)

module.exports=Router