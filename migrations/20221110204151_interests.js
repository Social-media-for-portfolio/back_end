/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("interests", (table) => {
        table.increments("id").primary();
        table.integer("user_id").references("id").inTable("users").notNullable();
        table.string("interest").notNullable();
})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("interests");
};
