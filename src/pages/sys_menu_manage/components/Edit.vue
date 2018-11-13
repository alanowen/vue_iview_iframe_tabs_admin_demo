<template>
    <div>
        <Button :style="{'margin-bottom': '5px'}" size="small" @click="() => this.$router.back(-1)">返回</Button>
        <Form :model="formItem" :label-width="80" :style="{width: '500px', margin: '0 auto'}">
            <FormItem label="菜单标识">
                <Input v-model="formItem.menuLabel"></Input>
            </FormItem>
            <FormItem label="菜单名称">
                <Input v-model="formItem.menuName"></Input>
            </FormItem>
            <FormItem label="菜单链接">
                <Input v-model="formItem.menuUrl"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="submit">提交</Button>
                <Button style="margin-left: 8px" @click="() => this.$router.back(-1)">取消</Button>
            </FormItem>
        </Form>
        
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {
            formItem: {
                menuName: null,
                menuUrl: null,
                menuLabel: null
            }
        }
    },

    mounted() {

    },

    beforeRouteEnter(to, from, next) {
        let { menu } = to.query

        next(vm => {
            if (menu) {
                vm.formItem = menu
            }
        })
    },

    methods: {
        submit() {
            this.$store.dispatch('saveMenuInfo')
        }
    }
}
</script>

