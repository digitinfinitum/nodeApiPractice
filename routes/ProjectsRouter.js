const router = require("express-promise-router")();
const {
  validateParams,
  validateBody,
  schemas
} = require("../helpers/routeHelpers");
const verify = require("./verifyToken");
//controllers
const ProjectsController = require("../controllers/ProjectsController");

router
  .route("/")
  .get(ProjectsController.getProjects)
  .post(
    verify,
    validateBody(schemas.projectsSchema),
    ProjectsController.newProject
  );
router
  .route("/:projectId/one")
  .get(
    validateParams(schemas.idSchema, "projectId"),
    ProjectsController.getProjectById
  )
  .put(
    verify,
    validateParams(schemas.idSchema, "projectId"),
    validateBody(schemas.projectsSchema),
    ProjectsController.editProject
  );

router
  .route("/:slug")
  .get(
    validateParams(schemas.slugSchema, "slug"),
    ProjectsController.getProjectBySlug
  );
module.exports = router;
