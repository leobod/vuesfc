<template>
  <div class="ApproveBtnGroup ITFormApproveBtnGroup">
    <template v-if="isApprove">
      <div class="BtnGroup">
        <el-button
          v-if="isAppoint"
          type="primary"
          size="small"
          @click="onSettingSpecial"
        >
          {{ pageType === 15 ? "指定分部负责人" : "指定人员" }}
        </el-button>
        <el-button
          v-if="isSeal"
          type="primary"
          size="small"
          :style="{
            backgroundColor: '#00B050',
            color: '#FFFFFF',
          }"
          @click="handleChooseSeal"
        >
          盖章
        </el-button>
        <el-button
          :loading="loading.audit"
          :disabled="loading.audit"
          type="primary"
          size="small"
          @click="onAgree"
        >
          同意
        </el-button>
        <el-button
          :loading="loading.audit"
          :disabled="loading.audit"
          size="small"
          :style="{
            backgroundColor: '#F56C6C',
            color: '#FFFFFF',
          }"
          @click="onReject"
        >
          拒绝
        </el-button>
        <el-button
          :loading="loading.print"
          :disabled="loading.print"
          type="primary"
          size="small"
          @click="onPrint"
        >
          打印
        </el-button>
      </div>
    </template>
    <template v-else>
      <!--重新提交按钮组-->
      <div v-if="pageEdit === 3" class="BtnGroup">
        <el-button
          :loading="loading.resubmit"
          :disabled="loading.resubmit"
          type="primary"
          size="small"
          @click="onRevoke"
        >
          撤销
        </el-button>
        <el-button
          :loading="loading.print"
          :disabled="loading.print"
          type="primary"
          size="small"
          @click="onPrint"
        >
          打印
        </el-button>
        <el-button
          :loading="loading.resubmit"
          :disabled="loading.resubmit"
          type="primary"
          size="small"
          @click="onReSubmit"
        >
          提交
        </el-button>
        <el-button
          :loading="loading.resubmit"
          :disabled="loading.resubmit"
          type="primary"
          size="small"
          @click="onSaveToDraft"
        >
          保存到草稿箱
        </el-button>
      </div>
      <!--查看按钮组-->
      <div v-else class="BtnGroup">
        <el-button
          :loading="loading.print"
          :disabled="loading.print"
          type="primary"
          size="small"
          @click="onPrint"
        >
          打印
        </el-button>
      </div>
    </template>

    <!-- 流程状态 或 流转记录 -->
    <template v-if="pageType < 12">
      <!-- 流程状态 -->
      <div class="customize-form-submit-area">
        <el-table :data="formApprove" class="approve-area-table">
          <el-table-column prop="Remark" label="签字意见" align="center" />
          <el-table-column prop="SOperator" label="操作者" align="center" />
          <el-table-column prop="TOperate" label="时间" align="center" />
          <el-table-column prop="NodeName" label="节点" align="center" />
          <el-table-column
            prop="ApprovalState"
            label="审批状态"
            align="center"
          />
        </el-table>
      </div>
    </template>
    <template v-else>
      <!--流转记录-->
      <DtpRecord
        style="margin-top: 20px"
        :toggle="appendTable.flowRecord"
        :table-data="flowRecord"
        @toggle="
          () => {
            appendTable.flowRecord = !appendTable.flowRecord;
          }
        "
      />
      <!--流转记录用于打印-->
      <div ref="flowRecord" class="DtpRecordHidden">
        <DtpRecord
          style="margin-top: 20px; width: 760px"
          toggle
          :table-data="flowRecord"
        />
      </div>
    </template>

    <SealSelectDialog
      v-if="dialog.seal.show"
      title="选择盖章图片"
      @row-click="handleRowClick"
      @close="dialog.seal.show = false"
    />

    <RejectReasonDialog
      v-if="dialog.rejectReason.show"
      title="拒绝理由"
      @close="dialog.rejectReason.show = false"
      @submit="onPostWriteRejectReason"
    />

    <!--文件申请单，审批指定分部负责人-->
    <DocumentApplicationAppointDialog
      v-if="dialog.appoint.show && pageType === 15"
      title="指定分部负责人"
      :code="code"
      :form-list="dialog.appoint.formList"
      @close="dialog.appoint.show = false"
      @submit="handlePostSubmitAppoint"
    />
  </div>
</template>

<script>
import SealSelectDialog from "@/views/ProcedureMgr/Checklist2/components/SealSelectDialog";
import { completeFilePath, deepClone } from "@/utils";
import {
  postAgree,
  postRefuse,
  Resubmit,
  Revoke,
  saveDdraftAction,
} from "@/api/FlowEdit";
import { GetAppointNode } from "@/api/WfTemplate";
import DocumentApplicationAppointDialog from "./DocumentApplicationAppointDialog";
import DtpRecord from "@/views/ProcedureMgr/components/FlowRecord.vue";
import RejectReasonDialog from "@/views/ProcedureMgr/Checklist2/components/RejectReasonDialog";

export default {
  name: "ITFormApproveBtnGroup",
  components: {
    RejectReasonDialog,
    DtpRecord,
    DocumentApplicationAppointDialog,
    SealSelectDialog,
  },
  props: {
    code: [String, Number],
    formRef: Object,
    form: Object,
    formApprove: {
      type: Array,
      default: () => {
        return [];
      },
    },
    historyStampList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    vdrList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    flowRecord: {
      type: Array,
      default: () => {
        return [];
      },
    },
    pageType: {
      type: [String, Number],
      default: () => {
        return 1;
      },
    },
    pageEdit: {
      type: Number,
      default: function () {
        return 0;
      },
    },
    isApprove: Boolean,
    isAppoint: Boolean,
    appointHistory: {
      type: Array,
      default: () => {
        return [];
      },
    },
    isSeal: Boolean,
  },
  data() {
    return {
      loading: {
        resubmit: false,
        seal: false,
        audit: false,
        print: false,
      },
      /* 打印时需要附加的表格 */
      appendTable: {
        flowRecord: false,
      },
      dialog: {
        seal: {
          show: false,
        },
        appoint: {
          show: false,
          formList: null,
        },
        rejectReason: {
          show: false,
        },
      },
    };
  },
  methods: {
    test() {
      console.log("TEST");
    },
    /**
     * 点击盖章
     */
    handleChooseSeal: function () {
      this.dialog.seal.show = true;
    },

    onAgree: function () {
      const addNewVdrList = deepClone(
        this.vdrList.map((i) => {
          delete i.active;
          return i;
        })
      );
      /* 需要盖章,且当前盖章数量为0 */
      if (this.isSeal && addNewVdrList.length < 1) {
        this.$message({ type: "warning", message: "请选择签名" });
        this.handleChooseSeal();
        return;
      }
      this.form.approval = "";
      this.form.sealData = [...this.historyStampList, ...addNewVdrList];
      /* 是否需要填写审批意见 */
      if (this.form.attribute && this.form.attribute.FormIsTip) {
        this._forceWriteRemark();
      } else if (
        this.pageType === 15 &&
        this.form.attribute &&
        this.form.attribute.IsAppoint
      ) {
        /* 文件件申请单,当有指定人员标识时，警告提示 */
        this._warnSetAppointAtDocumentApplication();
      } else {
        this._agree();
      }
    },

    /**
     * 指定条件，强制填写审批意见
     * @returns {string}
     * @private
     */
    _forceWriteRemark: function () {
      this.$prompt("同意审批并填入审批意见内容", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPlaceholder: "请填写请输入审批意见内容",
        inputValue: "",
        inputValidator(value) {
          if (value === null) return "请输入审批意见内容不得为空！";
        },
      }).then(({ value }) => {
        this.form.approval = value;
        this._agree();
      });
    },

    /**
     * 文件件申请单,当有指定人员标识时，警告提示
     */
    _warnSetAppointAtDocumentApplication: function () {
      if (
        this.dialog.appoint.formList &&
        this.dialog.appoint.formList.length > 0
      ) {
        this._agree();
      } else {
        this.$confirm("是否确定不指定分部负责人", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this._agree();
        });
      }
    },

    _agree: function () {
      this.loading.audit = true;
      const finalParam = Object.assign({}, this.form);
      postAgree(finalParam)
        .then((res) => {
          this.$message.success("审批成功！");
          this.$store.dispatch("tagsView/delView", this.$route);
          this.$router.push({ path: "/ProcedureMgr/AgentProcessMgr" });
        })
        .finally(() => {
          this.loading.audit = false;
        });
    },

    onReject: function () {
      this.dialog.rejectReason.show = true;
    },

    onPostWriteRejectReason: function (val) {
      this.loading.audit = true;
      const { form, cb } = val;
      const finalParams = { code: this.code, reason: form.reason };
      postRefuse({ code: finalParams })
        .then((res) => {
          this.$message.success("操作成功！");
          this.$store.dispatch("tagsView/delView", this.$route);
          this.$router.push({ path: "/ProcedureMgr/AgentProcessMgr" });
        })
        .finally(() => {
          cb(false);
          this.dialog.rejectReason.show = false;
          this.loading.audit = false;
        });
    },

    /**
     * 处理打印
     */
    onPrint: function () {
      this.loading.print = true;
      try {
        const printElement = document.createElement("div");
        printElement.class = "print-action";
        const els_origin = this.formRef.$el;
        const els = els_origin.cloneNode(true);
        els.querySelectorAll("input.el-input__inner").forEach((block) => {
          block.setAttribute("value", block.value);
          block.setAttribute("placeholder", "");
        });
        els.querySelectorAll("textarea.el-textarea__inner").forEach((block) => {
          block.innerText = block.value;
          block.setAttribute("placeholder", "");
        });
        els.querySelectorAll("div.single--line--input").forEach((block) => {
          if (block.innerText.trim() === block.dataset.placeholder) {
            block.innerText = "";
          }
        });
        els.querySelectorAll(".input--bgcolor__remove").forEach((block) => {
          block.style.backgroundColor = "transparent";
        });
        els.querySelectorAll(".vdr-app-item").forEach((block) => {
          if (block.style.transform) {
            const regTranslate = /translate\((.*?)\)/;
            const xySize = block.style.transform;
            const result = xySize.match(regTranslate);
            const xyArr = result && result[1].split(",");
            block.style.transform = null;
            block.style.left = xyArr[0];
            block.style.top = xyArr[1];
          }
        });

        printElement.innerHTML = `<div class="customize-automate-form-parser my-element-ui-form-board">${els.innerHTML}</div>`;
        if (this.appendTable.flowRecord) {
          const flowRecordNodeOrigin = this.$refs.flowRecord;
          const flowRecordNode = flowRecordNodeOrigin.cloneNode(true);
          printElement.innerHTML = `${printElement.innerHTML} ${flowRecordNode.innerHTML}`;
        }
        // 删除按钮
        printElement.querySelector(".ApproveBtnGroup").remove();
        localStorage.setItem("printElement", printElement.innerHTML);
        window.open(
          process.env.NODE_ENV === "development"
            ? "/print?print=true"
            : window.app.VUE_APP_PRINT,
          "_blank",
          "width=800, height=600"
        );
      } catch (e) {
        console.warn(e);
      }
      this.loading.print = false;
    },

    /**
     * 点击具体的章
     */
    handleRowClick: function (row, column, event) {
      if (!this.vdrList.some((i) => i.imgCode === row.code)) {
        const img = new Image();
        img.onload = () => {
          this.vdrList.push({
            name: row.name,
            imgCode: row.code,
            x: 0,
            y: 0,
            w: img.width === 0 ? 100 : img.width,
            h: img.height === 0 ? 100 : img.height,
            active: false,
          });
        };
        img.src = completeFilePath(row.code);
        this.dialog.seal.show = false;
      } else {
        this.$message.warning("所选的盖章已存在");
      }
    },

    /**
     * 加载设置指定人员节点弹框
     */
    onSettingSpecial: function () {
      this.loading.appoint = true;
      if (this.appointHistory && this.appointHistory.length > 0) {
        /* 已经指定过的人员历史数据 */
        this.dialog.appoint.formList = this.appointHistory;
        this.dialog.appoint.show = true;
        this.loading.appoint = false;
      } else {
        GetAppointNode({ code: this.code, type: this.pageType })
          .then((res) => {
            if (res.DataList.length > 0) {
              this.dialog.appoint.formList = res.DataList;
              this.dialog.appoint.show = true;
            }
          })
          .finally(() => {
            this.loading.appoint = false;
          });
      }
    },

    /**
     * 提交最终的指定人员到表单
     */
    handlePostSubmitAppoint: function () {
      this.$emit("appoint", this.dialog.appoint.formList);
      this.dialog.appoint.show = false;
    },

    /**
     * 撤销
     */
    onRevoke: function () {
      const h = this.$createElement;
      this.$confirm("提示", {
        title: "提示",
        message: h("div", null, [
          h(
            "p",
            null,
            "被撤销的将彻底关闭,若您只是想稍后修改并(重新)提交，请点击保存按钮。您确实要撤销吗?"
          ),
          h(
            "p",
            null,
            "The withdrawn will be completely closed. if you just want to revise and (re)submit it later, please click save button. Do you want to withdraw it anyway?"
          ),
        ]),
        confirmButtonText: "是",
        cancelButtonText: "否",
      }).then(() => {
        this.loading.resubmit = true;
        const finalCodes = [this.$route.query.RevokeCode];
        Revoke({ data: finalCodes, type: 2 })
          .then((res) => {
            this.$store.dispatch("tagsView/delView", this.$route);
            this.$router.go(-1);
          })
          .finally(() => {
            this.loading.resubmit = false;
          });
      });
    },

    /**
     * 重新提交
     */
    onReSubmit: function () {
      this.formRef.onBeforeSubmit();
      this.formRef.onGetValidte().then((res) => {
        if (res.result) {
          // submit
          const val = this.formRef.onGetSubmitForm();
          const params = {};
          params.code = this.form.code;
          params.data = val;
          params.table = this.form.table;
          params.attribute = this.form.attribute;
          params.appointPerson = [];
          this.loading.resubmit = true;
          Resubmit(params)
            .then((response) => {
              this.$message.success("提交成功！");
              this.$store.dispatch("tagsView/delView", this.$route);
              this.$router.push({
                path: "/ProcedureMgr/ProcessQueryInitiatedMgr",
              });
            })
            .finally(() => {
              this.loading.resubmit = false;
            });
        } else {
          let message = "请检查输入项";
          if (res.msg && res.msg.length > 0) {
            if (res.msg[0] !== "") {
              message = res.msg[0];
            }
          }
          this.$message({ type: "warning", message: message });
        }
      });
    },

    /**
     * 重新提交的数据，保存到草稿箱
     */
    onSaveToDraft: function () {
      this.$confirm("此操作将保存到草稿, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.loading.resubmit = true;
        const params = {};
        params.code = this.form.code;
        params.data = this.form.data;
        params.table = this.form.table;
        params.attribute = this.form.attribute;
        params.type = 3;
        saveDdraftAction(params)
          .then((response) => {
            this.$message.success("保存成功！");
            this.$store.dispatch("tagsView/delView", this.$route);
            this.$router.push({ path: "/ProcedureMgr/MyDraftMgr" });
          })
          .finally(() => {
            this.loading.resubmit = false;
          });
      });
    },
  },
};
</script>

<style lang="scss">
.ITFormApproveBtnGroup {
  padding: 10px 0;

  .BtnGroup {
    padding: 10px 0;
    text-align: center;
    .el-button {
      width: 130px;
      padding: 9px 15px;
    }
    .el-button + .el-button {
      margin-left: 10px;
    }
  }
}
</style>
