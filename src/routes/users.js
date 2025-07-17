
const User 		= require('../models/User');
const express = require('express');
const router 	= express.Router();
const dayjs 	= require('dayjs');
const bcrypt  = require('bcrypt');
const jwt 		= require('jsonwebtoken');

const saltRounds = 10; // nivel de seguridad

router.post('/register', async (req,res) =>{

	const { name, email, avatar, password } = req.body;


	if( name == '' || email == '' || password == ''){
		return res.status(400).json({errors: [{msn: 'name, email, password is required'}]})
	}

	try {

		const lastLogin  		 = dayjs().format('YYYY-MM-DD'),
		 			hashedPassword = await bcrypt.hash(password, saltRounds),
					role       		 = 'standard',
					isVerified 		 = false;

		const newUser = new User({name,email,avatar,password:hashedPassword,lastLogin,role,isVerified}),
					savedUser = await newUser.save();

		const token = jwt.sign(
				{ userId: newUser._id },          
				process.env.JWT_SECRET,
				{ expiresIn: '24h' }
			);

			const userData = {
				_id					: savedUser._id,
				name				: savedUser.name,
				email				: savedUser.email,
				avatar			: savedUser.avatar,
				lastLogin		: savedUser.lastLogin,
				role				: savedUser.role,
				isVerified	: savedUser.isVerified,
				jwt					: token
			};

			res.status(201).json(userData);

	} catch (error){

		console.error('Error creating user:', error);
		res.status(500).json({ error: 'Failed to create a new user '})
	}

})

module.exports = router;