/** @param {import('knex').Knex} knex */
export function up(knex) {
	return knex.schema.alterTable('users', (table) => {
		table.integer('snowflakes').defaultTo(0).notNullable();
	});
}

/** @param {import('knex').Knex} knex */
export function down(knex) {
	return knex.schema.alterTable('users', (table) => {
		table.dropColumn('snowflakes');
	});
}
