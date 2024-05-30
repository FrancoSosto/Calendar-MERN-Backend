/* 
    Rutas de Eventos 
    /api/events

*/

const {
	getEvents,
	createEvent,
	updateEvent,
	deleteEvent,
} = require('../controllers/events');

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { isDate } = require('../helpers/isDate');

const router = Router();

// middleware
router.use(validateJWT);

// Obtener eventos
router.get('/', getEvents);

// crear evento
router.post(
	'/',
	[
		check('title', 'El titulo es obligatorio').not().isEmpty(),
		check(
			'start',
			'Fecha de inicio es obligatoria y debe ser menor a la fecha de finalización'
		).custom(isDate),
		check(
			'end',
			'Fecha de finalización es obligatoria y debe ser mayor a la fecha de inicio'
		).custom(isDate),
		validateFields,
	],
	createEvent
);

// actualizar evento
router.put(
	'/:id',
	[
		check('title', 'El titulo es obligatorio').not().isEmpty(),
		check(
			'start',
			'Fecha de inicio es obligatoria y debe ser menor a la fecha de finalización'
		).custom(isDate),
		check(
			'end',
			'Fecha de finalización es obligatoria y debe ser mayor a la fecha de inicio'
		).custom(isDate),
		validateFields,
	],
	updateEvent
);

// eliminar evento
router.delete('/:id', deleteEvent);

module.exports = router;
