const menu = document.querySelector('.menu');
const nav = document.querySelector('.topbar nav');

function closeMenu() {
  nav?.classList.remove('open');
  menu?.setAttribute('aria-expanded', 'false');
}

menu?.addEventListener('click', () => {
  const open = nav?.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(Boolean(open)));
});

document.querySelectorAll('.topbar nav a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
window.addEventListener('resize', () => { if (window.innerWidth > 1000) closeMenu(); });

const form = document.querySelector('#problemForm');
const problemText = document.querySelector('#problemText');
const status = document.querySelector('#problemStatus');
const copyBtn = document.querySelector('#copyProblem');

function preparedProblem() {
  return `LONA ICT Rescue Problem\n\n${problemText?.value.trim() || ''}\n\nPlease do not include passwords, PINs or private account details.`;
}

async function copyProblem() {
  const text = preparedProblem();
  if (!problemText?.value.trim()) {
    status.textContent = 'Please describe the technology problem first.';
    problemText?.focus();
    return false;
  }
  try {
    await navigator.clipboard.writeText(text);
    status.textContent = 'Problem copied. You can now paste it into the LONA ICT Hub contact channel.';
    return true;
  } catch {
    problemText.select();
    document.execCommand('copy');
    status.textContent = 'Problem copied. You can now paste it into the LONA ICT Hub contact channel.';
    return true;
  }
}

copyBtn?.addEventListener('click', copyProblem);
form?.addEventListener('submit', e => {
  e.preventDefault();
  if (!problemText?.value.trim()) {
    status.textContent = 'Please describe the technology problem first.';
    problemText?.focus();
    return;
  }
  const message = `Hello LONA ICT Hub. I found you through the LONA ICT Hub website and would like ICT assistance.\n\n${preparedProblem()}`;
  const whatsappUrl = `https://wa.me/message/M3PHBVH4YYE6F1?text=${encodeURIComponent(message)}`;
  status.textContent = 'Opening WhatsApp Business with your ICT problem prepared. Review it, then tap Send.';
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
});
