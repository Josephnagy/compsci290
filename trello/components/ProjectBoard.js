/*
 * This represents a single project board 
 *
 *
 * @author Joseph Nagy
 */

Vue.component('project-board', {
    props: {
        // project to be displayed
        project: {
            type: Object,
            required: true,
        },
        // NOTE: not sure if I need this yet 
        // projectId: {
        //     type: Number,
        //     required: true,
        // }
    },

    data() {
        return {
            // allow access to dataStore so methods can be called
            allData: trelloDataStore
        };
    },

    methods: {
        // TODO: make this once you separate the edit project modal
        updateProject(projectId, editedProject) {
            console.log(`Editing project`);
            this.allData.updateProject(projectId, editedProject);
        }
    },
    // display group as a column or cards that is organized by BootstrapVue
    template: 
    `
    <div> 
        <!-- Board Container -->
        <b-container>
            <!-- single row of taskLists -->
            <b-row 
                :cols="project.taskLists.length"
            >
                <task-list
                    v-for="(taskList, t) in project.taskLists"
                    :key="t"
                    :task-list="taskList"
                    :task-list-id="t"
                > 
                </task-list>    
            </b-row>
        </b-container>

    </div>
       
    `
});
