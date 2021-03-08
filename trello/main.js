/*
 * Trello App
 *
 * @author Joseph Nagy
 */

 const app = new Vue({
     data(){
         return {
             searchText: "",
             currentProject: EXAMPLE_PROJECT_0, 
             taskLists: EXAMPLE_PROJECT_0.taskLists, 
             cards: EXAMPLE_PROJECT_0.cards, 
             createNewTaskList: false,  
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
             }
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
         // creates a new card and adds it to a specific taskList based on the taskList index (i)
         createCard(i) {
             // create new card using constructor 
             let newCardToAdd = new Card(this.newCard.name, this.newCard.color, this.newCard.description, this.newCard.deadline, this.newCard.priority, this.newCard.tags, [],  [], );
             // push new card to the list of taskLists cards
             this.taskLists[i].cards.push(newCardToAdd);
             // reset newCard fields 
             this.newCard = { name: "", color: "", description: "", deadline: "", priority: "", tags: [], comments: [], checklists: [], showModal: false};
             this.taskLists[i].createNewCard = false;
         }, 
         // resets newCard fields
         resetNewCard() {
            this.newCard = { name: "", color: "", description: "", deadline: "", priority: "", tags: [], comments: [], checklists: [], showModal: false };
         }
     }
 })
// connect Vue app instance with HTML element with id="app" to display it
app.$mount('#app');