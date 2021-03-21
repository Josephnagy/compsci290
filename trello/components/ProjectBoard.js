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
    },

    data() {
        return {
            // options to send to Fuse search engine rather than the component
            //   https://fusejs.io/api/options.html
            searchOptions: {
                // which TEXT fields to use in the search, use . to show nesting
                // NOTE, search results are grouped in order given here
                keys: ['name', 'cards.name', 'cards.comments.description'],
                // report exactly which fields and which characters signaled the match
                includeMatches: true,
                // 0 is an exact match up to 1 is very loose match
                threshold: 0.3
            },
            // model variable for search component
            searchTerms: '',
            // search results to display
            filteredTaskLists: [],
            // allow access to dataStore so methods can be called
            allData: trelloDataStore, 
        };
    },

    methods: {
        // helper function that returns a copy of a taskList without any cards (used for search results)
        clearCardsFromTaskList(taskListName) {
            // intialize first
            let clearedTaskList = {}

            // use Object.asign to make an independent copy
            clearedTaskList = Object.assign(clearedTaskList, this.allData.data.currentProject.taskLists.find(taskList => taskList.name === taskListName))

            // set cards field to empty array
            clearedTaskList.cards = [];
            return clearedTaskList;
        },

        // helper function to handle VueFuse search results 
        // param descriptions: 
        // object: string that describes what type of object the matchingText corresponds to (ie 'card')
        // matchingText: string that matched VueFuse's search 
        // currentTasklist: name of current taskList being filtered (getResults() is called on each taskList)
        // returns card object which contains object (ie card, comment or tag) that contains matchingText
        // NOTE: had to change currentTaskList --> currentTasklist becuase of local variable name issues 
        getCardFromMatchingText(matchingText, object, currentTasklist) {
            // if object is a card
            if (object === "card") {
                // return card with matchingText as it's name 
                return this.allData.data.currentProject.taskLists.find(taskList => taskList.name === currentTasklist).cards.find(card => card.name === matchingText);
            }
            // if object is a comment 
            else if (object === "comment") {
                // return card which the following is true: card.comment.description === matchingText 
                return this.allData.data.currentProject.taskLists.find(taskList => taskList.name === currentTasklist).cards.find(card => card.comments.find(comment => comment.description === matchingText));
            } else if (object === "tag") {
                return this.allData.data.currentProject.taskLists.find(taskList => taskList.name === currentTasklist).cards.find(card => card.tags.find(tag => tag.name === matchingText));
            } else {
                console.log("Something's wrong, getCardFromMatchingText() was called and didn't return a card");
            }
        },
        // FUNCTIONALITY: return filtered taskLists with matching content contained 
            // EXAMPLE: even if the list doesn't match, return list containing matches  
             getTaskList(group) {
                // If match is inside a taskList, only return those results inside that taskList
                // NOTE: if true, no elements inside group.matches will be taskLists 
                if (group.matches[0].refIndex != null) {

                    // initialize local variables 
                    let currentTaskListName = group.item.name;
                    // currentTaskList is the taskList without any cards...cards added in for loop
                    let currentTaskList = this.clearCardsFromTaskList(currentTaskListName);

                    // for each match in matches 
                    for (j = 0; j < group.matches.length; j++) {
                        // define local variables to make more readible 
                        let matchingText = group.matches[j].value;
                        let searchKey = group.matches[j].key;

                        // figure out what the matched content is (ie: card, comment, tag)

                        // if the match is a card
                        if (searchKey === "cards.name") {
                            // get that card object, append to currentTaskList.cards
                            currentTaskList.cards.push(this.getCardFromMatchingText(matchingText, "card", currentTaskListName));
                        }
                        // if the match is a comment 
                        else if (searchKey === "cards.comments.description") {
                            // get card object containing that comment, append card to currentTaskList.cards
                            currentTaskList.cards.push(this.getCardFromMatchingText(matchingText, "comment", currentTaskListName));
                        }
                        // if the match is a tag 
                        else if (searchKey === "cards.tags.name") {
                            // get card object containing that tag, append card to currentTaskList.cards
                            currentTaskList.cards.push(this.getCardFromMatchingText(matchingText, "card", currentTaskListName));
                        }
                    }

                    // NOTE, search returns found items in reverses order, so reverse back before displaying
                    // NOTE: need to filter for unique cards!! 
                    return currentTaskList;
                }
                // result matched title so return entire taskList
                else {
                    return group.item;
                }
            },

        // receive search results and prepare for display
        handleSearchResults(results) {
            console.log(results);
            // search actually took place and checked for specific results
            if (results.some(group => group.matches)) {
                console.log(results.map(group => group.matches?.map(match => match.value)));
                // save local filteredTaskLists
                this.filteredTaskLists = results.map(group => this.getTaskList(group));
            }
            // search was initialized or cleared, so return all data
            else {
                this.filteredTaskLists = this.allData.data.currentProject.taskLists;
            }

        },
        // TODO: make this once you separate the edit project modal
        updateProject(projectId, editedProject) {
            console.log(`Editing project`);
            this.allData.updateProject(projectId, editedProject);
        }, 
        createTaskList(){
            console.log(`Creating TaskList`);
            this.allData.createTaskList();
        }
    },
    // display group as a column or cards that is organized by BootstrapVue
    template: 
    `
    <div> 
        <!-- Page Header -->
        <header>
            <h1>{{allData.data.currentProject.name}}</h1>


            <!-- USE search component -->
            <!-- NOTE, initialize with all data -->
            <vue-fuse
                placeholder="Search ..."
                :list="allData.data.currentProject.taskLists"
                :search="searchTerms"
                :fuse-opts="searchOptions"
                @fuse-results="handleSearchResults"
            />


            <!-- EDIT BOARD -->
            <!-- modal button -->
            <b-button v-b-modal="'projectModal'+allData.data.currentProject.name" variant="dark" block>Edit Project</b-button>
            <!-- actual modal to edit board  -->
            <b-modal :id="'projectModal'+allData.data.currentProject.name" :title="allData.data.currentProject.name" :hide-footer="true">
                <edit-project-modal 
                    :project="project"
                    @edit-project="updateProject"
                > </edit-project-modal>
            </b-modal>

            <!-- CREATE TASKLIST  -->
            <!-- create taskList modal button -->
            <b-button 
                v-b-modal="'newTaskList'+allData.data.currentProject.name" 
                variant="info" 
                block>New List</b-button>
            
            <!-- create taskList project modal  -->
            <b-modal 
                :id="'newTaskList'+allData.data.currentProject.name" 
                title="New List" 
                ok-only 
                ok-title="Create List"
                @ok="createTaskList()"
            >

                <create-tasklist-modal
                @create-tasklist="createTaskList"
                >
                </create-tasklist-modal>

            </b-modal>


        </header>


        <!-- Board Container -->
        <b-container>
            <b-row :cols="filteredTaskLists.length"> 
            <!-- single row of taskLists -->
                  <draggable :list="filteredTaskLists" class="taskListRow"> 
                            <task-list
                                v-for="(taskList, t) in filteredTaskLists"
                                :key="t"
                                :task-list="taskList"
                                :task-list-id="t"> </task-list> 
                 </draggable> 
                </b-row> 
        </b-container>
    </div>
       
    `
});
