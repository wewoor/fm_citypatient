/**
 * Song model
 */

module.exports = {

    connection: 'MysqlServer',
    tableName: 'tb_songs',

    attributes: {
        
        id: {
            type: 'integer',
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },

        name: { // 名称
            type: 'string',
            required: true
        },

        addr: { // 地址
            type: 'text',
            required: true
        },

        online: { // 上线（0）下线（1）
            type: 'integer',
            defaultsTo: 0
        },
        
        c_id: 'integer', // 分类ID
        count: 'integer', // 计数
        lyrics: 'text', // 歌词  
        ct: 'string', // 创建日期
        author: 'string', // 作者
        author_addr: 'string', // 作者连接地址
        announces: 'string', // 播音人
        announces_addr: 'string', // 播音人地址
        introduce: 'string', // 简介
        created: 'string',
        updated: 'string',
        cover: 'string' // 封面
    }
};