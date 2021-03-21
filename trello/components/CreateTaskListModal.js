/*
 * This represents the create tasklist modal 
 *
 * @author Joseph Nagy
 */

Vue.component('create-tasklist-modal', {
    data() {
        return {
            // allow access to dataStore so methods can be called
            allData: trelloDataStore
        }

    },
    methods: {
        createTaskList() {
            // TODO: make sure all fields are valid
            console.log(`EVENT: creating taskist`);

            this.$emit('create-tasklist');
        },
    },
    template: `
    <div> 
        <!-- taskList title  -->
        <label><b>List Title</b></label>
        <input v-model="allData.data.newTaskList.name" style="width: 100%" type="text" placeholder="List Name"></input>
        <hr />

        <!-- taskList color  -->
        <label><b>List Color</b></label>
        <input v-model="allData.data.newTaskList.color" style="width: 100%" type="color"></input>
        <hr />

        <!-- taskList ordering -->
        <label><b>Card Ordering</b></label>
        <select name="cardOrder" id="'newCardOrder'+t" v-model="allData.data.newTaskList.cardOrderStyle">
            <option value="alphabetical">Order alphabetically</option>
            <option value="priority">Order by card priority</option>
            <option value="deadline">Order by card deadline</option>
        </select>
        <hr />

        <b-button
            variant="success"
            block
            @click="createTaskList()"
        > Create List </b-button>
    </div>
    `
});