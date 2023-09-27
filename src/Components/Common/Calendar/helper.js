// eslint-disable-next-line
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Schedule util
 */
function applyCategoryColor(args, currentView) {
    // console.log(args)
    var categoryColor = args.data.CategoryColor;
    var textLine = args.data.TextLine;
    var lineColor = args.data.LineColor;
    if (!args.element || !categoryColor) {
        return;
    }
    if (currentView === 'Agenda') {
        args.element.firstChild.style.borderLeftColor = categoryColor;
        args.element.firstChild.style.textDecorationLine = textLine;
        args.element.firstChild.style.textDecorationColor = lineColor;
    }
    else {
        args.element.style.backgroundColor = categoryColor;
        args.element.style.textDecorationLine = textLine;
        args.element.style.textDecorationColor = lineColor;
        // textDecorationLine = 'line-through';
        // textDecorationStyle: 'solid'
    }
}
exports.applyCategoryColor = applyCategoryColor;
function generateObject(start, end) {
    if (start === void 0) { start = new Date(2017, 6, 1).getTime(); }
    if (end === void 0) { end = new Date(2018, 6, 31).getTime(); }
    var data = [];
    var names = [
        'Story Time for Kids', 'Camping with Turtles', 'Wildlife Warriors', 'Parrot Talk', 'Birds of Prey', 'Croco World',
        'Venomous Snake Hunt', 'Face Painting & Drawing events', 'Pony Rides', 'Feed the Giants', 'Jungle Treasure Hunt',
        'Endangered Species Program', 'Black Cockatoos Playtime', 'Walk with Jungle King', 'Trained Climbers', 'Playtime with Chimpanzees',
        'Meet a small Mammal', 'Amazon Fish Feeding', 'Elephant Ride'
    ];
    var dayCount = 1000 * 60 * 60;
    for (var a = start, id = 1; a < end; a += (dayCount * 24) * 2) {
        var count = Math.floor((Math.random() * 9) + 1);
        for (var b = 0; b < count; b++) {
            var hour = Math.floor(Math.random() * 100) % 24;
            var minutes = Math.round((Math.floor(Math.random() * 100) % 60) / 5) * 5;
            var nCount = Math.floor(Math.random() * names.length);
            var startDate = new Date(new Date(a).setHours(hour, minutes));
            var endDate = new Date(startDate.getTime() + (dayCount * 2.5));
            data.push({
                Id: id,
                Subject: names[nCount],
                StartTime: startDate,
                EndTime: endDate,
                IsAllDay: (id % 10) ? false : true
            });
            id++;
        }
    }
    return data;
}
exports.generateObject = generateObject;
function getReadOnlyEventsData() {
    var msPerDay = 86400000;
    var msPerHour = 3600000;
    var currentTime = new Date().setMinutes(0, 0, 0);
    var readonlyEventsData = [
        {
            Id: 1,
            Subject: 'Project Workflow Analysis',
            StartTime: new Date(currentTime + msPerDay * -2 + msPerHour * 2),
            EndTime: new Date(currentTime + msPerDay * -2 + msPerHour * 4),
            IsReadonly: true
        }
    ];
    return readonlyEventsData;
}
exports.getReadOnlyEventsData = getReadOnlyEventsData;
