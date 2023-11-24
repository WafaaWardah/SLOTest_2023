let screens = [];
let ids = ['yglgt#98', 'ardhc#13', 'hqybf#19', 'hzcyx#66', 'xfxrc#26', 'vkgmk#78', 'vsvyg#43', 'xwdty#00', 'hhxnc#67', 'hteec#48', 'xejht#30', 'dwvfi#72', 'txxll#44', 'vqqhs#93', 'kbima#39', 'vlsuy#73', 'gqqkm#61', 'lxbjm#17', 'uvilz#47', 'btzlb#60', 'vvnet#86', 'zrtxb#41', 'horyc#90', 'ylltq#22', 'yxgpf#23', 'kjynj#24', 'veqwf#19', 'hsvqi#07', 'nlcxn#03', 'fcfav#01', 'rsebq#63', 'zynns#70', 'qdbvt#40', 'crjms#49', 'ygxcz#81', 'lgnkm#77', 'wjixh#46', 'frydv#47', 'fjrjn#85', 'wskcu#60', 'hzffm#34', 'xsqbw#29', 'amopd#94', 'vhlxd#53', 'myzgb#94', 'idrny#44', 'befvs#80', 'olwlz#63', 'enura#96', 'fvirw#74', 'fuddu#85', 'abmqd#15', 'tnzdw#86', 'jusrv#31', 'snwkt#85', 'lfium#03', 'vaiua#94', 'gvxna#17', 'qacvs#18', 'uegph#60', 'rysfy#10', 'wrpox#42', 'hlrrt#50', 'uuyvy#10', 'hhefc#12', 'nqbar#05', 'efbjq#90', 'gxhji#56', 'dvtvb#94', 'etpfz#52', 'wxeuk#87', 'wfoez#22', 'zhbrb#73', 'fefdv#93', 'waykj#42', 'xcqqk#07', 'daupq#53', 'nwfle#10', 'uwzov#39', 'nwdug#80', 'cycye#93', 'vvziw#93', 'qppwm#50', 'jqgzi#32', 'brleu#37', 'fythf#82', 'upgem#68', 'tobar#27', 'yuteq#34', 'yvjfr#85', 'uvgum#89', 'rigzq#60', 'wmzms#90', 'qbbgc#37', 'dcwql#13', 'gadyz#17', 'jaxko#55', 'hgsih#82', 'kvdwf#21', 'swbvn#00'];
let testID;

function setupScreens(){
    var WelcomeScreen = new ScreenUIElements(
        new UIElementHTML(undefined, "<h1>Welcome to the Experiment</h1>"),
        new UIElementHTML(undefined, "Start first Questionnaire"),
    );

    screens.push(WelcomeScreen);

    var PreTestQuestionaire = new ScreenUIElements(
        new UIElementHTML(undefined, "<h1>Pretest Questionnaire</h1>"),
        new UIElementHTML(undefined, "Please answer the following questions to continue"),
        new QuestionnaireItemDate("questionnaireItem", "<b>Date of birth</b>", false),
        new QuestionnaireItemDefinedOne("questionnaireItem", "<b>Gender</b>", true,["Male", "Female", "Diverse"]),
        new QuestionnaireItemDefinedMulti("questionnaireItem", "<b>Hearing impairement</b>", true,["Option1", "Option2", "Else"]),
    );

    screens.push(PreTestQuestionaire);

    var AudioSampleScreen = new ScreenUIElements(
        new UIElementHTML(undefined, "<h1>Hörbeispiel 1</h1>"),
        new QuestionnaireItemMediaAudio(undefined, "Sie müssen sich die gesamte Audiodatei anhören um fortzufahren!", true, "audio_files/test.mp3"),
        new QuestionnaireItemDefinedOne(
            "questionnaireItem", 
            "<h2>Overall quality</h2> Bitte bewerten sie die Gesamtqualität", 
            true, 
            ["Sehr schlecht", "Schlecht", "Ok", "Gut", "Sehr gut"]),
        new QuestionnaireItemDefinedOne(
            "questionnaireItem", 
            "<h2>Coloration</h2> Bitte bewerten sie die Klangfarbe", 
            true, 
            ["Sehr schlecht", "Schlecht", "Ok", "Gut", "Sehr gut"]),
        new QuestionnaireItemDefinedOne(
            "questionnaireItem", 
            "<h2>Discontinuity</h2> Bitte bewerten sie die Diskontinuität", 
            true, 
            ["Sehr schlecht", "Schlecht", "Ok", "Gut", "Sehr gut"]),
        new QuestionnaireItemDefinedOne(
            "questionnaireItem", 
            "<h2>Loudness</h2> Bitte bewerten sie die Lautstärke", 
            true, 
            ["Sehr schlecht", "Schlecht", "Ok", "Gut", "Sehr gut"]),
        new QuestionnaireItemDefinedOne(
            "questionnaireItem", 
            "<h2>Noisiness</h2> Bitte bewerten sie die Noisiness", 
            true, 
            ["Sehr schlecht", "Schlecht", "Ok", "Gut", "Sehr gut"]),
        
    );

    screens.push(AudioSampleScreen);

    var PostTestQuestionaire = new ScreenUIElements(
        new UIElementHTML(undefined, "<h1>Posttest Questionnaire</h1>"),
        new UIElementHTML(undefined, "Please answer the following questions to continue"),
        new QuestionnaireItemDate("questionnaireItem", "<b>Date of birth</b>", false),
        new QuestionnaireItemDefinedOne("questionnaireItem", "<b>Gender</b>", true,["Male", "Female", "Diverse"]),
        new QuestionnaireItemDefinedMulti("questionnaireItem", "<b>Hearing impairement</b>", true,["Option1", "Option2", "Else"]),
    );

    screens.push(PostTestQuestionaire);
    
    var EndScreen = new ScreenWaitDataDownload(undefined, "Thank you for participating", testID + ".csv", false);
    
    screens.push(EndScreen);

}

function start(){
    setupScreens();
    var screenController = new ScreenController(screens);
    screenController.init(document.body);
    screenController.start();
}