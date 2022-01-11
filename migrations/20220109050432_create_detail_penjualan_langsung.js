
exports.up = function (knex) {
    return knex.schema.createTable('detail_penjualan_langsung', function (table) {
        table.increments();
        table.integer('idPl');
        table.integer('idToko');
        table.string('nama');
        table.integer('jumlah');
        table.integer('harga');
        table.string('satuan');
        table.timestamps(true, true);
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('detail_penjualan_langsung');
};
