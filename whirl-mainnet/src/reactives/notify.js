import { reactive } from 'vue'

export const notify = reactive({
    messages: [],
    push: function (message) {
        this.messages.push(message)

        setTimeout(() => {
            this.remove(this.messages.length - 1)
        }, 15000);
    },
    remove: function (index) {
        this.messages.splice(index, 1)
    }
})