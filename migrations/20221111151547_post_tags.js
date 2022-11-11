/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("post_tags", (table) => {
        table.increments("id").primary();
        table.integer("post_id").references("id").inTable("posts").notNullable();
        table.string("tag").notNullable();
})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("post_tags");
};
