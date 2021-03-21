/*
 * This represents the create card modal 
 *
 * @author Joseph Nagy
 */

Vue.component('create-card-modal', {
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
        return{
            // allow access to dataStore so methods can be called
            allData: trelloDataStore
        }

    },
    methods:{
        createCard(){
            // TODO: make sure all fields are valid
            console.log(`EVENT: creating card for taskList  " ${this.taskList.name} " `);
            
            this.$emit('create-card', this.taskListId);
        },
    },
    template: `
    <div> 
         <!-- card title  -->
        <label><b>Card Title</b></label>
        <input v-model="allData.data.newCard.name" style="width: 100%" type="text"></input>
        <hr />

        <!-- card description  -->
        <label><b>Card Description</b></label>
        <input v-model="allData.data.newCard.description" style="width: 100%" type="text"></input>
        <hr />

        <!-- card color  -->
        <label><b>Card Color</b></label>
        <input v-model="allData.data.newCard.color" style="width: 100%" type="color"></input>
        <hr />

        <!-- card deadline  -->
        <label><b>Card Deadline</b></label>
        <input v-model="allData.data.newCard.deadline" style="width: 100%" type="datetime-local"></input>
        <hr />

        <!-- card priority  -->
        <label><b>Card Priority</b></label>
        <select name="priority" id="priority" v-model="allData.data.newCard.priority">
            <option value="1">High Priority</option>
            <option value="2">Medium Priority</option>
            <option value="3">Low Priority</option>
        </select>
        <hr />

        <b-button
            variant="success"
            @click="createCard()"
        > Create Card </b-button>
    </div>
    `
});