/*
 * Data for trello app
 *
 * @author Joseph Nagy
 */

 const trelloDataStore = {
     data: {
         projects: EXAMPLE_PROJECTS,
         currentProject: EXAMPLE_PROJECTS[0],
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
     }, 


    // ====================================================================================================================================
    // HELPER FUNCTIONS
    // ====================================================================================================================================

     // takes taskList index and sortingCriterion, returns taskList[t].cards sorted based on sortingCriterion
     sortCards(t, sortingCriterion) {
         sortedCards = this.taskLists[t].cards;
         // sort alpbabetically
         if (sortingCriterion === "alphabetical") {
             sortedCards.sort(function (a, b) {
                 let textA = a.name.toUpperCase();
                 let textB = b.name.toUpperCase();
                 return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
             });
             // sort by priority (high priority first, low priority last)
         } else if (sortingCriterion === "priority") {
             sortedCards.sort(function (a, b) {
                 let priorityA = parseInt(a.priority);
                 let priorityB = parseInt(b.priority);
                 return priorityA - priorityB;
             });
             // sort by deadline (earliest deadlines first)
         } else if (sortingCriterion === "deadline") {
             sortedCards.sort(function (a, b) {
                 // get current time 
                 let now = new Date();
                 // convert to ISOString 
                 now = app.javascriptDateObjectToISOString(now); // had to use app instead of this 
                 let hoursUntilDueA = this.hoursBetweenDates(now, a.deadline);
                 let hoursUntilDueB = this.hoursBetweenDates(now, b.deadline)
                 return hoursUntilDueA - hoursUntilDueB;
             });
         }
     },

    // ============================================  Date Related Functions  ==============================================================
     
    // helper function that takes 2 dates (as 'YYYY-MM-DDThh:mm') returns difference in hours 
     hoursBetweenDates(date1, date2) {
         d1 = Date.parse(date1);
         d2 = Date.parse(date2);
         return (d2 - d1) / (60 * 60 * 1000);
     },

     // helper function that converts military time to standard (ie 14:00 --> 2:00 PM)
     militaryToStandardTime(militaryTime) {
         // add blank seconds field to military time (necessary to use Moment.js)

         // convert: moment(militaryTime, 'HH:mm:ss').format('h:mm:ss A');

         // remove seconds field 

         //return
     },

     // helper function that takes ISO date('YYYY-MM-DDThh:mm') and returns a simple display string 
     displayDate(date) {
         if (date === undefined) {
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

     // helper function that convert javascript date object to ISO string ('YYYY-MM-DDThh:mm')
     javascriptDateObjectToISOString(date) {
         day = date.getDate().toString();
         day = ((day.length === 1) ? '0' + day : day); // add zero in front if necessary 
         month = (date.getMonth() + 1).toString(); // +1 because .getMonth returns int 0-11
         month = ((month.length === 1) ? '0' + month : month); // add zero in front if necessary
         year = date.getFullYear().toString();
         ymd = [year, month, day].join("-") // ymd = 'YYYY-MM-DD'
         time = date.toString().split(" ")[4].substring(0, 5); // 'hh:mm'
         return [ymd, time].join("T");
     },

    // ============================================  Style/Display Related Functions  =====================================================

     displayPriority(priority) {
         priorityDict = { 1: "Top Priority", 2: "Medium Priority", 3: "Low Priority" };
         return priorityDict[priority];
     },

     getDeadlineClass(date) {
         let currentTime = new Date();
         hoursUntilDue = this.hoursBetweenDates(this.javascriptDateObjectToISOString(currentTime), date); // if hoursUntilDue < 0 => past due! 
         // past due 
         if (hoursUntilDue < 0) {
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

     // ====================================================================================================================================
    // PROJECT METHODS
    // ====================================================================================================================================
     updateProject(projectId, editedProject){
         // update array of projects 
         Vue.set(this.data.projects, projectId, editedProject);

         // update current project too 
         this.data.currentProject = Object.assign(this.data.currentProject, editedProject);

         console.log("successfully edited project");
     },

    // ====================================================================================================================================
    // LIST METHODS
    // ====================================================================================================================================
     createTaskList() {
         // create new taskList using constructor 
         let newTaskListToAdd = new TaskList(this.data.newTaskList.name, this.data.newTaskList.cardOrderStyle, this.data.newTaskList.color, []);
         // push new taskList to the end of currentProject's taskLists 
         this.data.currentProject.taskLists.push(newTaskListToAdd);
         // reset newTaskList fields 
         this.data.newTaskList = { name: "", watch: false, color: "", cards: [], cardOrderStyle: "alphabetical", showModal: false, createNewCard: false };
     },
     
     updateTaskList(taskListId, editedTaskList) {
         Vue.set(this.data.currentProject.taskLists, taskListId, editedTaskList);
         console.log("successfully edited taskList");
     },
     deleteTaskList(taskListId){
         this.data.currentProject.taskLists.splice(taskListId, 1);
     },

    // ====================================================================================================================================
    // CARD METHODS
    // ====================================================================================================================================
     updateCard(cardId, taskListId, editedCard){
        Vue.set(this.data.currentProject.taskLists[taskListId].cards, cardId, editedCard);
         console.log("successfully edited card");
     }, 
     // deletes card from taskList based on indicies
     deleteCard(cardId, taskListId) {
         // remove card from projects.taskList.cards
         this.data.currentProject.taskLists[taskListId].cards.splice(cardId, 1);
     },
 }