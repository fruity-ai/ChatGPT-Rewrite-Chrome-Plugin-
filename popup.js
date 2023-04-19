// Define toggleLoading function before setInitialState
function toggleLoading(show) {
  var loadingDiv = document.getElementById('loading');
  if (show) {
    loadingDiv.style.display = 'flex';
  } else {
    loadingDiv.style.display = 'none';
  }
}

function setInitialState() {
  toggleLoading(false);
}

document.addEventListener('DOMContentLoaded', function() {
   setInitialState();
  var extractBtn = document.getElementById('extractBtn');
  var resultDiv = document.getElementById('result');
  var outputDiv = document.getElementById('outputText');
  var output = document.getElementById('output');
  var languageDropdown = document.getElementById('languageDropdown');
  var copyBtn = document.getElementById('copyBtn');
  var responseText;



    function combineTextWithLanguage(text, language) {
        allText = `I am going to send you som text from a website. I need you to rewrite the text in ${language}.
        I want you only to return the rewritten text. Nothing before and nothing after.
        The text: ${text}`

        console.log(allText);

        return allText;
    }



 async function makeAPICall(data) {
  const response = await fetch('https://gpt-summarizer-5oxqvewo.ew.gateway.dev/summary/?key=AIzaSyCp9PHmf7cs5VKvwRRhlXpBWgOaIt3SprU', {
    method: 'POST',
    headers: {
      'Authorization': "bearer $(gcloud auth print-identity-token)",
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (response.status >= 200 && response.status < 300) {
    return response.text();
  } else {
    throw new Error('Failed to fetch data from server');
  }
}




  //if (message.action === 'extractText') {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'extractText' }, function(response) {
        if (response && response.text) {
          responseText = response.text;
          var truncatedText = response.text.slice(0, 200); // Get the first 100 symbols
          if (response.text.length > 200) { // Check if the original text is longer than 100 symbols
            truncatedText += '...'; // Add an ellipsis if the text is longer than 100 symbols
        }
        resultDiv.textContent = truncatedText;
        } else {
          resultDiv.textContent = 'Please highlight text before opening the app.';
        }
      });
    });

    extractBtn.addEventListener('click', async function() {
        toggleLoading(true); // Show the loading div
        var question = combineTextWithLanguage(responseText, languageDropdown.value);

        var data = {
            "task": question,
            "model": "turbo"
           };

       try {
            var response = await makeAPICall(data);
            console.log(response);
            outputDiv.textContent = response;
            output.style.display = 'block'; // Show the output div
          } catch (error) {
            console.error('Error:', error);
          } finally {
            toggleLoading(false); // Hide the loading div
         }
});

    // Get the copy button and output text div from the HTML document


// Add an event listener to the copy button
copyBtn.addEventListener('click', function() {

    var outputText = document.getElementById('outputText');
  // Copy the text inside the output text div to the clipboard
  navigator.clipboard.writeText(outputText.innerText)
    .then(() => {
      // Show a success message if the text was copied successfully
      console.log('Text copied to clipboard!');
       // Replace the button with a span element
          var newTextElement = document.createElement('span');
          newTextElement.textContent = 'Text copied!';
          newTextElement.classList.add('text-only');
          copyBtn.parentNode.replaceChild(newTextElement, copyBtn);
        })
    .catch((error) => {
      // Show an error message if the text could not be copied
      console.error('Failed to copy text: ', error);
    });
});

});


