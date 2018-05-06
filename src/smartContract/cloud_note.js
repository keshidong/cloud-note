/**
 * Created by lanzheng on 2018/5/6.
 */


"use strict";

var NoteList = function(text) {
    var list = [];
    if (text) {
        var objList = JSON.parse(text);
        objList.forEach(function (index, el) {
            list.push(el);
        });
    }
    this.list = list;
}

NoteList.prototype = {
    toString: function () {
        // return array string
        return JSON.stringify(this.list);
    }
};

var NoteBook = function () {
    LocalContractStorage.defineMapProperty(this, "repo", {
        parse: function (text) {
            return new NoteList(text).list;
        },
        stringify: function (o) {
            return o.toString();
        }
    });
};

NoteBook.prototype = {
    init: function () {
        // todo
    },

    save: function (title, content, date, author) {

        title = title.trim();
        content = content.trim();
        date = date.trim();
        author = author.trim();

        if (title.length > 64 || content.length > 1024){
            throw new Error("title / content exceed limit length");
        }

        var from = Blockchain.transaction.from;
        var list = this.repo.get(from);

        if (!list) {
            list = [];
        }

        list.push({
            title: title,
            content: content,
            date: date,
            author: author
        });

        this.repo.put(from, list);
    },

    get: function () {
        var from = Blockchain.transaction.from;
        return this.repo.get(from);
    }
};
module.exports = NoteBook;
