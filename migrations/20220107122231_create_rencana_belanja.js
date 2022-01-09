
exports.up = function (knex) {
    return knex.schema.createTable('rencana_belanja', function (table) {
        table.increments('idRencana');
        table.integer('idToko');
        table.string('judul');
        table.timestamps(true, true);
    });

};

exports.down = function (knex) {
    return knex.schema.dropTable('rencana_belanja');
};
