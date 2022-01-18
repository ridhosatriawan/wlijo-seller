
exports.up = function (knex) {
    return knex.schema.createTable('pesanan_batal', function (table) {
        table.increments();
        table.integer('idPo');
        table.integer('idToko');
        table.string('nama');
        table.integer('jumlah');
        table.integer('harga');
        table.string('satuan');
        table.timestamps(true, true);
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('pesanan_batal');
};
