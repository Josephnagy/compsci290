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
            // backing data for edits using v-model
            title: this.card.name
            // may also need a copy group information if there is any chance it might be changed interactively
        };
    },

    template: `
        <b-card
            :title="card.name" 
            :style="{backgroundColor: card.color}"
        >
            <!-- card details -->
            <div class="card-content">
                <p>Deadline: </p><span>{{card.deadline}}</span>
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
                    > </edit-card-modal>
                </b-modal>
        </b-card>
`
}); 
