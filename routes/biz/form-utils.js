


/**
 * 将word的部分字母大写后返回 默认首字母大写
 * @param {string} word 
 * @returns {string} 
 */
const getUpperCase = (word, startIndex = 0, endIndex = 1) => {
    if (startIndex > word.length || endIndex > word.length) {
        return 'error:word长度不够'
    }
    return word.slice(startIndex, endIndex).toLocaleUpperCase() + word.slice(endIndex)
}
const formComp = {
    input: (element) => `
    <el-form-item
      prop="${element.prop.field}"
      label="${element.form_config.label}"
    >
      <el-input
        v-model="formData.${element.prop.field}"
        placeholder="${element.prop.placeholder}"
        :readonly="${element.prop.readonly}"
        :disabled="${element.prop.disabled}"
        :clearable="${element.prop.clearable}"
        :showPassword="${element.prop.showPassword}"
      >
      </el-input>
    </el-form-item>
      `,
    textarea: (element) => `
    <el-form-item
      prop="${element.prop.field}"
      label="${element.form_config.label}"
    >
      <el-input
        v-model="formData.${element.prop.field}"
        placeholder="${element.prop.placeholder}"
        :readonly="${element.prop.readonly}"
        :disabled="${element.prop.disabled}"
        type="textarea"
        :rows="${element.prop.rows}"
      >
      </el-input>
    </el-form-item>
      `,
    select: (element) => `
    <el-form-item
      prop="${element.prop.field}"
      label="${element.form_config.label}"
    >
      <el-select
        v-model="formData.${element.prop.field}"
        placeholder="${element.prop.placeholder}"
        :readonly="${element.prop.readonly}"
        :disabled="${element.prop.disabled}"
        :filterable="${element.prop.filterable}"
        :clearable="${element.prop.clearable}"
      >
        <el-option 
        v-for="item in options${getUpperCase(element.prop.field)}"
        :key="item.value"
        :value="item.value"
        :label="item.label"
        >
        </el-option>
      </el-select>
    </el-form-item>
      `,
    checkbox: (element) => `
    <el-form-item
      prop="${element.prop.field}"
      label="${element.form_config.label}"
    >
      <el-checkbox-group
        v-model="formData.${element.prop.field}"
        placeholder="${element.prop.placeholder}"
        :readonly="${element.prop.readonly}"
        :disabled="${element.prop.disabled}"
      >
        <el-checkbox 
        v-for="item in options${getUpperCase(element.prop.field)}"
        :key="item.value"
        :value="item.value"
        :label="item.label"
        >
        {{item.label}}
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
      `,
    color: (element) => `
    <el-form-item
      prop="${element.prop.field}"
      label="${element.form_config.label}"
    >
      <el-color-picker
        v-model="formData.${element.prop.field}"
        :readonly="${element.prop.readonly}"
        :disabled="${element.prop.disabled}"
      >
      </el-color-picker>
    </el-form-item>
    `,
    date: (element) => `
    <el-form-item
      prop="${element.prop.field}"
      label="${element.form_config.label}"
    >
      <el-date-picker
        v-model="formData.${element.prop.field}"
        :readonly="${element.prop.readonly}"
        :disabled="${element.prop.disabled}"
        value-format="${element.prop.valueFormat}"
        format="${element.prop.format}"
        type="${element.prop.type}"
        placeholder="${element.prop.placeholder}"
      >
      </el-date-picker>
    </el-form-item>
    `,
    number: (element) => `
    <el-form-item
      prop="${element.prop.field}"
      label="${element.form_config.label}"
    >
      <el-input-number
        v-model="formData.${element.prop.field}"
        :readonly="${element.prop.readonly}"
        :disabled="${element.prop.disabled}"
        :step="${element.prop.step}"
        :min="${element.prop.min}"
        :max="${element.prop.max}"
        placeholder="${element.prop.placeholder}"
        controls-position="${element.prop.controlsPosition}"
      >
      </el-input-number>
    </el-form-item>
    `,
    switch: (element) => `
    <el-form-item
      prop="${element.prop.field}"
      label="${element.form_config.label}"
    >
      <el-switch
        v-model="formData.${element.prop.field}"
        :disabled="${element.prop.disabled}"
        activeText="${element.prop.activeText}"
        inactiveText="${element.prop.inactiveText}"
      >
      </el-switch>
    </el-form-item>
    `,
    time: (element) => `
    <el-form-item
      prop="${element.prop.field}"
      label="${element.form_config.label}"
    >
      <el-time-picker
        v-model="formData.${element.prop.field}"
        :disabled="${element.prop.disabled}"
        :readonly="${element.prop.readonly}"
        :arrowControl="${element.prop.arrowControl}"
        :clearable="${element.prop.clearable}"
        :isRange="${element.prop.isRange}"
        format="${element.prop.format}"
        inactiveText="${element.prop.inactiveText}"
        placeholder="${element.prop.placeholder}"
      >
      </el-time-picker>
    </el-form-item>
      `,   
    button: (element) => `
    <el-form-item>
      <el-button
      :round="${element.prop.round}"
      :link="${element.prop.link}"
      :bg="${element.prop.bg}"
      :text="${element.prop.text}"
      :plain="${element.prop.plain}"
      :disabled="${element.prop.disabled}"
      size="${element.prop.size}"
      type="${element.prop.type}"
      @click="onClick${getUpperCase(element.prop.field)}"
      >
      ${element.prop.name}
      </el-button>
    </el-form-item>
    `, 
    grid: (element) => {
      let col = ''
      const { prop: { cols, gutter } } = element
      cols.forEach((item) => {
        if (item.list instanceof Array) {
          item.list.forEach((com) => {
            col += `
            <el-col :span='${item.span}'>
                ${formComp[com.comp](com)}
            </el-col>`
          })
        } else {
          col += ''
        }
      })
      const rowTemplate = `
      <el-row :gutter='${gutter}'>
      ${col}
      </el-row>`
      return rowTemplate
    },
    card(element) {
      const { header, card: { list }, shadow } = element.prop
      let formStr = ''
      list.forEach((com) => {
        formStr += `
        ${formComp[com.comp](com)}
        `
      })
      const cardTemplate = `
      <el-card header='${header}' shadow='${shadow}'>
        ${formStr}
      </el-card>
      `
      return cardTemplate
    },
    collapse(element) {
      const { title, collapse: { list } } = element.prop
      let formStr = ''
      list.forEach((com) => {
        formStr += `
        ${formComp[com.comp](com)}
        `
      })
      const cardTemplate = `
      <el-collapse>
        <el-collapse-item 
        title="${title}"
        name="${title}"
        >
        ${formStr}
        </el-collapse-item>
      </el-collapse>
      `
      return cardTemplate
    },
    createOptions: (element) => {
      let optionsObj = ''
      const { prop: { options, field } } = element
      options.forEach((item) => {
        const objStr = `
          {
            label:'${item.label}',
            value:'${item.value}'
          },
        `
        optionsObj += objStr
      })
     
      const optionSfc = `
        const options${getUpperCase(field)} = reactive([${optionsObj}])
      `
      return optionSfc
    },
    createRuleFunc: (element) => {
      const { prop: { field }, form_config: { rules: { required, regular, message }, label } } = element
      if (required && regular) {
        const fnSfc = `
          const check_${field} = (rule: any, value: any, callback: any) =>{
            if(!value){
              callback(new Error('请填写${label}(${field})'))
            }else if(!/${regular}/.test(value)) {
              callback(new Error('${message}'))
            }else {
              callback()
            }
          }
        ` 
        return fnSfc
      }
      return ''
    },
    createRules: (element) => {
      const { prop: { field }, form_config: { rules: { required, regular, message, trigger } } } = element
      if (required) {
        const ruleListSfc = `${field}:[{
          required:true,
          trigger:'${trigger}',
          message:'${message}',
          ${ regular ? 'validator:check_' + field : ''}
        }],`
        return ruleListSfc
      }
      return ''
    },
    createFunction: (element) => {
      const { prop: { field, clickEvent } } = element
      if (clickEvent) {
        return `
        const onClick${getUpperCase(field)} = () =>{
          ${clickEvent}
        }
        `
      }
    },
    createRulesV2: (element) => {
      const { prop: { field }, form_config: { rules: { required, regular, message, trigger } } } = element
      if (required) {
        const ruleListSfc = `${field}:[{
          required:true,
          trigger:'${trigger}',
          message:'${message}',
          ${ regular ? 'validator:this.check_' + field : ''}
        }],`
        return ruleListSfc
      }
      return ''
    },
    createFunctionV2: (element) => {
      const { prop: { field, clickEvent } } = element
      if (clickEvent) {
        return `
        onClick${getUpperCase(field)}(){
          ${clickEvent}
        },
        `
      }
    },
    createRuleFuncV2: (element) => {
      const { prop: { field }, form_config: { rules: { required, regular, message }, label } } = element
      if (required && regular) {
        const fnSfc = `
          check_${field}(rule, value, callback){
            if(!value){
              callback(new Error('请填写${label}(${field})'))
            }else if(!/${regular}/.test(value)) {
              callback(new Error('${message}'))
            }else {
              callback()
            }
          },
        ` 
        return fnSfc
      }
      return ''
    },
    createOptionsV2: (element) => {
      let optionsObj = ''
      const { prop: { options, field } } = element
      options.forEach((item) => {
        const objStr = `
          {
            label:'${item.label}',
            value:'${item.value}'
          },
        `
        optionsObj += objStr
      })
     
      const optionSfc = `
        options${getUpperCase(field)}: [${optionsObj}],
      `
      return optionSfc
    },
  }
/**
 * 生成sfc
 * @param {Object} formConfig
 * @returns {String}  formSfc
 */
const createFormSfc =  (formConfig) => {
    let formItemStr = ''
    let formDataSfc = ''
    let rules = ''
    let ruleFnSfc = ''
    const deepFromSfc = (list) => {
        list.forEach((item) => {
        formItemStr += formComp[item.comp](item)
        })
    }
    const deepFormConfigList = (list) => {
        if (list instanceof Array) {
        list.forEach((item) => {
            if (item.type != 'container') {
            if (item.comp != 'button') {
                rules += formComp.createRules(item)
                ruleFnSfc += formComp.createRuleFunc(item)
            }
            if (['select', 'checkbox'].includes(item.comp)) {
                formDataSfc += formComp.createOptions(item)
            } else if (['button'].includes(item.comp)) {
                formDataSfc += formComp.createFunction(item)
            }
            } else if (item.comp == 'grid') {
            item.prop.cols.forEach((item) => {
                deepFormConfigList(item.list)
            })
            } else if (item.comp == 'card') {
            deepFormConfigList(item.prop.card.list) 
            } else if (item.comp == 'collapse') {
            deepFormConfigList(item.prop.collapse.list) 
            }
        })
        }
    }
    deepFormConfigList(formConfig.list)
    deepFromSfc(formConfig.list)
    let formSfc = `
    <template>
        <el-form
        size="${formConfig.formProp.size}"
        label-position="${formConfig.formProp.labelPosition}"
        label-width="${formConfig.formProp.labelWidth}"
        ref="formRef"
        :model="formData"
        :rules="rules"
        >
        ${formItemStr}
        </el-form>
    </template>
    
    <script lang='ts' setup >
    import { reactive, toRefs, ref, PropType } from 'vue'
    import type { FormInstance } from 'element-plus'
    interface obj {
        [key:string]:any
    }
    const formRef = ref<FormInstance>()
    const formData = reactive<obj>({})
    ${ruleFnSfc}
    const rules = reactive<obj>({${rules}})
    const getFormData = () => formData
    ${formDataSfc}
    const resetForm = () => {
        if (!formRef.value) return
        formRef.value.resetFields()
    }
    defineExpose({ getFormData, resetForm })
    </script>
    <style scoped lang='scss'>
    </style>
    `
    return formSfc
}

module.exports = createFormSfc