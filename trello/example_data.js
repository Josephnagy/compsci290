/* 
*
* Multiple example project objects used as example data. Descriptions of each project 
* contained in the README 
*
* @author Joseph Nagy
*/

function getTag(tagName, tagArray) {
    return tagArray.find(tag => tag.name === tagName);
}


// TAGS 
EXAMPLE_TAGS_0 = [
    { name: "Do Today", color: "#FD0000" },
    { name: "Do Tomorrow", color: "#F2FD00" },
    { name: "Do Eventually", color: "#FD00F5" },
    { name: "Complete", color: "#40FD00" },
    { name: "Extension", color: "#FD9100" }
]

// card tag lists
const EXAMPLE_CARD_0_TAGS = [
    getTag("Extension", EXAMPLE_TAGS_0),
    getTag("Complete", EXAMPLE_TAGS_0)
];
const EXAMPLE_CARD_1_TAGS = [
    getTag("Complete", EXAMPLE_TAGS_0)
];
const EXAMPLE_CARD_2_TAGS = [
    getTag("Do Tomorrow", EXAMPLE_TAGS_0)
];
const EXAMPLE_CARD_3_TAGS = [
    getTag("Do Eventually", EXAMPLE_TAGS_0)
];
const EXAMPLE_CARD_4_TAGS = [
    getTag("Do Eventually", EXAMPLE_TAGS_0)
];


// COMMENTS 

// example card 0 
const EXAMPLE_COMMENT_0 = {
    timestamp: "2021-01-31T12:00",
    description: "Got project extension approved"
}
const EXAMPLE_COMMENT_1 = {
    timestamp: "2021-02-03T12:00",
    description: "Finally finished project"
}
const EXAMPLE_CARD_0_COMMENTS = [EXAMPLE_COMMENT_0, EXAMPLE_COMMENT_1];

// example card 1
const EXAMPLE_COMMENT_2 = {
    timestamp: "2021-02-06T12:00",
    description: "Started the project"
}
const EXAMPLE_COMMENT_3 = {
    timestamp: "2021-02-08T12:00",
    description: "Filtered the data, no longer getting undefined value errors"
}
const EXAMPLE_COMMENT_4 = {
    timestamp: "2021-02-10T12:00",
    description: "Basic map implementation finished"
}
const EXAMPLE_COMMENT_5 = {
    timestamp: "2021-02-14T12:00",
    description: "Styling finished"
}
const EXAMPLE_COMMENT_6 = {
    timestamp: "2021-02-14T16:00",
    description: "Fixed the bugs and finished early!"
}
const EXAMPLE_CARD_1_COMMENTS = [EXAMPLE_COMMENT_2, EXAMPLE_COMMENT_3, EXAMPLE_COMMENT_4, EXAMPLE_COMMENT_5, EXAMPLE_COMMENT_6];

// example card 2
const EXAMPLE_COMMENT_7 = {
    timestamp: "2021-03-02T16:00",
    description: "Drew web app outline on iPad with notes"
}

// example card 3: 0 comments 

// example card 4 
const EXAMPLE_COMMENT_8 = {
    timestamp: "2021-03-02T16:00",
    description: "Started initial research"
}


// CARDS

// example task list 0 
const EXAMPLE_CARD_0 = {
    name: "Introductions Project",
    color: "#915D1C",
    description: `This project is intended to introduce you to your classmates and the Teaching Team.`,
    deadline: "2021-02-02T23:59",
    priority: "1",
    tags: EXAMPLE_CARD_0_TAGS,
    comments: EXAMPLE_CARD_0_COMMENTS,
    checklists: [], 
    showModal: false
}

const EXAMPLE_CARD_1 = {
    name: "Plotter Project",
    color: "#FE4FDE",
    description: "This project is intended for you to learn the basics of JavaScript programming using data.",
    deadline: "2021-02-16T23:59",
    priority: "1",
    tags: EXAMPLE_CARD_1_TAGS,
    comments: EXAMPLE_CARD_1_COMMENTS,
    checklists: [], 
    showModal: false
}

const EXAMPLE_CARD_2 = {
    name: "Trello Project Part 2",
    color: "#423F5F",
    description: "This project is intended for you to learn the basics of the JavaScript framework Vue to create a reactive, data-oriented, web page.",
    deadline: "2021-03-08T23:59",
    priority: "1",
    tags: EXAMPLE_CARD_2_TAGS,
    comments: [EXAMPLE_COMMENT_7],
    checklists: [], 
    showModal: false
}

const EXAMPLE_CARD_3 = {
    name: "Final Project Pitch",
    color: "#33827E",
    description: "TBD",
    deadline: "2021-03-23T23:59",
    priority: "3",
    tags: EXAMPLE_CARD_3_TAGS,
    comments: [],
    checklists: [],
    showModal: false
}

EXAMPLE_TASK_LIST_0_CARDS = [EXAMPLE_CARD_0, EXAMPLE_CARD_1, EXAMPLE_CARD_2, EXAMPLE_CARD_3];

// example task list 1 
const EXAMPLE_CARD_4 = {
    name: "Biodiversity Memo",
    color: "#24B869",
    description: "Write a memo discussing the importances of biodiversity as it relates to ecological services.",
    deadline: "2021-03-17T8:30",
    priority: "2",
    tags: EXAMPLE_CARD_4_TAGS,
    comments: [EXAMPLE_COMMENT_8],
    checklists: [],
    showModal: false
}


// TASK LISTS
const EXAMPLE_TASK_LIST_0 = {
    name: "COMPSCI 290",
    color: "",
    watch: false,
    cards: EXAMPLE_TASK_LIST_0_CARDS,
    cardOrderStyle: "alphabetical", 
    showModal: false
}

const EXAMPLE_TASK_LIST_1 = {
    name: "ENVIRON 201",
    color: "",
    watch: false,
    cards: [EXAMPLE_CARD_4],
    cardOrderStyle: "alphabetical", 
    showModal: false
}

const EXAMPLE_TASK_LIST_2 = {
    name: "PHYSEDU 132",
    color: "",
    watch: false,
    cards: [],
    cardOrderStyle: "alphabetical", 
    showModal: false
}

const EXAMPLE_PROJECT_0_TASKLISTS = [EXAMPLE_TASK_LIST_0, EXAMPLE_TASK_LIST_1, EXAMPLE_TASK_LIST_2];

// PROJECTS
const EXAMPLE_PROJECT_0 = {
    name: "Schoolwork",
    backgroundImage: "beach.jpg",
    tags: EXAMPLE_TAGS_0,
    boardDescription: "This Trello board is used to organize the schoolwork for my classes",
    projectDeadline: "",
    priority: 2,
    taskLists: EXAMPLE_PROJECT_0_TASKLISTS
}