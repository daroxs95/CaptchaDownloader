# Captcha Downloader

Download amounts of captchas, configured for [tuenvio]("https://www.tuenvio.cu/lahabana/captcha.ashx")

## How to use

Clone repo, `npm install`, `npm start`.

 To edit amount of files to download or name or extension, edit the line:

```javascript
download_item("https://www.tuenvio.cu/lahabana/captcha.ashx", desiredNumberOfCaptchas, "captcha", "jpeg");
```

