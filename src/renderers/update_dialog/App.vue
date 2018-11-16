<template>
    <div>
        正在检查更新
    </div>
</template>

<script>

const { ipcRenderer } = require('electron')

export default {
    mounted() {
        ipcRenderer.send('update-dialog-mounted')
    }
}
</script>
