/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("groups", function (table) {
    table.increments("id").primary();
    table.string("group_name", 50).notNullable();
    table.integer("member_count");
    table.boolean("is_public").defaultTo(true);
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("groups");
};
