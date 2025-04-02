
document.querySelectorAll('.faq-question').forEach((question) => {
  question.addEventListener('click', () => {
    const faqItem = question.parentElement;

    // Toggle the active class
    faqItem.classList.toggle('active');

    // Debugging: Log the current state
    console.log(`Toggled FAQ item: ${faqItem.classList.contains('active') ? 'Expanded' : 'Collapsed'}`);
  });
});