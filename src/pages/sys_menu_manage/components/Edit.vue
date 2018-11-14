<template>
    <div>
        <Button :style="{'margin-bottom': '5px'}" size="small" @click="() => this.$router.back(-1)">返回</Button>
        <Form :model="formItem" :label-width="80" :style="{width: '500px', margin: '0 auto'}">
            <FormItem label="菜单标识">
                <Input v-model="formItem.menuLabel"></Input>
            </FormItem>
            <FormItem label="父菜单">
                <RadioGroup v-model="formItem.radio">
                    <Radio label="1">是</Radio>
                    <Radio label="0">否</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="菜单名称">
                <Input v-model="formItem.menuName"></Input>
            </FormItem>
            <FormItem label="菜单链接">
                <Input v-model="formItem.menuUrl"></Input>
            </FormItem>
            <FormItem label="菜单图标">
                <Select v-model="formItem.menuIcon" filterable @on-change="selectIcon">
                    <Option v-for="icon in icons" :value="icon" :label="icon" :key="icon" :style="{ display: 'inline-block', margin: '5px'}">
                        <div style="text-align: center; width: 145px; height: 100px; cursor: pointer; padding-top: 10px;">
                            <Icon size="30" :type="icon"></Icon>
                            <p style="padding-top: 15px; margin: 5px; font-size: 14px;">{{ icon }}</p>
                        </div>
                    </Option>
                </Select>
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
                menuId: null,
                menuName: null,
                menuIcon: null,
                menuUrl: null,
                menuLabel: null,
                parentMenuId: null
            },
            icons: [
                'ios-add',
                'ios-settings',
                'md-add',
                'ios-add-circle',
                'ios-add-circle-outline'
            ]
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
        },

        selectIcon(value) {
            console.log(this.formItem.menuIcon)
            // this.formItem.menuIcon = value
        }
    }
}
</script>

