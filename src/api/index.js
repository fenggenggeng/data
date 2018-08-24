// const _baseUrlQ = 'http://172.18.101.144:10150';
const _baseUrlQ = 'http://172.18.101.119:10099/galaxy-platform-management';
const _loginUrlT ='http://172.18.101.119:10099';
 const _baseT='http://172.18.101.119:10099';
//



export default {
	_baseUrlQ,
// login(){//登录
    // 	return _loginUrl +'/mc-auth/auth/login'
    // },



    login(){//登录
        return _loginUrlT +'/user-auth/auth/login'
    }, 
	com_Data(){//登录
        return _baseUrlQ +'/galaxy/meta/getMeta'
    },
    modifyMeta(){//登录
        return _baseUrlQ +'/galaxy/meta/modifyMeta'
    }, 
	queryUserBehaviorPage(){//工作台
        return _baseUrlQ +'/galaxy/userBehavior/queryUserBehaviorPage';
    },
    queryAllDbs(){//工作台获取列表
		return _baseUrlQ +'/galaxy/privilege/queryAllDbs'
    },
    queryAllUsers(){//用户平台获取用户列表
        return _baseT +'/user-admin/user/listUserByTenant'
    },
    queryDbPrivilege(){//工作台获取全库权限列表
		return _baseUrlQ +'/galaxy/privilege/queryDbPrivilege'
	},
    queryTbPrivilegePage(){//工作台获取详情列表
		return _baseUrlQ +'/galaxy/privilege/queryTbPrivilegePage'
	},
    changeUsePrivilege(){//工作台提交修改
		return _baseUrlQ +'/galaxy/privilege/changeUsePrivilege'
	},
	getHueAutoLoginUrl(){//获取hue 卡牌地址
		// return 'http://192.168.34.159/galaxy/hadoop/getAutoLoginUrl'
		return _baseUrlQ +'/galaxy/hadoop/getAutoLoginUrl'
	},
	getMonitorList(){//作业监控
		return _baseUrlQ +'/galaxy/work/getMonitorList'
	},
	getMonitorLog(id){//获取日志地址
		return _baseUrlQ +'/galaxy/work/getMonitorLog/'+id
	},
	killJob(id){//获取预警停止操作
		return _baseUrlQ +'/galaxy/user/killJob/'+id
	},
	getSearch(id){//获取作业优化
		return 'http://172.18.101.138:8087/search?id='+id
	},
	getWarnList(){//作业预警
		return _baseUrlQ +'/galaxy/work/getWarnList'
	},
	getHostInformations(){//集群大盘列表
		return _baseUrlQ +'/galaxy/cluster/getHostInformations'
	},
	getHostHisInformations(time=default_date){//集群大盘图标
		return _baseUrlQ +'/galaxy/cluster/getHostHisInformations/'+time;
	},

   
}
