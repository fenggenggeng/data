<style lang="less">
@import "../styles/menu.less";
</style>

<template>
    <Menu ref="sideMenu" :active-name="openNames[0]" :open-names="openNames" :theme="menuTheme" width="auto" @on-select="menuSelect">
        <!-- <template v-for="item in menuList">
            <MenuItem v-if="item.children.length<=1" :name="item.children[0].name" :key="'menuitem' + item.name">
                <Icon :type="item.children[0].icon || item.icon" :size="iconSize" :key="'menuicon' + item.name"></Icon>
                <span class="layout-text" :key="'title' + item.name">{{ itemTitle(item.children[0]) }}</span>
            </MenuItem>
            <Submenu v-if="item.children.length > 1" :name="item.name" :key="item.name">
                <template slot="title">
                    <Icon :type="item.icon" :size="iconSize"></Icon>
                    <span class="layout-text">{{ itemTitle(item) }}</span>
                </template>
                <template v-for="child in item.children">
                    <MenuItem :name="child.name" :key="'menuitem' + child.name">
                        <Icon :type="child.icon" :size="iconSize" :key="'icon' + child.name"></Icon>
                        <span class="layout-text" :key="'title' + child.name">{{ itemTitle(child) }}</span>
                    </MenuItem>
                </template>
            </Submenu>
        </template> -->
         
        <Submenu name="1">
            <template slot="title">
                <Icon type="ios-analytics"></Icon>
               <router-link tag="span" to="/organization-management-system">系统配置</router-link>
            </template>
            <MenuItem name="1-1" ><router-link tag="li" to="/organization-management-system">组织机构管理</router-link></MenuItem>
             <MenuItem name="1-2" ><router-link tag="li" to="/component/access-management-system">接入管理系统</router-link></MenuItem>
              <MenuItem name="1-3" ><router-link tag="li" to="/resource/index">授权资源管理</router-link></MenuItem>
             <MenuItem name="1-4"><router-link  tag="li" to="/access-test/index">用户管理</router-link></MenuItem> 
             <MenuItem name="1-5"><router-link  tag="li" to="/access-management-system">角色管理</router-link></MenuItem>
        </Submenu>

        <!--<Submenu name="2">-->
            <!--<template slot="title">-->
               <!--<Icon type="ionic"></Icon>-->
                <!--作业平台-->
            <!--</template>-->
            <!--<MenuItem name="2-1"><router-link  tag="li" to="/component/focus-large">集群大盘</router-link></MenuItem>-->
            <!--<MenuItem name="2-2"><router-link  tag="li" to="/component/task-warning">任务预警</router-link></MenuItem>-->
            <!--<MenuItem name="2-3"><router-link  tag="li" to="/component/task-inquire">任务查询</router-link></MenuItem>-->
            <!--<MenuItem name="2-4"><router-link  tag="li" to="/component/task-table">任务工作台</router-link></MenuItem>-->
            <!--<MenuItem name="2-5"><router-link  tag="li" to="/component/hue-table">HUE工作台</router-link></MenuItem>-->
        <!--</Submenu>-->
           <!--<Submenu name="3">-->
            <!--<template slot="title">-->
               <!--<Icon type="filing"></Icon>-->
                <!--任务调度-->
            <!--</template>-->
            <!--<MenuItem name="3-1"><router-link  tag="li" to="/component/task-dispatch">azkaban</router-link></MenuItem>-->
        <!--</Submenu>-->
           <!--<Submenu name="4">-->
            <!--<template slot="title">-->
                <!--<Icon type="social-codepen"></Icon>-->
                <!--HIVE权限管理-->
            <!--</template>-->
            <!--<MenuItem name="4-1"> <router-link  tag="li" to="/jurisdiction/add-jurisdiction">新建权限</router-link></MenuItem>-->
            <!--<MenuItem name="4-2"> <router-link  tag="li" to="/jurisdiction/del-jurisdiction">删除权限</router-link> </MenuItem>-->
        <!--</Submenu>-->



    </Menu>
</template>

<script>
export default {
  name: "sidebarMenu",
  props: {
    menuList: Array,
    iconSize: Number,
    menuTheme: {
      type: String,
      default: "dark"
    },
    openNames: {
      type: Array
    }
  },
  mounted() {
    console.log("side", this.openNames, this.$route.name);
  },
  methods: {
    // changeMenu (active) {
    //     this.$emit('on-change', active);
    //      console.log('=1=1=1=1=1=11==1=11==',active)
    //     // if(this.openNames.indexOf(data)>-1){
    //     //     this.openNames.remove(data)
    //     // }else{
    //     //     this.openNames.push(data)
    //     // }
    //     console.log(this.openNames)
    // },
    // itemTitle (item) {
    //     if (typeof item.title === 'object') {
    //         return this.$t(item.title.i18n);
    //     } else {
    //         return item.title;
    //     }
    // }
    menuSelect(name) {

      this.$store.commit("addOpenSubmenu", name);
      // console.log("side", this.openNames, this.$route.name);
      // console.log('=1=1=1=1=1=11==1=11==',data,row,index)
      // if(this.openNames.indexOf(data)>-1){
      //     this.openNames.remove(data)
      // }else{
      //     this.openNames.push(data)
      // }
      // console.log(this.openNames)
    }
  },
  updated() {
      this.$nextTick(() => {
      if (this.$refs.sideMenu) {
        this.$refs.sideMenu.updateOpened();
      }
    });
  }
};
</script>
<style>
router-link {
  color: white;
}
</style>

