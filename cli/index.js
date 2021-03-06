// var fs = require('fs')
var fs = require('fs-promise')
var path = require("path")
let _opts = {
    searchList: {
        public: [
            {
                type:'',
                key:'page',
                intKey:1
            },
            {
                type:'',
                key:'rows',
                intKey:20
            },
            {
                type: 'input',
                label: '订单编号',
                placeholder:'请输入订单编号',
                key: 'orderNumber'
            },
            {
                type: 'select',
                label: '订单状态',
                placeholder:'请选择',
                key: 'orderStatus',
                selectType:'selectAll',
                options:[
                    {
                        value: 'all',
                        label: '全部'
                    },
//                 {
//                   value: '1',
//                   label: '未付款'
//                 },
                    {
                        value: '2',
                        label: '待发货'
                    },
                    {
                        value: '9',
                        label: '部分发货'
                    },
                    {
                        value: '3',
                        label: '已发货'
                    },
                    {
                        value: '4',
                        label: '交易成功'
                    },
                    {
                        value: '5',
                        label: '用户取消'
                    },
                    {
                        value: '6',
                        label: '超时取消'
                    },
//                 {
//                   value: '7',
//                   label: '团购进行中'
//                 }
                ]
            },
            {
                type: 'select',
                label: '销售渠道',
                placeholder:'请选择',
                key: 'orderType',
                selectType:'selectAll',
                options:[
                    {
                        value: 'all',
                        label: '全部'
                    },
                    {
                        value: '1',
                        label: '格格家'
                    },
//                 {
//                   value: '2',
//                   label: '格格团订单'
//                 },
//                 {
//                   value: '3',
//                   label: '格格团全球购订单'
//                 },
                    {
                        value: '4',
                        label: '环球捕手'
                    },
//                 {
//                   value: '5',
//                   label: '燕网订单'
//                 },
                    {
                        value: '6',
                        label: '格格家供应链'
                    },
//                 {
//                   value: '7',
//                   label: '手q'
//                 },
                    {
                        value: '8',
                        label: '脉宝云店'
                    },
                    {
                        value: '10',
                        label: '美食买手'
                    },
                ]
            },
            {
                type: 'select',
                label: '退款状态',
                placeholder:'请选择',
                key: 'freezeStatus',
                selectType:'selectAll',
                options:[
                    {
                        value: 'all',
                        label: '全部'
                    },
                    {
                        value: '0',
                        label: '未冻结'
                    },
                    {
                        value: '1',
                        label: '已冻结'
                    },
                ]
            },
            {
                type: 'input',
                label: '物流编号',
                placeholder:'请输入物流编号',
                key: 'logisticsNumber'
            },
            {
                type: 'input',
                label: '发货编码',
                placeholder:'请输入内容',
                key: 'productCode'
            },
            {
                type: 'input',
                label: '商品名称',
                placeholder:'请输入商品名称',
                key: 'productName',
                width:'323.5'
            },
            {
                type: 'input',
                label: '手机号',
                placeholder:'收货人手机号',
                key: 'receiverMobileNumber'
            },
            {
                type: 'input',
                label: '姓名',
                placeholder:'收货人姓名',
                key: 'receiverFullName'
            }
        ],
        private:[
            {
                type: 'date-picker',
                label: '付款时间',
                placeholder:'请选择',
                key: 'payTimeStart',
                checkNextDate:'payTimeEnd',
                split:true
            },
            {
                type: 'date-picker',
                label: '',
                placeholder:'请选择',
                key: 'payTimeEnd',
                checkPreDate:'payTimeStart'
            },
            {
                type: 'date-picker',
                label: '发货时间',
                placeholder:'请选择',
                key: 'sendTimeStart',
                checkNextDate:'sendTimeEnd',
                split:true
            },
            {
                type: 'date-picker',
                label: '',
                placeholder:'请选择',
                key: 'sendTimeEnd',
                checkPreDate:'sendTimeStart'
            }
        ]
    },
    searchMenu: {
        public: [
            {
                label: '查询',
                style: 'primary',
                type: 'submit'
            },
            {
                label: '重置',
                type: 'reset',
            }
        ],
        private: [
            {
                label: '导出规则',
                style: 'primary',
                type: 'exportRule',
            },
            {
                label: '导出',
                type: 'export',
            },
            {
                label: '批量发货',
                style: 'primary',
                type: 'batchDeliver',
            },
            {
                label: '重新发货',
                style: 'primary',
                type: 'batchReDeliver',
            },
        ]
    },
    resultItem: {
        option: [
            {
                fixed: 'left',
                label: '订单编号',
                key: 'orderNumber',
                width:'150'
            },
            {
                label: '订单状态',
                key: 'status',
                width:'90'
            },
            {
                label: '销售渠道',
                key: 'type',
                width:'90'
            },
            {
                label: '退款状态',
                key: 'isFreeze',
                width:'80'
            },
            {
                label: '付款时间',
                key: 'payTime',
                width:'120',
                type:'time'
            },
            {
                label: '发货时间',
                key: 'sendTime',
                width:'120',
                type:'time'
            },
            {
                label: '收件人',
                key: 'receiverFullName',
                width:'80'
            },
            {
                label: '手机号码',
                key: 'receiverMobileNumber',
                width:'140',
                type:'time'
            },
            {
                label: '快递单号',
                key: 'logisticsNumber',
                width:'140'
            },
            {
                fixed:'right',
                type: 'opera',
                label: '操作',
                width:'200'
            }
        ],
        opera: {
            items: [
                {
                    type: 'toDetail',
                    label: '查看详情',
                    key: 'orderNumber',
                    val: 'orderNumber',
                    source: 'search'
                },
                {
                    type: 'sendOrder',
                    label: '发货',
                    key: 'status',
                    val: 'orderNumber'
                },
//              {
//                type: 'reloadOrder',
//                label: '重新发货',
//                key: 'status',
//              },
            ]
        }
    }
}
//async await写法简化
const start = async ()=>{
    var rs = await fs.readFile('temp.vue')
    var _pageOpts = rs.toString().replace(/'{{\}\}'/g,JSON.stringify( _opts, null, 2 ))
    var exists = await fs.exists(path.resolve(__dirname,'../page'))
    !exists && await fs.mkdir(path.resolve(__dirname,'../page'))
    await fs.writeFile(path.resolve(__dirname,'../page/demo.vue'), _pageOpts, 'utf8')
}
start()
//promise写法简化
// let _pageOpts
// fs.readFile('temp.vue')
//     .then((rs)=>{
//         _pageOpts = rs.toString().replace(/'{{\}\}'/g,JSON.stringify( _opts, null, 2 ))
//         return fs.exists(path.resolve(__dirname,'../page'))
//     })
//     .then((exists)=>{
//         if(exists){
//            fs.writeFile(path.resolve(__dirname,'../page/demo.vue'), _pageOpts, 'utf8')
//         } else {
//             fs.mkdir(path.resolve(__dirname,'../page'))
//                 .then(()=>{
//                     fs.writeFile(path.resolve(__dirname,'../page/demo.vue'), _pageOpts, 'utf8')
//                 })
//         }
//     })
//常规写法
// fs.readFile('temp.vue', function (err, data) {
//     if (err) {
//         return console.error(err);
//     }
//     let _data = data.toString().replace(/'{{\}\}'/g,JSON.stringify( _opts, null, 2 ))
//     checkName(_data)
// });
// function checkName(rs){
//     fs.exists(path.resolve(__dirname,'../page'), function (exists) {
//         var retTxt = exists ? retTxt = '文件存在' : '文件不存在';
//         if(exists){
//             writeOpts(rs)
//         } else {
//             fs.mkdir(path.resolve(__dirname,'../page'), function (err) {
//                 if(err)
//                     throw err;
//                 writeOpts(rs)
//             });
//         }
//     });
// }
// function writeOpts(rs){
//     fs.writeFile(path.resolve(__dirname,'../page/demo.vue'), rs, 'utf8', function(err) {
//         if (err) {
//             return console.error(err);
//         }
//         console.log('OK')
//
//     });
// }

