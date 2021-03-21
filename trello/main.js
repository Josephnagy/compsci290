/*
 * Trello App
 *
 * @author Joseph Nagy
 */
const monthDict = {
    1: {name: "January", abbr: "Jan"},
    2: { name: "February", abbr: "Feb"}, 
    3: { name: "March", abbr: "Mar" },
    4: { name: "April", abbr: "Apr" },
    5: { name: "May", abbr: "May" }, 
    6: { name: "June", abbr: "June" },
    7: { name: "July", abbr: "July" },
    8: { name: "August", abbr: "Aug" },
    9: { name: "September", abbr: "Sept" },
    10: { name: "October", abbr: "Oct" },
    11: { name: "November", abbr: "Nov" },
    12: { name: "December", abbr: "Dec" },
};

let backgroundImageOptions = ['beach.jpg', 'city.jpg', 'mountains.jpg', 'mushroom.jpg'];

 const app = new Vue({
     data(){
         return {
             // primary data store 
             allData: trelloDataStore
         }
     }, 
     methods: {
         // moves card from one taskList to another 
         moveCard(t, c){
             // store card object 
             let cardToMove = this.taskLists[t].cards[c];

             // push it to destination 
             this.taskLists[this.cardToMoveDestination].cards.push(cardToMove);

             // remove card from old taskList
             this.deleteCard(t, c);

             // reset fields
             this.cardToMoveDestination = null;
         },
         // creates a new card and adds it to a specific taskList based on the taskList index (i)
         createCard(t) {
            // prevent user from creating card without all fields 
             if (this.newCard.name === "" || this.newCard.description === "" || this.newCard.deadline === "" || this.newCard.priority === ""){
                 window.alert("Please fill in all card fields!");
                 return;
             }
             // create new card using constructor 
             let newCardToAdd = new Card(this.newCard.name, this.newCard.color, this.newCard.description, this.newCard.deadline, this.newCard.priority, this.newCard.tags, [],  [], );
             // push new card to the list of taskLists cards
             this.taskLists[t].cards.push(newCardToAdd);
             // reset newCard fields 
             this.newCard = { name: "", color: "", description: "", deadline: "", priority: "", tags: [], comments: [], checklists: [], showModal: false};
         }, 
         createTaskList(){
             // create new taskList using constructor 
             let newTaskListToAdd = new TaskList(this.newTaskList.name, this.newTaskList.cardOrderStyle, this.newTaskList.color, []);
             // push new taskList to the end of taskLists 
             this.taskLists.push(newTaskListToAdd);
             // reset newTaskList fields 
             this.newTaskList = {name: "", watch: false, color: "", cards: [], cardOrderStyle: "alphabetical", showModal: false, createNewCard: false};
         },
         // deletes card from taskList based on indicies
         deleteCard(t, c) {
             this.taskLists[t].cards.splice(c, 1);
         },
         // deletes taskList based on index 
         deleteTaskList(t) {
             this.taskLists.splice(t, 1);
         },
         // resets newCard fields
         resetNewCard() {
            this.newCard = { name: "", color: "", description: "", deadline: "", priority: "", tags: [], comments: [], checklists: [], showModal: false };
         }, 
         // duplicate an entire card, append to end of taskList
         duplicateCard(t, c) {
             let currentCard = this.taskLists[t].cards[c];
             let duplicatedCard = new Card(currentCard.name, currentCard.color, currentCard.description, currentCard.deadline, currentCard.priority, currentCard.tags, currentCard.comments, currentCard.checkLists);
             this.taskLists[t].cards.push(duplicatedCard);
         },
         // duplicate an entire list, append to end of taskLists
         duplicateTaskList(t) {
             let currentList = this.taskLists[t];
             let duplicatedTaskList = new TaskList(currentList.name, currentList.cardOrderStyle, currentList.color, currentList.cards);
             this.taskLists.push(duplicatedTaskList);
         }, 
         // adds comment to card
         addComment(t, c){
            // prepare comment content
            let now = new Date();
            let newCommentToAdd = new Comment(this.javascriptDateObjectToISOString(now), this.newComment);

            // add comment to card 
             this.taskLists[t].cards[c].comments.push(newCommentToAdd); 

             // reset field
             this.newComment = "";
         }
     }, 
     
     template: 
     `
     <div> 
        <div >
            <main>
                <!-- Project Selection -->
                <label><b>Select a Project</b></label>
                <select name="selectAProject" id="projectSelection" v-model="allData.data.currentProject">
                    <option v-for="(project) in allData.data.projects" :value="project">{{project.name}}</option>
                </select>
                <hr />

                <project-board
                    :project="allData.data.currentProject"
                > </project-board>
            </main>
        </div>
     </div>
     
     `
 })
// connect Vue app instance with HTML element with id="app" to display it
app.$mount('#app');