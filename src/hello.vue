<template lang="pug">
  div
    button(@click="getCode") 重新获取二维码
    br
    img(:src="imgSrc")
    br
    p 登录结果: {{ loginResult }}
    br
    button(@click="uploadCode") 上传代码
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
export default {
  data() {
    return {
      imgSrc: '',
      loginResult: '等待扫码...',
      timer1: -1,
      timer2: -1,
    }
  },
  created () {

  },
  mounted () {
    this.getCode()
    this.getLoginResult()
  },
  methods: {
    getCode () {
      axios.get(
        'api/v2/login?qr-format=image&result-output=/Users/hcm-b0241/side_project/mp_ci_test/loginresult.json',
        {
          responseType: 'blob'
        }
      )
      .then(res => {
        console.warn('res', res.data)
        this.imgSrc = URL.createObjectURL(res.data)
      })
      .catch(err => {
        console.warn('err', err)
      })
    },
    getLoginResult () {
      this.timer1 = setInterval(() => {
        const res = require('../loginresult.json')
        // console.warn('getLoginResult res', res)
        if (res && res.status === 'SUCCESS') {
          this.loginResult = '扫码登录成功'
        } else {
          this.loginResult = res.error
        }
      }, 500)
    },
    uploadCode () {
      axios.get(
        'api/v2/upload?project=/Users/hcm-b0241/side_project/mp_ci_test/mp1&version=v1.0.0&desc=test_mp&info-output=/Users/hcm-b0241/side_project/mp_ci_test/mp_info.json'
      )
      .then(res => {
        console.warn('res', res)
      })
      .catch(err => {
        console.warn('err', err)
      })
    },
    getUploadResult () {
      this.timer2 = setInterval(() => {
        try {
          const res = require('../mp_info.json')
          console.warn('getUploadResult res', res)
          // if (res && res.status === 'SUCCESS') {
          //   this.loginResult = '扫码登录成功'
          // } else {
          //   this.loginResult = res.error
          // }
        } catch (err) {
          console.warn(err)
        }
      }, 500)
    }
  }
}
</script>

<style lang="stylus" scoped>
.hello
  width 375px
  text-align center
</style>
