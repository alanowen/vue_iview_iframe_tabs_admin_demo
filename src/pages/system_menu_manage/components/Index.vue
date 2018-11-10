
<template>
    <div>
        <Button :style="{'margin-bottom': '5px'}" size="small" type="primary"  @click="() => this.$router.push({ name: 'Edit' })">添加</Button>
        <Table :columns="columns"></Table>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: '菜单标识',
                        key: 'menuLabel'
                    },
                    {
                        title: '菜单名称',
                        key: 'menuName'
                    },
                    {
                        title: '菜单链接',
                        key: 'menuUrl'
                    },
                    {
                        title: '菜单图标',
                        key: 'menuIcon'
                    }
                ],

                data: []
            }
        },

        mounted() {

        }
    }
</script>