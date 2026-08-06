(function () {
  'use strict';
  if (window.__HNE_NATIVE_R213__) return 'already';
  window.__HNE_NATIVE_R213__ = true;

  var root = document.documentElement;
  root.classList.add('hne-native-app', 'hne-native-r213');

  var css = `
html.hne-native-r213,html.hne-native-r213 body{height:100%;overflow:hidden!important;overscroll-behavior:none}
html.hne-native-r213 body{touch-action:manipulation}
html.hne-native-r213 #openSettingsTopBtn,
html.hne-native-r213 #installAppBtn,
html.hne-native-r213 #academyPublicPreviewBtn,
html.hne-native-r213 #academyTripOpenBtn{display:none!important}
html.hne-native-r213 .academy-public-intro,
html.hne-native-r213 .academy-work-note,
html.hne-native-r213 .academy-coordinate-wait,
html.hne-native-r213 .academy-remote-note{display:none!important}
html.hne-native-r213 #academyWorkspace,
html.hne-native-r213 .academy-workspace{
 display:block!important;position:fixed!important;z-index:5000!important;
 left:0!important;right:0!important;top:auto!important;bottom:0!important;
 width:100vw!important;max-width:none!important;height:82dvh!important;max-height:82dvh!important;
 min-height:0!important;resize:none!important;overflow:hidden!important;
 border:0!important;border-top:1px solid #d8dee8!important;border-radius:22px 22px 0 0!important;
 background:rgba(255,255,255,.985)!important;box-shadow:0 -12px 34px rgba(15,23,42,.22)!important;
 transform:translate3d(0,calc(100% - 62px),0);transition:transform .23s ease!important;
 padding:0!important;margin:0!important;visibility:visible!important;opacity:1!important
}
html.hne-native-r213 #academyWorkspace.hne-sheet-search,
html.hne-native-r213 .academy-workspace.hne-sheet-search{transform:translate3d(0,0,0)}
html.hne-native-r213 #academyWorkspace.hne-sheet-cluster,
html.hne-native-r213 .academy-workspace.hne-sheet-cluster{height:70dvh!important;max-height:70dvh!important;transform:translate3d(0,0,0)}
html.hne-native-r213 #academyWorkspace.hne-sheet-detail,
html.hne-native-r213 .academy-workspace.hne-sheet-detail{height:86dvh!important;max-height:86dvh!important;transform:translate3d(0,0,0)}
html.hne-native-r213 .hne-native-sheet-handle{
 position:sticky;top:0;z-index:40;display:flex!important;align-items:center;justify-content:center;gap:9px;
 width:100%;height:62px;border:0;border-bottom:1px solid #edf0f4;background:rgba(255,255,255,.99);
 color:#213e57;font:900 14px/1 system-ui,-apple-system,"Noto Sans KR",sans-serif;cursor:pointer
}
html.hne-native-r213 .hne-native-sheet-handle:before{content:"";position:absolute;top:8px;left:50%;width:42px;height:5px;border-radius:999px;background:#b7c2cc;transform:translateX(-50%)}
html.hne-native-r213 .hne-native-sheet-handle .hne-native-sheet-title{padding-top:9px}
html.hne-native-r213 .hne-native-sheet-handle .hne-native-sheet-count{margin-top:9px;padding:4px 7px;border-radius:999px;background:#eef4f8;color:#46657c;font-size:10px}
html.hne-native-r213 .academy-work-head{position:relative!important;top:auto!important;padding:9px 12px!important;max-height:74px;overflow:hidden}
html.hne-native-r213 .academy-work-title{font-size:13px!important}
html.hne-native-r213 .academy-work-sub{display:none!important}
html.hne-native-r213 .academy-work-head-actions{gap:4px!important}
html.hne-native-r213 .academy-work-close{width:40px!important;height:40px!important;font-size:24px!important}
html.hne-native-r213 .academy-work-body{height:calc(100% - 62px)!important;max-height:none!important;overflow:auto!important;padding:9px 11px calc(24px + env(safe-area-inset-bottom))!important;overscroll-behavior:contain}
html.hne-native-r213 .academy-search-wrap input,
html.hne-native-r213 input[type=text],
html.hne-native-r213 select,
html.hne-native-r213 button{min-height:42px;font-size:max(12px,1rem)}
html.hne-native-r213 .academy-filter-grid{grid-template-columns:1fr 1fr!important;gap:8px!important}
html.hne-native-r213 .academy-explorer-grid{display:block!important;min-height:0!important;margin-top:8px!important}
html.hne-native-r213 .academy-result-list,
html.hne-native-r213 .academy-detail{max-height:none!important;height:auto!important;border-radius:12px!important}
html.hne-native-r213 .academy-result-row{min-height:58px!important;padding:10px 9px!important;grid-template-columns:38px minmax(0,1fr) auto!important}
html.hne-native-r213 .academy-result-icon{width:34px!important;height:34px!important;font-size:11px!important}
html.hne-native-r213 .academy-result-name{font-size:13px!important}
html.hne-native-r213 .academy-result-sub{font-size:10px!important;white-space:normal!important;line-height:1.35!important}
html.hne-native-r213 .academy-detail-name{font-size:17px!important;line-height:1.35!important}
html.hne-native-r213 .academy-detail-address{font-size:12px!important}
html.hne-native-r213 .academy-detail-actions button{min-height:46px!important;font-size:12px!important}
html.hne-native-r213 .academy-course-name{font-size:12px!important}
html.hne-native-r213 .academy-course-sub,
html.hne-native-r213 .academy-course-fee{font-size:10px!important}
html.hne-native-r213 .hne-state-cluster .academy-loader,
html.hne-native-r213 .hne-state-cluster .academy-explorer-title,
html.hne-native-r213 .hne-state-cluster .academy-search-wrap,
html.hne-native-r213 .hne-state-cluster .academy-filter-grid,
html.hne-native-r213 .hne-state-cluster .academy-marker-policy,
html.hne-native-r213 .hne-state-cluster #academyDetail{display:none!important}
html.hne-native-r213 .hne-state-cluster #academyResultList{display:block!important}
html.hne-native-r213 .hne-state-detail .academy-loader,
html.hne-native-r213 .hne-state-detail .academy-explorer-title,
html.hne-native-r213 .hne-state-detail .academy-search-wrap,
html.hne-native-r213 .hne-state-detail .academy-filter-grid,
html.hne-native-r213 .hne-state-detail .academy-marker-policy,
html.hne-native-r213 .hne-state-detail #academyResultList{display:none!important}
html.hne-native-r213 .hne-state-detail #academyDetail{display:block!important}
html.hne-native-r213 .leaflet-control-zoom a{width:42px!important;height:42px!important;line-height:42px!important;font-size:22px!important}
html.hne-native-r213 .leaflet-bottom.leaflet-right{bottom:72px!important}
html.hne-native-r213 .leaflet-popup-content-wrapper{max-height:72dvh;overflow:auto}
@media (orientation:landscape) and (max-height:600px){
 html.hne-native-r213 #academyWorkspace,html.hne-native-r213 .academy-workspace{height:88dvh!important;max-height:88dvh!important}
 html.hne-native-r213 #academyWorkspace.hne-sheet-cluster,html.hne-native-r213 .academy-workspace.hne-sheet-cluster{height:84dvh!important;max-height:84dvh!important}
}
`;

  var style = document.createElement('style');
  style.id = 'hneNativeR213Style';
  style.textContent = css;
  document.head.appendChild(style);

  var sheet = null;
  var handle = null;
  var state = 'map';
  var beforeDetail = 'search';

  function findSheet() {
    return document.getElementById('academyWorkspace') || document.querySelector('.academy-workspace');
  }

  function currentCount() {
    var count = document.querySelectorAll('#academyResultList .academy-result-row').length;
    return count ? count.toLocaleString('ko-KR') + '곳' : '';
  }

  function updateHandle() {
    if (!handle) return;
    var title = handle.querySelector('.hne-native-sheet-title');
    var count = handle.querySelector('.hne-native-sheet-count');
    var labels = {
      map: '위로 올려 학원 검색',
      search: '검색·필터',
      cluster: '이 위치의 학원 목록',
      detail: '학원 상세정보'
    };
    if (title) title.textContent = labels[state] || labels.search;
    if (count) {
      var text = (state === 'cluster' || state === 'search') ? currentCount() : '';
      count.textContent = text;
      count.style.display = text ? 'inline-flex' : 'none';
    }
  }

  function invalidateMap() {
    window.setTimeout(function () {
      try {
        if (typeof map !== 'undefined' && map && map.invalidateSize) map.invalidateSize({pan:false});
      } catch (_) {}
    }, 260);
  }

  function setState(next, remember) {
    if (!sheet) sheet = findSheet();
    if (!sheet) return false;
    if (next === 'detail' && remember !== false) beforeDetail = (state === 'cluster' ? 'cluster' : 'search');
    state = next;
    sheet.classList.remove('hne-sheet-map','hne-sheet-search','hne-sheet-cluster','hne-sheet-detail','hne-state-search','hne-state-cluster','hne-state-detail');
    sheet.classList.add('hne-sheet-' + next);
    if (next === 'search') sheet.classList.add('hne-state-search');
    if (next === 'cluster') sheet.classList.add('hne-state-cluster');
    if (next === 'detail') sheet.classList.add('hne-state-detail');
    sheet.dataset.hneNativeState = next;
    updateHandle();
    invalidateMap();
    return true;
  }

  function ensureSheet() {
    sheet = findSheet();
    if (!sheet) return false;
    sheet.classList.add('open');
    sheet.classList.remove('collapsed');
    sheet.setAttribute('aria-hidden', 'false');
    if (!document.getElementById('hneNativeSheetHandle')) {
      handle = document.createElement('button');
      handle.type = 'button';
      handle.id = 'hneNativeSheetHandle';
      handle.className = 'hne-native-sheet-handle';
      handle.setAttribute('aria-label', '검색창 열기 또는 접기');
      handle.innerHTML = '<span class="hne-native-sheet-title"></span><span class="hne-native-sheet-count"></span>';
      sheet.insertBefore(handle, sheet.firstChild);
      handle.addEventListener('click', function () {
        if (state === 'map') setState('search');
        else setState('map');
      });
      var startY = 0;
      handle.addEventListener('touchstart', function (e) {
        if (e.touches && e.touches[0]) startY = e.touches[0].clientY;
      }, {passive:true});
      handle.addEventListener('touchend', function (e) {
        var endY = e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientY : startY;
        var dy = endY - startY;
        if (dy < -32) setState(state === 'map' ? 'search' : state);
        else if (dy > 32) setState('map');
      }, {passive:true});
    } else {
      handle = document.getElementById('hneNativeSheetHandle');
    }
    setState('map', false);
    return true;
  }

  function tuneMap() {
    try {
      if (typeof map === 'undefined' || !map || !map.setView) return false;
      if (!map.__hneNativeR213) {
        map.__hneNativeR213 = true;
        if (map.setMinZoom) map.setMinZoom(11);
        map.on('zoomend', function () {
          try { if (map.getZoom() < 11) map.setZoom(11); } catch (_) {}
        });
        window.setTimeout(function () {
          try {
            if (map.getZoom() < 12) map.setView([37.4935,126.8850], 12, {animate:false});
            map.invalidateSize({pan:false});
          } catch (_) {}
        }, 420);
      }
      return true;
    } catch (_) { return false; }
  }

  document.addEventListener('click', function (e) {
    var target = e.target;
    if (!target || !target.closest) return;
    if (target.closest('.academy-work-close')) {
      e.preventDefault();
      e.stopPropagation();
      setState('map');
      return;
    }
    if (target.closest('.marker-cluster')) {
      window.setTimeout(function () { setState('cluster'); }, 80);
      return;
    }
    if (target.closest('.academy-result-row')) {
      window.setTimeout(function () { setState('detail'); }, 60);
      return;
    }
    if (target.closest('.academy-search-wrap input, #academySearchInput, input[placeholder*="학원"]')) {
      if (state === 'map') setState('search');
    }
  }, true);

  var observer = new MutationObserver(function () {
    if (!sheet) ensureSheet();
    updateHandle();
    var detail = document.getElementById('academyDetail');
    if (detail && (detail.querySelector('.academy-detail-head,.academy-detail-name') || detail.dataset.selectedId)) {
      if (state !== 'detail') setState('detail');
    }
  });
  observer.observe(document.documentElement, {childList:true,subtree:true});

  window.HNE_NATIVE_BACK = function () {
    if (state === 'detail') {
      setState(beforeDetail === 'cluster' ? 'cluster' : 'search', false);
      return 'handled';
    }
    if (state === 'cluster' || state === 'search') {
      setState('map', false);
      return 'handled';
    }
    return 'pass';
  };

  window.HNE_NATIVE_SET_STATE = setState;

  var tries = 0;
  var timer = window.setInterval(function () {
    tries += 1;
    var sheetReady = ensureSheet();
    var mapReady = tuneMap();
    if ((sheetReady && mapReady) || tries > 80) window.clearInterval(timer);
  }, 250);

  return 'ok';
})();
