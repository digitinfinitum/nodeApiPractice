const Joi = require("joi");

module.exports = {
  //function allows us to check if the users
  //enterd the right charachters  into url parameters
  validateParams: (schema, name) => {
    return (req, res, next) => {
      const validationResult = Joi.validate(
        { param: req["params"][name] },
        schema
      );
      if (validationResult.error) {
        return res.status(400).json(validationResult.error.details[0].message);
      } else {
        if (!req.value) req.value = {};
        if (!req.value["param"]) req.value["param"] = {};
        req.value["param"][name] = validationResult.value.param;

        next();
      }
    };
  },
  //function allows us to validate the bofy
  validateBody: schema => {
    return (req, res, next) => {
      const validateResult = Joi.validate(req.body, schema);
      if (validateResult.error) {
        res.status(400).json(validateResult.error.details[0].message);
      } else {
        if (!req.value) req.value = {};
        if (!req.value["body"]) req.value["body"] = {};

        req.value["body"] = validateResult.value;
        next();
      }
    };
  },
  //schemas validations with regix
  schemas: {
    loginScheema: Joi.object().keys({
      userName: Joi.string()
        .required()
        .error(() => {
          return {
            message: "Le champ psuedonyme est obligatoire"
          };
        }),
      password: Joi.string()
        .required()
        .error(() => {
          return {
            message: "Le mot de passe est obligatoire"
          };
        })
    }),
    usersSchema: Joi.object().keys({
      firstName: Joi.string()
        .required()
        .error(() => {
          return {
            message: "Le champ Nom est obligatoire"
          };
        }),
      secondName: Joi.string()
        .required()
        .error(() => {
          return {
            message: "Le champ Prénom est obligatoire"
          };
        }),
      email: Joi.string()
        .email()
        .required()
        .error(() => {
          return {
            message: "Le champ email est obligatoire"
          };
        }),
      userName: Joi.string()
        .required()
        .error(() => {
          return {
            message: "Le champ Pseudonyme est obligatoire"
          };
        }),
      password: Joi.string()
        .required()
        .error(() => {
          return {
            message: "Le champ Mot de passe est obligatoire"
          };
        })
    }),
    projectsSchema: Joi.object().keys({
      name: Joi.string()
        .required()
        .error(() => {
          return {
            message: "Nom du project est obligaoire"
          };
        }),
      description: Joi.string().required(),
      image: Joi.string().required(),
      link: Joi.string().required(),
      category: Joi.string().required()
    }),

    categoriesSchema: Joi.object().keys({
      name: Joi.string().required()
    }),
    pagesSchema: Joi.object().keys({
      name: Joi.string().required(),
      content: Joi.string().required()
    }),
    idSchema: Joi.object().keys({
      param: Joi.string()
        // .regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)

        .required()
    }),
    slugSchema: Joi.object().keys({
      param: Joi.string()
        .regex(/^[a-zA-Z\-]+$/)
        .required()
    })
  }
};
