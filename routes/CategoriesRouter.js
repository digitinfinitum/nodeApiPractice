const router = require("express-promise-router")();
const CategoriesConroller = require("../controllers/CategoriesController");
const verify = require("./verifyToken");
const {
  validateParams,
  validateBody,
  schemas
} = require("../helpers/routeHelpers");

router
  .route("/")
  .get(verify, CategoriesConroller.getCategories)
  .post(
    verify,
    validateBody(schemas.categoriesSchema),
    CategoriesConroller.postCategory
  );

router
  .route("/:categoryId/one")
  .get(
    verify,
    validateParams(schemas.idSchema, "categoryId"),
    CategoriesConroller.getCategoryId
  )
  .put(
    verify,
    validateParams(schemas.idSchema, "categoryId"),
    validateBody(schemas.categoriesSchema),
    CategoriesConroller.editCategory
  )
  .delete(
    verify,
    validateParams(schemas.idSchema, "categoryId"),
    CategoriesConroller.deleteCategory
  );
router
  .route("/:categoryId/projects")
  .get(
    validateParams(schemas.idSchema, "categoryId"),
    CategoriesConroller.getCategoriesProjects
  )
  .post(
    validateParams(schemas.idSchema, "categoryId"),
    validateBody(schemas.projectsSchema),
    CategoriesConroller.postCategoryProject
  );
module.exports = router;
