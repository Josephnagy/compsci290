/*
 * This represents the edit taskList modal content for a taskList
 *
 * @author Joseph Nagy
 */

Vue.component('edit-tasklist-modal', {
    props: {
        // card to be edited
        taskList: {
            type: Object,
            required: true,
        },
        // unique ID of card 
        taskListId: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            // local copy of the data?? apparently not...?
            currentTaskList: this.taskList,
        }
    },

    template: `
        <p>hello world</p>
    `
});