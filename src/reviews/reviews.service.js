const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties")

const tableReviews = "reviews";

const reduceCritic = reduceProperties("critic_id", {
  critic_id: ["critic", "critic_id"],
  preferred_name: ["critic", "preferred_name"],
  surname: ["critic", "surname"],
  organization_name: ["critic", "organization_name"],
  created_at: ["critic", "created_at"],
  updated_at: ["critic", "updated_at"]
})

async function destroy(reviewId) {
  return knex(tableReviews).where({ "review_id": reviewId }).del();  
}

async function list(movie_id) {
  return knex("movies as m")
    .join(`${tableReviews} as r`, "m.movie_id", "r.movie_id")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("r.*", "c.*")
    .where({ "m.movie_id": movie_id })
    .then(reduceCritic)
}

async function read(reviewId) {
  return knex(tableReviews)
    .select("*")
    .where({ "review_id": reviewId })
    .first();
}

async function readCritic(critic_id) {
  return knex("critics").where({ critic_id }).first();
}

async function setCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

async function update(review) {
  return knex(tableReviews)
    .where({ review_id: review.review_id })
    .update(review, "*")
    .then(() => read(review.review_id))
    .then(setCritic);
}

module.exports = {
  destroy,
  list,
  read,
  update,
};