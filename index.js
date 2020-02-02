const request = require('request');

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

exports.proxmoxjs = function (username, password, hostname) {

    var apiURLRoot = 'https://' + hostname + ':8006/';
    var apiURL = apiURLRoot + 'api2/json';
    var authForm = {
        'username': username,
        'password': password
    };
    var token = {
        CSRF: '',
        PVEAuth: '',
        timeStamp: 0
    };

    function pxreq() {
        this.post = function (url, data, header, cookie, cb) {
            url = apiURL + url;
            request.post({ url: url, form: data }, cb);
        }

        return this;
    }

    function authorize(path, data, callback, cb) {
        pxreq().post('/access/ticket', authForm, null, null, function (err, code, response) {
            if (err) throw err
            else {
                response = JSON.parse(response);
                token.CSRF = response.data.CSRFPreventionToken;
                token.PVEAuth = response.data.ticket;
                token.timeStamp = new Date().getTime();
                if (typeof cb === 'function') cb(path, data, callback);
            }
        });
    };



    function get(path, data, callback) {
        if ((token.timeStamp + 7200) < new Date().getTime()) {
            authorize(path, data, callback, get);
        } else {
            request({
                url: apiURL + path,
                method: "GET",
                headers: {
                    'Cookie': request.cookie('PVEAuthCookie=' + token.PVEAuth)
                },
                qs: data,
                callback
            });
        }
    };

    function post(path, data, callback) {
        if ((token.timeStamp + 7200) < new Date().getTime()) {
            authorize(path, data, callback, post);
        } else {
            request({
                url: apiURL + path,
                method: "POST",
                headers: {
                    'Cookie': request.cookie('PVEAuthCookie=' + token.PVEAuth),
                    'CSRFPreventionToken': token.CSRF,
                },
                form: data,
                callback
            });
        }
    };

    function put(path, data, callback) {
        if ((token.timeStamp + 7200) < new Date().getTime()) {
            authorize(path, data, callback, put);
        } else {
            request({
                url: apiURL + path,
                method: "PUT",
                headers: {
                    'Cookie': request.cookie('PVEAuthCookie=' + token.PVEAuth),
                    'CSRFPreventionToken': token.CSRF,
                },
                form: data,
                callback
            });
        }
    };

    function deleteRequest(path, data, callback) {
        if ((token.timeStamp + 7200) < new Date().getTime()) {
            authorize(path, data, callback, deleteRequest);
        } else {
            request({
                url: apiURL + path,
                method: "DELETE",
                headers: {
                    'Cookie': request.cookie('PVEAuthCookie=' + token.PVEAuth),
                    'CSRFPreventionToken': token.CSRF,
                },
                callback
            });
        }
    };

    return {
        access: {
            get: function (cb) {
                get('/access', {}, cb);
            },
            domains: {
                get: function (param1, param2) {
                    var cb = param1;
                    var id = '';
                    if (param2 && typeof param2 == 'function') {
                        cb = param2;
                        id = '/' + param1;
                    }

                    get('/access/domains' + id, {}, cb);
                },
                post: function (data, cb) {
                    post('/access/domains', data, cb);
                },
                put: function (id, data, cb) {
                    put('/access/domains/' + id, data, cb);
                },
                delete: function (id, cb) {
                    deleteRequest('/access/domains/' + id, {}, cb);
                }
            },
            groups: {
                get: function (param1, param2) {
                    var cb = param1;
                    var id = '';
                    if (param2 && typeof param2 == 'function') {
                        cb = param2;
                        id = '/' + param1;
                    }

                    get('/access/groups' + id, {}, cb);
                },
                post: function (data, cb) {
                    post('/access/groups', data, cb);
                },
                put: function (id, data, cb) {
                    put('/access/groups/' + id, data, cb);
                },
                delete: function (id, cb) {
                    deleteRequest('/access/groups/' + id, {}, cb);
                }
            },
            roles: {
                get: function (param1, param2) {
                    var cb = param1;
                    var id = '';
                    if (param2 && typeof param2 == 'function') {
                        cb = param2;
                        id = '/' + param1;
                    }

                    get('/access/roles' + id, {}, cb);
                },
                post: function (data, cb) {
                    post('/access/roles', data, cb);
                },
                put: function (id, data, cb) {
                    put('/access/roles/' + id, data, cb);
                },
                delete: function (id, cb) {
                    deleteRequest('/access/roles/' + id, {}, cb);
                }
            },
            users: {
                get: function (param1, param2) {
                    var cb = param1;
                    var id = '';
                    if (param2 && typeof param2 == 'function') {
                        cb = param2;
                        id = '/' + param1;
                    }

                    get('/access/users' + id, {}, cb);
                },
                post: function (data, cb) {
                    post('/access/users', data, cb);
                },
                put: function (id, data, cb) {
                    put('/access/users/' + id, data, cb);
                },
                delete: function (id, cb) {
                    deleteRequest('/access/users/' + id, {}, cb);
                },
                tfa: function (id, cb) {
                    get('/access/users/' + id + '/tfa', {}, cb);
                }

            },
            acl: {
                get: function (param1, param2) {
                    var cb = param1;
                    var id = '';
                    if (param2 && typeof param2 == 'function') {
                        cb = param2;
                        id = '/' + param1;
                    }

                    get('/access/acl' + id, {}, cb);
                },
                put: function (data, cb) {
                    put('/access/acl', data, cb);
                }
            },
            password: {
                put: function (data, cb) {
                    put('/access/password', data, cb);
                }
            },
            tfa: {
                post: function (data, cb) {
                    post('/access/tfa', data, cb);
                },
                put: function (data, cb) {
                    put('/access/tfa', data, cb);
                }
            }
        },
        cluster: {
            get: function (cb) {
                get('/cluster', {}, cb);
            },
            acme: {
                get: function (cb) {
                    get('/cluster/acme', {}, cb);
                },
                account: {
                    get: function (param1, param2) {
                        var cb = param1;
                        var id = '';
                        if (param2 && typeof param2 == 'function') {
                            cb = param2;
                            id = '/' + param1;
                        }

                        get('/cluster/acme/account' + id, {}, cb);
                    },
                    post: function (data, cb) {
                        post('/cluster/acme/account', data, cb);
                    },
                    put: function (id, data, cb) {
                        put('/cluster/acme/account' + id, data, cb);
                    },
                    delete: function (id, cb) {
                        deleteRequest('/cluster/acme/account' + id, {}, cb);
                    }
                },
                directories: {
                    get: function (cb) {
                        get('/cluster/acme/directories', {}, cb);
                    }
                },
                tos: {
                    get: function (param1, param2) {
                        var cb = param1;
                        var data = {};
                        if (param2 && typeof param2 == 'function') {
                            cb = param2;
                            data = param1;
                        }

                        get('/cluster/acme/tos', data, cb);
                    },
                }
            },
            backup: {
                get: function (param1, param2) {
                    var cb = param1;
                    var id = '';
                    if (param2 && typeof param2 == 'function') {
                        cb = param2;
                        id = '/' + param1;
                    }

                    get('/cluster/backup' + id, {}, cb);
                },
                post: function (data, cb) {
                    post('/cluster/backup', data, cb);
                },
                put: function (id, data, cb) {
                    put('/cluster/backup/' + id, data, cb);
                },
                delete: function (id, cb) {
                    deleteRequest('/cluster/backup/' + id, {}, cb);
                }
            },
            ceph: {
                get: function (cb) {
                    get('/cluster/ceph', {}, cb);
                },
                flags: {
                    get: function (param1, param2) {
                        var cb = param1;
                        var id = '';
                        if (param2 && typeof param2 == 'function') {
                            cb = param2;
                            id = '/' + param1;
                        }

                        get('/cluster/ceph/flags' + id, {}, cb);
                    },
                    put: function (param1, param2, param3) {
                        var cb = param2;
                        var data = param1;
                        var id = '';
                        if (param3 && typeof param3 == 'function') {
                            cb = param3;
                            data = param2;
                            id = '/' + param1;
                        }

                        put('/cluster/ceph/flags' + id, data, cb);
                    }
                },
                metadata: {
                    get: function (cb) {
                        get('/cluster/ceph/metadata', {}, cb);
                    }
                },
                status: {
                    get: function (cb) {
                        get('/cluster/ceph/metadata', {}, cb);
                    }
                }
            },

            status: {
                get: function (cb) {
                    get('/cluster/status', {}, cb);
                },
            },
        },
    };
}