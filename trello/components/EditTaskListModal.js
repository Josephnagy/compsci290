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
            // preserve card before changes in case user wants to discard changes 
            oldTaskList: this.taskList,
            // local copy of the data
            editedTaskList: JSON.parse(JSON.stringify(this.taskList))
        }
    },

    methods: {
        updateTaskList(){
            // TODO: make sure all fields are valid
            console.log(`EVENT: tasklist name " ${this.oldTaskList.name} " was changed to " ${this.editedTaskList.name} "`);
            this.$emit('edit-tasklist', this.taskListId, this.editedTaskList);
        }, 
        deleteTaskList() {
            console.log(`EVENT: taskList name " ${this.oldTaskList.name} " was deleted`);
            this.$emit('delete-tasklist', this.taskListId);
        }
    },

    template: `
    <div> 
         <!-- taskList title  -->
        <label><b>List Title</b></label>
        <input v-model="editedTaskList.name" style="width: 100%" type="text"></input>
        <hr />

        <!-- taskList color  -->
        <label><b>List Color</b></label>
        <input v-model="editedTaskList.color" style="width: 100%" type="color"></input>
        <hr />

        <!-- options to sort cards within a list -->
        <label><b>Card Ordering</b></label>
        <select name="cardOrder" id="'editCardOrder'+taskListId" v-model="editedTaskList.cardOrderStyle">
            <option value="alphabetical">Order alphabetically</option>
            <option value="priority">Order by card priority</option>
            <option value="deadline">Order by card deadline</option>
        </select>
        <hr />

        <!-- save changes button  -->
        <b-button
            variant="success"
            block
            @click="updateTaskList()"
        > Save Changes </b-button>

        <!-- delete taskList button -->
        <b-button 
            variant="danger" 
            block 
            @click="deleteTaskList()"
            >Delete List</b-button>
    </div>
    `
});