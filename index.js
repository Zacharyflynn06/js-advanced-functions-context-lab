/* Your Code Here */

const createEmployeeRecord = (array) => {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = (array) => {
    return array.map(function(line){
        return createEmployeeRecord(line)
    })
}

const createTimeInEvent = function(dateStamp){
    const [date, time] = dateStamp.split(' ')
    
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(time, 10),
        date,
    })

    return this
}


const createTimeOutEvent = function(dateStamp) {
    const [date, time] = dateStamp.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time, 10),
        date,
    })

    return this
}

const hoursWorkedOnDate = function(queriedDate){
    const inEvent = this.timeInEvents.find(function(event){
        return event.date === queriedDate
    })

    const outEvent = this.timeOutEvents.find(function(event){
        return event.date === queriedDate
    })

    return(outEvent.hour - inEvent.hour) / 100
}

const wagesEarnedOnDate = function(queriedDate){
    const wage = hoursWorkedOnDate.call(this, queriedDate) * this.payPerHour
    return parseFloat(wage.toString())
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

const findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(record){
        return record.firstName === firstName
    })
}

const calculatePayroll = function(array) {
    return array.reduce(function(memo, record){
        return memo + allWagesFor.call(record)
    }, 0 )
}