
exports.up = function (knex) {
    return knex.schema.createTable('detail_rencana_belanja', function (table) {
        table.increments();
        table.integer('idRencana');
        table.integer('idToko');
        table.string('nama');
        table.integer('jumlah');
        table.string('satuan');
        table.timestamps(true, true);
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('detail_rencana_belanja');
};
