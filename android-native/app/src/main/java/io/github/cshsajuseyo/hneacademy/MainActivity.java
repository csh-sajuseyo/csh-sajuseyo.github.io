package io.github.cshsajuseyo.hneacademy;

import android.Manifest;
import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.view.Gravity;
import android.view.View;
import android.webkit.CookieManager;
import android.webkit.GeolocationPermissions;
import android.webkit.PermissionRequest;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.widget.ProgressBar;
import android.widget.TextView;

import org.json.JSONObject;

import java.net.URISyntaxException;

public final class MainActivity extends Activity {
    private static final int FILE_CHOOSER_REQUEST = 2101;
    private static final int LOCATION_PERMISSION_REQUEST = 2102;
    private static final String APP_HOST = "csh-sajuseyo.github.io";
    private static final String APP_PATH_PREFIX = "/academy-work/";
    private static final String LOCAL_STORAGE_KEY = "hne_trip_route_kakao_js_key";

    private WebView webView;
    private ProgressBar progressBar;
    private TextView loadingText;
    private ValueCallback<Uri[]> fileCallback;
    private GeolocationPermissions.Callback pendingGeoCallback;
    private String pendingGeoOrigin;
    private boolean keyInjected;
    private boolean contentVisible;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        createContentView();
        configureWebView();
        openApp();
    }

    private void createContentView() {
        FrameLayout root = new FrameLayout(this);
        root.setBackgroundColor(Color.rgb(244, 247, 249));

        webView = new WebView(this);
        webView.setVisibility(View.INVISIBLE);
        root.addView(webView, new FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.MATCH_PARENT,
                FrameLayout.LayoutParams.MATCH_PARENT));

        FrameLayout loading = new FrameLayout(this);
        FrameLayout.LayoutParams loadingParams = new FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.MATCH_PARENT,
                FrameLayout.LayoutParams.MATCH_PARENT);
        root.addView(loading, loadingParams);

        progressBar = new ProgressBar(this);
        FrameLayout.LayoutParams progressParams = new FrameLayout.LayoutParams(72, 72);
        progressParams.gravity = Gravity.CENTER;
        progressParams.bottomMargin = 40;
        loading.addView(progressBar, progressParams);

        loadingText = new TextView(this);
        loadingText.setText(getString(R.string.loading_message));
        loadingText.setTextSize(15f);
        loadingText.setTextColor(Color.rgb(38, 66, 83));
        loadingText.setGravity(Gravity.CENTER);
        FrameLayout.LayoutParams textParams = new FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.WRAP_CONTENT,
                FrameLayout.LayoutParams.WRAP_CONTENT);
        textParams.gravity = Gravity.CENTER;
        textParams.topMargin = 100;
        loading.addView(loadingText, textParams);

        loading.setTag("loadingOverlay");
        setContentView(root);
    }

    @SuppressWarnings("SetJavaScriptEnabled")
    private void configureWebView() {
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setGeolocationEnabled(true);
        settings.setAllowFileAccess(false);
        settings.setAllowContentAccess(true);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);
        settings.setSupportZoom(true);
        settings.setBuiltInZoomControls(false);
        settings.setDisplayZoomControls(false);
        settings.setUserAgentString(settings.getUserAgentString() + " HNEAcademyNative/2.12");

        CookieManager.getInstance().setAcceptCookie(true);
        CookieManager.getInstance().setAcceptThirdPartyCookies(webView, true);
        WebView.setWebContentsDebuggingEnabled(BuildConfig.DEBUG);

        webView.setWebViewClient(new AppWebViewClient());
        webView.setWebChromeClient(new AppWebChromeClient());
        webView.setDownloadListener((url, userAgent, contentDisposition, mimeType, contentLength) ->
                openExternalUri(Uri.parse(url)));
    }

    private void openApp() {
        keyInjected = false;
        contentVisible = false;
        webView.loadUrl(BuildConfig.APP_URL + "&launch=" + BuildConfig.VERSION_CODE);
    }

    private boolean isInternalUrl(Uri uri) {
        return uri != null
                && "https".equalsIgnoreCase(uri.getScheme())
                && APP_HOST.equalsIgnoreCase(uri.getHost())
                && uri.getPath() != null
                && uri.getPath().startsWith(APP_PATH_PREFIX);
    }

    private void injectKeyAndReload() {
        String script = "try{localStorage.setItem(" +
                JSONObject.quote(LOCAL_STORAGE_KEY) + "," +
                JSONObject.quote(BuildConfig.KAKAO_JS_KEY) +
                ");'ok'}catch(e){'error'}";
        webView.evaluateJavascript(script, result -> {
            keyInjected = true;
            webView.loadUrl(BuildConfig.APP_URL + "&embedded=1&v=" + BuildConfig.VERSION_CODE);
        });
    }

    private void applyNativeMode() {
        String script = "(function(){" +
                "var a=document.getElementById('openSettingsTopBtn');if(a)a.style.display='none';" +
                "var b=document.getElementById('installAppBtn');if(b)b.style.display='none';" +
                "document.documentElement.classList.add('hne-native-app');" +
                "})();";
        webView.evaluateJavascript(script, null);
    }

    private void revealContent() {
        if (contentVisible) return;
        contentVisible = true;
        applyNativeMode();
        webView.setVisibility(View.VISIBLE);
        View loading = ((View) progressBar.getParent());
        loading.setVisibility(View.GONE);
    }

    private void openExternalUri(Uri uri) {
        if (uri == null) return;
        Intent intent = new Intent(Intent.ACTION_VIEW, uri);
        intent.addCategory(Intent.CATEGORY_BROWSABLE);
        try {
            startActivity(intent);
        } catch (ActivityNotFoundException ignored) {
            if ("intent".equalsIgnoreCase(uri.getScheme())) {
                try {
                    Intent parsed = Intent.parseUri(uri.toString(), Intent.URI_INTENT_SCHEME);
                    String fallback = parsed.getStringExtra("browser_fallback_url");
                    if (fallback != null) {
                        startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(fallback)));
                    }
                } catch (Exception ignoredAgain) {
                    // No compatible app and no usable fallback.
                }
            }
        }
    }

    private void handleIntentUrl(String url) {
        try {
            Intent intent = Intent.parseUri(url, Intent.URI_INTENT_SCHEME);
            intent.addCategory(Intent.CATEGORY_BROWSABLE);
            intent.setComponent(null);
            intent.setSelector(null);
            try {
                startActivity(intent);
            } catch (ActivityNotFoundException e) {
                String fallback = intent.getStringExtra("browser_fallback_url");
                if (fallback != null) openExternalUri(Uri.parse(fallback));
            }
        } catch (URISyntaxException ignored) {
            // Ignore malformed intent URLs.
        }
    }

    private final class AppWebViewClient extends WebViewClient {
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
            Uri uri = request.getUrl();
            if (isInternalUrl(uri)) return false;
            String scheme = uri.getScheme() == null ? "" : uri.getScheme().toLowerCase();
            if ("intent".equals(scheme)) {
                handleIntentUrl(uri.toString());
            } else {
                openExternalUri(uri);
            }
            return true;
        }

        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            Uri uri = Uri.parse(url);
            if (isInternalUrl(uri)) return false;
            if (url.startsWith("intent://")) handleIntentUrl(url);
            else openExternalUri(uri);
            return true;
        }

        @Override
        public void onPageFinished(WebView view, String url) {
            super.onPageFinished(view, url);
            Uri uri = Uri.parse(url);
            if (!isInternalUrl(uri)) return;
            if (!keyInjected) {
                injectKeyAndReload();
                return;
            }
            revealContent();
        }
    }

    private final class AppWebChromeClient extends WebChromeClient {
        @Override
        public boolean onShowFileChooser(WebView webView,
                                         ValueCallback<Uri[]> filePathCallback,
                                         FileChooserParams fileChooserParams) {
            if (fileCallback != null) fileCallback.onReceiveValue(null);
            fileCallback = filePathCallback;
            Intent intent;
            try {
                intent = fileChooserParams.createIntent();
            } catch (Exception e) {
                intent = new Intent(Intent.ACTION_OPEN_DOCUMENT);
                intent.addCategory(Intent.CATEGORY_OPENABLE);
                intent.setType("*/*");
            }
            intent.putExtra(Intent.EXTRA_MIME_TYPES, new String[]{
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "application/vnd.ms-excel",
                    "text/csv",
                    "application/octet-stream"
            });
            try {
                startActivityForResult(intent, FILE_CHOOSER_REQUEST);
                return true;
            } catch (ActivityNotFoundException e) {
                fileCallback = null;
                return false;
            }
        }

        @Override
        public void onGeolocationPermissionsShowPrompt(String origin,
                                                        GeolocationPermissions.Callback callback) {
            if (checkSelfPermission(Manifest.permission.ACCESS_FINE_LOCATION)
                    == PackageManager.PERMISSION_GRANTED
                    || checkSelfPermission(Manifest.permission.ACCESS_COARSE_LOCATION)
                    == PackageManager.PERMISSION_GRANTED) {
                callback.invoke(origin, true, false);
                return;
            }
            pendingGeoOrigin = origin;
            pendingGeoCallback = callback;
            requestPermissions(new String[]{
                    Manifest.permission.ACCESS_FINE_LOCATION,
                    Manifest.permission.ACCESS_COARSE_LOCATION
            }, LOCATION_PERMISSION_REQUEST);
        }

        @Override
        public void onPermissionRequest(PermissionRequest request) {
            request.deny();
        }

        @Override
        public void onProgressChanged(WebView view, int newProgress) {
            super.onProgressChanged(view, newProgress);
            if (!contentVisible && newProgress < 100) progressBar.setVisibility(View.VISIBLE);
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == FILE_CHOOSER_REQUEST && fileCallback != null) {
            Uri[] result = WebChromeClient.FileChooserParams.parseResult(resultCode, data);
            fileCallback.onReceiveValue(result);
            fileCallback = null;
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions,
                                           int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == LOCATION_PERMISSION_REQUEST && pendingGeoCallback != null) {
            boolean granted = false;
            for (int result : grantResults) {
                if (result == PackageManager.PERMISSION_GRANTED) {
                    granted = true;
                    break;
                }
            }
            pendingGeoCallback.invoke(pendingGeoOrigin, granted, false);
            pendingGeoCallback = null;
            pendingGeoOrigin = null;
            if (!granted && !shouldShowRequestPermissionRationale(
                    Manifest.permission.ACCESS_FINE_LOCATION)) {
                // User can later enable location in the Android app settings.
            }
        }
    }

    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) webView.goBack();
        else super.onBackPressed();
    }

    @Override
    protected void onDestroy() {
        if (webView != null) {
            webView.stopLoading();
            webView.setWebChromeClient(null);
            webView.setWebViewClient(null);
            webView.destroy();
        }
        super.onDestroy();
    }
}
