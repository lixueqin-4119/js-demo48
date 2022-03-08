import $ from 'jquery'

class View {
    //初始化写到constructor上
    constructor({ el, html, render }) {//不遍历的写法:结构化
        this.el = $(el)
        this.html = html
        this.render = render
    }
}
export default View