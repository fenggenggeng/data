<template>
    <div style='position: relative;height:100%;padding:10px;'>
        <Row type="flex" justify="space-between" align="middle" class="code-row-bg" style='margin-bottom:10px;'>
            <Col span="6">
            <div style="padding:5px 0 ; font-weight:700; font-size:18px;">组织机构管理</div>
            </Col>
            <Col span="3" style='text-align:right;margin-right:5px;'>

            <Button type="primary" @click="modal1 = true">
                    组织机构管理
            </Button>
            </Col>
        </Row>
        <Upload action="//jsonplaceholder.typicode.com/posts/" :on-success='onSuccess' :on-error='onError'>
            <Button type="ghost" icon="ios-cloud-upload-outline">上传</Button>
        </Upload>

        <Spin fix v-show="SpinType">
            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>
        <Modal
                v-model="modal1"
                title="信息"
                @on-ok="ok"
                @on-cancel="cancel">
            <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
                <FormItem label="描述" prop="description">
                    <Input type="text" v-model="formCustom.description"></Input>
                </FormItem>
                <FormItem label="fullName" prop="fullName">
                    <Input type="text" v-model="formCustom.fullName"></Input>
                </FormItem>
                <FormItem label="organizationCode" prop="organizationCode">
                    <Input type="text" v-model="formCustom.organizationCode"></Input>
                </FormItem>
                <FormItem label="organizationName" prop="organizationName">
                    <Input type="text" v-model="formCustom.organizationName"></Input>
                </FormItem>
                <FormItem label="parentId" prop="parentId">
                    <Input type="text" v-model="formCustom.parentId"></Input>
                </FormItem>
                <FormItem label="tenantId" prop="tenantId">
                    <Input type="text" v-model="formCustom.tenantId"></Input>
                </FormItem>

            </Form>
        </Modal>


        <Table border :columns="columns7" :data="data6"></Table>


    </div>
</template>
<style scoped>
    .paging {
        float: right;
        margin-top: 10px;
    }
</style>
<script>
    import api from '@/api';

    export default {
        data () {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(' '));
                } else {
                    if (this.formCustom.passwdCheck !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formCustom.validateField(' ');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(' '));
                } else {
                    callback();
                }
            };
            const validateAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error(' '));
                }
                // 模拟异步验证效果
            };
            return {
                parent:[],
                nums: '',
                names: '',
                formCustom: {
                    description: "",
                    fullName: "",
                    organizationCode: "",
                    organizationName: "",
                    parentId:"",
                    tenantId:"",
                },
                ruleCustom: {
                    passwd: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    passwdCheck: [
                        {validator: validatePassCheck, trigger: 'blur'}
                    ],
                    age: [
                        {validator: validateAge, trigger: 'blur'}
                    ]
                },
                modal1: false,
                columns7: [
                    {
                        title: '组织机构编码',
                        key: 'organizationCode',
                    },
                    {
                        title: '组织机构名称',
                        key: 'organizationName'
                    },
                    {
                        title: '上级名称',
                        key: 'parentId'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index);
                                        }
                                    }
                                }, '查看'),

                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: (h) => {
                                            this.init_Update(params.index);
                                        }
                                    }
                                }, '更新'),

                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: (h) => {
                                            this.organizationParent_id();
                                            console.log(this.parent);
                                            this.show1(params.index);

                                        }
                                    }
                                }, '查看父类'),
                            ]);
                        }
                    }
                ],
                data6: [],

                ajaxHistoryData: [],
                // 初始化信息总条数
                dataCount: 0,
                // 每页显示多少条
                page: {
                    pageIndex: 1,
                    pageSize: 10
                },
                SpinType: false,
                historyColumns: [
                    {
                        title: '账号',
                        key: 'id'
                    },
                    {
                        title: '用户名',
                        key: 'user'
                    },
                    {
                        title: '手机号',
                        key: 'name'
                    },
                    {
                        title: '组织机构',
                        key: 'start'
                    },
                    {
                        title: '状态',
                        key: 'elapsed'
                    },
                    {
                        title: '操作',
                        key: 'deletetStatus',
                        render: (row, column, index) => {
                            return row('div', [
                                row(
                                    'Button',
                                    {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        style: {
                                            color: 'blue'
                                        },
                                        on: {
                                            click: (event, data) => {
                                                console.log(1);
                                            }
                                        }
                                    },
                                    '修改'
                                ),
                                row(
                                    'Button',
                                    {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        style: {
                                            color: 'blue'
                                        },
                                        on: {
                                            click: (event, data) => {
                                                console.log('点击');
                                            }
                                        }
                                    },
                                    '删除'
                                ),
                                row(
                                    'Button',
                                    {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        style: {
                                            color: 'blue'
                                        },
                                        on: {
                                            click: (event, data) => {
                                                console.log('点击');
                                            }
                                        }
                                    },
                                    '锁定'
                                ),
                                row(
                                    'Button',
                                    {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        style: {
                                            color: 'blue'
                                        },
                                        on: {
                                            click: (event, data) => {
                                                console.log('点击');
                                            }
                                        }
                                    },
                                    '绑定角色'
                                )
                            ]);
                        }
                    }
                ],
                historyData: [{id: 1}],
                roleList: [
                    {name: '22222220', key: 0},
                    {name: '普惠业务管理员', key: 1},
                    {name: '普惠业务管理员', key: 2},
                    {name: '普惠业务管理员', key: 3},
                    {name: '普惠业务管理员', key: 4},
                    {name: '仲裁', key: 5},
                    {name: '总裁', key: 6}
                ],
                resModal: true,
                resModalList: [],
                isNumber: true,
                columns1: [
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },

                ],
                data1: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                ]
            };
        },
        computed: {},

        created () {
            //用户管理

            //  this.origin_UserId();//200
            // this.check_list();//200
            // this.init_Update();
            this.check_list();

        },
        methods: {
            ok () {
                this.organization_Add();
                this.$Message.info('Clicked ok');
            },
            cancel () {
                this.$Message.info('Clicked cancel');
            },

            init () {
                this.$axios({
                    method: 'post',
                    url: api.getWarnList(),
                    data: {
                        pageSize: this.page.pageSize,
                        pageIndex: this.page.pageIndex
                    }
                }).then(res => {
                    if (res.data.code == 200) {
                        this.historyData = res.data.data;
                        this.SpinType = false;
                    }
                });
            },
            check_list () {
                this.$axios({
                    method: 'post',
                    url: api.organizationList(),
                    data: {
                        currentPage: 1,
                        pageSize: 10
                    }
                }).then(res => {
                    if (res.data.code == 200) {

                        let [...data3] = res.data.data;
                        this.data6 = data3;
                    }
                });
            },
            init_Update (index) {
                this.$axios({
                    method: 'post',
                    url: api.organizationUpdate(),
                    data: {
                        description: this.data6[index][0],
                        fullName: this.data6[index][1],
                        organizationCode: this.data6[index][2],
                        organizationId: this.data6[index][3],
                        organizationName: this.data6[index][4],
                        parentId: this.data6[index][5],
                        tenantId: this.data6[index][6],
                    }
                }).then(res => {
                    if (res.data.code == 200) {
                        this.init_update = res.data.data;
                        this.data6[index] = this.init_update[index];
                        console.log(this.init_update[index]);
                    }
                });
            },

            organizationParent_id (index) {

                this.$axios({
                    method: 'get',
                    url: api.organizationFindGroupParent_id(),
                }).then(res => {
                    if (res.data.code == 200) {
                        this.parent = res.data.data;
                        console.log(this.parent);

                    }
                });

            },
            organization_Add () {
                this.$axios({
                    method: 'post',
                    url: api.organizationAdd(),
                    data: {
                        description: this.formCustom.description,
                        fullName: this.formCustom.fullName,
                        organizationCode: this.formCustom.organizationCode,
                        organizationName: this.formCustom.organizationName,
                        parentId: this.formCustom.parentId,
                        tenantId: this.formCustom.tenantId

                    }
                }).then(res => {
                    if (res.data.code == 200) {
                        this.organization_add = res.data.data;
                        console.log(this.organization_add);

                    }
                });

            },
            origin_UserId () {
                this.$axios({
                    method: 'get',
                    url: api.organizationFindGroupParent_id()
                }).then(res => {
                    if (res.data.code == 200) {
                        this.origin_userId = res.data.data;
                        console.log(this.origin_userId);
                    }
                });
            },

            onHandChange (data) {
                console.log(data);
                data.key != data.key;
                console.log(this.roleList, 'ddd');
            },
            changepage (index) {
                this.page.pageIndex = index;
                this.init();
            },
            submit () {
                if (this.formItem.dur.match(/^\d+$/) || !this.formItem.dur) {
                    this.SpinType = true;
                    this.init();
                } else {
                    this.$Message.error('请填写整数', 3);
                }
            },
            initList () {
                this.SpinType = true;
            },
            dbNameSelectChange () {
                // this.init();
            },
            modelOk () {
                this.resModal = false;
                this.resModalList = [];
            },
            clickToLog (id) {
                this.$axios({
                    method: 'get',
                    url: api.getMonitorLog(id)
                }).then(res => {
                    if (res.data.code == 200) {
                        let url = res.data.data.amContainerLogs;
                        if (url) {
                            window.open(`${url}`, '_blank');
                        } else {
                            this.$Message.error('暂无数据', 3);
                        }
                    }
                });
            },
            onSuccess (data) {
                console.log('成功', data);
            },
            onError (data) {
                console.log('失败', data);
            },
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
                });
            },
            show1 (index) {
                this.$Modal.info({
                    title: '查看父类',
                    content: `
<Form :model="formItem" :label-width="80">
 <FormItem label="Select">
            <Select v-model="formItem.select">
                <Option value="beijing">父类1</Option>
                <Option value="shanghai">父类2</Option>
                <Option value="shenzhen">父类3</Option>
            </Select>
        </FormItem>
        tenantId:${this.parent[0].tenantId}
        tenantName:${this.parent[0].tenantName}
        </Form>
<table align="center" width="250" height="100" border=1 bordercolor="#000">
<tbody>
<tr><td colspan="2"  align="center">组织机构列表</td>
</tr>
<tr><td width="40%" height="20">organizationId</td>
<td colspan="2" align="right">organizationName</td>
</tr>
<tr><td width="50%">${this.parent[0].orgNameVoList[0].organizationId}</td>
 <td width="50%">${this.parent[0].orgNameVoList[0].organizationName}</td>
 </tr>
 </tr>
<tr><td width="50%">${this.parent[0].orgNameVoList[1].organizationId}</td>
 <td width="50%">${this.parent[0].orgNameVoList[1].organizationName}</td>
 </tr>
 </tr>
<tr><td width="50%">${this.parent[0].orgNameVoList[2].organizationId}</td>
 <td width="50%">${this.parent[0].orgNameVoList[2].organizationName}</td>
 </tr>
</tbody>
</table>

`
                });
            },
            /*
            * */
            remove (index) {
                this.data6.splice(index, 1);
            },
            submit_add () {
                this.organization_Add();
            },

        }

    };
</script>
<style>
</style>





