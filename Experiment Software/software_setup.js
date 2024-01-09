let screens = [];
let testID;
let batch;

// select the correct array based on the string input
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
    let array = [];

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
            } 
        }
        
    });

    batch = array;
}

function setupScreens(){
    var WelcomeScreen = new ScreenUIElements(
        new UIElementHTML(undefined, "<div id='head'> <div id='wrapper'> <div id='header-text'> <b> Advanced Projects at the Quality & Usability Lab </b></div> <img src='header/TU-Berlin-Logo.png'> </div> </div>"),
        new UIElementHTML(undefined, "<h1>Willkommen zum Experiment</h1>"),
        new UIElementHTML(undefined, "Hallo Testperson. Danke, dass Sie freiwillig an diesem Test teilnehmen! <br> Das einzige, was Sie für die Teilnahme an diesem Test benötigen, ist ein gutes Gehör und ausgezeichnete Deutschkenntnisse. <br> Ihre Antworten sind komplett anonym und subjektiv. Also gibt es kein richtig oder falsch bei der Wahl Ihrer Antworten. <br> Auf der nächsten Seite werden ein paar allgemeine Fragen zu Ihrer Person und Ihrem Telekommunikationsverhalten gestellt. Danach kommt eine Erklärung des Hörtests und dann geht es auch schon richtig los. <br> Diese Befragung dauert insgesamt ca. eine Stunde (mit kurzen Pausen zwischendurch) und wird mit 10 Euro pro Stunde belohnt (außer Sie sind ein Mitarbeiter bzw. eine Mitarbeiterin der TU, dann kein Geld für Sie xd). <br> Falls Fragen während des Tests aufkommen sollten, können Sie sich jederzeit an einen Betreuer bzw. einer Betreuerin im Raum wenden."),
        // new UIElementHTML(undefined, "Das einzige, was Sie für die Teilnahme an diesem Test benötigen, ist ein gutes Gehör und ausgezeichnete Deutschkenntnisse."),
        // new UIElementHTML(undefined, "Ihre Antworten sind komplett anonym und subjektiv. Also gibt es kein richtig oder falsch bei der Wahl Ihrer Antworten."),
        // new UIElementHTML(undefined, "Auf der nächsten Seite werden ein paar allgemeine Fragen zu Ihrer Person und Ihrem Telekommunikationsverhalten gestellt. Danach kommt eine Erklärung des Hörtests und dann geht es auch schon richtig los."),
        // new UIElementHTML(undefined, "Diese Befragung dauert insgesamt ca. eine Stunde (mit kurzen Pausen zwischendurch) und wird mit 10 Euro pro Stunde belohnt (außer Sie sind ein Mitarbeiter bzw. eine Mitarbeiterin der TU, dann kein Geld für Sie xd)."),
        // new UIElementHTML(undefined, "Falls Fragen während des Tests aufkommen sollten, können Sie sich jederzeit an einen Betreuer bzw. einer Betreuerin im Raum wenden.")
        );

    screens.push(WelcomeScreen);

    var PreTestQuestionaire = new ScreenUIElements(
        new UIElementHTML(undefined, "<div id='head'> <div id='wrapper'> <div id='header-text'> <b> Advanced Projects at the Quality & Usability Lab </b></div> <img src='header/TU-Berlin-Logo.png'> </div> </div>"),
        new UIElementHTML(undefined, "<h1>Vorbefragung</h1>"),
        new UIElementHTML(undefined, "Bitte beantworten Sie die folgenden Fragen"),
        new QuestionnaireItemText("qI-age", "<b>Wie alt sind Sie?", true),
        new QuestionnaireItemDefinedOne("qI-single", "<b>Wie würden Sie Ihre Deutschkenntnisse einschätzen?", true,["Muttersprache", "C1/2 (Verhandlungssicher)", "B1/2 (Gesprächssicher)", "keine der genannten"]),
        new QuestionnaireItemText("qI-select-language", "Wenn deutsch nicht Ihre Muttersprache ist: Was ist Ihre Muttersprache?", false),
        new QuestionnaireItemDefinedMulti("qI-multi", "<b>Welche der folgenden Kommunikationsformen nutzen Sie regelmäßig (mehrmals im Monat)?", true,["Telefonie über Netz", "Telefonie über Internet", "Videotelefonie", "Videokonferenzen (Zoom etc.)", "keine der genannten"]),
        new QuestionnaireItemText("qI-age", "Wieviele Stunden pro Woche nutzen Sie diese Kommunikationsmittel geschäftlich?", false),
        new QuestionnaireItemText("qI-age", "Wieviele Stunden pro Woche nutzen Sie diese Kommunikationsmittel privat?", false),
        new QuestionnaireItemSVGQuality7pt("questionnaireItem", "<b>Wie sind Ihre bisherigen Erfahrungen mit Telefonie?", true, ["", "sehr schlecht", "", "", "", "sehr gut", ""]),
        new QuestionnaireItemDefinedMulti("qI-multi", "<b>Welche Medien nutzen Sie regelmäßig (mehrmals im Monat)?", true,["Social Media", "Zeitung", "Fernsehen", "Radio", "keine der genannten"]),
        new QuestionnaireItemDefinedOne("qI-single", "<b>Haben Sie schon einmal an einem Hörtest/-experiment teilgenommen?", true,["Ja", "Nein"]),
        new QuestionnaireItemText("qI-year", "Wenn ja: Wann? (Jahr)", false),
        new QuestionnaireItemDefinedOne("qI-single", "<b>Haben Sie regelmäßig (z.B. über Ihre Arbeit) mit Hör- und Audiotechnik, -verfahren oder -forschung zu tun?", true, ["Ja", "Nein"]),
        new QuestionnaireItemDefinedOne("qI-single", "Wenn Nein: Hatten Sie früher einmal damit zu tun?", false, ["Ja", "Nein"]),
        new QuestionnaireItemText("qI-year", "Wenn ja: Wann? (Jahr)", false),
        new QuestionnaireItemDefinedOne("qI-single", "<b>Haben Sie Konzentrations- oder Hörschwächen?", true, ["Ja", "Nein"]),
        // new QuestionnaireItemText("qI-text", "Wenn ja: Welche?", false),
        new QuestionnaireItemDefinedOne("qI-single", "Wenn js: Benutzen Sie Hilfsmittel?", false, ["Ja", "Nein"]),
        new QuestionnaireItemText("qI-text", "Wenn ja: Welche?", false),
    );

    screens.push(PreTestQuestionaire);
    
    
    var Tutorial = new ScreenUIElements(
        new UIElementHTML(undefined, "<div id='head'> <div id='wrapper'> <div id='header-text'> <b> Advanced Projects at the Quality & Usability Lab </b></div> <img src='header/TU-Berlin-Logo.png'> </div> </div>"),
        new UIElementHTML(undefined, "<h1>Einführung</h1>"),
        new UIElementHTML(undefined, "Hallo Testperson. Immer noch vielen Dank, dass Sie freiwillig an diesem Test teilnehmen!"),
        new UIElementHTML(undefined, "Auf den nächsten Seiten werden Ihnen Audiodateien abgespielt, die Sie auf einer Skala bewerten müssen."),
        new UIElementHTML(undefined, "Dies sind die 5 Bewertungskategorien:"),
        new UIElementHTML("questionnaireItem", "<h2>Gesamtqualität</h2> Wie würden Sie die allgemeine Qualität dieser Audio bewerten? Eher gut oder schlecht? <br> <i>(Beschreibt wie angenehm und ansprechend der Klang insgesamt wahrgenommen wurde. Betrachten Sie Faktoren wie Klarheit, Präzision und klangliche Fülle. Dies sollte unabhängig von Faktoren wie der Lautstärke oder Klangfarbe geschehen.) </i>"),
        new UIElementHTML("questionnaireItem", "<h2>Klangfarbe</h2> Klingt die Stimme verzerrt oder menschlich normal? <br> <i> Beschreibt die Charakteristik oder den spezifischen Klangton einer Probe. Betrachten Sie harmonische Eigenschaften, die Tonhöhenverteilung und andere Merkmale. Ist der Klang eher warm, kühl, lebhaft oder gedämpft? Ein guter Wert zeigt an, dass die Audio-Dateien authentisch und unverfälscht sind. Hingegen könnte eine deutliche Klangfärbung auf spezifische Betonungen in den Frequenzen oder klangliche Eigenheiten hindeuten, was zu einer schlechteren Bewertung führen würde. </i>"),
        new UIElementHTML("questionnaireItem", "<h2>Diskontinuität</h2> Ist der Ton abgehackt oder spielt es flüssig ab? <br> <i> Beschreibt inwiefern Unterbrechungen, Sprünge oder Unregelmäßigkeiten in gegebenen Proben auftreten. Geringe Diskontinuität weist auf reibungslose Audio-Wiedergabe hin, während ein hoher Diskontinuitäts-Wert auf störende Brüche oder Sprünge im Klangverlauf verweisen würde. </i>"),
        new UIElementHTML("questionnaireItem", "<h2>Lautstärke</h2> Finden Sie die Audio zu laut oder leise oder ist es genau optimal? <br> <i> Beschreibt die subjektive Wahrnehmung der Stärke oder Intensität des Klangs in einer Probe. Eine angemessene Lautstärke ermöglicht eine klare Hörbarkeit, während eine zu niedrige Lautstärke möglicherweise Details verschleiert und eine zu hohe Lautstärke zu Verzerrungen führen kann. Die Bewertung der Lautstärke berücksichtigt, ob die Pegel konsistent sind und ob sie den Anforderungen des Hörers entsprechen. </i>"),
        new UIElementHTML("questionnaireItem", "<h2>Rauschen</h2> Hören Sie ein Rauschen oder andere Störgeräusche in dieser Audiodatei und wie stark? <br> <i> Beschreibt die subjektive Wahrnehmung der Stärke oder Intensität des Klangs in einer Probe. Eine angemessene Lautstärke ermöglicht eine klare Hörbarkeit, während eine zu niedrige Lautstärke möglicherweise Details verschleiert und eine zu hohe Lautstärke zu Verzerrungen führen kann. Die Bewertung der Lautstärke berücksichtigt, ob die Pegel konsistent sind und ob sie den Anforderungen des Hörers entsprechen. </i>"),
        new UIElementHTML(undefined, "Einige Hinweise: Die Audiodatei kann mehrmals wiederholt angehört werden. Außerdem ist zu beachten, dass wenn man auf die nächste Seite kommt, dass die Audio sofort automatisch abgespielt wird. Des Weiteren gibt es eine kurze Pause nach ca. 40 Fragen."),
        new UIElementHTML(undefined, "Falls Fragen während des Tests aufkommen sollten, können Sie sich jederzeit an einen Betreuer bzw. einer Betreuerin im Raum wenden."),
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
            new UIElementHTML(undefined, "<div id='head'> <div id='wrapper'> <div id='header-text'> <b> Advanced Projects at the Quality & Usability Lab </b></div> <img src='header/TU-Berlin-Logo.png'> </div> </div>"),
            new UIElementHTML(undefined, "<h1>Hörbeispiel " + page.toString() + "</h1>"),
            new QuestionnaireItemMediaAudioRepeatable("questionnaireItem", "<div class='invisible'> FileName: " + pB[0][i].Name + " Type: " + pB[0][i].Type + "</div>", false, pB[0][i].Path + pB[0][i].Name, true, "Replay"),
            new UIElementHTML(undefined, text),
            new QuestionnaireItemSVGQuality7pt("questionnaireItem", "<h2>Gesamtqualität</h2>", false, ["", "schlecht", "dürftig", "ordentlich", "gut", "ausgezeichnet", ""]),
            new QuestionnaireItemSVGQuality7pt("questionnaireItem", "<h2>Klangfarbe</h2>", false, ["", "klanglich unverfärbt", "", "", "", "klanglich verfärbt", ""]),
            new QuestionnaireItemSVGQuality7pt("questionnaireItem", "<h2>Diskontinuität</h2>", false, ["", "kontinuierlich", "", "", "", "diskontinuierlich", ""]),
            new QuestionnaireItemSVGQuality7pt("questionnaireItem", "<h2>Lautstärke</h2>", false, ["", "optimal", "", "", "", "nicht optimal", ""]),
            new QuestionnaireItemSVGQuality7pt("questionnaireItem", "<h2>Rauschintensität</h2>", false, ["", "unrauschhaftig", "", "", "", "rauschhaftig", ""]),
        );

        screens.push(AudioSampleScreen);
    }
    
    var BreakScreen1 = new ScreenUIElements(
        new UIElementHTML(undefined, "<div id='head'> <div id='wrapper'> <div id='header-text'> <b> Advanced Projects at the Quality & Usability Lab </b></div> <img src='header/TU-Berlin-Logo.png'> </div> </div>"),
        new UIElementHTML(undefined, "<h1> Pause </h1>"),
        new UIElementHTML(undefined, "Sie können kurz 10 Minuten Pause machen und den Test dann forsetzen."),
    );

    screens.push(BreakScreen1);

    for(let i = 0; i < pB[1].length; i++){
        let text = "";
        if(pB[1][i].Type === "trick"){
            text = "Bitte bewerten Sie das folgende Hörbeispiel in allen Kategorien mit der besten Bewertung"
        }
        let page = i + 1;
        var AudioSampleScreen = new ScreenUIElements(
            new UIElementHTML(undefined, "<div id='head'> <div id='wrapper'> <div id='header-text'> <b> Advanced Projects at the Quality & Usability Lab </b></div> <img src='header/TU-Berlin-Logo.png'> </div> </div>"),
            new UIElementHTML(undefined, "<h1>Hörbeispiel " + page.toString() + "</h1>"),
            new QuestionnaireItemMediaAudioRepeatable("questionnaireItem", "<div class='invisible'> FileName: " + pB[1][i].Name + " Type: " + pB[1][i].Type + "</div>", false, pB[1][i].Path + pB[1][i].Name, true, "Replay"),
            new UIElementHTML(undefined, text),
            new QuestionnaireItemSVGQuality7pt("questionnaireItem", "<h2>Gesamtqualität</h2>", false, ["", "schlecht", "dürftig", "ordentlich", "gut", "ausgezeichnet", ""]),
            new QuestionnaireItemSVGQuality7pt("questionnaireItem", "<h2>Klangfarbe</h2>", false, ["", "klanglich unverfärbt", "", "", "", "klanglich verfärbt", ""]),
            new QuestionnaireItemSVGQuality7pt("questionnaireItem", "<h2>Diskontinuität</h2>", false, ["", "kontinuierlich", "", "", "", "diskontinuierlich", ""]),
            new QuestionnaireItemSVGQuality7pt("questionnaireItem", "<h2>Lautstärke</h2>", false, ["", "optimal", "", "", "", "nicht optimal", ""]),
            new QuestionnaireItemSVGQuality7pt("questionnaireItem", "<h2>Rauschintensität</h2>", false, ["", "unrauschhaftig", "", "", "", "rauschhaftig", ""]),
        );

        screens.push(AudioSampleScreen);
    }

    var PostTestQuestionaire = new ScreenUIElements(
        new UIElementHTML(undefined, "<div id='head'> <div id='wrapper'> <div id='header-text'> <b> Advanced Projects at the Quality & Usability Lab </b></div> <img src='header/TU-Berlin-Logo.png'> </div> </div>"),
        new UIElementHTML(undefined, "<h1>Nachbefragung</h1>"),
        new UIElementHTML(undefined, "Bitte beantworten Sie die folgenden Fragen"),
        new QuestionnaireItemDefinedOne("qI-single", "<b>Wie identifizieren Sie sich?", true,["männlich", "weiblich", "intersexuell/divers", "keine Angabe"]),
        new QuestionnaireItemSVGQuality7pt("questionnaireItem", "Fühlen Sie sich romantisch zu Frauen bzw. weiblichen/femininen Personen hingezogen?", false, ["", "keine Anziehungskraft", "", "", "", "große Anziehungskraft", ""]),
        new QuestionnaireItemSVGQuality7pt("questionnaireItem", "Fühlen Sie sich romantisch zu Männern bzw. männlichen/maskulinen Personen hingezogen?", false, ["", "keine Anziehungskraft", "", "", "", "große Anziehungskraft", ""]),
        new QuestionnaireItemDefinedOne("qI-single", "<b>Was ist Ihr höchster erreichter Bildungsabschluss?", true, ["Noch in schulischer Ausbildung", "Fachhochschul- oder Hochschulreife", "Haupt- (Volks)schulabschluss", "Universitäts- oder Fachhochschulabschluss","Realschul- oder gleichwertiger Abschluss", "Ausbildung", "keine der genannten"]),
        new QuestionnaireItemDefinedOne("qI-single", "<b>Sind Sie hungrig?", true, ["Ja", "Nein"]),
        new QuestionnaireItemText("qI-time", "Wann haben Sie zuletzt gegessen?", false),
        new QuestionnaireItemDefinedOne("qI-single", "<b>Hatten oder haben Sie heute Zeitdruck?", true, ["Ja", "Nein"]),
        new QuestionnaireItemText("qI-time", "Wenn ja: Wann?", false),
        new QuestionnaireItemSVGQuality7pt("questionnaireItem", "<b>Wie wichtig ist Ihnen Audio- bzw. Telefonqualität?", true, ["", "völlig unwichtig", "", "", "", "sehr wichtig", ""]),
        new QuestionnaireItemText("qI-text", "<b>Wie fühlen Sie sich heute?", true),
        new QuestionnaireItemDefinedOne("qI-single", "<b>Hat sich Ihre Stimmung während der Befragung geändert?", true, ["Ja", "Nein"]),
        new QuestionnaireItemText("qI-text", "Wenn ja: An welcher Stelle?", false),
    );

    screens.push(PostTestQuestionaire);
    
    var EndScreen = new ScreenWaitDataDownload(undefined, "Danke für Ihre Teilnahme!", testID + ".csv", false);
    
    screens.push(EndScreen);
    
    let standardButton = new PaginateUIButton("button", undefined, 1, "", "Weiter");
    let button1 = new PaginateUIButton("button", undefined, 1, "", "Vorbefragung starten");
    //let backButton = new PaginateUIButton("button", -1, 1, "Zurück", "Weiter");

    for (let i = 0; i < screens.length; i++) {
        if(i > 0){
            screens[i].setPaginateUI(standardButton);
        }
        else {
            screens[i].setPaginateUI(button1);
        }
        // else if(i == 1){
        //     screens[i].setPaginateUI(backButton);
        // }
        // else{
        //     screens[i].setPaginateUI(standardButton);
        // }
    }
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