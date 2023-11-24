/**
A QuestionnaireItem that can be used to input number ranges.
Uses the HTML input type="range".

@class QuestionnaireItemDefinedRange
@augments UIElement
@augments UIElementInteractive
@augments QuestionnaireItem
@augments QuestionnaireItemDefined
*/
class QuestionnaireItemDefinedRange extends QuestionnaireItemDefined {

    /**
    @param {string} [className] CSS class
    @param {string} question
    @param {boolean} [required=false]
    @param {int} [min] Minimal acceptable answer.
    @param {int} [max] Maximal acceptable answer.
    */
    constructor(className, question, required, min, max) {
        super(className, question, required, [min, max]);

        this.min = min;
        this.max = max;

        this.input = null;
    }

    _createAnswerNode() {
        const answerNode = document.createElement("div");

        this.input = document.createElement("input");
        this.input.type = "range";
        this.input.min = this.min;
        this.input.max = this.max;
        this.input.setAttribute("list","markers");
        this.input.addEventListener("change", () => this.setAnswer(this.input.value));

        const markings = document.createElement("datalist");
        markings.id = "markers";
        const option1 = document.createElement("option");
        option1.value = "1";
        option1.label = "Bad";
        markings.appendChild(option1);
        const option2 = document.createElement("option");
        option2.value = "2";
        option2.label = "Poor";
        markings.appendChild(option2);
        const option3 = document.createElement("option");
        option3.value = "3";
        option3.label = "Fair";
        markings.appendChild(option3);
        const option4 = document.createElement("option");
        option4.value = "4";
        option4.label = "Good"
        markings.appendChild(option4);
        const option5 = document.createElement("option");
        option5.value = "5";
        option5.label = "Excellent"
        markings.appendChild(option5);

        answerNode.appendChild(this.input);
        answerNode.appendChild(markings);

        return answerNode;
    }

    applyAnswerToUI() {
        if (!this.isUIcreated()) {
            return;
        }

        if (this.isAnswered()) {
            this.input.value = this.getAnswer();
        }
    }

    releaseUI() {
        super.releaseUI();

        this.input = null;
    }
}
