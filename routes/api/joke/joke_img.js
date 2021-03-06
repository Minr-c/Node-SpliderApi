/*
 * @Author: ecitlm
 * @Date:   2017-12-01 21:41:02
 * @Last Modified by: ecitlm
 * @Last Modified time: 2018-03-31 20:23:59
 */

const express = require('express');
const app = express();
const Server = require('../../../utils/httpServer');

app.get('/', function(req, res) {
    var host = 'api.laifudao.com';
    var path = `/open/tupian.json`;
    var data = {};
    //false:http请求  true:https请求
    Server.httpGet(host, data, path, false)
        .then(function(body) {
            var list = eval('(' + body + ')');
            var arr = [];
            for (var i in list) {
                arr.push({
                    title: list[i].title,
                    thumburl: list[i].thumburl,
                    sourceurl: list[i].sourceurl,
                });
            }

            res.send({
                code: 200,
                data: arr,
                msg: '',
            });
        })
        .catch(function(err) {
            res.send({
                code: 404,
                msg: '网络好像有点问题',
            });
            console.log(err);
        });
});

module.exports = app;