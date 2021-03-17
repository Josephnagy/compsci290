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
            // local copy of the data
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
    </div> 
    `
});