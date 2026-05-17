// ИП Железнов О.Ю. — лендинг (без сборки, ванильный JS)

(function () {
  'use strict';

  // ---- Мобильное меню ----
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');

  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // Закрывать меню после клика по ссылке
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ---- Форма заявки ----
  var form = document.getElementById('orderForm');
  var hint = document.getElementById('formHint');

  // E-mail получателя заявок (ЗАМЕНИТЬ при необходимости)
  var TARGET_EMAIL = 'oleg.zheleznov@mail.ru';

  function setHint(msg, type) {
    if (!hint) return;
    hint.textContent = msg;
    hint.className = 'form__hint ' + (type || '');
  }

  function isPhoneValid(value) {
    var digits = value.replace(/\D/g, '');
    return digits.length >= 10 && digits.length <= 12;
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = form.name.value.trim();
      var phone = form.phone.value.trim();
      var type = form.type.value;
      var comment = form.comment.value.trim();

      // Валидация
      var ok = true;
      form.name.classList.remove('invalid');
      form.phone.classList.remove('invalid');

      if (name.length < 2) {
        form.name.classList.add('invalid');
        ok = false;
      }
      if (!isPhoneValid(phone)) {
        form.phone.classList.add('invalid');
        ok = false;
      }

      if (!ok) {
        setHint('Проверьте имя и телефон — телефон укажите полностью.', 'err');
        return;
      }

      // Заглушка отправки: открываем почтовый клиент с готовым письмом.
      // На проде заменить на Formspree / Telegram-бот / бэкенд.
      var subject = 'Заявка с сайта — вывоз мусора';
      var body =
        'Имя: ' + name + '\n' +
        'Телефон: ' + phone + '\n' +
        'Что вывезти: ' + type + '\n' +
        'Комментарий: ' + (comment || '—');

      var mailto =
        'mailto:' + TARGET_EMAIL +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);

      setHint('Спасибо! Открываем почту для отправки заявки. Или просто позвоните: +7 (903) 116-07-64', 'ok');
      window.location.href = mailto;
      form.reset();
    });
  }

  // ---- Год в футере (если понадобится динамический) ----
  // Оставлено статикой в разметке; раскомментировать при необходимости.
})();
