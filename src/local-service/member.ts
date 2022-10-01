// 用本地 indexedDB 数据库来模拟服务端返回的数据

// IDBRequest 对象表示打开的数据库连接

// open方法返回这个对象 IDBOpenDBRequest ，这个对象继承 IDBRequest对象 然后多了两个方法

const request = window.indexedDB.open('management')

// 常量 数据库名称
const MEMBER = 'member'
const READONLY = 'readonly'
const READWRITE = 'readwrite'
type ReturnModel = {
  status: 'success' | 'error'
  data?: any
}
type Callback = (param: ReturnModel) => void
// 为什么没有触发这个事件处理函数
request.onupgradeneeded = function (event: Event) {
  console.log('成功升级了')

  // 创建一个仓库对象 用来存储数据
  if (!request.result.objectStoreNames.contains(MEMBER)) {
    //
    const objectStore = request.result.createObjectStore(MEMBER, {
      // autoIncrement: true,
      keyPath: 'id',
    })

    // 我的理解 过滤或者查询条件是可以用到的
    // 这个方法只能在 onupgradeneeded 里使用
    objectStore.createIndex('name', 'name', { unique: false })
    objectStore.createIndex('age', 'age', { unique: false })
    objectStore.createIndex('height', 'height', { unique: false })
    objectStore.createIndex('birth', 'birth', { unique: false })
    objectStore.createIndex('phoneNumber', 'phoneNumber', { unique: false })
  }
}

// 数据库连接成功
request.onsuccess = function (event: Event) {
  console.log('数据库连接成功')
}

// 家庭成员管理增删改查

// 增加成员
// type IDBTransactionMode = "readonly" | "readwrite" | "versionchange";
const addMember = (
  data: object,
  callback: (param: { status: 'error' | 'success'; data?: any }) => void
) => {
  //  返回当前正在操作的事物对象
  // 这个对象用来异步操作数据库事物，所有的增删改查都要经过这个对象来完成
  const transactionRequest = request.result.transaction(MEMBER, READWRITE)

  // IDBTransaction.objectStore(name)：返回指定名称的对象仓库 IDBObjectStore。
  const objectStore = transactionRequest.objectStore(MEMBER)

  // objectStore.add(value, key)
  // 用于向对象仓库添加数据 返回一个IDRequest对象 ，该方法只用于添加数据，如果主键相同会报错
  //
  // 生成一个id，赋值上去 怎么赋值比较优雅
  // data.id = new Date().getTime()
  const obj = Object.assign({}, data, { id: new Date().getTime() })

  const objectStoreRequest = objectStore.add(obj)

  objectStoreRequest.onerror = function (event: Event) {
    callback({
      status: 'error',
    })
  }

  objectStoreRequest.onsuccess = function (event: Event) {
    callback({
      status: 'success',
      data: {},
    })
  }
}
const readAll = function (data: any, callback: Callback) {
  if (request.readyState === 'pending') {
    return false
  }
  const transactionRequest = request.result.transaction(MEMBER, READWRITE)
  const objectStore = transactionRequest.objectStore(MEMBER)
  // 获取所有符合指定主键或 IDBKeyRange 的记录
  // objectStore.getAll(query)
  // 查看类型声明 可以知道 query可以是个数组，对象仓库就是表格
  // 我的理解，如果是数据组可以查询多条数据
  const objectStoreRequest = objectStore.getAll()
  objectStoreRequest.onsuccess = function (event: Event) {
    console.log('查询的结果是', objectStoreRequest.result)
    callback({
      // 类型“EventTarget”上不存在属性“result” ?? 这个怎么解决？？
      // data: event.target.result,
      status: 'success',
      data: objectStoreRequest.result,
    })
  }

  objectStoreRequest.onerror = function () {
    callback({
      status: 'error',
    })
  }
}

const getKey = () => {
  if (request.readyState === 'pending') {
    return false
  }
  const transactionRequest = request.result.transaction(MEMBER, READWRITE)
  const objectStore = transactionRequest.objectStore(MEMBER)
  const objectStoreRequest = objectStore.getKey(1)
  objectStoreRequest.onsuccess = function () {
    console.log('获取key的结果是什么呢？', objectStoreRequest.result)
  }
}

// 删除数据
const deleteData = (id: any, callback: Callback) => {
  if (request.readyState == 'pending') {
    return false
  }
  const transactionRequest = request.result.transaction(MEMBER, READWRITE)
  const objectStore = transactionRequest.objectStore(MEMBER)
  // objectStore.delete(Key)  key是主键 不能批量删除数据 ？？
  // 批量删除好像没有提供原生方法 ，只能遍历
  // eslint-disable-next-line no-var
  let idbRequest: IDBRequest
  if (id instanceof Array) {
    id.forEach((item) => {
      idbRequest = objectStore.delete(item)
    })
  } else {
    idbRequest = objectStore.delete(id)
  }
  // 在赋值前使用了变量“idbRequest”。 ?? 使用之前赋值了，这里是不合理的
  idbRequest.onsuccess = function () {
    callback({
      status: 'success',
      data: {},
    })
  }
  idbRequest.onerror = function () {
    callback({
      status: 'error',
      data: {},
    })
  }
}

// 更新数据
const updateData = (data: any, callback: Callback) => {
  if (request.readyState === 'pending') {
    return false
  }
  const transactionRequest = request.result.transaction(MEMBER, READWRITE)
  const objectStore = transactionRequest.objectStore(MEMBER)
  // IDBObjectStore.put() 方法用于更新某个主键对应的数据记录
  const idbRequest = objectStore.put(data)
  idbRequest.onsuccess = function () {
    //
    callback({
      status: 'success',
      data: idbRequest.result,
    })
  }
  idbRequest.onerror = function () {
    callback({
      status: 'error',
      data: {},
    })
  }
}
export { addMember, readAll, getKey, deleteData, updateData }
