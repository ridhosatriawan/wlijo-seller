
exports.up = function (knex) {
    return knex.schema.createTable('profil', function (table) {
        table.increments();
        table.string('namaToko');
        table.string('password');
        table.string('noWa');
        table.string('kecamatan');
        table.string('desa');
        table.text('alamat');
        table.string('status');
        table.text('foto');
        table.timestamps(true, true);
    })

};

exports.down = function (knex) {
    return knex.schema.dropTable('profil');
};
