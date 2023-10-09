<template>
  <!--注释文本-->
  <div class="visitor-success layout-1">
    <div class="page-head">
      <div class="success-tips">{{ $t('预约登记成功') }}</div>
    </div>
    <div class="success-content page-main">
      <img class="success-image" src="../../assets/success.png" alt="" />
      <p class="success-title">{{ $t('预约登记成功') }}</p>
      <p class="success-info">
        {{ $t('预约结果，将通过微信模板消息或短信通知您 请注意查收！') }}
      </p>
      <van-button
        class="success-btn"
        @click="handleGoHome"
        block
        round
        type="primary"
        :data-value="abc"
      >
        {{ $t('返回首页') }}
      </van-button>
    </div>
  </div>
</template>

<script setup>

const abc = reactive({
  value: '1'
})
// 返回首页
const handleGoHome = (path, query = {}) => {
  console.log('Hello')
}
</script>
<style lang="scss">
.visitor-success {
  .success-tips {
    padding: 0 15px;
    font-size: 18px;
    color: #fff;
    margin-top: 30px;
    box-sizing: border-box;
  }
  .success-content {
    text-align: center;
    .success-image {
      width: 118px;
      height: 118px;
      margin-top: 100px;
    }
    .success-title {
      font-size: 16px;
      color: #010101;
      font-weight: bold;
    }
    .success-info {
      width: 280px;
      margin: 0 auto;
      font-size: 14px;
      color: #999;
      line-height: 26px;
      margin-bottom: 80px;
    }
    .success-btn {
      width: 118px;
      margin: 0 auto;
    }
  }
}
</style>
