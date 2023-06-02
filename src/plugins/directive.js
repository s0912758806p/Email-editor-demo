import { createApp } from 'vue'

const app = createApp({})

/**
 * 正整數
 * @method v-integer
 */
app.directive('integer', (el) => {
  el.addEventListener('input', (e) => {
    const numReg = /^[0-9]\d*$/im
    const enReg = /[A-Za-z]/im
    const cnReg = /[\u4E00-\u9FA5]/im
    const symbolReg = /[`~!@#$%^&*()_\-+=<>?:"{}|,.;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im

    e.target.value = numReg.test(e.data) ? e.target.value : e.target.value.replace(symbolReg, '').replace(enReg, '').replace(cnReg, '')
    return Number(e.target.value)
  })
})

/**
 * 英文
 * @method v-english
 */
app.directive('english', (el) => {
  el.addEventListener('input', (e) => {
    const numReg = /[0-9]\d*$/im
    const enReg = /^[A-Za-z]+$/im
    const cnReg = /[\u4E00-\u9FA5]/im
    const symbolReg = /[`~!@#$%^&*()_\-+=<>?:"{}|,.;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im

    e.target.value = enReg.test(e.data) ? e.target.value : e.target.value.replace(symbolReg, '').replace(numReg, '').replace(cnReg, '')
    return String(e.target.value)
  })
})

/**
 * 中英文
 * @method v-cn-en
 */
app.directive('cn-en', (el) => {
  el.addEventListener('input', (e) => {
    const numReg = /[0-9]\d*$/im
    const enReg = /^[A-Za-z]+$/im
    const cnReg = /^[\u4E00-\u9FA5]/im
    const symbolReg = /[`~!@#$%^&*()_\-+=<>?:"{}|,.;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im

    e.target.value = (enReg.test(e.data) || cnReg.test(e.data)) ? e.target.value : e.target.value.replace(symbolReg, '').replace(numReg, '')
    return String(e.target.value)
  })
})

/**
 * 狀態
 * @method v-conversion-status="targetStatus"
 */
app.directive('conversion-status', (el, binding) => {
  const statusVal = binding.value

  const enableValues = new Set(['Enable', 'enable', 1, '1', true, 'true'])

  const getDisplayText = value => enableValues.has(value) ? '啟用' : '停用'
  const setDisplayText = text => (el.innerText = text)

  setDisplayText(getDisplayText(statusVal))
})

/**
 * 推播狀態
 * @method v-notify-status="targetStatus"
 */
app.directive('notify-status', (el, binding) => {
  const statusVal = binding.value

  const enableValues = new Set([1, '1'])

  const getDisplayText = value => enableValues.has(value) ? '已發送' : '未發送'
  const setDisplayText = text => (el.innerText = text)

  setDisplayText(getDisplayText(statusVal))
})

/**
 * 線上狀態
 * @method v-online-status-text="target"
 */
app.directive('online-status-text', (el, binding) => {
  const templateVal = binding.value

  const enableValues = new Set(['Enable', 'enable', 1, '1', true, 'true'])

  const getDisplayText = value => enableValues.has(value) ? 'online-status-enable' : 'online-status-disable'
  const setDisplayText = text => el.classList.add(text)

  setDisplayText(getDisplayText(enableValues.has(templateVal)))
})

/**
 * 圖片
 * @method v-default-image
 * @method v-default-image="defaultPath"
 */
app.directive('default-image', (el, binding) => {
  const defaultPath = binding.value || 'https://www.vivatv.com.tw/_nuxt/img/viva-logo-white.a1c7a9a.png'
  const imageType = ['.jpeg', '.jpg', '.png', '.svg']
  const imagePath = el.getAttribute('src')
  const isImage = imageType.some(type => imagePath.endsWith(type))

  el.setAttribute('src', isImage ? imagePath : defaultPath)
})

/**
 * 文字省略
 * @method v-ellipsis
 */
app.directive('ellipsis', {
  inserted: (el, binding) => {
    const width = el.offsetWidth
    const text = el.innerText

    let length = text.length

    while (length > 0 && el.scrollWidth > width) {
      length--
      el.innerText = `${text.substring(0, length)}...`
    }
  }
})

app.mount('#app')
