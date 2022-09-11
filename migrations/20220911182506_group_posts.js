/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("group_posts", function (table) {
    table.increments("id").primary();
    table.integer("user_id").references("id").inTable("users");
    table.integer("group_id").references("id").inTable("groups");
    table.string("title", 50);
    table.string("content", 255).notNullable();
    table.integer("likes");
    table.integer("replies");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("group_posts");
};
