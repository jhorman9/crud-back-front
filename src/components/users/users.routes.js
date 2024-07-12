import { Router } from "express";
import { getAllUsers, getUserById, updateUser, deleteUser } from "./users.controllers.js";

// Crear la instancia del router
const router = Router();

// Obtener a todos los usuarios
router.get('/users', getAllUsers);

// Obtener un usuario por ID
router.get('/users/:id', getUserById);

// Actualizar un usuario
router.put('/users/:id', updateUser);

// Eliminar un usuario
router.delete('/users/:id', deleteUser);

export default router;