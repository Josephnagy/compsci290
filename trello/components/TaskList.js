/*
 * This represents displaying a group of cards in a taskList
 *
 * This was built from the UrlList example
 *
 * @author Joseph Nagy
 * @author Dennis Quan
 * @author Robert Duvall
 */

Vue.component('task-list', {
    props: {
        // taskList to be displayed
        taskList: {
            type: Object,
            required: true,
        },
        // unique ID of group (note, it may or may not be a field within given group)
        taskListId: {
            type: Number,
            required: true,
        }
    },

    data() {
        return {
            // backing data for edits using v-model, no copy needed since Strings are immutable
            title: this.taskList.name
            // may also need a copy group information if there is any chance it might be changed interactively
        };
    },

    // methods: {
        // emit event that signals a new link is ready to be added
        // NOTE, error checking is done in the child component
        // addLink(newLink) {
        //     console.log(`EVENT: add new item ${newLink.name} to ${this.linkGroup.title}`);
        //     this.$emit('new-link', this.groupId, newLink);
            // may also do additional work related to logging, interactivity, or other tracking changes
        // }

    watch: {
        // track changes to edited value and emits event when value is ready
        // NOTE, error checking is done in the child component
        title() {
            console.log(`EVENT: new title ${this.title} to replace ${this.taskList.name}`);
            this.$emit('update-title', this.taskListId, this.title);
        }
    },
    // display group as a column or cards that is organized by BootstrapVue
    template: `
        <b-col >
            <editable-text v-model="title" />
            <b-card
                v-for="(card, c) in taskList.cards"
                :key="c"
            >
                <p>hello world</p>
            </b-card>
        </b-col>
    `
});
