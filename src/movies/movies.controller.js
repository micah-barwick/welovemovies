const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function verifyMovieAvailability(req, res, next) {
  const movieId = req.params.movieId;
  const movie = await moviesService.read(movieId);

  if (movie) {
    res.locals.movie = movie;
    next();
  } else {
    next({
      status: 404,
      message: `No movie found with ID: ${movieId}.`,
    });
  }
}

async function list(req, res, next) {
  const data = await moviesService.list(req.query.is_showing);
  res.json({ data });
}

async function read(req, res, next) {
  res.json({ data: res.locals.movie });
}

async function listTheatersByMovie(req, res, next) {
  const data = await moviesService.listTheatersByMovieId(
    Number(req.params.movieId)
  );
  res.json({ data });
}

async function listReviewsByMovie(req, res, next) {
  const data = await moviesService.listReviewsByMovieId(
    Number(req.params.movieId)
  );
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [verifyMovieAvailability, read],
  listTheatersByMovie: [
    verifyMovieAvailability,
    asyncErrorBoundary(listTheatersByMovie),
  ],
  listReviewsByMovie: [
    verifyMovieAvailability,
    asyncErrorBoundary(listReviewsByMovie),
  ],
};