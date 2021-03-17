/*
 * Data for trello app
 *
 * @author Joseph Nagy
 */

 const trelloDataStore = {
     searchText: "",
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