/*
 * This represents an input form for editing text in place.
 *
 * This is an example of an input element replacement component, it emits
 * custom events and allows for v-model semantics.
 *
 * @author Dennis Quan
 * @author Robert Duvall
 */

Vue.component('editable-text', {
    props: {
        // prop name must be value to be used with v-model
        value: {
            type: String,
            required: true,
        }
    },

    data() {
        return {
            // backing data for edits using v-model, no copy needed since Strings are immutable
            editedText: this.value,
            // whether or not field is being edited (YAY -- no longer in the primary data store!)
            isEditing: false
        };
    },

    methods: {
        // emit event only if text has a valid value
        setText() {
            if (this.editedText) {
                console.log(`EVENT: new title ${this.editedText}`);
                this.$emit('text-change', this.editedText);
                this.isEditing = false;
            }
        }
    },
    // display text and allow editing when clicked on
    template: `
        <!-- conditionally allow titles to be edited -->
        <input type="text" v-if="isEditing" v-model="editedText" @keyup.enter="setText" />
        <span v-else @dblclick="isEditing=true">{{ editedText }}</span>
    `
});
