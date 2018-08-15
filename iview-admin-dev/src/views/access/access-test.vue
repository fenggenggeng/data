<template>
    <div style='position: relative;height:100%;padding:10px;'>
        <Row type="flex" justify="space-between" align="middle" class="code-row-bg" style='margin-bottom:10px;'>
            <Col span="6">
            <div style="padding:5px 0 ; font-weight:700; font-size:18px;">用户管理</div>
            </Col>
            <Col span="3" style='text-align:right;margin-right:5px;'>
            <Button type="primary" @click="addUserType=true;">新增用户</Button>
            </Col>
        </Row>

        <Spin fix v-show="SpinType">
            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>

        <Table :columns="historyColumns" :data="historyData"></Table>
        <!-- <Page :total="dataCount" :page-size="page.pageSize" :current="page.pageIndex" show-total class="paging" @on-change="changepage"></Page> -->
        <Modal
                v-model="resModal"
                title="绑定角色"
                @on-ok="modelOk"
                @on-cancel="modelOk">
            <p v-for='item in roleList'>
                <Checkbox label="item.name" :value='item.key==1' @on-change="onHandChange(item)">
                    <span style="padding:0 5px;">{{item.name}}</span>
                </Checkbox>
            </p>
        </Modal>
        <Modal
                v-model="addUserType"
                title="新增用户"
                :footer-hide='true'
                @on-cancel="addUserModelCancel">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="60">
                <FormItem label="name" prop="name">
                    <Input v-model="formValidate.name" placeholder="填寫信息"></Input>
                </FormItem>
                <FormItem label="邮箱" prop="email">
                    <Input v-model="formValidate.email" placeholder="填寫信息"></Input>
                </FormItem>
                <FormItem label="电话" prop="mobile">
                    <Input v-model="formValidate.mobile" placeholder="填寫信息"></Input>
                </FormItem>
                <FormItem label="nickname" prop="nickname">
                    <Input v-model="formValidate.nickname" placeholder="填寫信息"></Input>
                </FormItem>
                <FormItem label="order" prop="orderNo">
                    <Input v-model="formValidate.orderNo" placeholder="填寫信息"></Input>
                </FormItem>
                <FormItem label="organizationId" prop="organizationId">
                    <Input v-model="formValidate.organizationId" placeholder="填寫信息"></Input>
                </FormItem>
                <FormItem label="pswd" prop="pswd">
                    <Input v-model="formValidate.pswd" placeholder="填寫信息"></Input>
                </FormItem>
                <FormItem label="employeeCode" prop="employeeCode">
                    <Input v-model="formValidate.employeeCode" placeholder="填寫信息"></Input>
                </FormItem>


                <FormItem>
                    <Button type="primary" @click="addUserModelOk">确定</Button>
                    <Button @click="addUserModelCancel" style="margin-left: 8px">取消</Button>
                </FormItem>

            </Form>
        </Modal>
        <Modal
                v-model="modal1"
                title="具体信息"
                @on-ok="ok"
                @on-cancel="cancel">

            <div>email</div>
            <p>{{this.userInfo.email}}</p>
            <div>mobile</div>

            <p>{{this.userInfo.mobile}}</p>
            <div>nickname</div>

            <p>{{this.userInfo.nickname}}</p>
            <div>organizationId</div>

            <p>{{this.userInfo.organizationId}}</p>
        </Modal>
        <Modal
                v-model="modal2"
                title="修改信息"
                @on-ok="okone"
                @on-cancel="canceloneone">

            <Form ref="formItem" :model="formItem">
                <FormItem prop="user">
                    <p>email</p>
                    <Input type="text" v-model="this.userInfo.email" placeholder="Username">
                    </Input>
                </FormItem>
                <FormItem prop="user">
                    <p>mobile</p>
                    <Input type="text" v-model="this.userInfo.mobile" placeholder="Username">
                    </Input>
                </FormItem>
                <FormItem prop="user">
                    <p>nickname</p>
                    <Input type="text" v-model="this.userInfo.nickname" placeholder="Username">
                    </Input>
                </FormItem>
                <FormItem prop="user">
                    <p>organizationId</p>
                    <Input type="text" v-model="this.userInfo.organizationId" placeholder="Username">
                    </Input>
                </FormItem>
            </Form>
        </Modal>
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
            return {
                userInfo: [],
                selIndex: [],
                modal1: false,
                modal2: false,
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
                        key: 'nickname'
                    },
                    {
                        title: '用户名',
                        key: 'employeeCode'
                    },
                    {
                        title: '手机号',
                        key: 'mobile'
                    },
                    {
                        title: '组织机构',
                        key: 'organizationId'
                    },
                    {
                        title: '状态',
                        key: 'logicStatus'
                    },
                    {
                        title: '操作',
                        key: 'deletetStatus',
                        render: (h, params) => {
                            return h('div', [
                                h(
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
                                                this.selIndex = params.index;
                                                this.modal2 = true;
                                                let {...userInfos}=this.historyData[params.index]
                                                this.userInfo=userInfos
                                                // console.log(this.historyData[params.index]);
                                            }
                                        }
                                    },
                                    '修改'
                                ),
                                h(
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
                                                this.user_Delete(this.historyData[params.index].userId,params.index);
                                            }
                                        }
                                    },
                                    '删除'
                                ),
                                h(
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
                                            click: (index) => {
                                                this.user_UserId(this.historyData[params.index].userId);

                                            }
                                        }
                                    },
                                    '查看'
                                ),
                            ]);
                        }
                    }
                ],
                historyData: [],
                roleList: [
                    {name: '22222220', key: 0},
                    {name: '普惠业务管理员', key: 1},
                    {name: '普惠业务管理员', key: 2},
                    {name: '普惠业务管理员', key: 3},
                    {name: '普惠业务管理员', key: 4},
                    {name: '仲裁', key: 5},
                    {name: '总裁', key: 6}
                ],
                resModal: false,
                resModalList: [],
                addUserType: false,
                isNumber: true,
                formValidate: {
                    name: '',
                    email: '',
                    mobile: '',
                    nickname: '',
                    orderNo: '',
                    organizationId: '',
                    pswd: '',
                    employeeCode:""
                },
                ruleValidate: {
                    name: [
                        {required: true, message: '填写名字', trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: '填写邮箱', trigger: 'blur'}
                    ],
                    mobile: [
                        {required: true, message: '填写电话', trigger: 'blur'}
                    ],
                    nickname: [
                        {required: true, message: '填写name', trigger: 'blur'}
                    ],
                    orderNo: [
                        {required: true, message: '填写order', trigger: 'blur'}
                    ],
                    organizationId: [
                        {required: true, message: '填写组织id', trigger: 'blur'}
                    ],
                    pswd: [
                        {required: true, message: '填写密码', trigger: 'blur'}
                    ]
                    ,employeeCode: [
                        {required: true, message: '填写用户代码', trigger: 'blur'}
                    ],
                },
                formItem: {
                    input: ''
                }
            };
        },
        computed: {},
        created () {
            console.log(this.historyData);
            this.user_List();
        },
        methods: {

            //用户管理
            user_List () {
                this.$axios({
                    method: 'post',
                    url: api.userList(),
                    data: {
                        currentPage: 1,
                        pageSize: 10
                    }
                }).then(res => {

                    if (res.data.code == 200) {
                        this.user_list = res.data.data;
                        console.log(this.user_list);
                        this.historyData = this.user_list;

                    }
                });

            },
            user_Add () {
                this.$axios({
                    method: 'post',
                    url: api.userAdd(),
                    data: {
                        currentUserId: this.formValidate.name,
                        email: this.formValidate.email,
                        employeeCode: this.formValidate.employeeCode,
                        mobile: this.formValidate.mobile,
                        nickname: this.formValidate.nickname,
                        orderNo: this.formValidate.orderNo,
                        organizationId: this.formValidate.organizationId,
                        pswd: this.formValidate.pswd
                    }
                }).then(res => {
                    if (res.data.code == 200) {
                        this.user_add = res.data.data;
                        this.historyData=this.user_add
                    }
                });
            },
            user_UserId (userId) {
                this.$axios({
                    method: 'post',
                    url: api.userUserId(),
                    data: {
                        userId
                    }
                }).then(res => {
                    if (res.data.code == 200 && typeof res.data.data === 'object') {
                        this.user_userId = res.data.data;
                        this.userInfo = this.user_userId;
                        this.modal1 = true;

                    } else if (typeof res.data.data == 200 && res.data.data !== 'object') {
                        alert('没有该用户');
                    }
                });
            },
            user_Delete (userId) {
                this.$axios({
                    method: 'post',
                    url: api.userDelete(),
                    data: {
                        userId: userId
                    }
                }).then(res => {
                    if (res.data.code == 200) {
                        this.remove(userId);

                    }
                    else{
                        alert("信息不正确")
                    }
                });

            },
            user_Update (userId) {
                this.$axios({
                    method: 'post',
                    url: api.userUpdate(),
                    data: {
                        email: userId.email,
                        employeeCode: userId.employeeCode,
                        mobile: userId.mobile,
                        nickname: userId.nickname,
                        orderNo: userId.orderNo,
                        userId: userId.userId
                    }
                }).then(res => {
                    console.log(res);
                    if (res.data.code == 200) {
                        this.user_update = res.data.data;
                        console.log(this.user_update);
                        /* this.userInfo = this.user_update;
                         this.historyData[userId] = this.user_update;
                         this.userInfo[userId]=this.historyData[userId]*/

                    }
                });

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
            onHandChange (data) {
                console.log(data);
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
            //弹框确定
            addUserModelOk () {
                this.user_Add();
                this.$refs['formValidate'].validate(valid => {
                    if (valid) {
                        this.$Message.success('正确');

                        this.$refs.formValidate.resetFields();

                        this.addUserType = false;
                    } else {
                        this.$Message.error('Fail!');
                    }
                });
            },
            addUserModelCancel () {
                console.log('关闭');
                this.$refs.formValidate.resetFields();
                this.addUserType = false;
            },
            ok () {
                this.$Message.info('Clicked ok');
            },
            cancel () {
                this.$Message.info('Clicked cancel');
            },
            okone () {

                this.user_Update(this.historyData[this.selIndex]);
                this.$Message.info('Clicked ok');
            },
            canceloneone () {
                this.$Message.info('Clicked cancel');
            },
            remove (index) {
               this.historyData.splice(index, 1);
            }
        }
    };
</script>
<style>
    .aa {
    }
</style>