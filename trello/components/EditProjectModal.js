/*
 * This represents the edit project modal content for a trello project
 *
 * @author Joseph Nagy
 */


Vue.component('edit-project-modal', {
    props: {
        // project to be edited
        project: {
            type: Object,
            required: true,
        },
        // TODO: unique ID of project 
        projectId: {
            type: Number, 
            required: true
        }
    },
    data() {
        return {
            // preserve card before changes in case user wants to discard changes 
            oldProject: this.project,
            // local copy of the data
            editedProject: JSON.parse(JSON.stringify(this.project))
        }
    },
    methods: {
        updateProject() {
            // TODO: 
        }
    },

    template: `
    <div> 
        <!-- edit title -->
        <label><b>Project Title</b></label>
        <input v-model="editedProject.name" style="width: 100%" type="text"></input>
        <hr />

        <!-- edit description -->
        <label><b>Project Description</b></label>
        <textarea v-model="editedProject.boardDescription" style="width: 100%" type="text"></textarea>
        <hr />

        <!-- edit board color -->
        <label><b>Color</b></label>
        <input v-model="editedProject.color" style="width: 100%" type="color"></input>
        <hr />

        <!-- TODO: edit backgroundImage  -->
        <label><b>Background Image</b></label>
        <hr />

    </div> 
    `
});