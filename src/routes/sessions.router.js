import { Router } from 'express';
import sessionsController from '../controllers/sessions.controller.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Sessions
 *   description: Gestión de sesiones y autenticación
 */

/**
 * @swagger
 * /api/sessions/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - email
 *               - password
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 */
router.post('/register', sessionsController.register);

/**
 * @swagger
 * /api/sessions/login:
 *   post:
 *     summary: Login de usuario
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso
 *       401:
 *         description: Credenciales incorrectas
 */
router.post('/login', sessionsController.login);

/**
 * @swagger
 * /api/sessions/current:
 *   get:
 *     summary: Obtener el usuario autenticado (protegido)
 *     tags: [Sessions]
 *     responses:
 *       200:
 *         description: Usuario autenticado
 *       401:
 *         description: No autorizado
 */
router.get('/current', sessionsController.current);

/**
 * @swagger
 * /api/sessions/unprotectedLogin:
 *   get:
 *     summary: Ruta de login sin protección (para pruebas)
 *     tags: [Sessions]
 *     responses:
 *       200:
 *         description: Ruta accesible sin autenticación
 */
router.get('/unprotectedLogin', sessionsController.unprotectedLogin);

/**
 * @swagger
 * /api/sessions/unprotectedCurrent:
 *   get:
 *     summary: Ruta de usuario actual sin protección (para pruebas)
 *     tags: [Sessions]
 *     responses:
 *       200:
 *         description: Ruta accesible sin autenticación
 */
router.get('/unprotectedCurrent', sessionsController.unprotectedCurrent);

export default router;
