const express = require('express')
const router = express.Router()
const emailListController = require('../controllers/emailListController')


router.get('/', emailListController.emailList_create_get)

router.post('/', emailListController.emailList_create_post)

router.delete('/:id', emailListController.emailList_delete_one)


module.exports = router