
exports.up = function (knex) {
    return knex.schema.createTable('penjualan_langsung', function (table) {
        table.increments('idPl');
        table.integer('idToko');
        table.string('judul');
        table.timestamps(true, true);
    });

};

exports.down = function (knex) {
    return knex.schema.dropTable('penjualan_langsung');
};
