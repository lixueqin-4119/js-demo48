import './app1.css'
import $ from 'jquery'
import Model from './base/Model.js'
import View from './base/View.js'

const eventBus = $({})
const m = new Model({
    data: {
        n: parseInt(localStorage.getItem('n'))
    },
    update(data) {
        Object.assign(m.data, data)
        eventBus.trigger("m:updated")
        localStorage.setItem('n', m.data.n)
    },
})

const view = {
    el: null,
    html: `
    <div>
      <div class="output">
        <span id="number">{{n}}</span>
      </div>
      <div class="actions">
        <button id="add1"> +1 </button>
        <button id="minus1"> -1 </button>
        <button id="mul2"> *2 </button>
        <button id="divide2"> /2 </button>
      </div>
    </div>
    `,
    init(container) {
        view.el = $(container) //接收的el会被作为容器
        view.render(m.data.n)
        view.autoBindEvents()
        eventBus.on('m:updated', () => {
            view.render(m.data.n)
        })
    },
    render(n) {
        if (view.el.children.length !== 0) view.el.empty()
        $(view.html.replace('{{n}}', n)).prependTo(view.el)
    },
    events: {
        'click #add1': 'add1',
        'click #minus1 ': 'minus1',
        'click #mul2 ': 'mul2',
        'click #divide2 ': 'divide2'
    },
    add1() {
        m.update({ n: m.data.n + 1 })
    },
    minus1() {
        m.update({ n: m.data.n - 1 })
    },
    mul2() {
        m.update({ n: m.data.n * 2 })
    },
    divide2() {
        m.update({ n: m.data.n / 2 })
    },
    autoBindEvents() {
        for (let key in view.events) {
            const value = view[view.events[key]]
            const spaceIndex = key.indexOf(' ')
            const part1 = key.slice(0, spaceIndex + 1)
            const part2 = key.slice(spaceIndex)
            view.el.on(part1, part2, value)
        }
    }
}
export default view