const userRouter = require('express').Router();
const Joy = require('joi');
const argon2 = require('argon2');
const { generateJwt } = require('../utils/auth');

const userSchema = Joy.object({
  pseudo: Joy.string().min(3).max(30).required(),
  password: Joy.string().required(),
});

const user = require('../models/user-model');

// const { body, validationResult } = require('express-validator');

userRouter.get('/', async (req, res) => {
  const [users] = await user.findAllUser(req.query);
  res.json(users);
});

userRouter.post('/createuser', async (req, res) => {
  const { value, error } = userSchema.validate(req.body); // cree valeur du req body dans value et error si il y a un probleme

  if (error) {
    // on return l'erreur sil y en a une
    return res.status(400).json(error);
  }

  const [[existingUser]] = await user.findUserByPseudo(value.pseudo); // on cree une requete get pour voir si le nom est deja present

  if (existingUser) {
    // si le nom est deja enregistré on lui return quil existe deja
    return res.status(409).json({
      message: "l'utilisateur existe deja",
    });
  }

  const hashPassword = await argon2.hash(value.password); // si le nom n'existe pas on hash son password

  //console.log(value.pseudo)
  await user.createUser(value.pseudo, hashPassword); // on insert dans la base de donnée les valeur et le pass hashé

  const jwtkey = generateJwt(value.pseudo);

  return res.json({
    credentiel: jwtkey,
  });
});

userRouter.post('/login', async (req, res) => {
  const { value, error } = userSchema.validate(req.body);
  console.log(value, error);

  if (error) {
    // on return l'erreur sil y en a une
    return res.status(400).json(error);
  }

  const [[existedUser]] = await user.findUserByPseudo(value.pseudo);

  if (!existedUser) {
    return res.status(403).json({
      message: "pseudo n'existe pas",
    });
  }

  const verified = await argon2.verify(existedUser.password, value.password);

  if (!verified) {
    return res.status(403).json({
      message: 'pseudo ou mdp incorrect',
    });
  }

  const jwtkey = generateJwt(value.pseudo);

  //console.log(existedUser)

  res.json({
    credentiel: jwtkey,
  });
});

module.exports = userRouter;
