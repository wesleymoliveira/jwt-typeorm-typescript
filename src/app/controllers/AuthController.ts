import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import usersView from '../views/UsersViews';

class AuthController {
  async authenticate(req: Request, res: Response ){
    const repository = getRepository(User);
    const { email, password } = req.body;
    
    const user = await repository.findOne({ where: { email } });

    if (!user) {
      return res.sendStatus(401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword){
      return res.sendStatus(401);
    }

    const token = jwt.sign({ id: user.id }, 'md5qualquer', { expiresIn: '1' });

    //delete user.password;

    return res.json({
      user: usersView.render(user),
      token,
    });

  /*   return res.json({
      user,
      token,
    }) */

  }
}

export default new AuthController();