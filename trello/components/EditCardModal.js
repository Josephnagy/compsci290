/*
 * This represents the edit card modal content for a TaskListCard 
 *
 * @author Joseph Nagy
 */

Vue.component('edit-card-modal', {
    props: {
        // card to be edited
        card: {
            type: Object,
            required: true,
        },
        // unique ID of card 
        cardId: {
            type: Number,
            required: true,
        }, 
        // unique ID of taskList 
        taskListId: {
            type: Number,
            required: true,
        }, 
    },
    data() {
        return {
            // preserve card before changes in case user wants to discard changes 
            oldCard: this.card,
            // local copy of the data
            editedCard: JSON.parse(JSON.stringify(this.card)),
            // allow access to dataStore so methods can be called
            allData: trelloDataStore
        }
    },
    methods: {
        updateCard() {
            // TODO: make sure all fields are valid
            console.log(`EVENT: card name " ${this.oldCard.name} " was changed to " ${this.editedCard.name} "`); 
            this.$emit('edit-card', this.cardId, this.taskListId, this.editedCard);
        },
        deleteCard(){
            console.log(`EVENT: card name " ${this.oldCard.name} " was deleted`);
            this.$emit('delete-card', this.cardId, this.taskListId);
        }, 
        addComment(){
            console.log(`EVENT: card name " ${this.oldCard.name} " added a comment "`);
            this.$emit('create-comment', this.cardId, this.taskListId);
        }
    },

    template: `
    <div> 
        <!-- edit title -->
        <label><b>Card Title</b></label>
        <input v-model="editedCard.name" style="width: 100%" type="text"></input>
        <hr />

        <!-- edit description -->
        <label><b>Card Description</b></label>
        <textarea v-model="editedCard.description" style="width: 100%" type="text"></textarea>
        <hr />

        <!-- edit color -->
        <label><b>Card Color</b></label>
        <input v-model="editedCard.color" style="width: 100%" type="color"></input>
        <hr />

        <!-- edit deadline -->
        <label><b>Card Deadline</b></label>
        <input v-model="editedCard.deadline" style="width: 100%" type="datetime-local"></input>
        <hr />

        <!-- edit priority -->
        <label><b>Card Priority</b></label>
        <select name="priority" id="'cardPriority'+cardId+taskListId" v-model="editedCard.priority">
            <option value="1">High Priority</option>
            <option value="2">Medium Priority</option>
            <option value="3">Low Priority</option>
        </select>
        <hr />

        <!-- TODO: edit tags -->

        <!-- add comments -->
        <label><b>Add Comment</b></label>
        <input style="width: 100%" type="text" v-model="allData.data.newComment"></input>
        <hr />

        <!-- Implement add comment -->
        <b-button 
            variant="info" 
            block
            @click="addComment()"
        >Add Comment</b-button>


        <label><b>Comments</b></label>
        <!-- view comments -->
        <ul>
            <li 
                v-for="(comment, k) in card.comments" 
                :key="k"
            >
                <div>
                    <p>{{allData.displayDate(comment.timestamp)}}</p>
                    <p>{{comment.description}}</p>
                </div>
            </li>
        </ul>

        <b-button
            variant="success"
            @click="updateCard()"
        > Save Changes </b-button>

        <b-button
            variant="danger"
            @click="deleteCard()"
        > Delete Card </b-button>

    </div> 
    `
});