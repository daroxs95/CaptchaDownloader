var PotatoDM = require('potato_dm')
var fs = require('fs');

var desiredNumberOfCaptchas = 200;

const download_piece = (url, index, filename, extension) => { //index here is for manipulating console.log
    const my_dm = new PotatoDM.PotatoDM(url, "./downloadedCaptchas/", {
        file_name: filename + index + "." + extension,
        extra_headers: { "user-agent": "Mozilla/5.0 (Linux; Android 10; Pixel 4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Mobile Safari/537.36" },
        check_integrity: false
    });

    my_dm.on('data_chunk', (progress) => {
        process.stdout.write('\r');
        for (let i = 0; i < index; i++) {
            //process.stdout.write('\n');
        }
        process.stdout.write('Progress:' + progress + '%');
    })
    my_dm.on('error', (error, msg) => {
        console.log(error);
        console.log(url);
    })
    my_dm.on('timeout', (msg) => {
        console.log(msg);
        console.log(url);
    })
    my_dm.on('warning', (warning, msg) => {
        console.log(warning);
    })
    my_dm.on('check_integrity_end', (data) => {
        data.pass ? console.log('file is correct') : console.log("incorrect file, please redownload a fresh version");
    })
    my_dm.on('already_exists_resuming', (msg) => {
        console.log(msg);
    })
    my_dm.on('already_exists_restanting', (msg) => {
        console.log(msg);
    })

    return my_dm;
};

//index here is for manipulating console.log
const download_item = (url, amount = 1, filename, extension) => {
    if (amount > 0) {
        try {
            download_piece(url, amount - 1, filename, extension)._try_download().then({
                onfulfilled: () => {
                    //console.log('done from main, promise based, fulfilled')
                    //if (this.check_integrity) this._check_integrity();
                },
                onrejected: () => {
                    //console.log('done from main, promise based, rejected')
                    //if (this.check_integrity) this._check_integrity();
                }
            }).catch((error) => {
                console.log(error);
            }).finally(() => {
                download_item(url, amount - 1, filename, extension);
            });
        } catch (err) {
            //download_item(download_pieces, index = 0);
            console.log(err);
        }
    }
};

download_item("https://www.tuenvio.cu/lahabana/captcha.ashx", desiredNumberOfCaptchas, "captcha", "jpeg");