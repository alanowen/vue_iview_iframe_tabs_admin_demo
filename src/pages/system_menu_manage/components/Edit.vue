<template>
    <div>
        <Button :style="{'margin-bottom': '5px'}" size="small" @click="() => this.$router.back(-1)">返回</Button>
        <Form>
            <FormItem label="菜单标识">
                <Input v-model="formItem.menuLabel"></Input>
            </FormItem>
            <FormItem label="菜单名称">
                <Input v-model="formItem.menuName"></Input>
            </FormItem>
            <FormItem label="菜单链接">
                <Input v-model="formItem.menuUrl"></Input>
            </FormItem>
        </Form>
    </div>
</template>

<script>
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

    methods: {

    }
}
</script>

