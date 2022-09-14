/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const avatar = "https://www.w3schools.com/howto/img_avatar.png";
exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id").primary();
    table.string("username", 25).notNullable();
    table.string("first_name", 50);
    table.string("last_name", 50);
    table.string("location");
    table.string("avatar_url").defaultTo(avatar);
    table.string("password").notNullable();
    table.string("email", 40).notNullable();
    table.string("birthday", 60);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
