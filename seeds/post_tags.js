/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('post_tags').del()
  await knex('post_tags').insert([
    {tag: 'Sports', post_id: 1},
    {tag: 'Sports', post_id: 2},
    {tag: 'Gaming', post_id: 3}
  ]);
};
