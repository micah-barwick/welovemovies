const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

//routes
router.route("/").get(controller.list).all(methodNotAllowed);

router.route("/:movieId").get(controller.read);

router
  .route("/:movieId/theaters")
  .get(controller.listTheatersByMovie)
  .all(methodNotAllowed);

router
  .route("/:movieId/reviews")
  .get(controller.listReviewsByMovie)
  .all(methodNotAllowed);

module.exports = router;