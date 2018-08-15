<template>
    <div style='position: relative;height:100%;padding:10px;'>
        <Row type="flex" justify="space-between" align="middle" class="code-row-bg" style='margin-bottom:10px;'>
            <Col span="6">
            <div style="padding:5px 0 ; font-weight:700; font-size:18px;">資源接口</div>
            </Col>
            <router-link style="position: absolute;left: 100px; color: #1c2438"
                         :to="{name:'addResources'}">新增资源
            </router-link>
            <Breadcrumb>
                <BreadcrumbItem :to="{ name: 'list_tree'}">切换树形列表</BreadcrumbItem>
            </Breadcrumb>
        </Row>

        <Table :columns="columns1" :data="data1" id="table1"></Table>
        <Table :columns="columns2" :data="data2" style="margin-top: 20px" id="table2"></Table>
        <Table :columns="columns3" :data="data3" style="margin-top: 20px" id="table3"></Table>
        <Table :columns="columns4" :data="data4" style="margin-top: 20px" id="table4"></Table>

        <Page :total="10" style="margin-left: 50%"/>


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
                columns1: [
                    {
                        title: 'resourceId',
                        key: 'resourceId'
                    },
                    {
                        title: 'tenantId',
                        key: 'tenantId'
                    },
                    {
                        title: 'parentId',
                        key: 'parentId'
                    },
                    {
                        title: 'resourceName',
                        key: 'resourceName'
                    },
                    {
                        title: 'description',
                        key: 'description'
                    },
                    {
                        title: 'modifyTime',
                        key: 'modifyTime'
                    },
                    {
                        title: 'Action',
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
                                            this.show1(params.index);
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove1(params.index);
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data1: [],
                columns2: [
                    {
                        title: 'resourceId',
                        key: 'resourceId'
                    },
                    {
                        title: 'tenantId',
                        key: 'tenantId'
                    },
                    {
                        title: 'parentId',
                        key: 'parentId'
                    },
                    {
                        title: 'resourceName',
                        key: 'resourceName'
                    },
                    {
                        title: 'description',
                        key: 'description'
                    },
                    {
                        title: 'modifyTime',
                        key: 'modifyTime'
                    }, {
                        title: 'Action',
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
                                            this.show2(params.index);
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove2(params.index);
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data2: [],
                columns3: [
                    {
                        title: 'resourceId',
                        key: 'resourceId'
                    },
                    {
                        title: 'tenantId',
                        key: 'tenantId'
                    },
                    {
                        title: 'parentId',
                        key: 'parentId'
                    },
                    {
                        title: 'resourceName',
                        key: 'resourceName'
                    },
                    {
                        title: 'description',
                        key: 'description'
                    },
                    {
                        title: 'modifyTime',
                        key: 'modifyTime'
                    }, {
                        title: 'Action',
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
                                            this.show3(params.index);
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove3(params.index);
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data3: [],
                columns4: [
                    {
                        title: 'resourceId',
                        key: 'resourceId'
                    },
                    {
                        title: 'tenantId',
                        key: 'tenantId'
                    },
                    {
                        title: 'parentId',
                        key: 'parentId'
                    },
                    {
                        title: 'resourceName',
                        key: 'resourceName'
                    },
                    {
                        title: 'description',
                        key: 'description'
                    },
                    {
                        title: 'modifyTime',
                        key: 'modifyTime'
                    }, {
                        title: 'Action',
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
                                            this.show4(params.index);
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove4(params.index);
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data4: [],
                res_lists:[]
            };
        },
        computed: {},
        created () {

            this.res_List();
        },
        updated () {

        },
        methods: {
            res_List () {
                this.$axios({
                    method: 'post',
                    url: api.res_list(),
                    data: {
                        currentPage: 1,
                        pageSize: 10
                    }
                }).then(res => {
                    if (res.data.code == 200) {
                        this.res_lists = res.data.data;
                        /* for (let i = 0; i < this.res_lists.length; i++) {

                             if (this.res_lists.length === 0) {
                                 table1.style.display="none"
                                 table2.style.display="none"
                                 table3.style.display="none"
                                 table4.style.display="none"

                             }
                             if (this.res_lists.length === 1) {
                                 this.data1 = [this.res_lists[0]];
                                 table2.style.display="none"
                                 table3.style.display="none"
                                 table4.style.display="none"
                             }
                             if (this.res_lists.length === 2) {
                                 this.data1 = [this.res_lists[0]];
                                 this.data2 = [this.res_lists[1]];
                                 table3.style.display="none"
                                 table4.style.display="none"
                             }
                             if (this.res_lists.length === 3) {
                                 this.data1 = [this.res_lists[0]];
                                 this.data2 = [this.res_lists[1]];
                                 this.data3 = [this.res_lists[2]];
                                 table4.style.display="none"
                             }
                             if (this.res_lists.length === 4) {*/
                        this.data1 = [this.res_lists[0]];
                        this.data2 = [this.res_lists[1]];
                        this.data3 = [this.res_lists[2]];
                        this.data4 = [this.res_lists[3]];
                        // }

                    }

                    //}
                });

            },
            addData (data) {
                console.log(this.$route);
            }
        },
        show1 (index) {
            this.$Modal.info({
                title: 'User Info',
                content: `resourceId：${this.data1[index].resourceId}<br>tenantId：${this.data1[index].tenantId}<br>parentId：${this.data1[index].parentId} resourceName：${this.data1[index].resourceName}<br>description：${this.data1[index].description}<br>modifyTime：${this.data1[index].modifyTime}`
            });
        },
        remove1 (index) {
            this.data1.splice(index, 1);
        },

        show2 (index) {
            this.$Modal.info({
                title: 'User Info',
                content: `resourceId：${this.data2[index].resourceId}<br>tenantId：${this.data2[index].tenantId}<br>parentId：${this.data2[index].parentId} resourceName：${this.data2[index].resourceName}<br>description：${this.data2[index].description}<br>modifyTime：${this.data2[index].modifyTime}`
            });
        },
        remove2 (index) {
            this.data1.splice(index, 1);
        },
        show3 (index) {
            this.$Modal.info({
                title: 'User Info',
                  content: `resourceId：${this.data3[index].resourceId}<br>tenantId：${this.data3[index].tenantId}<br>parentId：${this.data3[index].parentId} resourceName：${this.data3[index].resourceName}<br>description：${this.data3[index].description}<br>modifyTime：${this.data3[index].modifyTime}`
            });
        },
        remove3 (index) {
            this.data6.splice(index, 1);
        },
        show4 (index) {
            this.$Modal.info({
                title: 'User Info',
                   content: `resourceId：${this.data4[index].resourceId}<br>tenantId：${this.data4[index].tenantId}<br>parentId：${this.data4[index].parentId} resourceName：${this.data4[index].resourceName}<br>description：${this.data4[index].description}<br>modifyTime：${this.data4[index].modifyTime}`
            });
        },
        remove4 (index) {
            this.data6.splice(index, 1);
        }
    };
</script>
