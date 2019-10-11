<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-main">
        <h4>链接</h4>
        <div>
          <a
            href="https://github.com/tedtse/rw-dispatcher-es"
            target="_blank"
            class="footer-main-link"
          >代码仓库</a>
          <a
            href="https://github.com/tedtse/element-ui-rw-dispatcher-example"
            target="_blank"
            class="footer-main-link"
          >El dispatcher demo</a>
          <a
            href="https://github.com/tedtse/iview-rw-dispatcher-example"
            target="_blank"
            class="footer-main-link"
          >Ivu dispatcher demo</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
  $footer-height: 141px;
  .footer {
    background-color: #F7FBFD;
    width: 100%;
    padding: 40px 150px;
    margin-top: -$footer-height;
    box-sizing: border-box;
    height: $footer-height;
    .container {
      box-sizing: border-box;
      width: auto;
    }
    .footer-main {
      font-size: 0;
      vertical-align: top;

      h4 {
        font-size: 18px;
        color: #333;
        line-height: 1;
        margin: 0 0 15px 0;
      }
      > div {
        display: flex;
        > .footer-main-link {
          display: flex;
          flex: 1;
          margin: 0;
          line-height: 2;
          font-size: 14px;
          color: #666;
          &:hover {
            color: #333;
          }
        }
      }
    }
    .footer-social {
      float: right;
      text-align: right;
      .footer-social-title {
        color: #666;
        font-size: 18px;
        line-height: 1;
        margin: 0 0 20px 0;
        padding: 0;
        font-weight: bold;
      }
      .elementdoc {
        transition: .3s;
        display: inline-block;
        line-height: 32px;
        text-align: center;
        color: #c8d6e8;
        background-color: transparent;
        size: 32px;
        font-size: 32px;
        vertical-align: middle;
        margin-right: 20px;
        &:hover {
          transform: scale(1.2);
          color: #8D99AB;
        }
      }
      .doc-icon-gitter {
        margin-right: 0;
      }
    }
  }
  .el-popover.footer-popover {
    padding: 0;
    min-width: 120px;
    line-height: normal;
    box-shadow: 0 0 11px 0 rgba(174, 187, 211, 0.24);
    .footer-popover-title {
      border-bottom: solid 1px #eaeefb;
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: #99a9bf;
      background-color: #f8f9fe;
    }
    img {
      size: 100px;
      margin: 10px;
    }
  }
  @media (max-width: 1140px) {
    .footer {
      height: auto;
      padding: 40px 0;
    }
  }
  @media (max-width: 1000px) {
    .footer-social {
      display: none;
    }
  }
  @media (max-width: 768px) {
    .footer {
      .footer-main {
        margin-bottom: 30px;
        > div {
          display: block;
          > .footer-main-link {
            display: block;
          }
        }
      }
    }
  }
</style>
