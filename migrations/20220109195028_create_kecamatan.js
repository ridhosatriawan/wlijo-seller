
exports.up = function (knex) {
    return knex.schema.createTable('kecamatan', function (table) {
        table.increments("idK");
        table.string('nama_kecamatan');
        table.timestamps(true, true);
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('kecamatan');
};
