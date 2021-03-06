import './app2.css'
import $ from "jquery"
import Model from './base/Model.js'

const localKey = 'app2.index'
const eventBus = $(window)
const m = new Model({
    data: {
        index: parseInt(localStorage.getItem(localKey) || 0)
    },
    update(data) {
        Object.assign(m.data, data)
        eventBus.trigger("m:updated")
        localStorage.setItem('app2.index', m.data.index)
        localStorage.setItem('index', m.data.index)
    }
})

const view = {
    el: null,
    html: (index) => {
        return `
    <div>
    <ol class="tab-bar">
        <li class="${index === 0 ? 'selected' : ''}" data-index="0"><span>1</span></li>
        <li class="${index === 1 ? 'selected' : ''}" data-index="1"><span>2</span></li>
    </ol>
    <ol class="tab-content">
        <li class="${index === 0 ? 'active' : ''}" >内容1</li>
        <li class="${index === 1 ? 'active' : ''}" data-index="1">内容2</li>
    </ol>
    </div>
    `
    },
    render(index) {
        if (view.el.children.length !== 0) view.el.empty()
        $(view.html(index)).prependTo(view.el)
    },
    init(container) { //2个init合并成1个
        view.el = $(container)
        view.render(m.data.index)
        view.autoBindEvents()
        eventBus.on('m:updated', () => {
            view.render(m.data.index)
        })
    },
    events: {
        'click .tab-bar li': 'x'
    },
    x(e) {
        const index = parseInt(e.currentTarget.dataset.index)//用DOM做标记
        m.update({ index: index })
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