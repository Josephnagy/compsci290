/* 
* Classes + constructors to simplify creating new trello objects 
*
* @author Joseph Nagy 
*/


class Tag {
    constructor(name, color) {
        this.name = name;
        this.color = (color === "" ? "#aaaaaa": color);
    }
}

class Comment {
    constructor(timestamp, description) {
        this.timestamp = timestamp;
        this.description = description;
    }
}

class Card {
    constructor(name, color, description, deadline, priority, tags, comments, checklists) {
        this.name = name;
        this.color = (color === "" ? "#aaaaaa" : color);
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
    constructor(name, backgroundImage, tags, boardDescription, projectDeadline, priority, taskLists) {
        this.name = name;
        this.backgroundImage = backgroundImage;
        this.tags = (!tags ? [] : tags);
        this.boardDescription = boardDescription;
        this.projectDeadline = projectDeadline; 
        this.priority = priority; 
        this.taskLists = (!taskLists ? [] : taskLists);  // new project will start without taskLists
    }
}

class TaskList {
    constructor(name, cardOrderStyle, color, cards) {
        this.name = name;
        this.color = (color === "" ? "#aaaaaa" : color);
        this.watch = false;
        this.cards = (!cards ? [] : cards); // new taskList will start without cards
        this.cardOrderStyle = cardOrderStyle; 
        this.showModal = false;
    }
}
