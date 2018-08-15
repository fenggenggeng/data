<style lang="less">
    @import "./login.less";
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                            <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                            <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip">输入任意用户名和密码即可</p>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
    import Cookies from 'js-cookie';
    import md5 from 'js-md5';
    import api from '@/api';

    export default {
        data () {
            return {
                form: {
                    userName: '',
                    password: ''
                },
                rules: {
                    userName: [
                        {required: true, message: '账号不能为空', trigger: 'blur'}
                    ],
                    password: [{required: true, message: '密码不能为空', trigger: 'blur'}]
                }
            };
        },
        methods: {
            handleSubmit () {
                let _self = this;
                this.$refs.loginForm.validate(valid => {
                    console.log(this.form.userName, this.form.password);
                    if (valid) {//登陆接口
                        this.$axios({
                            method: 'post',
                            url: api.login(),
                            data: {
                                account: this.form.userName,
                                pwd: this.form.password,
                                type: 1,
                            },
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            }
                        }).then(res => {
                            console.log(res.data);
                            if (res.data.code === 200) {
                                Cookies.set('user', this.form.userName);
                                Cookies.set('password', this.form.password);
                                Cookies.set('access', 1);
                                this.$store.commit('addOpenSubmenu', '2-1');
                                this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');

                                this.$router.push({
                                    name: 'home_index'
                                });

                        /*        this.$axios({//银河平台 if 页面
                                    method: 'post',
                                    url: api.getHueAutoLoginUrl(),
                                    data: {
                                        userName: this.form.userName.split("@")[0],
                                        pswd: this.form.password,
                                    }
                                }).then(res => {
                                    Cookies.set('azkaban', res.data.data.azkaban);
                                    Cookies.set('hue', res.data.data.hue);
                                    console.log(4442124);
                                    this.$router.push({
                                        name: 'focus-large'
                                    });
                                    console.log(1234134);
                                });*/

                            } else {
                                this.$Message.error(res.data.msg);
                            }

                        });

                        //   if (this.form.userName === 'iview_admin') {
                        //       Cookies.set('access', 0);
                        //   } else {
                        //       Cookies.set('access', 1);
                        //   }

                        //   this.$router.push({
                        //       name: 'home_index'
                        //   });
                        //     let postData = this.$qs.stringify({
                        //       	"pageSize":5,
                        //       	"pageIndex":1,
                        //       	appId:'application_1531386611107_0002',
                        //       	dur:'',
                        //   	    status:''
                        //   });
                        //   this.$axios({
                        //     method: "post",
                        //     url: api.getHueAutoLoginUrl(),
                        //     data: {
                        //       userName: 'qiyctest2',
                        //       password: 'qiyctest2'
                        //     }
                        //   }).then(res => {
                        //       console.log('登录',res)
                        //        Cookies.set('azkaban', res.data.azkaban);
                        //        Cookies.set('hue', res.data.hue);
                        //     // console.log(res.data.data)
                        //     // this.$router.push({
                        //     //   name: 'home_index'
                        //     // });
                        //   });

                    }

                    // if (valid) {
                    //     Cookies.set('user', this.form.userName);
                    //     Cookies.set('password', this.form.password);
                    //     this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
                    //     if (this.form.userName === 'user') {
                    //         Cookies.set('access', 0);
                    //     } else {
                    //         Cookies.set('access', 1);
                    //     }
                    //     this.$router.push({
                    //         name: 'home_index'
                    //     });
                    // }
                });

                [
                    {'userName': 'qiyctest15', 'dbName': 'ods', 'tableName': '', 'operate': '删除', 'flag': '-1'},
                    {'userName': 'qiyctest15', 'dbName': 'ods', 'tableName': '', 'operate': '查询', 'flag': '-1'}
                ];
            }
        }
    };
</script>

<style>
</style>
