/*
 * This represents displaying a group of cards in a taskList
 *
 * This was built from the UrlList example
 *
 * @author Joseph Nagy
 * @author Dennis Quan
 * @author Robert Duvall
 */

Vue.component('task-list', {
    props: {
        // taskList to be displayed
        taskList: {
            type: Object,
            required: true,
        },
        // unique ID of group (note, it may or may not be a field within given group)
        taskListId: {
            type: Number,
            required: true,
        }
    },

    data() {
        return {
            // allow access to dataStore so methods can be called
            allData: trelloDataStore
        };
    },
    
    methods: {
        updateTaskList(taskListID, editedTaskList){
            console.log(`Editing tasklist`);
            this.allData.updateTaskList(taskListID, editedTaskList);
        }, 
        deleteTaskList(taskListId){
            console.log(`Deleting taskList`);
            this.allData.deleteTaskList(taskListId);
        }
    },
    // display group as a column or cards that is organized by BootstrapVue
    template: `
    <b-col>
        <b-card
            :title="taskList.name" 
            :sub-title="'Cards: ' + (!taskList.cards ? 0 : taskList.cards.length)" 
            :style="{backgroundColor: taskList.color}"
        >
            <b-card-body>
                <b-row cols="1"> <!-- one column because cards should be stacked -->
                    <draggable :list="taskList.cards" group="taskLists">
                        <b-col
                            v-for="(card, car) in taskList.cards" 
                            :key="car" 
                        >
                            <tasklist-card 
                                :card="card" 
                                :card-id="car"
                                :task-list-id="taskListId"
                            > </tasklist-card>
                        </b-col>
                    </draggable>
                </b-row>
            </b-card-body>

            <!-- taskList FOOTER -->
            <b-card-footer>
                <!-- modal button -->
                <b-button 
                    v-b-modal="'editTaskListModal'+taskListId" 
                    variant="success" 
                    block>Add Card</b-button>

                <b-button 
                    v-b-modal="'editTaskListModal'+taskListId" 
                    variant="info" 
                    block>View List</b-button>

                <!-- MODAL to edit taskList content -->
                <b-modal 
                    :id="'editTaskListModal'+taskListId" 
                    :title="taskList.name" 
                    :hide-footer="true"
                >
                    <edit-tasklist-modal
                        :task-list="taskList"
                        :task-list-id="taskListId"
                        @edit-tasklist="updateTaskList" 
                        @delete-tasklist="deleteTaskList"
                    > </edit-tasklist-modal>
                </b-modal>
            </b-card-footer>

        </b-card>
    </b-col>
    `
});
