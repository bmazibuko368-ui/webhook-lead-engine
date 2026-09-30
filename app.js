document.getElementById('lead-form').addEventListener('submit', async function(event) {
  // Prevent browser from refreshing page on form submit
  event.preventDefault();

  const submitBtn = document.getElementById('submit-btn');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  // Construct structured JSON object from form input values
  const payload = {
    fullName: document.getElementById('name').value,
    phone: document.getElementById('phone').value,
    service: document.getElementById('service').value,
    submittedAt: new Date().toLocaleString('en-ZA')
  };

  // PASTE YOUR MAKE.COM WEBHOOK URL HERE
  const webhookUrl = 'https://hook.eu1.make.com/6sfh2bwq7gt94da5tp7w6c0nl6kan1pb';

  try {
    // Send data asynchronously across the web using HTTP POST
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      alert('Success! Your lead has been logged.');
      document.getElementById('lead-form').reset();
    } else {
      alert('Error sending data.');
    }
  } catch (error) {
    console.error('Network Error:', error);
    alert('Could not connect to webhook endpoint.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit Request';
  }
});
