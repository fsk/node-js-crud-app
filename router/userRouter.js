const router = require('express').Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');


router.get('/', [authMiddleware, adminMiddleware], userController.userList);

router.get('/me', authMiddleware, userController.loginUserInfo);

router.post('/', userController.insertUser);


router.patch('/me', authMiddleware, userController.patchForUser);


router.patch('/:id', [authMiddleware, adminMiddleware], userController.patchUserForAdmin);


router.delete('/me', [authMiddleware], userController.deleteUser);


router.delete('/:id', [authMiddleware, adminMiddleware], userController.deleteUserForAdmin);


router.get('/deleteAll', [authMiddleware, adminMiddleware], userController.deleteAllForAdmin);


router.post('/giris', userController.login);

module.exports = router;