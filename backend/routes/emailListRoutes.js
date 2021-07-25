const express = require('express')
const router = express.Router()
const emailListController = require('../controllers/emailListController')
const authenticationChecker = require('../middlewares/authenticationChecker')


router.get('/', emailListController.emailList_create_get)

router.post('/', authenticationChecker.aChecker, emailListController.emailList_create_post)

router.delete('/:id', authenticationChecker.aChecker, emailListController.emailList_delete_one)


module.exports = router