<template>
    <div style='position: relative;height:100%;padding:10px;'>
        <Form :model="formRight" label-position="right" :label-width="100">
            <FormItem label="description">
                <Input v-model="formRight.input1"></Input>
            </FormItem>
            <FormItem label="parentId">
                <Input v-model="formRight.input2"></Input>
            </FormItem>
            <FormItem label="resourceName">
                <Input v-model="formRight.input3"></Input>
            </FormItem>
            <FormItem label="tenantId">
                <Input v-model="formRight.input4"></Input>
            </FormItem>
            <FormItem label="url">
                <Input v-model="formRight.input5"></Input>
            </FormItem>
            <FormItem label="userId">
                <Input v-model="formRight.input6"></Input>
            </FormItem>
        </Form>
        <Form style="margin-left: 200px">
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">确定</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
            </FormItem>
        </Form>
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
                formRight: {
                    input1: '',
                    input2: '',
                    input3: '',
                    input4: '',
                    input5: '',
                    input6: '',
                },
              //  query:[],
            };
        },
        methods: {
            handleSubmit (name) {
                this.$axios({
                    method: 'post',
                    url: api.res_add(),
                    data: {
                        description: this.formRight.input1,
                        parentId: this.formRight.input2,
                        resourceName: this.formRight.input3,
                        tenantId: this.formRight.input4,
                        url: this.formRight.input5,
                        userId: this.formRight.input6
                    }
                }).then(res => {
                    if (res.data.code == 200) {
                        let query = this.formRight;
                       // this.$router.push({name:'resource_index',query:query});
                    }

                });
            },
            handleReset (name) {
                console.log(1);
            }
        }
    };
</script>
