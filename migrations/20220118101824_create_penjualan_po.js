
exports.up = function (knex) {
    return knex.schema.createTable('penjualan_po', function (table) {
        table.increments('idPo');
        table.integer('idToko');
        table.string('judul');
        table.string('status');
        table.text('alamat');
        table.timestamps(true, true);
    });

};

exports.down = function (knex) {
    return knex.schema.dropTable('penjualan_po');
};
