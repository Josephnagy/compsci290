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
        // unique ID of project
        projectId: {
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

    </div>
       
    `
});
