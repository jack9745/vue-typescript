//  v-model指令绑定在组件标签上时 ，也要将值传给组件内部
//  v-model 是语法糖，是 value 和 事件一起使用的语法糖，没有破坏数据的单向流动性

// 第一个问题 什么是函数组件？？
// tsx环境

// 怎么将样式应用在tsx 中

/**
 * 如果一个组件是用名字注册的，不能直接导入 (例如，由一个库全局注册)，
 * 可以使用 resolveComponent() 来解决这个问题。
 *
 * 这是什么意思 ？？
 * */
import { defineComponent } from 'vue'

import mockJSON from '@/mock/qualification.json'

import type { CertReturnData, CertDataType } from './type'

import { cloneDeep } from 'lodash'

// 可以这样直接引用外部样式
import '@/assets/qualification.less'

// defineComponent有助于类型注解
export default defineComponent({
  // 可以给data中的数据注解类型吗 ？？
  data() {
    console.log('data')
    return {
      userInfo: {
        name: 'jack',
      },

      // 这里要这样写 不然后面的赋值会报错  下面的写法是断言成某个类型
      recommendCert: [] as Array<CertDataType>, // 推荐证书
      firstCertList: [] as Array<CertDataType>,
      secondCertList: [] as CertDataType[],
      selectedList: [],
      cateList: [], // 大的类别集合
      totalCertList: [] as CertDataType[], // 总的集合
      firstNameList: [],
      secondNameList: [],
    }
  },
  props: {
    visible: {
      type: Boolean,
    },
    certList: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    localVisible: {
      set(value: boolean) {
        this.$emit('update:visible', value)
      },
      get() {
        return this.visible
      },
    },
    localCertList: {
      get() {
        return cloneDeep(this.certList)
      },
      set(list: CertDataType[]) {
        this.$emit('update:certList', list)
      },
    },
  },
  emits: ['update:visible', 'update:certList'],

  created() {
    this.fetchData()
  },
  // 有时候我们可以不使用模板编译，而是手写渲染函数
  // 在处理高度动态的逻辑的时候，可能手写渲染函数比模板编译更加合适
  render() {
    return (
      <el-dialog v-model={this.localVisible} title="资格证书">
        <div>
          <ul class="selected-list-wrapper">
            <li class="selected-list">
              <ul class={'selected'}>
                {/* 要给selectedList 声明类型 不然 item上没有name属性*/}
                {this.selectedList.map((item, index) => {
                  return (
                    <li key={index} class="item">
                      {item}
                    </li>
                  )
                })}
              </ul>
            </li>
            <li class="btn-sure">
              <el-button type="primary" onClick={this.handleSelect}>
                确定
              </el-button>
            </li>
          </ul>
        </div>

        <main>
          <ul class={'category-wrapper'}>
            <li class={'category'}>
              <ul class={'cate'}>
                {this.totalCertList.map((item, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => this.handleSelectedCate(item)}
                      class="cate-item"
                    >
                      {item.name}
                    </li>
                  )
                })}
              </ul>
            </li>

            {/* 具体证书部分 */}
            <li class={'cert-list'}>
              <div class={'first-list'}>
                <ul class={'first-list-wrapper'}>
                  <el-checkbox-group
                    onChange={this.changeFirstList}
                    v-model={this.firstNameList}
                    style={{ display: 'flex', flexWrap: 'wrap' }}
                  >
                    {this.firstCertList.map((item, index) => {
                      return (
                        <li class={'first-item'} key={index}>
                          <el-checkbox label={item.name}></el-checkbox>
                        </li>
                      )
                    })}
                  </el-checkbox-group>
                </ul>
              </div>

              {/* 第二类 */}
              <ul class={'second-list'}>
                {this.secondCertList.map((item, index) => {
                  return (
                    <li key={index}>
                      <div class={'second-type-name'}>{item.name}</div>
                      <ul class={'second-list-wrapper'}>
                        <el-checkbox-group
                          onChange={this.changeSecondList}
                          v-model={this.secondNameList}
                          style={{ display: 'flex', flexWrap: 'wrap' }}
                        >
                          {item.subList?.map((kItem, kIndex) => {
                            return (
                              <li key={kIndex} class="second-item">
                                <el-checkbox label={kItem.name}></el-checkbox>
                              </li>
                            )
                          })}
                        </el-checkbox-group>
                      </ul>
                    </li>
                  )
                })}
              </ul>
            </li>
          </ul>
        </main>
      </el-dialog>
    )
  },
  methods: {
    changeFirstList(value: string[]) {
      console.log(value)
      console.log(this.firstNameList)
      this.selectedList = this.firstNameList.concat(this.secondNameList)
    },

    changeSecondList() {
      this.selectedList = this.firstNameList.concat(this.secondNameList)
    },

    // 选中哪个大的目录？？
    handleSelectedCate(item: CertDataType) {
      console.log(item)
      this.firstCertList = []
      this.secondCertList = []
      item.subList?.forEach((item) => {
        if (item.subList?.length) {
          this.secondCertList.push(item)
        } else {
          this.firstCertList.push(item)
        }
      })
    },
    handleSelect() {},
    async fetchData() {
      try {
        const result = await new Promise<CertReturnData>((resolve) => {
          setTimeout(() => {
            resolve(mockJSON)
          }, 100)
        })
        if (result.code === 0) {
          // error result.zpData 不存在 recommendCert 怎么解决这个问题

          // 在zpData 上定义字段的注解类型
          this.recommendCert = result.zpData.recommendCert
          const obj = {
            name: '推荐类',
            parentName: '',
            subList: this.recommendCert,
          }
          this.totalCertList = result.zpData.certs
          this.totalCertList.unshift(obj)
          this.handleRecommendCert()
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 推荐证书处理成两部分
    handleRecommendCert() {
      this.firstCertList = []
      this.secondCertList = []
      this.recommendCert.forEach((item, index) => {
        if (item.subList?.length) {
          this.secondCertList.push(item)
        } else {
          this.firstCertList.push(item)
        }
      })
      console.log(this.firstCertList)
      console.log(this.secondCertList)
    },
  },
})
