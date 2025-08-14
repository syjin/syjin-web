const ENDPOINT =
  'https://script.google.com/macros/s/AKfycbzDnXRMrmOxiwdHqlRTefWLmnw0OeRCXAjfzIIAexmJPBfsJixxyuiL3w32aj--1E7Aiw/exec';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.content-right form');
  const nameInput = form.querySelector('input[type="text"]');
  const emailInput = form.querySelector('input[type="email"]');
  const messageInput = form.querySelector('textarea');
  const interestGroup = form.querySelector('.btn-group');

  let selectedInterest = (
    interestGroup?.querySelector('.active')?.textContent || ''
  ).trim();

  interestGroup?.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    interestGroup.querySelectorAll('button').forEach((b) => {
      b.classList.toggle('active', b === btn);
      b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
    });
    selectedInterest = btn.textContent.trim();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;

    const payload = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      message: messageInput.value.trim(),
      interest: selectedInterest || 'Uncategorized',
    };

    const btn = form.querySelector('.send-btn');
    btn?.setAttribute('disabled', 'true');

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed');
      alert('메시지가 전송되었습니다!');
      form.reset();
      selectedInterest = '';
      interestGroup?.querySelectorAll('button').forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
    } catch (err) {
      alert('전송에 실패했습니다. 잠시 후 다시 시도해주세요.');
      console.error(err);
    } finally {
      btn?.removeAttribute('disabled');
    }
  });
});
