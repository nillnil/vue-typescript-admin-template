<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <breadcrumb
      id="breadcrumb-container"
      class="breadcrumb-container"
    />
    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <error-log class="errLog-container right-menu-item hover-effect" />
      </template>
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="hover"
      >
        <div class="avatar-wrapper">
          <img
            :src="avatar+'?imageView2/1/w/80/h/80'"
            class="user-avatar"
          >
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item>
            <div @click="handlePwd">
              修改密码
            </div>
          </el-dropdown-item>
          <el-dropdown-item>
            <a
              class="field-label"
              @click="changeTheme"
            >
              切换皮肤
            </a>
          </el-dropdown-item>
          <el-dropdown-item
            divided
            @click.native="logout"
          >
            <span style="display:block;">
              退出登录
            </span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog
      title="修改密码"
      :visible.sync="passwordFormVisible"
      width="600px"
    >
      <el-form
        ref="form"
        class="small-space"
        :model="updatePwd"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item
          label="原密码"
          prop="oldPwd"
        >
          <el-input
            ref="oldPswInp"
            v-model="updatePwd.oldPwd"
            type="password"
            auto-complete="off"
          />
        </el-form-item>
        <el-form-item
          label="新密码"
          prop="newPwd"
        >
          <el-input
            v-model="updatePwd.newPwd"
            type="password"
            auto-complete="off"
          />
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="checkPwd"
        >
          <el-input
            v-model="updatePwd.checkPwd"
            type="password"
            auto-complete="off"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        v-loading="formLoading"
        class="dialog-footer"
      >
        <el-button
          size="small"
          @click="passwordFormVisible = false"
        >
          取 消
        </el-button>
        <el-button
          size="small"
          type="primary"
          :disabled="submitDisabled"
          @click="handlePwdSubmit"
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'
import { UserModule } from '@/store/modules/user'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import ErrorLog from '@/components/ErrorLog/index.vue'
import Hamburger from '@/components/Hamburger/index.vue'
import { toggleClass } from '@/utils'
import '@/assets/custom-theme/index.css'
import { updatePwd as updatePwdApi } from '@/api/system'
import { encrypt } from '@/utils/md5'

@Component({
  name: 'Navbar',
  components: {
    Breadcrumb,
    ErrorLog,
    Hamburger
  }
})
export default class extends Vue {
  private passwordFormVisible = false
  private submitDisabled = false
  private rules = {
    oldPwd: [{
      required: true, message: '原密码不能为空', trigger: 'blur'
    }],
    newPwd: [{
      required: true, message: '新密码不能为空', trigger: 'blur'
    }, {
      min: 6, message: '密码最少6位', trigger: 'blur'
    }],
    checkPwd: [{
      required: true,
      trigger: 'blur',
      validator: (rule: string, value: string, callback: Function) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.updatePwd.newPwd) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      }
    }]
  }

  private updatePwd = {
    oldPwd: null,
    newPwd: null,
    checkPwd: null
  }

  private formLoading = false

  get sidebar() {
    return AppModule.sidebar
  }

  get device() {
    return AppModule.device.toString()
  }

  get avatar() {
    return UserModule.avatar
  }

  private toggleSideBar() {
    AppModule.ToggleSideBar(false)
  }

  private async logout() {
    await this.$confirm('确定退出吗？', '提示').catch(e => e)
    await UserModule.LogOut()
    this.$router.push(`/login?redirect=${this.$route.fullPath}`)
  }

  private changeTheme() {
    toggleClass(document.body, 'custom-theme')
  }

  private resetFields(formName: string) {
    return new Promise((resolve, reject) => {
      this.$nextTick(() => {
        const ref: any = this.$refs[formName]
        ref.resetFields()
        resolve()
      })
    })
  }

  private validate(formName: string) {
    return new Promise((resolve, reject) => {
      const ref: any = this.$refs[formName]
      ref.validate((rs: any) => {
        if (rs) {
          resolve(rs)
        }
      })
    })
  }

  private handlePwd() {
    this.passwordFormVisible = true
    this.resetFields('form')
  }

  private async handlePwdSubmit() {
    await this.validate('form')
    const oldPwd = this.updatePwd.oldPwd || ''
    const newPwd = this.updatePwd.newPwd || ''
    if (oldPwd === newPwd) {
      this.$message.warning('新密码不能与旧密码一样')
      return
    }
    this.submitDisabled = true
    await updatePwdApi(encrypt(oldPwd), encrypt(newPwd)).then(() => {
      UserModule.LogOut().then(() => {
        this.$message.success('密码修改成功，请重新登录！')
        this.$router.push('/login')
      })
    }).catch(_ => {
      this.submitDisabled = false
    })
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    padding: 0 15px;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 10px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
      }
    }
  }
}
</style>
