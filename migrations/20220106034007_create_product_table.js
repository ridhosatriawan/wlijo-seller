
exports.up = function (knex) {
    return knex.schema.createTable('produk', function (table) {
        table.increments();
        table.string('idToko');
        table.string('nama');
        table.integer('harga');
        table.integer('stok');
        table.string('satuan');
        table.text('foto');
        table.timestamps(true, true);
    })

};

exports.down = function (knex) {
    return knex.schema.dropTable('produk');
};
