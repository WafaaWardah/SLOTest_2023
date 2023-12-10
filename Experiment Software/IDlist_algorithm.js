const batches = require('./batches');
const validIDs = require('./validIDs');


function assignBatches(validIDs) {
    const assignedList = [];
  
    validIDs.forEach((id) => {
    //randomize
      const shuffledBatches = batches.slice().sort(() => Math.random() - 0.5);
  
      const selectedBatches = shuffledBatches.slice(0, 2);
  
      const batchNames = [];

      //identify which batches are selected 
      selectedBatches.forEach((selectedBatch) => {
        const batchName = selectedBatch[0].Name;
        batchNames.push(batchName); //had to add another parameter to batches as the first element
      });
  
      //create the structure
      const idObject = {
        ID: id,
        Batches: selectedBatches,
        BatchIds: batchNames,
        SessionsTaken: 0
      };
  
      assignedList.push(idObject);
    });

    //this one deletes the first element of each batch (because I added temporary elements to get batch names)
    batches.forEach((batch) => {
        batch.shift();
    });
    return assignedList;
}

console.log(assignBatches(validIDs));