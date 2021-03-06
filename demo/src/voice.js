/**
 * @file voice demo
 * @author cgzero[cgzero@cgzero.com]
 * @data 2016-06-30
 */

define(function (require) {
    var dom = require('saber-dom');
    var env = require('saber-env');
    var mvoice = require('../../src/mvoice');

    window.URL = window.URL || window.webkitURL;
    navigator.getUserMedia = navigator.getUserMedia
        || navigator.webkitGetUserMedia
        || navigator.mozGetUserMedia
        || navigator.msGetUserMedia;

    var exports = {};

    function isSupport() {
        // 基本上，只支持新版的chrome和ff
        if (!navigator.getUserMedia || !window.URL) {
            return false;
        }

        if (!window.AudioContext) {
            return false;
        }

        if (!window.Worker) {
            return false;
        }

        return true;
    }

    function initVoice() {
        var mvoiceDialog;
        dom.g('search-btn').addEventListener('click', function () {
            mvoiceDialog = mvoice.render({
                // 如果设置了input，则输入完成后将内容追加到input的value中
                input: '#search-input',
                // 语音输入完成后的回调
                oncomplete: function (result) {
                    console.log(result);
                }
            });
        });

        dom.g('dispose').addEventListener('click', function () {
            mvoiceDialog && mvoiceDialog.dispose();
            mvoiceDialog = null;
        });
    }

    function can(condition) {
        return condition ? '<span class="yes">是</span>' : '<span class="no">否</span>';
    }

    function initInfo() {
        var info = '';
        info += '<h2>语音是否可用：' + can(mvoice.isCompat()) + '</h2>';
        info += '<p>是否是微信：' + can(env.browser.wechat) + '</p>';
        info += '<hr>';
        info += '<p>是否支持语音API：' + can(isSupport()) + '</p>';
        info += '<p>是否是安卓系统：' + can(env.os.android) + '</p>';
        info += '<p>是否是Chrome内核：' + can(env.browser.chrome) + '</p>';
        info += ''
            + '<p>是否是原生Chrome：'
            + can(env.browser.chrome && !/version\/([0-9\.]+)/i.test(navigator.userAgent))
            + '</p>';
        info += '<hr>';
        info += '<p>UA：' + window.navigator.userAgent + '</p>';

        dom.g('info').innerHTML = info;
    }

    exports.init = function () {
        initVoice();
        initInfo();
    };

    return exports;
});
