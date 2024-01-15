let screens = [];
let testID;
let batch;
let dateTime;

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
    // var WelcomeScreen = new ScreenUIElements(
    //     new UIElementHTML(undefined, "<div id='head'> <div id='wrapper'> <div id='header-text'> <b> Advanced Projects at the Quality & Usability Lab </b></div> <img src='header/TU-Berlin-Logo.png'> </div> </div>"),
    //     new UIElementHTML(undefined, "<h1>Willkommen zum Experiment</h1>"),
    //     new UIElementHTML(undefined, "Hallo Testperson. Danke, dass Sie freiwillig an diesem Test teilnehmen! <br> Das einzige, was Sie für die Teilnahme an diesem Test benötigen, ist ein gutes Gehör und ausgezeichnete Deutschkenntnisse. <br> Ihre Antworten sind komplett anonym und subjektiv. Also gibt es kein richtig oder falsch bei der Wahl Ihrer Antworten. <br> Auf der nächsten Seite werden ein paar allgemeine Fragen zu Ihrer Person und Ihrem Telekommunikationsverhalten gestellt. Danach kommt eine Erklärung des Hörtests und dann geht es auch schon richtig los. <br> Diese Befragung dauert insgesamt ca. eine Stunde (mit kurzen Pausen zwischendurch) und wird mit 10 Euro pro Stunde belohnt (außer Sie sind ein Mitarbeiter bzw. eine Mitarbeiterin der TU, dann kein Geld für Sie xd). <br> Falls Fragen während des Tests aufkommen sollten, können Sie sich jederzeit an einen Betreuer bzw. einer Betreuerin im Raum wenden."),
    //     // new UIElementHTML(undefined, "Das einzige, was Sie für die Teilnahme an diesem Test benötigen, ist ein gutes Gehör und ausgezeichnete Deutschkenntnisse."),
    //     // new UIElementHTML(undefined, "Ihre Antworten sind komplett anonym und subjektiv. Also gibt es kein richtig oder falsch bei der Wahl Ihrer Antworten."),
    //     // new UIElementHTML(undefined, "Auf der nächsten Seite werden ein paar allgemeine Fragen zu Ihrer Person und Ihrem Telekommunikationsverhalten gestellt. Danach kommt eine Erklärung des Hörtests und dann geht es auch schon richtig los."),
    //     // new UIElementHTML(undefined, "Diese Befragung dauert insgesamt ca. eine Stunde (mit kurzen Pausen zwischendurch) und wird mit 10 Euro pro Stunde belohnt (außer Sie sind ein Mitarbeiter bzw. eine Mitarbeiterin der TU, dann kein Geld für Sie xd)."),
    //     // new UIElementHTML(undefined, "Falls Fragen während des Tests aufkommen sollten, können Sie sich jederzeit an einen Betreuer bzw. einer Betreuerin im Raum wenden.")
    //     );

    // screens.push(WelcomeScreen);

    var PreTestQuestionaire = new ScreenUIElements(
        new UIElementHTML(undefined, "<div id='head'> <div id='wrapper'> <div id='header-text'> <b> Advanced Projects at the Quality & Usability Lab </b></div> <img src='header/TU-Berlin-Logo.png'> </div> </div>"),
        new UIElementHTML(undefined, "<h1>Vorbefragung</h1>"),
        new UIElementHTML(undefined, "Bitte beantworten Sie die folgenden Fragen"),
        new QuestionnaireItemText("qI-age", "<b>Wie alt sind Sie?", true),
        new QuestionnaireItemDefinedOne("qI-single", "<b>Wie würden Sie Ihre Deutschkenntnisse einschätzen?", true,["Muttersprache", "C1/2 (Verhandlungssicher)", "B1/2 (Gesprächssicher)", "keine der genannten"]),
        new QuestionnaireItemText("qI-text", "Wenn deutsch nicht Ihre Muttersprache ist: Was ist Ihre Muttersprache?", false),
        new QuestionnaireItemDefinedMulti("qI-multi", "<b>Welche der folgenden Telekommunikationsformen nutzen Sie regelmäßig?", true,["Telefonie über Festnetz", "Mobiltelefonie", "Internettelefonie (z.B. über Messenger-Apps wie Whatsapp)", "Videotelefonie"]),
        new QuestionnaireItemText("qI-hour", "<b> Wie viele Stunden pro Woche nutzen Sie Telefonie über Festnetz?", true),
        new QuestionnaireItemText("qI-hour", "<b> Wie viele Stunden pro Woche nutzen Sie Mobiltelefonie?", true),
        new QuestionnaireItemText("qI-hour", "<b> Wie viele Stunden pro Woche nutzen Sie Internettelefonie?", true),
        new QuestionnaireItemText("qI-hour", "<b> Wie viele Stunden pro Woche nutzen Sie Videotelefonie?", true),
        new QuestionnaireItemSVGQuality7pt("questionnaireItem", "<b>Wie sind Ihre bisherigen Erfahrungen mit Telekommunikationsmitteln?", true, ["", "sehr schlecht", "", "", "", "sehr gut", ""]),
        new QuestionnaireItemDefinedMulti("qI-multi", "<b>Welche dieser Medien nutzen Sie regelmäßig?", true,["Social Media", "Online-Zeitungen", "Fernsehen", "Radio"]),
        new QuestionnaireItemText("qI-hour", "<b> Wie viele Stunden pro Woche nutzen Sie Social Media?", true),
        new QuestionnaireItemText("qI-hour", "<b> Wie viele Stunden pro Woche nutzen Sie Online-Zeitungen?", true),
        new QuestionnaireItemText("qI-hour", "<b> Wie viele Stunden pro Woche nutzen Sie den Fernseher?", true),
        new QuestionnaireItemText("qI-hour", "<b> Wie viele Stunden pro Woche nutzen Sie das Radio?", true),
        new QuestionnaireItemDefinedOne("qI-single", "<b>Haben Sie schon einmal an einem Hörtest/-experiment teilgenommen?", true,["Ja", "Nein"]),
        new QuestionnaireItemText("qI-year", "Wenn Ja: Wann? (Jahr)", false),
        new QuestionnaireItemDefinedOne("qI-single", "<b>Haben Sie regelmäßig (z.B. über Ihre Arbeit) mit Audiotechnikverfahren/-forschung zu tun?", true, ["Ja", "Nein"]),
        new QuestionnaireItemDefinedOne("qI-single", "Wenn Nein: Hatten Sie früher einmal damit zu tun?", false, ["Ja", "Nein"]),
        new QuestionnaireItemText("qI-year", "Wenn Ja: Wann? (Jahr)", false),
        new QuestionnaireItemDefinedOne("qI-single", "<b>Haben Sie Konzentrations- oder Hörschwächen?", true, ["Ja", "Nein"]),
        // new QuestionnaireItemText("qI-text", "Wenn ja: Welche?", false),
        new QuestionnaireItemDefinedOne("qI-single", "Wenn ja: Benutzen Sie Hilfsmittel (z.B. Hörgerät, Medikamente)?", false, ["Ja", "Nein"]),
        new QuestionnaireItemText("qI-text", "Wenn Ja: Welche? (Wenn Sie spezielle Medikamente einnehmen ist es ausreichend mit 'Medikamente' zu antworten)", false),
    );

    screens.push(PreTestQuestionaire);
    
    
    var Tutorial = new ScreenUIElements(
        new UIElementHTML(undefined, "<div id='head'> <div id='wrapper'> <div id='header-text'> <b> Advanced Projects at the Quality & Usability Lab </b></div> <img src='header/TU-Berlin-Logo.png'> </div> </div>"),
        new UIElementHTML("tutorial", "<h1>Einführung</h1>"),
        new UIElementHTML("tutorial", "Herzlich willkommen zu unserem Experiment über die Untersuchung von Audio-Degradierung! <br> In dieser Studie werden wir die Auswirkungen verschiedener Faktoren auf die Klangqualität von Audio-Proben erforschen. <br> Das Experiment erstreckt sich generell über 90 Minuten "),
        new UIElementHTML("tutorial", "<b> Ablauf </b> <ul> <li> Innerhalb des Experiments erhalten Sie zwei Sets von jeweils ca. 40 Audiodateien </li> <li> Diese Audiodateien bewerten Sie anhand der Gesichtspunkte Gesamtqualität, Klangfarbe, Diskontinuität, Lautstärke und Rauschintensität </li> <li> Ihr Ziel ist es, die Audio-Charakteristika und mögliche Beeinträchtigungen in den Proben zu identifizieren. </li> <li> Wir bitten Sie, Ihre Bewertungen nach bestem Wissen und Gewissen abzugeben, da diese dazu beitragen werden, <br> ein präzises Bild der Klangqualität zu zeichnen. Vielen Dank, dass Sie sich die Zeit nehmen, an diesem Experiment teilzunehmen. </li> <li> Im folgenden erhalten Sie eine kurze Einführung in das Bewertungssystem und die jeweiligen Bewertungskategorien </li> </ul> <b> Hinweise </b> <ul> <li> Die Audiodateien werden beim betreten der Seite automatisch abgespielt </li> <li> Eine Audiodatei kann wiederholt abgespielt werden. Verwenden Sie hierfür den 'Replay'-Knopf </li> <li> Sie müssen sich die Audiodatei mindestens einmal komplett anhören, um forfahren zu können </li> <li> Nach ca. 40 Fragen haben Sie die Möglichkeit eine kurze Pause zu machen </li> <li> Sollten Sie während des Tests eine Frage haben wenden Sie sich bitte an den/die jeweilige Betreuer:in </li> </ul>"),
    );

    screens.push(Tutorial);

    var Tutorial2 = new ScreenUIElements(
        new UIElementHTML(undefined, "<div id='head'> <div id='wrapper'> <div id='header-text'> <b> Advanced Projects at the Quality & Usability Lab </b></div> <img src='header/TU-Berlin-Logo.png'> </div> </div>"),
        new UIElementHTML(undefined, "<h1>Einführung</h1>"),
        new QuestionnaireItemMediaAudioRepeatable("questionnaireItem", "<p> Wie bereits erwähnt wird die Audiodatei beim betreten der Seite direkt abgespielt. Mithilfe des 'Replay'-Knopfes können Sie die Audiodatei erneut abspielen. </p>", false, "audio_files/real_files/F1_C01.wav", true, "Replay"),
        new UIElementHTML("tutorial", "<b> Bitte bewerten Sie die Audiodatei nun anhand der folgenden 5 Bewertungskategorien (Klicken Sie hierfür die gewünschte Stelle auf der jeweiligen Skala an):"),
        new QuestionnaireItemSVGQuality7pt("questionnaireItem", "<h2>Gesamtqualität</h2> <p> Beschreibt wie angenehm und ansprechend der Klang insgesamt wahrgenommen wurde. Betrachten Sie Faktoren wie Klarheit, Präzision und klangliche Fülle. Dies sollte unabhängig von Faktoren wie der Lautstärke oder Klangfarbe geschehen. </p> <i> Wie würden Sie die allgemeine Qualität dieser Audio bewerten? Eher gut oder schlecht? </i>", false, ["", "schlecht", "dürftig", "ordentlich", "gut", "ausgezeichnet", ""]),
        new QuestionnaireItemSVGQuality7pt("questionnaireItem", "<h2>Klangfarbe</h2> <p> Beschreibt die Charakteristik oder den spezifischen Klangton einer Probe. Betrachten Sie harmonische Eigenschaften, die Tonhöhenverteilung und andere Merkmale. Ist der Klang eher warm, kühl, lebhaft oder gedämpft? Ein guter Wert zeigt an, dass die Audio-Dateien authentisch und unverfälscht sind. Hingegen könnte eine deutliche Klangfärbung auf spezifische Betonungen in den Frequenzen oder klangliche Eigenheiten hindeuten, was zu einer schlechteren Bewertung führen würde. </p> <i> Klingt die Stimme verzerrt oder menschlich normal? </i>", false, ["", "klanglich unverfärbt", "", "", "", "klanglich verfärbt", ""]),
        new QuestionnaireItemSVGQuality7pt("questionnaireItem", "<h2>Diskontinuität</h2> <p> Beschreibt inwiefern Unterbrechungen, Sprünge oder Unregelmäßigkeiten in gegebenen Proben auftreten. Geringe Diskontinuität weist auf reibungslose Audio-Wiedergabe hin, während ein hoher Diskontinuitäts-Wert auf störende Brüche oder Sprünge im Klangverlauf verweisen würde. </p> <i> Ist der Ton abgehackt oder spielt es flüssig ab? </i>", false, ["", "kontinuierlich", "", "", "", "diskontinuierlich", ""]),
        new QuestionnaireItemSVGQuality7pt("questionnaireItem", "<h2>Lautstärke</h2> <p> Beschreibt die subjektive Wahrnehmung der Stärke oder Intensität des Klangs in einer Probe. Eine angemessene Lautstärke ermöglicht eine klare Hörbarkeit, während eine zu niedrige Lautstärke möglicherweise Details verschleiert und eine zu hohe Lautstärke zu Verzerrungen führen kann. Die Bewertung der Lautstärke berücksichtigt, ob die Pegel konsistent sind und ob sie den Anforderungen des Hörers entsprechen. </p> <i> Finden Sie die Audio zu laut oder leise oder ist es genau optimal? </i>", false, ["", "optimal", "", "", "", "nicht optimal", ""]),
        new QuestionnaireItemSVGQuality7pt("questionnaireItem", "<h2>Rauschen</h2> <p> Beschreibt die Präsenz und Intensität von unerwünschten Hintergrundgeräuschen oder Störungen in einer Probe. Eine geringe Rauschintensität wird positiv bewertet, da sie zu einem klaren und sauberen Klang beiträgt. Im Gegensatz dazu kann starkes Rauschen die Wahrnehmung von Details beeinträchtigen und das Hörerlebnis stören. </p> <i> Hören Sie ein Rauschen oder andere Störgeräusche in dieser Audiodatei und wie stark? </i>", false, ["", "unrauschhaftig", "", "", "", "rauschhaftig", ""]),
    );

    screens.push(Tutorial2);

    var Tutorial3 = new ScreenUIElements(
        new UIElementHTML(undefined, "<div id='head'> <div id='wrapper'> <div id='header-text'> <b> Advanced Projects at the Quality & Usability Lab </b></div> <img src='header/TU-Berlin-Logo.png'> </div> </div>"),
        new UIElementHTML(undefined, "<h1>Einführung</h1>"),
        new QuestionnaireItemMediaAudioRepeatable("questionnaireItem", "<p> Wie bereits erwähnt wird die Audiodatei beim betreten der Seite direkt abgespielt. Mithilfe des 'Replay'-Knopfes können Sie die Audiodatei erneut abspielen. </p>", false, "audio_files/real_files/F2_C01.wav", true, "Replay"),
        new UIElementHTML("tutorial", "<b> Bitte bewerten Sie die Audiodatei nun anhand der folgenden 5 Bewertungskategorien (Klicken Sie hierfür die gewünschte Stelle auf der jeweiligen Skala an):"),
        new QuestionnaireItemSVGQuality7pt("questionnaireItem", "<h2>Gesamtqualität</h2> <p> Beschreibt wie angenehm und ansprechend der Klang insgesamt wahrgenommen wurde. Betrachten Sie Faktoren wie Klarheit, Präzision und klangliche Fülle. Dies sollte unabhängig von Faktoren wie der Lautstärke oder Klangfarbe geschehen. </p> <i> Wie würden Sie die allgemeine Qualität dieser Audio bewerten? Eher gut oder schlecht? </i>", false, ["", "schlecht", "dürftig", "ordentlich", "gut", "ausgezeichnet", ""]),
        new QuestionnaireItemSVGQuality7pt("questionnaireItem", "<h2>Klangfarbe</h2> <p> Beschreibt die Charakteristik oder den spezifischen Klangton einer Probe. Betrachten Sie harmonische Eigenschaften, die Tonhöhenverteilung und andere Merkmale. Ist der Klang eher warm, kühl, lebhaft oder gedämpft? Ein guter Wert zeigt an, dass die Audio-Dateien authentisch und unverfälscht sind. Hingegen könnte eine deutliche Klangfärbung auf spezifische Betonungen in den Frequenzen oder klangliche Eigenheiten hindeuten, was zu einer schlechteren Bewertung führen würde. </p> <i> Klingt die Stimme verzerrt oder menschlich normal? </i>", false, ["", "klanglich unverfärbt", "", "", "", "klanglich verfärbt", ""]),
        new QuestionnaireItemSVGQuality7pt("questionnaireItem", "<h2>Diskontinuität</h2> <p> Beschreibt inwiefern Unterbrechungen, Sprünge oder Unregelmäßigkeiten in gegebenen Proben auftreten. Geringe Diskontinuität weist auf reibungslose Audio-Wiedergabe hin, während ein hoher Diskontinuitäts-Wert auf störende Brüche oder Sprünge im Klangverlauf verweisen würde. </p> <i> Ist der Ton abgehackt oder spielt es flüssig ab? </i>", false, ["", "kontinuierlich", "", "", "", "diskontinuierlich", ""]),
        new QuestionnaireItemSVGQuality7pt("questionnaireItem", "<h2>Lautstärke</h2> <p> Beschreibt die subjektive Wahrnehmung der Stärke oder Intensität des Klangs in einer Probe. Eine angemessene Lautstärke ermöglicht eine klare Hörbarkeit, während eine zu niedrige Lautstärke möglicherweise Details verschleiert und eine zu hohe Lautstärke zu Verzerrungen führen kann. Die Bewertung der Lautstärke berücksichtigt, ob die Pegel konsistent sind und ob sie den Anforderungen des Hörers entsprechen. </p> <i> Finden Sie die Audio zu laut oder leise oder ist es genau optimal? </i>", false, ["", "optimal", "", "", "", "nicht optimal", ""]),
        new QuestionnaireItemSVGQuality7pt("questionnaireItem", "<h2>Rauschen</h2> <p> Beschreibt die Präsenz und Intensität von unerwünschten Hintergrundgeräuschen oder Störungen in einer Probe. Eine geringe Rauschintensität wird positiv bewertet, da sie zu einem klaren und sauberen Klang beiträgt. Im Gegensatz dazu kann starkes Rauschen die Wahrnehmung von Details beeinträchtigen und das Hörerlebnis stören. </p> <i> Hören Sie ein Rauschen oder andere Störgeräusche in dieser Audiodatei und wie stark? </i>", false, ["", "unrauschhaftig", "", "", "", "rauschhaftig", ""]),
    );

    screens.push(Tutorial3);

    var Tutorial4 = new ScreenUIElements(
        new UIElementHTML(undefined, "<div id='head'> <div id='wrapper'> <div id='header-text'> <b> Advanced Projects at the Quality & Usability Lab </b></div> <img src='header/TU-Berlin-Logo.png'> </div> </div>"),
        new UIElementHTML(undefined, "<h1>Einführung</h1>"),
        new QuestionnaireItemMediaAudioRepeatable("questionnaireItem", "<p> Wie bereits erwähnt wird die Audiodatei beim betreten der Seite direkt abgespielt. Mithilfe des 'Replay'-Knopfes können Sie die Audiodatei erneut abspielen. </p>", false, "audio_files/real_files/M1_C01.wav", true, "Replay"),
        new UIElementHTML("tutorial", "<b> Bitte bewerten Sie die Audiodatei nun anhand der folgenden 5 Bewertungskategorien (Klicken Sie hierfür die gewünschte Stelle auf der jeweiligen Skala an):"),
        new QuestionnaireItemSVGQuality7pt("questionnaireItem", "<h2>Gesamtqualität</h2> <p> Beschreibt wie angenehm und ansprechend der Klang insgesamt wahrgenommen wurde. Betrachten Sie Faktoren wie Klarheit, Präzision und klangliche Fülle. Dies sollte unabhängig von Faktoren wie der Lautstärke oder Klangfarbe geschehen. </p> <i> Wie würden Sie die allgemeine Qualität dieser Audio bewerten? Eher gut oder schlecht? </i>", false, ["", "schlecht", "dürftig", "ordentlich", "gut", "ausgezeichnet", ""]),
        new QuestionnaireItemSVGQuality7pt("questionnaireItem", "<h2>Klangfarbe</h2> <p> Beschreibt die Charakteristik oder den spezifischen Klangton einer Probe. Betrachten Sie harmonische Eigenschaften, die Tonhöhenverteilung und andere Merkmale. Ist der Klang eher warm, kühl, lebhaft oder gedämpft? Ein guter Wert zeigt an, dass die Audio-Dateien authentisch und unverfälscht sind. Hingegen könnte eine deutliche Klangfärbung auf spezifische Betonungen in den Frequenzen oder klangliche Eigenheiten hindeuten, was zu einer schlechteren Bewertung führen würde. </p> <i> Klingt die Stimme verzerrt oder menschlich normal? </i>", false, ["", "klanglich unverfärbt", "", "", "", "klanglich verfärbt", ""]),
        new QuestionnaireItemSVGQuality7pt("questionnaireItem", "<h2>Diskontinuität</h2> <p> Beschreibt inwiefern Unterbrechungen, Sprünge oder Unregelmäßigkeiten in gegebenen Proben auftreten. Geringe Diskontinuität weist auf reibungslose Audio-Wiedergabe hin, während ein hoher Diskontinuitäts-Wert auf störende Brüche oder Sprünge im Klangverlauf verweisen würde. </p> <i> Ist der Ton abgehackt oder spielt es flüssig ab? </i>", false, ["", "kontinuierlich", "", "", "", "diskontinuierlich", ""]),
        new QuestionnaireItemSVGQuality7pt("questionnaireItem", "<h2>Lautstärke</h2> <p> Beschreibt die subjektive Wahrnehmung der Stärke oder Intensität des Klangs in einer Probe. Eine angemessene Lautstärke ermöglicht eine klare Hörbarkeit, während eine zu niedrige Lautstärke möglicherweise Details verschleiert und eine zu hohe Lautstärke zu Verzerrungen führen kann. Die Bewertung der Lautstärke berücksichtigt, ob die Pegel konsistent sind und ob sie den Anforderungen des Hörers entsprechen. </p> <i> Finden Sie die Audio zu laut oder leise oder ist es genau optimal? </i>", false, ["", "optimal", "", "", "", "nicht optimal", ""]),
        new QuestionnaireItemSVGQuality7pt("questionnaireItem", "<h2>Rauschen</h2> <p> Beschreibt die Präsenz und Intensität von unerwünschten Hintergrundgeräuschen oder Störungen in einer Probe. Eine geringe Rauschintensität wird positiv bewertet, da sie zu einem klaren und sauberen Klang beiträgt. Im Gegensatz dazu kann starkes Rauschen die Wahrnehmung von Details beeinträchtigen und das Hörerlebnis stören. </p> <i> Hören Sie ein Rauschen oder andere Störgeräusche in dieser Audiodatei und wie stark? </i>", false, ["", "unrauschhaftig", "", "", "", "rauschhaftig", ""]),
    );

    screens.push(Tutorial4);

    var Tutorial5 = new ScreenUIElements(
        new UIElementHTML(undefined, "<div id='head'> <div id='wrapper'> <div id='header-text'> <b> Advanced Projects at the Quality & Usability Lab </b></div> <img src='header/TU-Berlin-Logo.png'> </div> </div>"),
        new UIElementHTML(undefined, "<h1>Einführung</h1>"),
        new QuestionnaireItemMediaAudioRepeatable("questionnaireItem", "<p> Wie bereits erwähnt wird die Audiodatei beim betreten der Seite direkt abgespielt. Mithilfe des 'Replay'-Knopfes können Sie die Audiodatei erneut abspielen. </p>", false, "audio_files/real_files/M2_C01.wav", true, "Replay"),
        new UIElementHTML("tutorial", "<b> Bitte bewerten Sie die Audiodatei nun anhand der folgenden 5 Bewertungskategorien (Klicken Sie hierfür die gewünschte Stelle auf der jeweiligen Skala an):"),
        new QuestionnaireItemSVGQuality7pt("questionnaireItem", "<h2>Gesamtqualität</h2> <p> Beschreibt wie angenehm und ansprechend der Klang insgesamt wahrgenommen wurde. Betrachten Sie Faktoren wie Klarheit, Präzision und klangliche Fülle. Dies sollte unabhängig von Faktoren wie der Lautstärke oder Klangfarbe geschehen. </p> <i> Wie würden Sie die allgemeine Qualität dieser Audio bewerten? Eher gut oder schlecht? </i>", false, ["", "schlecht", "dürftig", "ordentlich", "gut", "ausgezeichnet", ""]),
        new QuestionnaireItemSVGQuality7pt("questionnaireItem", "<h2>Klangfarbe</h2> <p> Beschreibt die Charakteristik oder den spezifischen Klangton einer Probe. Betrachten Sie harmonische Eigenschaften, die Tonhöhenverteilung und andere Merkmale. Ist der Klang eher warm, kühl, lebhaft oder gedämpft? Ein guter Wert zeigt an, dass die Audio-Dateien authentisch und unverfälscht sind. Hingegen könnte eine deutliche Klangfärbung auf spezifische Betonungen in den Frequenzen oder klangliche Eigenheiten hindeuten, was zu einer schlechteren Bewertung führen würde. </p> <i> Klingt die Stimme verzerrt oder menschlich normal? </i>", false, ["", "klanglich unverfärbt", "", "", "", "klanglich verfärbt", ""]),
        new QuestionnaireItemSVGQuality7pt("questionnaireItem", "<h2>Diskontinuität</h2> <p> Beschreibt inwiefern Unterbrechungen, Sprünge oder Unregelmäßigkeiten in gegebenen Proben auftreten. Geringe Diskontinuität weist auf reibungslose Audio-Wiedergabe hin, während ein hoher Diskontinuitäts-Wert auf störende Brüche oder Sprünge im Klangverlauf verweisen würde. </p> <i> Ist der Ton abgehackt oder spielt es flüssig ab? </i>", false, ["", "kontinuierlich", "", "", "", "diskontinuierlich", ""]),
        new QuestionnaireItemSVGQuality7pt("questionnaireItem", "<h2>Lautstärke</h2> <p> Beschreibt die subjektive Wahrnehmung der Stärke oder Intensität des Klangs in einer Probe. Eine angemessene Lautstärke ermöglicht eine klare Hörbarkeit, während eine zu niedrige Lautstärke möglicherweise Details verschleiert und eine zu hohe Lautstärke zu Verzerrungen führen kann. Die Bewertung der Lautstärke berücksichtigt, ob die Pegel konsistent sind und ob sie den Anforderungen des Hörers entsprechen. </p> <i> Finden Sie die Audio zu laut oder leise oder ist es genau optimal? </i>", false, ["", "optimal", "", "", "", "nicht optimal", ""]),
        new QuestionnaireItemSVGQuality7pt("questionnaireItem", "<h2>Rauschen</h2> <p> Beschreibt die Präsenz und Intensität von unerwünschten Hintergrundgeräuschen oder Störungen in einer Probe. Eine geringe Rauschintensität wird positiv bewertet, da sie zu einem klaren und sauberen Klang beiträgt. Im Gegensatz dazu kann starkes Rauschen die Wahrnehmung von Details beeinträchtigen und das Hörerlebnis stören. </p> <i> Hören Sie ein Rauschen oder andere Störgeräusche in dieser Audiodatei und wie stark? </i>", false, ["", "unrauschhaftig", "", "", "", "rauschhaftig", ""]),
    );

    screens.push(Tutorial5);

    var PreTestScreen = new ScreenUIElements(
        new UIElementHTML(undefined, "<div id='head'> <div id='wrapper'> <div id='header-text'> <b> Advanced Projects at the Quality & Usability Lab </b></div> <img src='header/TU-Berlin-Logo.png'> </div> </div>"),
        new UIElementHTML(undefined, "Sie können nun mit dem Experiment beginnen. <br> Sollten Sie während des Tests eine Frage haben, wenden Sie sich bitte an den/die jeweilige Betreuer:in."),
    );
    
    screens.push(PreTestScreen);
    
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
            new QuestionnaireItemSVGQuality7pt("questionnaireItem", "<h2>Gesamtqualität</h2> <p> Beschreibt wie angenehm und ansprechend der Klang insgesamt wahrgenommen wurde. Betrachten Sie Faktoren wie Klarheit, Präzision und klangliche Fülle. Dies sollte unabhängig von Faktoren wie der Lautstärke oder Klangfarbe geschehen. </p>", false, ["", "schlecht", "dürftig", "ordentlich", "gut", "ausgezeichnet", ""]),
            new QuestionnaireItemSVGQuality7pt("questionnaireItem", "<h2>Klangfarbe</h2> <p> Beschreibt die Charakteristik oder den spezifischen Klangton einer Probe. Betrachten Sie harmonische Eigenschaften, die Tonhöhenverteilung und andere Merkmale. Ist der Klang eher warm, kühl, lebhaft oder gedämpft? Ein guter Wert zeigt an, dass die Audio-Dateien authentisch und unverfälscht sind. Hingegen könnte eine deutliche Klangfärbung auf spezifische Betonungen in den Frequenzen oder klangliche Eigenheiten hindeuten, was zu einer schlechteren Bewertung führen würde. </p>", false, ["", "klanglich unverfärbt", "", "", "", "klanglich verfärbt", ""]),
            new QuestionnaireItemSVGQuality7pt("questionnaireItem", "<h2>Diskontinuität</h2> <p> Beschreibt inwiefern Unterbrechungen, Sprünge oder Unregelmäßigkeiten in gegebenen Proben auftreten. Geringe Diskontinuität weist auf reibungslose Audio-Wiedergabe hin, während ein hoher Diskontinuitäts-Wert auf störende Brüche oder Sprünge im Klangverlauf verweisen würde. </p>", false, ["", "kontinuierlich", "", "", "", "diskontinuierlich", ""]),
            new QuestionnaireItemSVGQuality7pt("questionnaireItem", "<h2>Lautstärke</h2> <p> Beschreibt die subjektive Wahrnehmung der Stärke oder Intensität des Klangs in einer Probe. Eine angemessene Lautstärke ermöglicht eine klare Hörbarkeit, während eine zu niedrige Lautstärke möglicherweise Details verschleiert und eine zu hohe Lautstärke zu Verzerrungen führen kann. Die Bewertung der Lautstärke berücksichtigt, ob die Pegel konsistent sind und ob sie den Anforderungen des Hörers entsprechen. </p>", false, ["", "optimal", "", "", "", "nicht optimal", ""]),
            new QuestionnaireItemSVGQuality7pt("questionnaireItem", "<h2>Rauschen</h2> <p> Beschreibt die Präsenz und Intensität von unerwünschten Hintergrundgeräuschen oder Störungen in einer Probe. Eine geringe Rauschintensität wird positiv bewertet, da sie zu einem klaren und sauberen Klang beiträgt. Im Gegensatz dazu kann starkes Rauschen die Wahrnehmung von Details beeinträchtigen und das Hörerlebnis stören. </p>", false, ["", "unrauschhaftig", "", "", "", "rauschhaftig", ""]),
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
            new QuestionnaireItemSVGQuality7pt("questionnaireItem", "<h2>Gesamtqualität</h2> <p> Beschreibt wie angenehm und ansprechend der Klang insgesamt wahrgenommen wurde. Betrachten Sie Faktoren wie Klarheit, Präzision und klangliche Fülle. Dies sollte unabhängig von Faktoren wie der Lautstärke oder Klangfarbe geschehen. </p>", false, ["", "schlecht", "dürftig", "ordentlich", "gut", "ausgezeichnet", ""]),
            new QuestionnaireItemSVGQuality7pt("questionnaireItem", "<h2>Klangfarbe</h2> <p> Beschreibt die Charakteristik oder den spezifischen Klangton einer Probe. Betrachten Sie harmonische Eigenschaften, die Tonhöhenverteilung und andere Merkmale. Ist der Klang eher warm, kühl, lebhaft oder gedämpft? Ein guter Wert zeigt an, dass die Audio-Dateien authentisch und unverfälscht sind. Hingegen könnte eine deutliche Klangfärbung auf spezifische Betonungen in den Frequenzen oder klangliche Eigenheiten hindeuten, was zu einer schlechteren Bewertung führen würde. </p>", false, ["", "klanglich unverfärbt", "", "", "", "klanglich verfärbt", ""]),
            new QuestionnaireItemSVGQuality7pt("questionnaireItem", "<h2>Diskontinuität</h2> <p> Beschreibt inwiefern Unterbrechungen, Sprünge oder Unregelmäßigkeiten in gegebenen Proben auftreten. Geringe Diskontinuität weist auf reibungslose Audio-Wiedergabe hin, während ein hoher Diskontinuitäts-Wert auf störende Brüche oder Sprünge im Klangverlauf verweisen würde. </p>", false, ["", "kontinuierlich", "", "", "", "diskontinuierlich", ""]),
            new QuestionnaireItemSVGQuality7pt("questionnaireItem", "<h2>Lautstärke</h2> <p> Beschreibt die subjektive Wahrnehmung der Stärke oder Intensität des Klangs in einer Probe. Eine angemessene Lautstärke ermöglicht eine klare Hörbarkeit, während eine zu niedrige Lautstärke möglicherweise Details verschleiert und eine zu hohe Lautstärke zu Verzerrungen führen kann. Die Bewertung der Lautstärke berücksichtigt, ob die Pegel konsistent sind und ob sie den Anforderungen des Hörers entsprechen. </p>", false, ["", "optimal", "", "", "", "nicht optimal", ""]),
            new QuestionnaireItemSVGQuality7pt("questionnaireItem", "<h2>Rauschen</h2> <p> Beschreibt die Präsenz und Intensität von unerwünschten Hintergrundgeräuschen oder Störungen in einer Probe. Eine geringe Rauschintensität wird positiv bewertet, da sie zu einem klaren und sauberen Klang beiträgt. Im Gegensatz dazu kann starkes Rauschen die Wahrnehmung von Details beeinträchtigen und das Hörerlebnis stören. </p>", false, ["", "unrauschhaftig", "", "", "", "rauschhaftig", ""]),
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
        new QuestionnaireItemDefinedOne("qI-single", "<b>Was ist Ihr höchster erreichter Bildungsabschluss?", true, [ "Universitäts- oder Fachhochschulabschluss", "abgeschlossene Berufsausbildung", "Fachhochschul- oder Hochschulreife (Abitur)", "Realschul- oder gleichwertiger Abschluss", "Haupt- (Volks)schulabschluss", "Noch in schulischer Ausbildung", "keine der genannten"]),
        new QuestionnaireItemDefinedOne("qI-single", "<b>Sind Sie hungrig?", true, ["Ja", "Nein"]),
        new QuestionnaireItemText("qI-hour", "<b> Vor wie vielen Stunden haben Sie zuletzt gegessen?", true),
        new QuestionnaireItemText("qI-hour", "<b> Wie viele Stunden haben Sie letzte Nacht geschlafen?", true),
        new QuestionnaireItemSVGQuality7pt("questionnaireItem", "<b>Hatten oder haben Sie heute Zeitdruck?", true, ["", "kein Zeitdruck", "", "", "", "starker Zeitdruck", ""]),
        new QuestionnaireItemText("qI-time", "Wenn Ja: Wann?", false),
        new QuestionnaireItemSVGQuality7pt("questionnaireItem", "<b>Wie wichtig ist Ihnen Audio- bzw. Telefonqualität?", true, ["", "völlig unwichtig", "", "", "", "sehr wichtig", ""]),
        new UIElementHTML("questionnaireItem", "<b>Wie fühlen Sie sich heute?"),
        new QuestionnaireItemSVGQuality7pt("questionnaireItem", "", true, ["", "A", "", "", "", "B", ""]),
        new QuestionnaireItemSVGQuality7pt("questionnaireItem", "", true, ["", "C", "", "", "", "D", ""]),
        new QuestionnaireItemSVGQuality7pt("questionnaireItem", "<b>Hat sich Ihre Stimmung während der Befragung geändert?", true, ["", "stark verschlechtert", "", "keine Veränderung", "", "stark verbessert", ""]),
        new QuestionnaireItemText("qI-text", "Anmerkung (z.B. an welcher Stelle oder aus welchem Grund?)", false),
    );

    screens.push(PostTestQuestionaire);
    
    var EndScreen = new ScreenWaitDataDownload(undefined, "Danke für Ihre Teilnahme!", testID + "-(" + dateTime + ").csv", false);
    
    screens.push(EndScreen);
    
    let standardButton = new PaginateUIButton("button", undefined, 1, "", "Weiter");
    let button1 = new PaginateUIButton("button", undefined, 1, "", "Test starten");
    //let backButton = new PaginateUIButton("button", -1, 1, "Zurück", "Weiter");

    for (let i = 0; i < screens.length; i++) {
        if(i !== 6){
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
        if(batch[i].Type === "Gold" || batch[i].Type === "trick"){
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