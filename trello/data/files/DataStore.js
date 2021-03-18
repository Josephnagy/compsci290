/*
 * Data for trello app
 *
 * @author Joseph Nagy
 */

 const trelloDataStore = {
     data: {
         searchText: "",
         currentProject: EXAMPLE_PROJECT_0,
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
     }, 
     updateCard(cardId, taskListId, editedCard){
         this.data.currentProject.taskLists[taskListId].cards[cardId] = editedCard;
     }
 }