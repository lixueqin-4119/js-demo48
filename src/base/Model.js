class Model {
    constructor(options) {
        ['data', 'create', 'delete', 'update', 'get'].forEach((key) => {
            if (key in options) {
                this[key] = options[key]
            }
        })
    }
    create() {
        console?.error?.("你还没实现create")
    }
    delete() {
        console?.error?.("你还没实现delete")
    }
    update() {
        console?.error?.("你还没实现update")
    }
    get() {
        console?.error?.("你还没实现get")
    }
}
export default Model