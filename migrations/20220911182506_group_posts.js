/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("group_posts", function (table) {
    table.increments("id").primary();
    table.integer("post_id").references("id").inTable("posts");
    table.integer("group_id").references("id").inTable("groups");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("group_posts");
};
