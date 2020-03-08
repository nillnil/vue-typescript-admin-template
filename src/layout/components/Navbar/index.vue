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
              {{ $t('navbar.dashboard') }}
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
              {{ $t('navbar.logOut') }}
            </span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog
      title="修改密码"
      :visible.sync="passwordFormVisible"
      width="500px"
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
          prop="oldpass"
        >
          <el-input
            ref="oldPswInp"
            v-model="updatePwd.oldpass"
            type="password"
            auto-complete="off"
          />
        </el-form-item>
        <el-form-item
          label="新密码"
          prop="pass"
        >
          <el-input
            v-model="updatePwd.pass"
            type="password"
            auto-complete="off"
          />
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="checkPass"
        >
          <el-input
            v-model="updatePwd.checkPass"
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
  private rules = {
    oldpass: [{
      required: true, message: '必填', trigger: 'blur'
    }],
    pass: [{
      required: true, message: '必填', trigger: 'blur'
    }, {
      min: 6, message: '最少6位密码', trigger: 'blur'
    }],
    checkPass: [{
      validator: (rule: any, value: any, callback: any) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.updatePwd.pass) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }]
  }
  private updatePwd = {
    oldpass: null,
    pass: null,
    checkPass: null
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
    const oldPsw = this.updatePwd.oldpass
    const newPsw = this.updatePwd.pass
    if (oldPsw === newPsw) {
      this.$message.warning('新密码不能与旧密码一样')
    }
    // TODO
    // const response = await this.$http.post('/adminUser/updatePsw', { oldPsw, newPsw })
    // if (response.data.code === 0) {
    //   this.passwordFormVisible = false
    // } else if (response.data.code === -3) {
    //   const ref: any = this.$refs['oldPswInp']
    //   ref.focus()
    // }
    // this.$notify({
    //   title: '成功',
    //   message: response.data.message,
    //   type: 'success',
    //   duration: 2000
    // })
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
