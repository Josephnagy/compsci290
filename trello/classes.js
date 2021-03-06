/* 
* Classes + constructors to simplify creating new trello objects 
*
* @author Joseph Nagy 
*/

class Tag {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }
}

class Comment {
    constructor(timestamp, description) {
        this.timestamp = timestamp;
        this.description = description;
    }
}

class Card {
    constructor(name, backgroundColor, description, deadline, priority, tags, comments, checklists, showModal) {
        this.name = name;
        this.backgroundColor = backgroundColor;
        this.description = description;
        this.deadline = deadline;
        this.priority = priority;
        this.tags = (!tags ? [] : tags);
        this.comments = (!comments ? [] : comments);
        this.checklists = (!checklists ? [] : checklists);
        this.showModal = false;
    }
}

class Project {
    constructor(name, backgroundImage, tags, boardDescription, projectDeadline, priority) {
        this.name = name;
        this.backgroundImage = backgroundImage;
        this.tags = (!tags ? [] : tags);
        this.boardDescription = boardDescription;
        this.projectDeadline = projectDeadline; 
        this.priority = priority; 
        this.taskLists = [];  // new project will start without taskLists
    }
}

class TaskList {
    constructor(name, cardOrderStyle, color) {
        this.name = name;
        this.watch = false;
        this.cards = [];
        this.cardOrderStyle = cardOrderStyle; 
        this.showModal = false;
    }
}
