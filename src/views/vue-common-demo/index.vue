<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <el-menu default-active="1">
          <el-menu-item index="1">
            <a href="javascript:;">通知</a>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main style="height:1800px;">
        <div id="notify">
          <el-button
            type="default"
            @click="handleNotify(1, $event)"
          >
            通用消息通知
          </el-button>
          <el-button
            type="primary"
            @click="handleNotify(2, $event)"
          >
            通用成功通知
          </el-button>
          <el-button
            type="danger"
            @click="handleNotify(3, $event)"
          >
            通用失败通知
          </el-button>
          <el-button
            type="warning"
            @click="handleNotify(4, $event)"
          >
            通用警告通知
          </el-button>
        </div>
        <back-to-top
          :custom-style="backToTopStyle"
          :visibility-height="300"
          :back-position="0"
          transition-name="fade"
        />
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BackToTop from '@/components/BackToTop/index.vue'
import { handleClipboard } from '@/utils/clipboard'
import { Notification } from 'element-ui'

export default {
  components: { BackToTop },
  setup(props: any, context: any) {
    const $this = context.root
    const backToTopStyle = {
      right: '50px',
      bottom: '50px',
      width: '40px',
      height: '40px',
      'border-radius': '4px',
      'line-height': '45px',
      background: '#e7eaf1'
    }
    const thisText = 'const $this = context.root\n'
    let tips = ''
    function handleNotify(type: number, event: MouseEvent) {
      if (type === 1) {
        tips = '$this.$notify.info(\'Test\')'
        $this.$notify.info(tips)
        handleClipboard(thisText + tips, event)
      } else if (type === 2) {
        tips = '$this.$notify.success(\'Test\')'
        $this.$notify.success(tips)
        handleClipboard(thisText + tips, event)
      } else if (type === 3) {
        tips = '$this.$notify.error(\'Test\')'
        $this.$notify.error(tips)
        handleClipboard(thisText + tips, event)
      } else if (type === 4) {
        tips = '$this.$notify.warning(\'Test\')'
        $this.$notify.warning(tips)
        handleClipboard(thisText + tips, event)
      }
    }
    return {
      backToTopStyle,
      handleNotify
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-aside {
    background-color: #fff;
  }
  .el-menu {
    border-right: 0;
  }
  .el-menu-item:hover, .el-menu-item:focus {
    outline: none;
    background-color: transparent;
  }
</style>
