
<template>
    <div>
        <Button icon="ios-add" :style="{'margin-bottom': '5px'}" size="small" type="primary"  @click="() => this.$router.push({ name: 'Edit' })">添加</Button>
        <Table :columns="columns" :data="sysMenuList"></Table>
    </div>
</template>


<script>

    import { mapState, mapGetters } from 'vuex'

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
                    },
                    {
                        title: '操作',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    style: {
                                        'margin-right': '2px'
                                    },
                                    props: {
                                        type: 'dashed',
                                        size: 'small',
                                        icon: 'ios-settings'
                                    },
                                    on: {
                                        click: () => {
                                            let menu = this.getMenuByName(params.row.menuName)
                                            if (menu) {
                                                this.$router.push({ name: 'Edit', query: { menu } })
                                            } else {

                                            }
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'dashed',
                                        size: 'small',
                                        icon: 'ios-trash'
                                    }
                                }, '删除')
                            ])
                        }
                    }
                ]
            }
        },

        computed: {
            ...mapState({
                sysMenuList: state => state.sysMenuList,
            }),
            ...mapGetters([
                'getMenuByName'
            ])
        },

        mounted() {
            this.$store.dispatch('getSysMenuList')
        }
    }
</script>