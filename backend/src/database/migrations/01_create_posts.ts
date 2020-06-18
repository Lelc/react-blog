import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("posts", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.string("image").notNullable();
    table.string("content").notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("posts");
}
