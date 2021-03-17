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
            <b-button>View Card</b-button>
        </b-card>
`
}); 
