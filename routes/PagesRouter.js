const router = require("express-promise-router")();
const PagesController = require("../controllers/PagesController");
const verify = require("./verifyToken");
const {
  validateParams,
  validateBody,
  schemas
} = require("../helpers/routeHelpers");
router
  .route("/")
  .get(PagesController.getPages)
  .post(validateParams(schemas.pagesSchema), PagesController.newPage);

router
  .route("/:pageId")
  .put(
    verify,
    validateParams(schemas.idSchema, "pageId"),
    validateBody(schemas.pagesSchema),
    PagesController.editPage
  )
  .delete(
    verify,
    validateParams(schemas.idSchema, "pageId"),
    PagesController.deletePage
  );

router
  .route("/:slug")
  .get(
    validateParams(schemas.slugSchema, "slug"),
    PagesController.getPageBySlug
  );

module.exports = router;
