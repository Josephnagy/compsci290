/*
 * Data for trello app
 *
 * @author Joseph Nagy
 */

 const trelloDataStore = {
     data: {
         searchText: "",
         projects: EXAMPLE_PROJECTS,
         currentProject: EXAMPLE_PROJECTS[0],
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
     }, 

    // ====================================================================================================================================
    // HELPER FUNCTIONS
    // ====================================================================================================================================

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

    // ====================================================================================================================================
    // CARD METHODS
    // ====================================================================================================================================

     updateCard(cardId, taskListId, editedCard){
        Vue.set(this.data.currentProject.taskLists[taskListId].cards, cardId, editedCard);
         console.log("successfully edited card");
     }
 }