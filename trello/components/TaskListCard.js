/*
 * This represents displaying a single card within a TaskList component
 *
 * 
 *
 * @author Joseph Nagy
 * 
 */

Vue.component('tasklist-card', {
    props: {
        card: {
            type: Object, 
            required: true
        }, 
        cardId: {
            type: Number, 
            required: true
        }, 
        taskListId: {
            type: Number,
            required: true
        }
    }, 

    data() {
        return {
            // allow access to dataStore so methods can be called
            allData: trelloDataStore
        };
    },

    methods: {
        updateCard(cardID, taskListID, editedCard) {
            console.log(`Editing card`);
            this.allData.updateCard(cardID, taskListID, editedCard);
        }, 
        deleteCard(){
            console.log(`Deleting card`);
            this.allData.deleteCard(this.cardId, this.taskListId);
        }, 
        addComment(cardID, taskListID){
            console.log("creating comment");
            this.allData.addComment(cardID, taskListID);
        }
    },

    template: `
        <b-card
            :title="card.name" 
            :style="{backgroundColor: card.color}"
        >
            <!-- card details -->
            <div class="card-content">
                <p>Deadline: </p><span>{{allData.displayDate(card.deadline)}}</span>
            </div>

            <!-- display tags -->
            <div>
                <ul>
                    <li
                        v-for="(tag, t) in card.tags">
                            <b-badge>{{tag.name}}</b-badge>
                    </li>
                </ul>
            </div>



            <!-- card FOOTER -->
            <b-card-footer>
                <!-- modal button -->
                <b-button 
                    v-b-modal="'editCardModal'+cardId+taskListId" 
                    variant="info" 
                    block>View Card</b-button>

            </b-card-footer>

            <!-- MODAL to edit card content -->
                <b-modal 
                    :id="'editCardModal'+cardId+taskListId" 
                    :title="card.name" 
                    :hide-footer="true"
                >
                    <edit-card-modal
                        :card="card"
                        :card-id="cardId"
                        :task-list-id="taskListId"
                        @edit-card="updateCard" 
                        @delete-card="deleteCard"
                        @create-comment="addComment"
                    > </edit-card-modal>
                </b-modal>
        </b-card>
`
}); 
