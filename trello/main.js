/*
 * Trello App
 *
 * @author Joseph Nagy
 */
let backgroundImageOptions = ['beach.jpg', 'city.jpg', 'mountains.jpg', 'mushroom.jpg'];

 const app = new Vue({
     data(){
         return {
             searchText: "",
             backgroundImages: backgroundImageOptions,
             currentProject: EXAMPLE_PROJECT_0, 
             taskLists: EXAMPLE_PROJECT_0.taskLists, 
             cards: EXAMPLE_PROJECT_0.cards, 
             createNewTaskList: false,  
             cardToMoveDestination: null,
             newCard: {
                 name: "",
                 color: "",
                 description: "",
                 deadline: "",
                 priority: "",
                 tags: [],
                 comments: [],
                 checklists: [],
                 showModal: false
             }, 
             newTaskList: {
                 name: "",
                 watch: false,
                 color: "",
                 cards: [],
                 cardOrderStyle: "alphabetical",
                 showModal: false, 
                 createNewCard: false
             }, 
             newComment: ""
         }
     }, 
     methods: {
         // helper function that takes ISO date('YYYY-MM-DDThh:mm') and returns a display string for dates
         displayDate(date){
             if(date === undefined){
                 return "undefined time"
             } else {
                 dateComponents = date.split('-');
                 year = dateComponents[0];
                 month = dateComponents[1];
                 day = dateComponents[2].substring(0, 2);
                 time = dateComponents[2].substring(3);
                 d = [month, day, year].join("/")
                 return d + " @ " + time;
             }
         }, 
         displayPriority(priority){
             priorityDict = {1: "Top Priority", 2: "Medium Priority", 3: "Low Priority"}; 
             return priorityDict[priority]; 
         }, 
         // helper function that convert javascript date object to ISO string ('YYYY-MM-DDThh:mm')
         javascriptDateObjectToISOString(date){
             day = date.getDate().toString(); 
             day = ( (day.length === 1) ? '0' + day : day); // add zero in front if necessary 
             month = (date.getMonth()+1).toString(); // +1 because .getMonth returns int 0-11
             month = ((month.length === 1) ? '0' + month : month); // add zero in front if necessary
             year = date.getFullYear().toString();
             ymd = [year, month, day].join("-") // ymd = 'YYYY-MM-DD'
             time = date.toString().split(" ")[4].substring(0, 5); // 'hh:mm'
             return [ymd, time].join("T");
         },
         getDeadlineClass(date){
            let currentTime = new Date(); 
             hoursUntilDue = this.hoursBetweenDates(this.javascriptDateObjectToISOString(currentTime), date); // if hoursUntilDue < 0 => past due! 
             // past due 
             if(hoursUntilDue < 0 ){
                return 'overdue';
             } 
            // due within 3 days 
             else if (0 < hoursUntilDue && hoursUntilDue <= 72) {
                return 'due-soon'
             }
             // due in the future
             else {
                 return 'due-later'
             }
         },
         // helper function that takes 2 dates (as 'YYYY-MM-DDThh:mm') returns difference in hours 
         hoursBetweenDates(date1, date2){
             d1 = Date.parse(date1);
             d2 = Date.parse(date2); 
             return (d2 - d1) / (60 * 60 * 1000); 
         }, 
         // test function used to check that a function call is working properly
         windowAlert(s){
             window.alert(s);
         }, 
         // takes taskList index and sortingCriterion, returns taskList[t].cards sorted based on sortingCriterion
         sortCards(t, sortingCriterion){
             sortedCards = this.taskLists[t].cards;
             // sort alpbabetically
             if (sortingCriterion === "alphabetical"){
                 sortedCards.sort(function (a, b) {
                     let textA = a.name.toUpperCase();
                     let textB = b.name.toUpperCase();
                     return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                 });
            // sort by priority (high priority first, low priority last)
             } else if (sortingCriterion === "priority"){
                 sortedCards.sort(function (a, b) { 
                     let priorityA = parseInt(a.priority);
                     let priorityB = parseInt(b.priority);
                     return priorityA - priorityB;
                 });
            // sort by deadline (earliest deadlines first)
             } else if (sortingCriterion === "deadline"){
                 sortedCards.sort(function (a, b) {
                     // get current time 
                     let now = new Date();
                     // convert to ISOString 
                     now = app.javascriptDateObjectToISOString(now); // had to use app instead of this 
                     let hoursUntilDueA = app.hoursBetweenDates(now, a.deadline);
                     let hoursUntilDueB = app.hoursBetweenDates(now, b.deadline)
                     return hoursUntilDueA - hoursUntilDueB;
                 });
             }
             // save sorted cards 
             this.taskLists[t].cards = sortedCards;
         },
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
     watch: {
         // TODO
     },
 })
// connect Vue app instance with HTML element with id="app" to display it
app.$mount('#app');