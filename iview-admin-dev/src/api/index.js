const _baseUrlQ = 'http://172.18.101.144:10150'
const _baseUrlC = 'http://172.18.101.144:10150'
const _loginUrl = 'http://172.18.101.112:10000'
const _loginUrlT ='http://172.18.101.119:10099';

const _userT = 'http://172.18.101.143:10051';
const _Organization = 'http://172.18.101.143:10052';

export default {
    _baseUrlC,
    // login(){//登录
    // 	return _loginUrl +'/mc-auth/auth/login'
    // },

//角色接口
    //列表
    role_list(){
      return _Organization+"/role/find/list"
    },
    //新增资源
    role_add(){
      return _Organization+"/role/add"
    },
    //为角色绑定资源
    role_bound(){
      return _Organization+"/role/bound/resource"
    },
    //删除资源
    role_del(){
      return _Organization+"/role/del"
    },
    //查询角色
    role_roleId(id){
      return _Organization+"/role/find/"+id
    },
    //修改
    role_update(){
      return _Organization+"/role/update"
    },


//资源接口
    //查询资源列表
    res_list(){
        return _Organization+"/resource/find/list";
    },
    //查询资源树形列表
    res_list_tree(){
        return _Organization+"/resource/find/list/tree";
    },
    //新增
    res_add(){
        return _Organization+"/resource/add";
    },
    //修改
    res_update(){
        return _Organization+"/resource/update";
    },
    //删除
    res_del(){
        return _Organization+"/resource/del";
    },
    //查询
    res_search(id){
        return _Organization+"/resource/find"+id;
    },




    login () {//登录
        return _loginUrlT + '/user-auth/auth/login';
    },
    userAdd (id) {
        return _userT + '/user/addUser'; //增加用户
    },
    userUserId (id) {
        return _userT + '/user/byUserId'; //查询用户
    },
    userDelete (id) {
        return _userT + '/user/deleteUser'; //用户删除
    },
    userUpdate (id) {
        return _userT + '/user/editUser'; //用户修改
    },
    userList (id) {
        return _userT + '/user/listUser'; //用户列表
    },
    organizationAdd () {//新增组织结构
        return _Organization + '/organization/add';
    },
    organizationFindGroupParent_id () {//查询分类的父id
        return _Organization + '/organization/find/group/parent_id';
    },
    organizationList () {//查询组织列表
        return _Organization + '/organization/list';
    },
    organizationUpdate () {//更新组织的列表
        return _Organization + '/organization/update';
    },
    queryAllDbs () {//工作台获取列表
        return _baseUrlQ + '/galaxy/privilege/queryAllDbs';
    },
    queryDbPrivilege () {//工作台获取全库权限列表
        return _baseUrlQ + '/galaxy/privilege/queryDbPrivilege';
    },
    queryTbPrivilegePage () {//工作台获取详情列表
        return _baseUrlQ + '/galaxy/privilege/queryTbPrivilegePage';
    },
    changeUsePrivilege () {//工作台提交修改
        return _baseUrlQ + '/galaxy/privilege/changeUsePrivilege';
    },
    getHueAutoLoginUrl () {//获取hue 卡牌地址
        return _baseUrlQ + '/galaxy/hadoop/getAutoLoginUrl';
    },
    getMonitorList () {//作业监控
        return _baseUrlC + '/galaxy/work/getMonitorList';
    },
    getMonitorLog (id) {//获取日志地址
        return _baseUrlC + '/galaxy/work/getMonitorLog/' + id;
    },
    killJob (id) {//获取预警停止操作
        return _baseUrlC + '/galaxy/user/killJob/' + id;
    },
    getSearch (id) {//获取作业优化
        return 'http://172.18.101.138:8087/search?id=' + id;
    },
    getWarnList () {//作业预警
        return _baseUrlC + '/galaxy/work/getWarnList';
    },
    getHostInformations () {//集群大盘列表
        return _baseUrlQ + '/galaxy/cluster/getHostInformations';
    },
    getHostHisInformations (time) {//集群大盘图标
        return _baseUrlQ + '/galaxy/cluster/getHostHisInformations/' + time;
    },

};
