const React = require('antd')
/* eslint-disable react/react-in-jsx-scope */
module.exports = {
    CODE: {
        SUCCESS: 100,
        INVALID: 201,
        DATA_ERROE: 202,
        SEND_FAIL: 203,
        DB_ERROR: 204,
        VIRES: 205
    },
    TABLECOLUMS: {
        HOME: [{
            title: '账单内容',
            dataIndex: 'content'
        },{
            title: '账单类型',
            dataIndex: 'type',
            render: (type) =>(
                type?'收入':'支出'
            )
        },{
            title: '账单金额',
            dataIndex: 'price'
        },{
            title: '账单日期',
            dataIndex: 'date'
        },{
            title: '账单记录人',
            dataIndex: 'name'
        }],
        SETUP: [{
            title: '组名',
            dataIndex: 'name',
            key: 'name'
        }],
        GROUPMEMBER: [{
            title: '用户名',
            dataIndex: 'name',
            key: 'name'
        },{
            title: '用户邮箱',
            dataIndex: 'email',
            key: 'email'
        }]
    },
    ROLE: {
        ORDINARY: 'ordinary',
        CREATOR: 'creator',
        ADMINISTRATION: 'administration'
    }
}