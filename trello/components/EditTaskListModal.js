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
    <div> 
         <!-- taskList title  -->
        <label><b>List Title</b></label>
        <input v-model="currentTaskList.name" style="width: 100%" type="text"></input>
        <hr />

        <!-- taskList color  -->
        <label><b>List Color</b></label>
        <input v-model="currentTaskList.color" style="width: 100%" type="color"></input>
        <hr />

        <!-- options to sort cards within a list -->
        <label><b>Card Ordering</b></label>
        <select name="cardOrder" id="'editCardOrder'+taskListId" v-model="currentTaskList.cardOrderStyle">
            <option value="alphabetical">Order alphabetically</option>
            <option value="priority">Order by card priority</option>
            <option value="deadline">Order by card deadline</option>
        </select>

        <!-- TODO: implement duplicate list button -->
        <b-button 
            variant="dark" 
            block 
            >Duplciate List</b-button>

        <!-- TODO: implement delete taskList button -->
        <b-button 
            variant="danger" 
            block 
            >Delete List</b-button>
    </div>
    `
});