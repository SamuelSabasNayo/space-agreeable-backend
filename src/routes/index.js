const express = require('express');
const { Router } = require('express');

const router = Router();

const controllerRequest = require('../controllers/request');

//request's controllers

const createRequest = controllerRequest.createRequest

//Request routes

router.post('/createRequest',createRequest)


module.exports = router;