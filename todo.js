const submitData = () => {

    // access to each element of the input form
    let submittedTime = new Date()
    let tasksDOM = document.querySelector('input[name=task]')
    let dateDOM = document.querySelector('input[name=duedate]')
    let priorityDOM = document.querySelector('select[name=priority]')

    // store the new data record
    let userInput = {
        submittedtime: submittedTime,
        tasks: tasksDOM.value,
        duedate: dateDOM.value,
        priority: priorityDOM.value
    }

    // print out to console
    console.log(userInput)
    try {
        // recall the existing storage in localStorage
        let storage = JSON.parse(localStorage.getItem("userData"))

        // If storage is not an array (e.g., null or corrupted data), initialize it as an empty array
        if (!Array.isArray(storage)) {
            storage = [];
        }
        
        // add the new item
        storage.push(userInput)

        // store the called array back to the localStorage
        localStorage.setItem("userData", JSON.stringify(storage, null, 2))
    } catch (error) {
        console.error(error)
    }
    

}

const exportData = () => {
    const jsonStr = JSON.stringify(tasks, null, 2)
    const blob = new Blob([jsonStr], {type : "application/json"})
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href= url
    a.download = "data.json"
    a.click()

    URL.revokeObjectURL(url)
}

const storageCall = () => {
    const data = JSON.parse(localStorage.getItem("userData"))
    console.log(data)
}

const showData = () => {
    
}

// wipe out the storage value
const clearData = () => {
    localStorage.setItem("userData", null)
}