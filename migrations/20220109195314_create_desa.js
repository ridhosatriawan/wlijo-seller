
exports.up = function (knex) {
    return knex.schema.createTable('desa', function (table) {
        table.increments();
        table.integer('idK');
        table.string('nama_desa');
        table.timestamps(true, true);
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('desa');
};
