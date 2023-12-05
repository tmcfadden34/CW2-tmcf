// translator.js

const key = process.env.TRANSLATION_API_KEY || "a1e5ae42f0474b3ba9f21184b43a80ec";

function translateText() {
    const key = "";
    const endpoint = "https://api.cognitive.microsofttranslator.com/";
    const location = "eastus";
    const path = '/translate';
    const constructedUrl = endpoint + path;

    const fromLanguage = ('en', 'fr', 'it', 'de', 'es');
    const toLanguages = ['en', 'fr', 'it', 'de', 'es'];

    const translationResultElement = document.getElementById('translationResult');

    // Loop through each target language
    toLanguages.forEach(targetLanguage => {
        const params = {
            'api-version': '3.0',
            'from': fromLanguage,
            'to': [targetLanguage]
        };

        const headers = {
            'Ocp-Apim-Subscription-Key': key,
            'Ocp-Apim-Subscription-Region': location,
            'Content-type': 'application/json',
            'X-ClientTraceId': Date.now().toString()
        };

        const textToTranslate = document.getElementById('textToTranslate').value;

        const body = [{
            'text': textToTranslate
        }];

        fetch(constructedUrl + '?' + new URLSearchParams(params), {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(data => {
                const translationResult = data[0].translations[0].text;

                // Append the target language and translation to the respective elements
                translationResultElement.innerHTML += `<p>${targetLanguage.toUpperCase()}: ${translationResult}</p>`;
            })
            .catch(error => {
                console.error('Error:', error);
            });
            translationResultElement.innerHTML += '<br>';
    });
}