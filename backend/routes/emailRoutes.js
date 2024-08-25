const express = require('express');
const { getEmails, addEmail, updateEmail, deleteEmail, sendEmail } = require('../controllers/emailController');
const router = express.Router();

router.get('/', getEmails);
router.post('/', addEmail);
router.put('/:id', updateEmail);
router.delete('/:id', deleteEmail);
router.post('/send', sendEmail);

module.exports = router;
