document.addEventListener('DOMContentLoaded', () => {
  // Pricing Toggle
  const toggle = document.getElementById('pricingToggle');
  const prices = document.querySelectorAll('.price');

  toggle.addEventListener('change', () => {
    prices.forEach(price => {
      if (toggle.checked) {
        price.textContent = `R${price.getAttribute('data-year')}`;
        price.nextElementSibling.textContent = '/yr';
      } else {
        price.textContent = `R${price.getAttribute('data-month')}`;
        price.nextElementSibling.textContent = '/mo';
      }
    });
  });

  // Contact Form
  const contactForm = document.getElementById('contactForm');
  const formAlert = document.getElementById('formAlert');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let isValid = true;

    this.querySelectorAll('input, textarea').forEach(field => {
      if (!field.checkValidity()) {
        field.classList.add('is-invalid');
        isValid = false;
      } else {
        field.classList.remove('is-invalid');
      }
    });

    if (isValid) {
       emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', contactForm)
        .then(() => {
          formAlert.classList.remove('d-none');
          formAlert.classList.replace('alert-danger', 'alert-success');
          formAlert.textContent = 'Your message has been sent successfully!';
          contactForm.reset();
          setTimeout(() => formAlert.classList.add('d-none'), 3000);
        })
        .catch((error) => {
          formAlert.classList.remove('d-none');
          formAlert.classList.replace('alert-success', 'alert-danger');
          formAlert.textContent = 'Something went wrong. Please try again later.';
          console.error('EmailJS error:', error);
        });
    }
  });

  // Scroll Progress Bar
  window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollPercent = document.getElementById('scrollPercent');
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;

    scrollProgress.style.height = `${progress}%`;
    scrollPercent.textContent = `${Math.round(progress)}%`;
  });

  // Live Fake Subscribers Counter
  let subscribersCount = 12500;
  let downloadsCount = 30000;
  const subscribersElement = document.getElementById('subscribersCount');
  const downloadsElement = document.getElementById('downloadsCount');

  setInterval(() => {
    const subChange = Math.floor(Math.random() * 20) - 10;
    const downChange = Math.floor(Math.random() * 30) - 15;

    subscribersCount += subChange;
    downloadsCount += downChange;

    if (subscribersCount < 12400) subscribersCount = 12400;
    if (downloadsCount < 29500) downloadsCount = 29500;

    subscribersElement.textContent = subscribersCount.toLocaleString();
    downloadsElement.textContent = downloadsCount.toLocaleString();
  }, 2000);

  // Read More Toggle
  document.querySelectorAll('.read-more-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const details = document.getElementById(targetId);
      if (details.classList.contains('d-none')) {
        details.classList.remove('d-none');
        btn.textContent = 'Read Less';
      } else {
        details.classList.add('d-none');
        btn.textContent = 'Read More';
      }
    });
  });

  // Compare Plans Logic
  const compareBtn = document.getElementById('compareBtn');
  const compareCheckboxes = document.querySelectorAll('.compare-checkbox');

  function updateCompareBtn() {
    const checkedBoxes = [...compareCheckboxes].filter(cb => cb.checked);
    compareBtn.disabled = checkedBoxes.length < 2;
  }
  compareCheckboxes.forEach(cb => cb.addEventListener('change', updateCompareBtn));
  updateCompareBtn();

  const featureList = [
    { feature: 'Access to core editing tools', basic: true, pro: true, enterprise: true },
    { feature: 'Export up to 720p resolution', basic: true, pro: true, enterprise: true },
    { feature: 'Export up to 1080p', basic: false, pro: true, enterprise: true },
    { feature: 'Export up to 4K', basic: false, pro: false, enterprise: true },
    { feature: 'Team collaboration', basic: false, pro: true, enterprise: true },
    { feature: '50GB cloud storage', basic: false, pro: true, enterprise: false },
    { feature: 'Unlimited cloud storage', basic: false, pro: false, enterprise: true },
    { feature: 'Dedicated account manager', basic: false, pro: false, enterprise: true },
  ];

  compareBtn.addEventListener('click', () => {
    const checkedPlans = [...compareCheckboxes].filter(cb => cb.checked).map(cb => cb.value);
    const compareTable = document.getElementById('compareTable');
    const thead = compareTable.querySelector('thead');
    const tbody = compareTable.querySelector('tbody');

    // Clear previous
    thead.innerHTML = '';
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = '<th>Features</th>';
    checkedPlans.forEach(plan => {
      headerRow.innerHTML += `<th class="text-capitalize">${plan}</th>`;
    });
    thead.appendChild(headerRow);

    tbody.innerHTML = '';
    featureList.forEach(({ feature, basic, pro, enterprise }) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td class="text-start">${feature}</td>`;
      checkedPlans.forEach(plan => {
        const hasFeature = { basic, pro, enterprise }[plan];
        tr.innerHTML += `<td>${hasFeature ? '✔️' : '❌'}</td>`;
      });
      tbody.appendChild(tr);
    });

    const compareModal = new bootstrap.Modal(document.getElementById('compareModal'));
    compareModal.show();
  });

});
