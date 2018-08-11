
class SEOTagsGenerator {

    // all the input fields
    private inputList: Array<String> = ['Title', 'Description', 'Author', 'Keywords', 'Url', 'Image', 'Type'];
    private inputTitle: HTMLInputElement;
    private inputDescription: HTMLInputElement;
    private inputAuthor: HTMLInputElement;
    private inputKeywords: HTMLInputElement;
    private inputUrl: HTMLInputElement;
    private inputImage: HTMLInputElement;
    private inputType: HTMLInputElement;

    // all the select boxes
    private selectCharset: HTMLSelectElement;
    private selectLanguage: HTMLSelectElement;
    private selectRevisitDays: HTMLSelectElement;

    // all the checkboxes
    private checkboxRobotsIndex: HTMLInputElement;
    private checkboxRobotsFollow: HTMLInputElement;


    // contains the generated tags
    private outputGeneral: string = '<!-- General Meta Tags -->';
    private outputMeta: string = '\r\n\r\n<!-- Default Meta Tags -->';
    private outputGoogle: string = '\r\n\r\n<!-- Google / Search Engine Tags -->';
    private outputOg: string = '\r\n\r\n<!-- Facebook Meta Tags -->';
    private outputTwitter: string = '\r\n\r\n<!-- Twitter Meta Tags -->';

    private resultField: HTMLElement;

    /**
     * Main constructor to load all elements
     */
    constructor() {
        /**
         * bind the inputs to the variables
         */
        // the basic input fields
        this.inputTitle = <HTMLInputElement>document.getElementById('title');
        this.inputDescription = <HTMLInputElement>document.getElementById('description');
        this.inputAuthor = <HTMLInputElement>document.getElementById('author');
        this.inputKeywords = <HTMLInputElement>document.getElementById('keywords');
        this.inputUrl = <HTMLInputElement>document.getElementById('url');
        this.inputImage = <HTMLInputElement>document.getElementById('image');

        // the select boxes
        this.selectCharset = <HTMLSelectElement>document.getElementById('charset');
        this.selectLanguage = <HTMLSelectElement>document.getElementById('language');
        this.selectRevisitDays = <HTMLSelectElement>document.getElementById('revisit');

        // the checkboxes
        this.checkboxRobotsFollow = <HTMLInputElement>document.getElementById('robotsFollow');
        this.checkboxRobotsIndex = <HTMLInputElement>document.getElementById('robotsIndex');

        this.resultField = <HTMLElement>document.getElementById('editor');
    }

    /**
     * Generate all the given tags for checked types
     */
    public generate(): string {

        // generate the basic 'meta tags' (robots, charset, language,..)
        this.outputGeneral += `\r\n<title>${this.selectCharset.value}</title>`;
        this.outputGeneral += `\r\n<meta charset="${this.selectCharset.value}">`;
        this.outputGeneral += `\r\n<meta http-equiv="Content-Type" content="text/html; charset=${this.selectCharset.value}">`;
        this.outputGeneral += `\r\n<meta name="language" content="${this.selectLanguage.value}">`;

        // robots part
        let robots: Array<String> = [];
        if (this.checkboxRobotsIndex.checked) {
            robots.push('index');
        }
        if (this.checkboxRobotsFollow.checked) {
            robots.push('follow');
        }
        this.outputGeneral += `\r\n<meta name="robots" content="${robots.join(', ')}">`;

        // revisit days
        this.outputGeneral += `\r\n<meta name="revisit-after" content="${this.selectRevisitDays.value}">`;

        // iterate each input field
        this.inputList.forEach((input: String) => {

            // set the element
            let element = this[`input${input}`];

            // check for the set value
            if (element && element.value) {

                    // add to the output
                    this.outputMeta += `\r\n<meta name="${input.toLowerCase()}" content="${element.value}">`;
                    
                    // add to the output
                    this.outputGoogle += `\r\n<meta itemprop="${input.toLowerCase()}" content="${element.value}">`;
                    
                    // add to the output
                    this.outputOg += `\r\n<meta property="og:${input.toLowerCase()}" content="${element.value}">`;

                    // add to the output
                    this.outputTwitter += `\r\n<meta name="twitter:${input.toLowerCase()}" content="${element.value}">`;

            }
        });

        // return the full output
        return this.outputGeneral + this.outputMeta + this.outputGoogle + this.outputOg + this.outputTwitter;

    }

}