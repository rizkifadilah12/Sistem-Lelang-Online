import express from "express";
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    blokUser,
    unBlockUser,
    updatePassword
} from "../controllers/Users.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/users', verifyUser, adminOnly, getUsers);
router.get('/users/:id', verifyUser, adminOnly, getUserById);
router.post('/users', verifyUser, adminOnly, createUser);
router.patch('/users/:id', verifyUser, adminOnly, updateUser);
router.patch('/users/block/:id', verifyUser, blokUser);
router.patch('/changepass/:id',verifyUser,updatePassword)
router.patch('/users/unblock/:id', verifyUser, unBlockUser);
router.delete('/users/:id', verifyUser, adminOnly, deleteUser);

export default router;