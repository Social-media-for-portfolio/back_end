/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('comments').del()
  await knex('comments').insert([
    {user_id: 1, post_id: 3, content: "I'd like to join!"},
    {user_id: 2, post_id: 1, content: "Can't today, have to work on a project." },
  ]);
};
