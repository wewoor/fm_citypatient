/**
 * User Model
 */

module.exports = {
	
    connection: 'MysqlServer',
    tableName: 'tb_user',

    attributes: {
        id: {
            type: 'integer',
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        name: {
            type: 'string',
            required: true
        },
        password: {
            type: 'string',
            required: true
        }

    }
};