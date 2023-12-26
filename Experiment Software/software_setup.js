let screens = [];
let testID;
let batch;

function getArray(name){
    switch(name){
        case 'batch1':
            return batch1;
        case 'batch2':
            return batch2;
        case 'batch3':
            return batch3;
        case 'batch4':
            return batch4;
        case 'batch5':
            return batch5;
    }
}

function getNewRandomBatch(existingBatches) {
    let allPossibleBatches = ['batch1', 'batch2', 'batch3', 'batch4', 'batch5'];
    let availableBatches = allPossibleBatches.filter(batch => !existingBatches.includes(batch));

    if (availableBatches.length === 0) {
        throw new Error("No more new batches available"); // Hier maybe eher ne Seite öffnen mit "Du darfst nicht mehr Teilnehmen" 
    }

    let randomIndex = Math.floor(Math.random() * availableBatches.length);
    return availableBatches[randomIndex];
}

// function which builds the participants batch based on the values in the idList
function buildBatch(idList){

    // if you want to see the list use this line:
    // console.log(idList);
    
    let array = [];

    // Things TODO (my approach):
    //      - iterate over the the idList -> normal way would be with for-loop but there are special js functions such as 
    //        .find() to search for a specific element in an array
    //
    //      - check if the sessionsTaken Attribute is > 0 -> if and else block 
    //          - in the if/else block:
    //          - check if the id of the current element is the same as testID (global variable defined on top)
    //          - if that is true -> get the array in the Batches Attribute and combine the two seperate batches in the array 
    //            variable
    //      - if sessionsTaken > 0 checkwhich batches are assigned and select two new ones randomly
    //      
    //      - useful js functions: 
    //          - .concat() function to combine two arrays
    //          - .find() with this function you can find a specific element in the List (syntax would be something like:
    //            let element = idList.find(x => x.ID === testID))

    idList.forEach(item => {
        if (item.ID === testID) {
            if (item.SessionsTaken < 1) {
                let b1 = getArray(item.BatchIds[0]);
                let b2 = getArray(item.BatchIds[1]);
                array = b1.concat(b2);
            }
            else {
                // Select two new batches randomly
                let b3_name = getNewRandomBatch(item.BatchIds);
                let b4_name = getNewRandomBatch(item.BatchIds.concat(b3_name)); // Ensures that the second batch of the second set is also different
                
                let b3 = getArray(b3_name);
                let b4 = getArray(b4_name);

                array = b3.concat(b4);
                //item.Batches.push(newBatch1, newBatch2); // adds the new batches to the json
                //does SessionsTaken needs to be incremented here?
            } 
        }
        
    });

    batch = array;
}

function setupScreens(){
    var WelcomeScreen = new ScreenUIElements(
        new UIElementHTML(undefined, "<h1>Willkommen zum Experiment</h1>"),
        new UIElementHTML(undefined, "Hi Testperson. Danke, dass du freiwillig an diesem Test teilnimmst!"),
        new UIElementHTML(undefined, "Das einzige, was du für die Teilnahme an diesem Test brauchst, ist ein gutes Gehör und super Deutschkenntnisse."),
        new UIElementHTML(undefined, "Deine Antworten sind komplett anonym und subjektiv. Also es gibt kein richtig oder falsch bei der Wahl deiner Antworten."),
        new UIElementHTML(undefined, "Auf der nächsten Seite werden ein paar allgemeine Fragen zu deiner Person und deinem Telekommunikationsverhalten gestellt. Danach kommt eine Erklärung des Hörtests und dann geht es auch schon richtig los."),
        new UIElementHTML(undefined, "Diese Befragung dauert insgesamt ca. eine Stunde (mit kurzen Pausen zwischendurch) und wird mit 10 Euro pro Stunde belohnt (außer du bist ein Mitarbeiter bzw. eine Mitarbeiterin der TU, dann kein Geld für dich xd)."),
        new UIElementHTML(undefined, "Falls du Fragen während des Tests aufkommen sollten, kannst du dich jederzeit an einen Betreuer bzw. einer Betreuerin im Raum wenden.")
        );

    screens.push(WelcomeScreen);

    var PreTestQuestionaire = new ScreenUIElements(
        new UIElementHTML(undefined, "<h1>Vorbefragung</h1>"),
        new UIElementHTML(undefined, "Bitte beantworten Sie die folgenden Fragen"),
        new QuestionnaireItemText("questionnaireItem", "<b>Wie alt sind Sie?", true),
        new QuestionnaireItemDefinedOne("questionnaireItem", "<b>Wie würden Sie Ihre Deutschkenntnisse einschätzen?", true,["Muttersprache", "C1/2 (Verhandlungssicher)", "B1/2 (Gesprächssicher)", "keine der genannten"]),
        new QuestionnaireItemText("questionnaireItem", "Was ist Ihre Muttersprache?", false),
        new QuestionnaireItemDefinedMulti("questionnaireItem", "<b>Welche der folgenden Kommunikationsformen nutzen Sie regelmäßig (mehrmals im Monat)?", true,["Telefonie über Netz", "Telefonie über Internet", "Videotelefonie", "Videokonferenzen (Zoom etc.)", "keine der genannten"]),
        new QuestionnaireItemText("questionnaireItem", "Wieviele Stunden pro Woche nutzen Sie diese Kommunikationsmittel geschäftlich?", false),
        new QuestionnaireItemText("questionnaireItem", "Wieviele Stunden pro Woche nutzen Sie diese Kommunikationsmittel privat?", false),
        new QuestionnaireItemSVGNASATLX("questionnaireItem", "<b>Wie sind Ihre bisherigen Erfahrungen mit Telefonie?", true, "sehr schlecht", "sehr gut"),
        new QuestionnaireItemDefinedMulti("questionnaireItem", "<b>Welche Medien nutzen Sie regelmäßig (mehrmals im Monat)?", true,["Social Media", "Zeitung", "Fernsehen", "Radio"]),
        new QuestionnaireItemDefinedOne("questionnaireItem", "<b>Haben Sie schon einmal an einem Hörtest/-experiment teilgenommen?", true,["Ja", "Nein"]),
        new QuestionnaireItemText("questionnaireItem", "Wenn ja: Wann?", false),
        new QuestionnaireItemDefinedOne("questionnaireItem", "<b>Haben Sie regelmäßig (z.B. über Ihre Arbeit) mit Hör- und Audiotechnik, -verfahren oder -forschung zu tun?", true, ["Ja", "Nein"]),
        new QuestionnaireItemDefinedOne("questionnaireItem", "Wenn Nein: Hatten Sie früher einmal damit zu tun?", false, ["Ja", "Nein"]),
        new QuestionnaireItemText("questionnaireItem", "Wenn ja: Wann? (Jahr)", false),
        new QuestionnaireItemDefinedOne("questionnaireItem", "<b>Haben Sie Konzentrationsschwächen?", true, ["Ja", "Ein bisschen", "Nein"]),
        new QuestionnaireItemDefinedOne("questionnaireItem", "<b>Haben Sie Hörschwächen (z.B. Taubheit, chronischer Tinnitus)?", true, ["Ja", "Nein"]),
        new QuestionnaireItemText("questionnaireItem", "Wenn ja: Welche?", false),
        new QuestionnaireItemDefinedOne("questionnaireItem", "Benutzen Sie Hilfsmittel?", false, ["Ja", "Nein"]),
        new QuestionnaireItemText("questionnaireItem", "Wenn ja: Welche?", false),
    );

    screens.push(PreTestQuestionaire);
    
    var Tutorial = new ScreenUIElements(
        new UIElementHTML(undefined, "<h1>Einführung</h1>"),
        new UIElementHTML(undefined, "Hi Testperson. Immer noch vielen Dank, dass du freiwillig an diesem Test teilnimmst!"),
        new UIElementHTML(undefined, "Auf den nächsten Seiten werden dir Audiodateien abgespielt, die du auf einer Skala bewerten musst."),
        new UIElementHTML(undefined, "Dies sind die 5 Bewertungskategorien:"),
        new UIElementHTML("questionnaireItem", "<h2>Gesamtqualität</h2> Wie würdest du die allgemeine Qualität dieser Audio bewerten? Eher gut oder schlecht?"),
        new UIElementHTML("questionnaireItem", "<h2>Klangfarbe</h2> Klingt die Stimme verzerrt oder menschlich normal?"),
        new UIElementHTML("questionnaireItem", "<h2>Diskontinuität</h2> Ist der Ton abgehackt oder spielt es flüssig ab?"),
        new UIElementHTML("questionnaireItem", "<h2>Lautstärke</h2> Findest du die Audio zu laut oder leise oder ist es genau optimal?"),
        new UIElementHTML("questionnaireItem", "<h2>Rauschen</h2> Hörst du Rauschen oder andere Störgeräusche in dieser Audiodatei und wie stark?"),
        new UIElementHTML(undefined, "Einige Hinweise: Die Audiodatei kann mehrmals wiederholt angehört werden. Außerdem ist zu beachten, dass wenn man auf die nächste Seite kommt, dass die Audio sofort automatisch abgespielt wird. Des Weiteren gibt es eine kurze Pause nach ca. 40 Fragen."),
        new UIElementHTML(undefined, "Falls du Fragen während des Tests aufkommen sollten, kannst du dich jederzeit an einen Betreuer bzw. einer Betreuerin im Raum wenden."),
    );

    screens.push(Tutorial);

    let pB = reorderBatchV2();
    
    for(let i = 0; i < pB[0].length; i++){
        let text = "";
        if(pB[0][i].Type === "trick"){
            text = "Bitte bewerten Sie das folgende Hörbeispiel in allen Kategorien mit der besten Bewertung"
        }
        let page = i + 1;
        var AudioSampleScreen = new ScreenUIElements(
            new UIElementHTML(undefined, "<h1>Hörbeispiel " + page.toString() + "</h1>"),
            new QuestionnaireItemMediaAudioRepeatable("questionnaireItem", "<div class='invisible'> FileName: " + pB[0][i].Name + " Type: " + pB[0][i].Type + "</div>", false, pB[0][i].Path + pB[0][i].Name, true, "Replay"),
            new UIElementHTML(undefined, text),
            new QuestionnaireItemSVGNASATLX("questionnaireItem", "<h2>Gesamtqualität</h2> Bitte bewerten sie die Gesamtqualität", false, "Sehr schlecht", "Sehr gut"),
            new QuestionnaireItemSVGNASATLX("questionnaireItem", "<h2>Klangfarbe</h2> Bitte bewerten sie die Klangfarbe (Klingt die Stimme verzerrt oder menschlich normal?)", false, "klanglisch verfärbt", "klanglisch unverfärbt"),
            new QuestionnaireItemSVGNASATLX("questionnaireItem", "<h2>Diskontinuität</h2> Bitte bewerten sie die Diskontinuität (Ist der Ton abgehackt oder spielt es flüssig ab?)", false, "dikontinuierlich", "kontinuierlich"),
            new QuestionnaireItemSVGNASATLX("questionnaireItem", "<h2>Lautstärke</h2> Bitte bewerten sie die Lautstärke (Findest du die Audio zu laut oder leise oder ist es genau optimal?)", false, "nicht optimal", "optimal"),
            new QuestionnaireItemSVGNASATLX("questionnaireItem", "<h2>Rauschen</h2> Bitte bewerten sie das Rauschen (Hörst Störgeräusche in dieser Audiodatei und wie stark?)", false, "rauschhaftig", "unrauschhaftig"),  
        );

        screens.push(AudioSampleScreen);
    }
    
    var BreakScreen1 = new ScreenUIElements(
        new UIElementHTML(undefined, "<h1> Pause </h1>"),
        new UIElementHTML(undefined, "Du kannst kurz 10 Minuten Pause machen und dann weiter machen."),
    );

    screens.push(BreakScreen1);

    for(let i = 0; i < pB[1].length; i++){
        let text = "";
        if(pB[1][i].Type === "trick"){
            text = "Bitte bewerten Sie das folgende Hörbeispiel in allen Kategorien mit der besten Bewertung"
        }
        let page = i + 1;
        var AudioSampleScreen = new ScreenUIElements(
            new UIElementHTML(undefined, "<h1>Hörbeispiel " + page.toString() + "</h1>"),
            new QuestionnaireItemMediaAudioRepeatable("questionnaireItem", "<div class='invisible'> FileName: " + pB[1][i].Name + " Type: " + pB[1][i].Type + "</div>", false, pB[1][i].Path + pB[1][i].Name, true, "Replay"),
            new UIElementHTML(undefined, text),
            new QuestionnaireItemSVGNASATLX("questionnaireItem", "<h2>Gesamtqualität</h2> Bitte bewerten sie die Gesamtqualität", false, "Sehr schlecht", "Sehr gut"),
            new QuestionnaireItemSVGNASATLX("questionnaireItem", "<h2>Klangfarbe</h2> Bitte bewerten sie die Klangfarbe (Klingt die Stimme verzerrt oder menschlich normal?)", false, "klanglisch verfärbt", "klanglisch unverfärbt"),
            new QuestionnaireItemSVGNASATLX("questionnaireItem", "<h2>Diskontinuität</h2> Bitte bewerten sie die Diskontinuität (Ist der Ton abgehackt oder spielt es flüssig ab?)", false, "dikontinuierlich", "kontinuierlich"),
            new QuestionnaireItemSVGNASATLX("questionnaireItem", "<h2>Lautstärke</h2> Bitte bewerten sie die Lautstärke (Findest du die Audio zu laut oder leise oder ist es genau optimal?)", false, "nicht optimal", "optimal"),
            new QuestionnaireItemSVGNASATLX("questionnaireItem", "<h2>Rauschen</h2> Bitte bewerten sie das Rauschen (Hörst Störgeräusche in dieser Audiodatei und wie stark?)", false, "rauschhaftig", "unrauschhaftig"),  
        );

        screens.push(AudioSampleScreen);
    }

    var PostTestQuestionaire = new ScreenUIElements(
        new UIElementHTML(undefined, "<h1>Nachbefragung</h1>"),
        new UIElementHTML(undefined, "Bitte beantworten Sie die folgenden Fragen"),
        new QuestionnaireItemDefinedOne("questionnaireItem", "<b>Wie identifizieren Sie sich?", true,["männlich", "weiblich", "intersexuell/divers", "keine Angabe"]),
        new QuestionnaireItemSVGVisualAnalogueScale("questionnaireItem", "Fühlen Sie sich romantisch zu Frauen bzw. weiblichen/femininen Personen hingezogen?", false, "keine Anziehungskraft", "große Anziehungskraft"),
        new QuestionnaireItemSVGVisualAnalogueScale("questionnaireItem", "Fühlen Sie sich romantisch zu Männern bzw. männlichen/maskulinen Personen hingezogen?", false, "keine Anziehungskraft", "große Anziehungskraft"),
        new QuestionnaireItemDefinedOne("questionnaireItem", "<b>Was ist Ihr höchster erreichter Bildungsabschluss?", true, ["Noch in schulischer Ausbildung", "Fachhochschul- oder Hochschulreife", "Haupt- (Volks)schulabschluss", "Universitäts- oder Fachhochschulabschluss","Realschul- oder gleichwertiger Abschluss", "Ausbildung", "keine der genannten"]),
        new QuestionnaireItemDefinedOne("questionnaireItem", "<b>Sind Sie hungrig?", true, ["Ja", "Nein"]),
        new QuestionnaireItemText("questionnaireItem", "Wann haben Sie zuletzt gegessen?", false),
        new QuestionnaireItemDefinedOne("questionnaireItem", "<b>Hatten oder haben Sie heute Zeitdruck?", true, ["Ja", "Nein"]),
        new QuestionnaireItemText("questionnaireItem", "Wenn ja: Wann?", false),
        new QuestionnaireItemSVGVisualAnalogueScale("questionnaireItem", "<b>Wie wichtig ist Ihnen Audio- bzw. Telefonqualität?", true, "völlig unwichtig", "sehr wichtig"),
        new QuestionnaireItemText("questionnaireItem", "<b>Wie fühlen Sie sich heute?", true),
        new QuestionnaireItemDefinedOne("questionnaireItem", "<b>Hat sich Ihre Stimmung während der Befragung geändert?", true, ["Ja", "Nein"]),
        new QuestionnaireItemText("questionnaireItem", "Wenn ja: An welcher Stelle?", false),
    );

    screens.push(PostTestQuestionaire);
    
    var EndScreen = new ScreenWaitDataDownload(undefined, "Thank you for participating", testID + ".csv", false);
    
    screens.push(EndScreen);

}

//reorder the batches
function reorderBatchV2(){
    let participantBatch = [];

    let specialQuestions = [];
    let indices = [];
    let normalQuestions = [];

    for(let i = 0; i < batch.length; i++){    
        if(batch[i].Type === "gold" || batch[i].Type === "trick"){
            specialQuestions.push(batch[i]);
            indices.push(i);
        }
        else{
            normalQuestions.push(batch[i])
        }    
    }

    shuffle(normalQuestions);

    let countIndex = 0;
    let session = [];

    for(let j = 0; j <= batch.length; j++){
        if(j === 0 || j % 40 !== 0){
            if(indices[countIndex] === j){
                session.push(specialQuestions[countIndex]);
                countIndex++;
            }
            else{
                session.push(normalQuestions.shift());
            }
        }
        else{
            participantBatch.push(session);
            session = [];
            session.push(normalQuestions.shift());
        }
        
    }

    return participantBatch;
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
    
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    
    return array;
}

function start(){
    setupScreens();
    var screenController = new ScreenController(screens);
    screenController.init(document.body);
    screenController.start();
}