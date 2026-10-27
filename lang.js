(function () {
  'use strict';

  var STORAGE_KEY = 'preferred-language';
  // index.html is authored in English, but the site opens in Swedish for
  // every visitor unless they explicitly chose another language before.
  var DEFAULT_LANGUAGE = 'sv';
  var SUPPORTED_LANGUAGES = ['en', 'sv'];

  var translations = {
    sv: {
      role: 'Sjuksköterska',
      experienceTitle: '👩‍⚕️ Arbetslivserfarenhet och volontärarbete',
      expKarolinskaPrefix: 'Akutmottagningen vid',
      expKarolinskaLink: 'Karolinska Universitetssjukhuset',
      expKarolinskaSuffix: 'i Huddinge (2025–2026):',
      expKarolinskaRole: 'Assistent omvårdnad',
      expTondela: 'Praktik vid Centro Hospitalar Tondela Viseu (2021–2024):',
      expMedical: 'Medicinsk omvårdnad [270 h]',
      expSurgical: 'Kirurgisk omvårdnad [270 h]',
      expObstetric: 'Obstetrisk och gynekologisk omvårdnad [175 h]',
      expPediatric: 'Pediatrisk omvårdnad [175 h]',
      expMental: 'Psykiatrisk omvårdnad [175 h]',
      expEmergency: 'Akutmottagning [288 h]',
      expUsfPrefix: 'Praktik vid',
      expUsfSuffix: '(2023):',
      expFamily: 'Omvårdnad inom familje- och samhällshälsa [175 h]',
      expSaoMateusPrefix: 'Praktik vid sjukhuset',
      expSaoMateusSuffix: '(2023):',
      expElderly: 'Äldreomsorg [288 h]',
      expVolunteeringPrefix: 'Volontärarbete vid',
      expVolunteeringSuffix: '(2020):',
      expOncology: 'Pediatrisk onkologi [2 mån.].',
      academicTitle: '📚 Utbildning',
      course: 'Sjuksköterskeprogram, 240 hp',
      academicPrefix: 'vid',
      academicSuffix: ', Instituto Politécnico de Viseu.',
      languageTitle: '🌎 Språk',
      langPtLabel: 'Portugisiska:',
      langPtValue: 'modersmål.',
      langEnLabel: 'Engelska:',
      langEnValue: 'god förståelse i läsning, skrivning och tal.',
      langSvLabel: 'Svenska:',
      langSvValue: 'god förståelse i läsning, skrivning och tal.',
      scanTitle: '🤳 Skanna mig!',
      contactTitle: '📞 Kontakt',
      contactNameLabel: ' > Fullständigt namn:',
      contactPhoneLabel: ' > Telefon: ',
      contactLinkedinLabel: ' > Linkedin:',
      contactEmailLabel: ' > E-post:',
      skillsTitle: '🥼 Tekniska färdigheter',
      skill1: 'Reflekterande praktik som stöds av att uppdaterad kunskap återkontextualiseras i en kritisk och konstruktiv förståelse;',
      skill2: 'Förmåga till förståelse som visar den behärskning och innovation som krävs för att lösa komplexa och oförutsägbara problem;',
      skill3: 'Kritiskt tänkande vid insamling, urval och tolkning av relevant information i beslutsfattande som gör det möjligt att stödja insatser som allmänsjuksköterska;',
      skill4: 'Kommunikations- och relationsförmåga som gör det möjligt att förmedla information, idéer, problem och lösningar inom det multidisciplinära teamet;'
    },
    en: {
      role: 'Nurse',
      experienceTitle: '👩‍⚕️ Work experience and volunteering',
      expKarolinskaPrefix: 'Emergency department at',
      expKarolinskaLink: 'Karolinska University Hospital',
      expKarolinskaSuffix: 'in Huddinge (2025–2026):',
      expKarolinskaRole: 'Nursing assistant',
      expTondela: 'Internship at Centro Hospitalar Tondela Viseu (2021–2024):',
      expMedical: 'Medical Nursing [270h]',
      expSurgical: 'Surgical Nursing [270h]',
      expObstetric: 'Obstetrical & Gynecological Nursing [175h]',
      expPediatric: 'Pediatric Nursing [175h]',
      expMental: 'Mental & Psychiatry Health Nursing [175h]',
      expEmergency: 'Emergency Service [288h]',
      expUsfPrefix: 'Internship at',
      expUsfSuffix: '(2023):',
      expFamily: 'Family & Community Health Nursing [175h]',
      expSaoMateusPrefix: 'Internship at',
      expSaoMateusSuffix: 'Hospital (2023):',
      expElderly: 'Nursing for the Elderly [288h]',
      expVolunteeringPrefix: 'Volunteering at',
      expVolunteeringSuffix: '(2020):',
      expOncology: 'Pediatric oncology [2m].',
      academicTitle: '📚 Academic Path',
      course: '240 ECTS Nursing Course',
      academicPrefix: 'at',
      academicSuffix: ', Instituto Politécnico de Viseu.',
      languageTitle: '🌎 Language',
      langPtLabel: 'Portuguese:',
      langPtValue: 'native.',
      langEnLabel: 'English:',
      langEnValue: 'great understanding of reading, writing and speaking.',
      langSvLabel: 'Swedish:',
      langSvValue: 'great understanding of reading, writing and speaking.',
      scanTitle: '🤳 Scan me!',
      contactTitle: '📞 Contact',
      contactNameLabel: ' > Full Name:',
      contactPhoneLabel: ' > Phone: ',
      contactLinkedinLabel: ' > Linkedin:',
      contactEmailLabel: ' > Email:',
      skillsTitle: '🥼 Technical Skills',
      skill1: 'Reflective practice supported by the recontextualization of updated knowledge in a critical and constructive understanding;',
      skill2: 'Comprehension capacity that demonstrates the mastery and innovation necessary to solve complex and unpredictable problems;',
      skill3: 'Critical thinking in the collection, selection and interpretation of relevant information in decision-making that enables you to support interventions as a general care nurse;',
      skill4: 'Communication and relational skills that allow you to transmit information, ideas, problems and solutions, in the multidisciplinary team;'
    }
  };

  function isSupported(language) {
    return SUPPORTED_LANGUAGES.indexOf(language) !== -1;
  }

  function detectLanguage() {
    try {
      var stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored && isSupported(stored)) {
        return stored;
      }
    } catch (error) {
      /* localStorage can be unavailable (private mode, disabled cookies) */
    }

    return DEFAULT_LANGUAGE;
  }

  function applyLanguage(language) {
    if (!isSupported(language)) {
      language = DEFAULT_LANGUAGE;
    }

    var dictionary = translations[language];

    document.documentElement.setAttribute('lang', language);

    var textNodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < textNodes.length; i++) {
      var element = textNodes[i];
      var key = element.getAttribute('data-i18n');
      if (!Object.prototype.hasOwnProperty.call(dictionary, key)) {
        continue;
      }
      // Never overwrite elements that contain markup (links, bold, etc.),
      // otherwise its children would be destroyed on every language switch.
      // Put such text in separate elements without child nodes instead.
      if (element.children.length > 0) {
        if (window.console && window.console.warn) {
          window.console.warn(
            '[lang.js] Skipping "' + key + '": the element contains child elements. ' +
            'Wrap only the text in [data-i18n] so links and other markup are preserved.'
          );
        }
        continue;
      }
      element.textContent = dictionary[key];
    }

    var buttons = document.querySelectorAll('[data-set-lang]');
    for (var j = 0; j < buttons.length; j++) {
      var button = buttons[j];
      var isActive = button.getAttribute('data-set-lang') === language;
      button.classList.toggle('is-link', isActive);
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    }

    var switcher = document.querySelector('[data-language-switcher]');
    if (switcher) {
      switcher.setAttribute('aria-label', language === 'sv' ? 'Välj språk' : 'Choose language');
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch (error) {
      /* ignore */
    }
  }

  var languageButtons = document.querySelectorAll('[data-set-lang]');
  for (var k = 0; k < languageButtons.length; k++) {
    languageButtons[k].addEventListener('click', function () {
      applyLanguage(this.getAttribute('data-set-lang'));
    });
  }

  applyLanguage(detectLanguage());
})();
