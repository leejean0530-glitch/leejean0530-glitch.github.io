/* ============================================================
   李金颖 · 摄影作品集 — 交互脚本
   功能：滚动渐入动画 / 导航当前板块高亮 / 页脚年份自动更新
   ============================================================ */

(function () {
  'use strict';

  /* ---------- 1. 滚动渐入动画 ----------
     页面上带 class="reveal" 的元素，滚动进入视野后渐显 */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target); // 只播放一次
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    // 旧浏览器兜底：直接全部显示
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- 2. 导航当前板块高亮 ---------- */
  var navLinks = document.querySelectorAll('.nav-links a');
  var sections = document.querySelectorAll('.gallery, .footer');

  if ('IntersectionObserver' in window && navLinks.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        navLinks.forEach(function (a) {
          if (a.getAttribute('href') === '#' + id) {
            a.style.color = '#B0442C';   // 印章红高亮
          } else {
            a.style.color = '';
          }
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- 3. 页脚年份自动更新 ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
