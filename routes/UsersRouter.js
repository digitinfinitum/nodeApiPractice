const router = require("express-promise-router")();
const usersController = require("../controllers/UsersController");
const verify = require("./verifyToken");
const {
  validateParams,
  validateBody,
  schemas
} = require("../helpers/routeHelpers");

router.route("/").get(verify, usersController.getUsers);
router
  .route("/:userId/one")
  .get(
    verify,
    validateParams(schemas.idSchema, "userId"),
    usersController.getUserById
  )
  .put(
    verify,
    validateParams(schemas.idSchema, "userId"),
    validateBody(schemas.usersSchema),
    usersController.editUser
  )
  .delete(
    verify,
    validateParams(schemas.idSchema, "userId"),
    usersController.deleteUser
  );

router
  .route("/:userId/pages")
  .get(
    verify,
    validateParams(schemas.idSchema, "userId"),
    usersController.getUserPages
  );

router
  .route("/add")
  .post(verify, validateBody(schemas.usersSchema), usersController.postUser);
router
  .route("/login")
  .post(validateBody(schemas.loginScheema), usersController.login);

router.route("/logged").get(verify, usersController.getAuthUser);

module.exports = router;
