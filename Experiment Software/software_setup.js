let screens = [];
//let ids = ['yglgt#98', 'ardhc#13', 'hqybf#19', 'hzcyx#66', 'xfxrc#26', 'vkgmk#78', 'vsvyg#43', 'xwdty#00', 'hhxnc#67', 'hteec#48', 'xejht#30', 'dwvfi#72', 'txxll#44', 'vqqhs#93', 'kbima#39', 'vlsuy#73', 'gqqkm#61', 'lxbjm#17', 'uvilz#47', 'btzlb#60', 'vvnet#86', 'zrtxb#41', 'horyc#90', 'ylltq#22', 'yxgpf#23', 'kjynj#24', 'veqwf#19', 'hsvqi#07', 'nlcxn#03', 'fcfav#01', 'rsebq#63', 'zynns#70', 'qdbvt#40', 'crjms#49', 'ygxcz#81', 'lgnkm#77', 'wjixh#46', 'frydv#47', 'fjrjn#85', 'wskcu#60', 'hzffm#34', 'xsqbw#29', 'amopd#94', 'vhlxd#53', 'myzgb#94', 'idrny#44', 'befvs#80', 'olwlz#63', 'enura#96', 'fvirw#74', 'fuddu#85', 'abmqd#15', 'tnzdw#86', 'jusrv#31', 'snwkt#85', 'lfium#03', 'vaiua#94', 'gvxna#17', 'qacvs#18', 'uegph#60', 'rysfy#10', 'wrpox#42', 'hlrrt#50', 'uuyvy#10', 'hhefc#12', 'nqbar#05', 'efbjq#90', 'gxhji#56', 'dvtvb#94', 'etpfz#52', 'wxeuk#87', 'wfoez#22', 'zhbrb#73', 'fefdv#93', 'waykj#42', 'xcqqk#07', 'daupq#53', 'nwfle#10', 'uwzov#39', 'nwdug#80', 'cycye#93', 'vvziw#93', 'qppwm#50', 'jqgzi#32', 'brleu#37', 'fythf#82', 'upgem#68', 'tobar#27', 'yuteq#34', 'yvjfr#85', 'uvgum#89', 'rigzq#60', 'wmzms#90', 'qbbgc#37', 'dcwql#13', 'gadyz#17', 'jaxko#55', 'hgsih#82', 'kvdwf#21', 'swbvn#00'];
let testID;
let batch;
let batchv2;

function setupScreens(){
    var WelcomeScreen = new ScreenUIElements(
        new UIElementHTML(undefined, "<h1>Willkommen zum Experiment</h1>"),
        new UIElementHTML(undefined, "some introduction text..."),
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
        new QuestionnaireItemDefinedOne("questionnaireItem", "<b>Haben Sie Seh-, Konzentrations- oder Hörschwächen?", true, ["Ja", "Nein"]),
        new QuestionnaireItemText("questionnaireItem", "Wenn ja: Welche?", false),
        new QuestionnaireItemDefinedOne("questionnaireItem", "Benutzen Sie Hilfsmittel?", false, ["Ja", "Nein"]),
        new QuestionnaireItemText("questionnaireItem", "Wenn ja: Welche?", false),
    );

    screens.push(PreTestQuestionaire);
    
    var Tutorial = new ScreenUIElements(
        new UIElementHTML(undefined, "<h1>Einführung</h1>"),
        new UIElementHTML(undefined, "Some general information..."),
        new UIElementHTML(undefined, "5 rating Categories:"),
        new UIElementHTML("questionnaireItem", "<h2>Overall quality</h2> Definition of the Category..."),
        new UIElementHTML("questionnaireItem", "<h2>Coloration</h2> Definition of the Category..."),
        new UIElementHTML("questionnaireItem", "<h2>Discontinuity</h2> Definition of the Category..."),
        new UIElementHTML("questionnaireItem", "<h2>Loudness</h2> Definition of the Category..."),
        new UIElementHTML("questionnaireItem", "<h2>Noisiness</h2> Definition of the Category..."),
        new UIElementHTML(undefined, "Some important information... (e.g. Audio can be repeated multiple times, Audio plays directly, Break of x-minutes after 20 Questions...)"),
        new UIElementHTML(undefined, "Afterwards: Some example questions (How many?) -> Not added yet"),
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
            new QuestionnaireItemMediaAudioRepeatable(undefined, "<div class='invisible'> FileName: " + pB[0][i].Name + " Type: " + pB[0][i].Type + "</div>", false, pB[0][i].Path + pB[0][i].Name, true, "Replay"),
            new UIElementHTML(undefined, text),
            new QuestionnaireItemDefinedOne(
                "questionnaireItem", 
                "<h2>Overall quality</h2> Bitte bewerten sie die Gesamtqualität", 
                false, 
                ["Sehr schlecht", "Schlecht", "Ok", "Gut", "Sehr gut"]),
            new QuestionnaireItemDefinedOne(
                "questionnaireItem", 
                "<h2>Coloration</h2> Bitte bewerten sie die Klangfarbe", 
                false, 
                ["Sehr schlecht", "Schlecht", "Ok", "Gut", "Sehr gut"]),
            new QuestionnaireItemDefinedOne(
                "questionnaireItem", 
                "<h2>Discontinuity</h2> Bitte bewerten sie die Diskontinuität", 
                false, 
                ["Sehr schlecht", "Schlecht", "Ok", "Gut", "Sehr gut"]),
            new QuestionnaireItemDefinedOne(
                "questionnaireItem", 
                "<h2>Loudness</h2> Bitte bewerten sie die Lautstärke", 
                false, 
                ["Sehr schlecht", "Schlecht", "Ok", "Gut", "Sehr gut"]),
            new QuestionnaireItemDefinedOne(
                "questionnaireItem", 
                "<h2>Noisiness</h2> Bitte bewerten sie die Noisiness", 
                false, 
                ["Sehr schlecht", "Schlecht", "Ok", "Gut", "Sehr gut"]),
            
        );

        screens.push(AudioSampleScreen);
    }
    
    var BreakScreen1 = new ScreenUIElements(
        new UIElementHTML(undefined, "<h1> Pause </h1>"),
        new UIElementHTML(undefined, "Some text..."),
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
            new QuestionnaireItemMediaAudioRepeatable(undefined, "<div class='invisible'> FileName: " + pB[1][i].Name + " Type: " + pB[1][i].Type + "</div>", false, pB[1][i].Path + pB[1][i].Name, true, "Replay"),
            new UIElementHTML(undefined, text),
            new QuestionnaireItemDefinedOne(
                "questionnaireItem", 
                "<h2>Overall quality</h2> Bitte bewerten sie die Gesamtqualität", 
                false, 
                ["Sehr schlecht", "Schlecht", "Ok", "Gut", "Sehr gut"]),
            new QuestionnaireItemDefinedOne(
                "questionnaireItem", 
                "<h2>Coloration</h2> Bitte bewerten sie die Klangfarbe", 
                false, 
                ["Sehr schlecht", "Schlecht", "Ok", "Gut", "Sehr gut"]),
            new QuestionnaireItemDefinedOne(
                "questionnaireItem", 
                "<h2>Discontinuity</h2> Bitte bewerten sie die Diskontinuität", 
                false, 
                ["Sehr schlecht", "Schlecht", "Ok", "Gut", "Sehr gut"]),
            new QuestionnaireItemDefinedOne(
                "questionnaireItem", 
                "<h2>Loudness</h2> Bitte bewerten sie die Lautstärke", 
                false, 
                ["Sehr schlecht", "Schlecht", "Ok", "Gut", "Sehr gut"]),
            new QuestionnaireItemDefinedOne(
                "questionnaireItem", 
                "<h2>Noisiness</h2> Bitte bewerten sie die Noisiness", 
                false, 
                ["Sehr schlecht", "Schlecht", "Ok", "Gut", "Sehr gut"]),
            
        );

        screens.push(AudioSampleScreen);
    }

    var BreakScreen2 = new ScreenUIElements(
        new UIElementHTML(undefined, "<h1> Pause </h1>"),
        new UIElementHTML(undefined, "Some text..."),
    );

    screens.push(BreakScreen2);

    for(let i = 0; i < pB[2].length; i++){
        let text = "";
        if(pB[2][i].Type === "trick"){
            text = "Bitte bewerten Sie das folgende Hörbeispiel in allen Kategorien mit der besten Bewertung"
        }
        let page = i + 1;
        var AudioSampleScreen = new ScreenUIElements(
            new UIElementHTML(undefined, "<h1>Hörbeispiel " + page.toString() + "</h1>"),
            new QuestionnaireItemMediaAudioRepeatable(undefined, "<div class='invisible'> FileName: " + pB[2][i].Name + " Type: " + pB[2][i].Type + "</div>", false, pB[2][i].Path + pB[2][i].Name, true, "Replay"),
            new UIElementHTML(undefined, text),
            new QuestionnaireItemDefinedOne(
                "questionnaireItem", 
                "<h2>Overall quality</h2> Bitte bewerten sie die Gesamtqualität", 
                false, 
                ["Sehr schlecht", "Schlecht", "Ok", "Gut", "Sehr gut"]),
            new QuestionnaireItemDefinedOne(
                "questionnaireItem", 
                "<h2>Coloration</h2> Bitte bewerten sie die Klangfarbe", 
                false, 
                ["Sehr schlecht", "Schlecht", "Ok", "Gut", "Sehr gut"]),
            new QuestionnaireItemDefinedOne(
                "questionnaireItem", 
                "<h2>Discontinuity</h2> Bitte bewerten sie die Diskontinuität", 
                false, 
                ["Sehr schlecht", "Schlecht", "Ok", "Gut", "Sehr gut"]),
            new QuestionnaireItemDefinedOne(
                "questionnaireItem", 
                "<h2>Loudness</h2> Bitte bewerten sie die Lautstärke", 
                false, 
                ["Sehr schlecht", "Schlecht", "Ok", "Gut", "Sehr gut"]),
            new QuestionnaireItemDefinedOne(
                "questionnaireItem", 
                "<h2>Noisiness</h2> Bitte bewerten sie die Noisiness", 
                false, 
                ["Sehr schlecht", "Schlecht", "Ok", "Gut", "Sehr gut"]),
            
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

// function reorderBadge(){
//     let participantBadge = [];

//     for(let i = 0; i < badge.length; i++){
//         let s = badge[i];
//         let session = [];

//         let gold1 = s[4];
//         let trick1 = s[8];
//         let gold2 = s[13];
//         let trick2 = s[17];

//         s.splice(4,1)
//         s.splice(7,1)
//         s.splice(11,1)
//         s.splice(14,1)

//         shuffle(s);

//         let count = 0;
//         for(let j = 0; j < 20; j++){
//             if(j === 4){session.push(gold1)}
//             else if(j === 13){session.push(gold2)}
//             else if(j === 8){session.push(trick1)}
//             else if(j === 17){session.push(trick2)}
//             else{
//                 session.push(s[count])
//                 count++;
//             }
//         }
//         participantBadge.push(session);
//     }
//     return participantBadge;
// }

function reorderBatchV2(){
    let participantBatch = [];

    let specialQuestions = [];
    let indices = [];
    let normalQuestions = [];

    for(let i = 0; i < batchv2.length; i++){    
        if(batchv2[i].Type === "gold" || batchv2[i].Type === "trick"){
            specialQuestions.push(batchv2[i]);
            indices.push(i);
        }
        else{
            normalQuestions.push(batchv2[i])
        }    
    }

    shuffle(normalQuestions);

    let countIndex = 0;
    let session = [];

    for(let j = 0; j <= batchv2.length; j++){
        if(j === 0 || j % 20 !== 0){
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