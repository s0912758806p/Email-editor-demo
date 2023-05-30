<template>
  <div class="email-editor">
      <div class="email-editor-button-box">
        <a-button class="editor-button" type="primary" v-text="'儲存設計'" @click="saveDesign()"/>
        <a-button class="editor-button" type="primary" v-text="'匯出HTML'" @click="exportHTML()"/>
      </div>

      <a-layout-content>
        <EmailEditor 
          ref="emailEditorRef"
          class="email-ediotr"
          :minHeight="minHeight"
          :projectId="projectId"
          :tools="state.tools"
          :options="state.options"
          @load="editorLoaded"
        />
      </a-layout-content>

      <input
        class="no-see"
        type="file" 
        ref="uploadRef" 
        accept="image/*" 
        @change="handleChange"
      >
      <a-button class="no-see" @click="openUpload()" />
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { EmailEditor } from 'vue-email-editor'

const emailEditorRef = ref(null)
const uploadRef = ref(null)

const minHeight = ref('500px')
const projectId = ref(1) // 1:全功能展示模式(proxy記得關掉)
const image = ref(undefined)

const state = reactive({
tools: {},
options: {},
fileList: [],
done: () => {}
})

const isLocalDomain = computed(()=> window.location.hostname === '127.0.0.1')

const openUpload = () => {
uploadRef.value.click()
}

const handleChange = (info) => {
image.value = undefined
const imageFile = info.target?.files[0]
const reader = new FileReader();

reader.onload = (e)=> {
  image.value = e.target.result

  if(image.value) {
    const done = state.done
    done({url: 'https://www.antdv.com/assets/logo.1ef800a8.svg'})
  }
}

reader.readAsDataURL(imageFile);
}

const editorSetting = () => {
emailEditorRef.value.editor.setLocale('zh-TW')

emailEditorRef.value.editor.setDisplayMode('web')

emailEditorRef.value.editor.setAppearance({
  theme: 'light',
    panels: {
      tools: {
        dock: 'right'
      }
    }
})
}

const editorLoaded = () => {
if(localStorage.getItem('saveDesign')) {
  const save = JSON.parse(localStorage.getItem('saveDesign'))
  emailEditorRef.value.editor.loadDesign(save)
}

editorSetting()

if(!isLocalDomain.value) {
  emailEditorRef.value.editor.registerCallback('selectImage', (data, done)=> {
    openUpload()
    state.done = done
  })
} 
}

const saveDesign = () => {
emailEditorRef.value.editor.saveDesign((design)=> {
  // console.log(design);
  localStorage.removeItem('saveDesign')
  localStorage.setItem('saveDesign', JSON.stringify(design))
})
}

const exportHTML = () => {
emailEditorRef.value.editor.exportHtml((data)=> {
  // console.log(data);
  const blob = new Blob([data.html], { type: 'text/html;charset=utf-8'})
  const tempUrl = URL.createObjectURL(blob)

  const downloadLink = document.createElement('a')
  downloadLink.href = tempUrl
  downloadLink.download = 'exportedHTML.html'
  downloadLink.click()
  URL.revokeObjectURL(tempUrl);
})
}
</script>

<style lang="less" scoped>
.email-editor-button-box {
padding-top: 16px;
padding-left: 16px;

.editor-button {
  margin-right: 16px;
}
}

.email-ediotr {
height: 700px;
}

.no-see {
visibility: hidden;
}
</style>