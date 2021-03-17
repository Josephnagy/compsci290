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
            // local copy of the data?? apparently not...?
            currentCard: this.card, 
        }
    },

    template: `
    <div> 
        <!-- edit title -->
        <label><b>Card Title</b></label>
        <input v-model="currentCard.name" style="width: 100%" type="text"></input>
        <hr />

        <!-- edit description -->
        <label><b>Card Description</b></label>
        <textarea v-model="currentCard.description" style="width: 100%" type="text"></textarea>
        <hr />

        <!-- edit color -->
        <label><b>Card Color</b></label>
        <input v-model="currentCard.color" style="width: 100%" type="color"></input>
        <hr />

        <!-- edit deadline -->
        <label><b>Card Deadline</b></label>
        <input v-model="currentCard.deadline" style="width: 100%" type="datetime-local"></input>
        <hr />

        <!-- edit priority -->
        <label><b>Card Priority</b></label>
        <select name="priority" id="'cardPriority'+cardId+taskListId" v-model="currentCard.priority">
            <option value="1">High Priority</option>
            <option value="2">Medium Priority</option>
            <option value="3">Low Priority</option>
        </select>
        <hr />

        <!-- TODO: edit tags -->

        <!-- add comments -->
        <label><b>Add Comment</b></label>
        <input style="width: 100%" type="text"></input>
        <hr />

        <!-- TODO: Implement add comment -->
        <b-button variant="info" block>Add Comment</b-button>


        <label><b>Comments</b></label>
        <!-- view comments -->
        <ul>
            <li 
                v-for="(comment, ck) in card.comments" 
                :key="k"
            >
                <div>
                    <p>{{comment.timestamp}}</p>
                    <p>{{comment.description}}</p>
                </div>
            </li>
        </ul>

    </div> 
    `
});