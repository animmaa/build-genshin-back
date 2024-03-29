const Joy = require('joi');
const argon2 = require('argon2');
const userModel = require('../models/user-model');
const { generateJwt } = require('../utils/auth');

const userSchema = Joy.object({
  email: Joy.string().min(3).required().email(),
  pseudo: Joy.string().min(3).max(30).required(),
  password: Joy.string().required(),
});

const userSchemaLogin = Joy.object({
  pseudo: Joy.string().min(3).max(30).required(),
  password: Joy.string().required(),
});

const userController = {
  getAllUsers: async (req, res) => {
    const [users] = await userModel.findAllUser(req.query);
    try {
      res.json(users);
    } catch (error) {
      res.json(error);
    }
  },

  createUser: async (req, res) => {
    const { value, error } = userSchema.validate(req.body);
    // cree valeur du req body dans value et error si il y a un probleme

    if (error) {
      // on return l'erreur sil y en a une
      console.log(error)
      return res.status(400).json(error);
    }

    const [[existingUser]] = await userModel.findUserByEmail(value.email);
    // on cree une requete get pour voir si le nom est deja present

    if (existingUser) {
      // si le nom est deja enregistré on lui return quil existe deja
      return res.status(409).json({
        message: "l'utilisateur existe deja",
      });
    }
    const [[existingPseudo]] = await userModel.findUserByPseudo(value.pseudo)

    if (existingPseudo) {
      return res.status(409).json({
        message: "Ce pseudo est déjà utilisé",
      });
    }

    const hashPassword = await argon2.hash(value.password);
    // si le nom n'existe pas on hash son password

    // console.log(value.pseudo)
    await userModel.createUser(value.email, value.pseudo, hashPassword);
    // on insert dans la base de donnée les valeur et le pass hashé

    const jwtkey = generateJwt(value.pseudo);

    return res.json({
      message: 'Le compte à bien été créé 👌',
    });
  },

  login: async (req, res) => {
    const { value, error } = userSchemaLogin.validate(req.body);
    // console.log(value, error);

    if (error) {
      // on return l'erreur sil y en a une
      return res.status(400).json(error);
    }

    const [[existedUser]] = await userModel.findUserByPseudo(value.pseudo);

    if (!existedUser) {
      return res.status(403).json({
        message: 'pseudo ou mot de passe incorrect',
      });
    }

    const verified = await argon2.verify(existedUser.password, value.password);

    if (!verified) {
      return res.status(403).json({
        message: 'pseudo ou mot de passe incorrect',
      });
    }

    const jwtkey = generateJwt(value.pseudo);

    // console.log(existedUser)

    return res.json({
      credential: jwtkey,
      id: existedUser.id,
    });
  },
};

module.exports = userController;
