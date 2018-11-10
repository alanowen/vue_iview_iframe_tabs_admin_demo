<style scoped>

body {
    height: 100%;
}

.layout{
    height: 100%;
    background: #f5f7f9;
    position: relative;
    overflow: hidden;
}
</style>
<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark">
                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu :active-name="currentMenu" theme="light" width="auto" @on-select="selectMenu">
                        <Submenu :name="item.menuName" v-for="item in menuList" :key="item.menuName">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                {{ item.menuLabel}}
                            </template>
                            <MenuItem :name="child.menuName" v-for="child in item.children" :key="child.menuName">{{ child.menuLabel }}</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Breadcrumb :style="{margin: '24px 0'}">
                        <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbItem>Components</BreadcrumbItem>
                        <BreadcrumbItem>Layout</BreadcrumbItem>
                    </Breadcrumb>
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                        <Tabs ref="tab" :capture-focus="false" type="card" size="small" closable @on-tab-remove="removeTab" @on-click="clickTab" :animated="false" :value="currentMenu">
                            <TabPane :label="tab.label" v-for="tab in tabs" :name="tab.name" v-if="tab.mount" :key="tab.name" :icon="tab.icon">
                                <keep-alive>
                                    <iframe :src="tab.url" :name="tab.name" frameborder="0" width="100%" height="100%" marginheight="0" marginwidth="0" v-on:load="loadIFrame"></iframe>
                                </keep-alive>
                            </TabPane>
                        </Tabs>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>


<script>

    import { mapState } from 'vuex'

    export default {

        data() {
            return {
                
            }
        },

        computed: {
            ...mapState({
                tabs: state => state.tabs,
                menuList: state => state.menuList,
                currentMenu: state => state.currentMenu
            })
        },

        mounted() {
        },

        methods: {
            removeTab(name) {
                this.$store.dispatch('closeTab', name)
            },

            clickTab(name) {
                this.$store.dispatch('openTab', name)
            },

            selectMenu(name) {
                if (!this.$store.getters.hasTab(name)) {
                    this.$Loading.start()
                }
                this.$store.dispatch('openTab', name)
            },

            loadIFrame() {
                this.$Loading.finish()
            }
        }
    }
</script>