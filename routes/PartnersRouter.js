const router = require("express-promise-router")();
const { validateParams, schemas } = require("../helpers/routeHelpers");
//controllers
const PartnersController = require("../controllers/PartnersController");

router
  .route("/")
  .get(PartnersController.getPartners)
  .post(PartnersController.newPartner);

router
  .route("/:partnerId")
  .get(
    validateParams(schemas.idSchema, "partnerId"),
    PartnersController.getPartnerById
  )
  .put(
    validateParams(schemas.idSchema, "partnerId"),
    PartnersController.editPartner
  )
  .delete(
    validateParams(schemas.idSchema, "partnerId"),
    PartnersController.deletePartner
  );

module.exports = router;
