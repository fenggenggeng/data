<template>
     <div style='position: relative;height:100%;padding:10px;'>
    
        <Row type="flex" justify="space-between" style="margin-bottom:5px;">
          <Col span="2" style="font-weight: 700; font-size: 18px;">集群大盘</Col> 
        <Col span="2" style="text-align:right;">
          <Button type="primary" @click="initList" :disabled="isButton">刷新</Button>
        </Col>
      </Row>
      <Table :columns="historyColumns" :data="historyData" :loading='SpinType' ></Table>
      
       <Row type="flex" justify="center" style="margin-top:30px;">
         <Col span="22" style="text-align:right;">
          <DatePicker type="datetime"  placeholder="请选择日期时间" @on-change="onHandChange" @on-open-change='changepage' @on-ok="handOk" style="width: 200px"></DatePicker>
         </Col>
        <Col span="22" style="height:400px;">
        <service-requests :option='echartsoption' ></service-requests>  
        <Spin fix  v-show="!isEchartsType">
            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>
        </Col>
      </Row>
      
      <Modal
        v-model="resModal"
        title="返回结果"
        @on-ok="modelOk"
        @on-cancel="modelOk">
        <p v-for="item in resModalList">库名：{{item.dbName}},表名：{{item.tableName}},权限：{{item.operate}}, 权限修改是否成功：{{item.secrityStatus==1?'成功':'失败'}} </p>
        
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
import api from "@/api";
import util from '@/libs/util'
import serviceRequests from '@/views/home/components/serviceRequests'
export default {
  data() {
    return {
      ajaxHistoryData: [],
      // 初始化信息总条数
      dataCount: 0,
      // 每页显示多少条
      page: {
        pageIndex: 1,
        pageSize: 10
      },
      SpinType:false,
      isEchartsType:false,
      historyColumns: [
        {
          title: "服务器名称",
          key: "hostName"
        },
        {
          title: "磁盘使用率",
          key: "diskUsageRate",
          render:(h, params)=>{
            console.log('parmas===========',params)
            let diskUsageRate=(params.row.diskUsageRate*100).toFixed();
            return diskUsageRate+'%';
          }
        },
        {
          title: "内存使用率",
          key: "memoryUsageRate",
           render:(h, params)=>{
            let memoryUsageRate=(params.row.memoryUsageRate*100).toFixed();
            return memoryUsageRate+'%';
          }
        },
        // {
        //   title: "CPU使用率",
        //   key: "cpuUsageRate"
        // },
        
      ],
      historyData: [],
      resModal:false,
      resModalList:[],
      echartsoption:{
          xAxisData:["周1", "周2", "周3", "周4", "周5", "周6", "周日"],
          seriesData:[],
      },
      filterDate:util.getStringTime(new Date(new Date().getTime()-24*60*60*1000)),
      Timeout:null,
      isButton:false,
    };
  },
  created() {
    this.initEcharts();
    this.initList();
  },
  components:{
    serviceRequests
  },
  methods: {
    initEcharts() {
      this.isEchartsType=false;
        console.log(1);
        this.$axios({
        //图标
        method: "get",
        url: api.getHostHisInformations(this.filterDate)
      }).then(res => {
            console.log(1);
            if(res.data.code===200){
                console.log(33);
                if(res.data.data.length){
            this.echartsoption={
              //  xAxisData:res.data.data.map(r=>r.createTime.slice(0,r.createTime.indexOf('.'))),
               xAxisData:res.data.data.map(r=>util.getStringTime(new Date(r.createTime))),
               seriesData:res.data.data.map(r=>r.usedDisk),
            };
            console.log( this.echartsoption)
            this.isEchartsType=true;
          }else{
              this.echartsoption={
               xAxisData:res.data.data.map(r=>r.createTime.slice(0,r.createTime.indexOf('.'))),
               seriesData:res.data.data.map(r=>r.usedDisk),
            };
            this.isEchartsType=false;
            this.$Message.error("没有数据请重新请求", 3);
          }
        }
      });
    },
    onHandChange(data) {
      this.filterDate=data
    },
    changepage(index) {
     
      // this. initList();
    },
    handOk() {
      
      this.initEcharts();
    },
  
    initList() {
      this.SpinType=true;
      this.isButton=true;
      setTimeout(()=>{
        this.isButton=false;
      },3e3)
      this.$axios({
        //列表
        method: "get",
        url: api.getHostInformations(),
      }).then(res => {
        if (res.data.code == 200 && !!res.data.data.filter(r=>r).length) {
           this.historyData = res.data.data.filter(r=>r);
           this.SpinType=false;
           
          }else{
             this.$Message.error("网络请求错误！请刷新", 3);
          }
      });
    
    },
    dbNameSelectChange() {
      this.initList();
    },
    modelOk(){
        this.resModal=false;
        this.resModalList=[];
    },
    handClick(){
      console.log('2222222===-----')
      this.echartsoption={
          xAxisData:[1,2,3,4,5,6,7],
          seriesData:[],
      }
    },
  }
};
</script>
<style >

</style>



