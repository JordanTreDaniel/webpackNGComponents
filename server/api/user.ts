import * as express from 'express';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';
import {User} from '../models/User';
let router = express.Router();

router.get('/user/:name', function(req, res, next) {
  User.findOne(req.params.name).select('-passwordHash -salt')
    .exec((e, user) => {
      e ? next({message: 'Could not find user.', error: e}) : null;
      let u = user.hasOwnProperty('username') ? user : {};
      return res.json(u);
    })
});

//NOTICE YOU CANNOT DO ANYTHING BUT GET A USER

export = router;
