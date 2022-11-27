// 证书返回值类型
type CertReturnData = {
  code: number
  message: string
  zpData: {
    recommendCert: Array<CertDataType>
    certs: Array<CertDataType>
  }
}

// 每一项数据的类型
type CertDataType = {
  name: string
  parentName: string
  subList: CertDataType[] | null
}

// test
const list: CertDataType[] = [
  {
    name: '',
    parentName: '',
    subList: [
      {
        name: '',
        parentName: '',
        subList: [] || null,
      },
    ],
  },
]
console.log(list)

export type { CertReturnData, CertDataType }
