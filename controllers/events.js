const { response } = require('express');
const { generateJWT } = require('../helpers/jwt');
const Event = require('../models/Event');

const getEvents = async (req, res = response) => {
	const events = await Event.find().populate('user', 'name');

	return res.json({
		ok: true,
		msg: events,
	});
};
const createEvent = async (req, res = response) => {
	const event = new Event(req.body);

	try {
		event.user = req.uid;
		const savedEvent = await event.save();

		res.json({
			ok: true,
			even: savedEvent,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Hable con el administrador',
		});
	}
};

const updateEvent = async (req, res = response) => {
	const eventId = req.params.id;
	const uid = req.uid;

	try {
		const event = await Event.findById(eventId);
		if (!event) {
			return res.status(404).json({
				ok: false,
				msg: 'El evento no existe',
			});
		}

		if (event.user.toString() !== uid) {
			return res.status(401).json({
				ok: false,
				msg: 'No puedes actualizar un evento que no es tuyo',
			});
		}

		const newEvent = {
			...req.body,
			user: uid,
		};
		const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {
			new: true,
		});

		res.json({
			ok: true,
			event: updatedEvent,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Hable con el administrador',
		});
	}
};

const deleteEvent = async (req, res = response) => {
	const eventId = req.params.id;
	console.log(req.uid);

	try {
		const event = await Event.findById(eventId);
		if (!event) {
			return res.status(404).json({
				ok: false,
				msg: 'El evento no existe',
			});
		}

		if (event.user.toString() !== req.uid) {
			return res.status(401).json({
				ok: false,
				msg: 'No puedes eliminar un evento que no es tuyo',
			});
		}

		const deletedEvent = await Event.findByIdAndDelete(eventId);

		res.json({
			ok: true,
			event: deletedEvent,
		});
		
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Hable con el administrador',
		});
	}
};

module.exports = {
	getEvents,
	createEvent,
	updateEvent,
	deleteEvent,
};
