/**
 * @remarks 发布订阅模式 观察者模式
 * 什么是发布订阅者模式
 */

/**
 * @remarks 定义发布者
 * 发布者可以有哪些功能
 * 收集订阅者，发布消息，取消订阅，
 */

type Message = {
  title: string
  content: string
}
class Publisher {
  // 缓存订阅者
  subsciberList: Subscriber[] = []
  name: string // 还必须先声明？？

  constructor(name: string) {
    this.name = name
  }

  // 收集订阅者
  collect(this: Publisher, sub: Subscriber) {
    this.subsciberList.push(sub)
    sub.publisherList.push(this)
  }

  // 发布消息
  trigger(message: Message) {
    this.subsciberList.forEach((item) => {
      // console.log(item)
      item.get(message)
    })
  }
}

/**
 *
 * @remarks 定义订阅者
 * 订阅者可以有哪些功能  可以订阅消息 可以取消订阅
 */

class Subscriber {
  // 管理发布者的缓存
  publisherList: Array<Publisher> = []
  // name: string

  constructor(public name: string) {
    // this.name = name
  }
  /**
   * 订阅消息
   * 订阅者和发布者之间的关系，一个订阅者可以订阅不同的发布者的消息，
   * 一个发布者也可以关联很多的订阅者
   * */

  subscribe(pub: Publisher) {
    this.publisherList.push(pub)
    pub.collect(this)
  }

  get(this: Subscriber, message: Message) {
    console.log(this.name + '得到了消息', message)
  }
  // 取消订阅
}

const p1 = new Publisher('p1')
const p2 = new Publisher('p2')

const s1 = new Subscriber('s1')
const s2 = new Subscriber('s2')

// p1.collect(s1)
// p1.collect(s2)
// p2.collect(s1)
// p2.collect(s2)

// 这样也可以 订阅者订阅发布者
s1.subscribe(p1)
s1.subscribe(p2)
s2.subscribe(p1)
s2.subscribe(p2)
console.log(s1)

// 发布消息
p1.trigger({ title: '房价降了', content: '房价真的将了' })
p2.trigger({ title: '菜价又涨了', content: '菜价真的又涨了' })

// 发布订阅者模式 只能订阅者先订阅 然后发布者再发布吗，
