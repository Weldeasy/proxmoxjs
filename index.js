const request = require('request');

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

module.exports = function (username, password, hostname) {

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
            config: {
                get: function (cb) {
                    get('/cluster/config', {}, cb);
                },
                post: function (data, cb) {
                    post('/cluster/config', data, cb);
                },
                nodes: {
                    get: function (cb) {
                        get('/cluster/nodes', {}, cb);
                    },
                    post: function (id, data, cb) {
                        post('/cluster/config/nodes/' + id, data, cb);
                    },
                    delete: function (id, cb) {
                        deleteRequest('/cluster/config/nodes/' + id, {}, cb);
                    },
                },
                join: {
                    get: function (cb) {
                        get('/cluster/config/join', {}, cb);
                    },
                    post: function (data, cb) {
                        post('/cluster/config/join', data, cb);
                    }
                },
                qdevice: {
                    get: function (cb) {
                        get('/cluster/config/qdevice', {}, cb);
                    }
                },
                totem: {
                    get: function (cb) {
                        get('/cluster/config/totem', {}, cb);
                    }
                }
            },

            firewall: {
                get: function (cb) {
                    get('/cluster/firewall', {}, cb);
                },
                aliases: {
                    get: function (param1, param2) {
                        var cb = param1;
                        var id = '';
                        if (param2 && typeof param2 == 'function') {
                            cb = param2;
                            id = '/' + param1;
                        }

                        get('/cluster/firewall/aliases' + id, {}, cb);
                    },
                    post: function (data, cb) {
                        post('/cluster/firewall/aliases', data, cb);
                    },
                    put: function (id, data, cb) {
                        put('/cluster/firewall/aliases/' + id, data, cb);
                    },
                    delete: function (id, cb) {
                        deleteRequest('/cluster/firewall/aliases/' + id, {}, cb);
                    }
                },
                groups: {
                    get: function (param1, param2, param3) {
                        var cb = param1;
                        var id = '';
                        if (param2 && typeof param2 == 'function') {
                            cb = param2;
                            id = '/' + param1;
                        }

                        if (param3 && typeof param3 == 'function') {
                            cb = param3;
                            id = '/' + param1 + '/' + param2;
                        }

                        get('/cluster/firewall/groups' + id, {}, cb);
                    },
                    post: function (param1, param2, param3) {
                        var cb = param2;
                        var data = param1;
                        var id = '';
                        if (param3 && typeof param3 == 'function') {
                            cb = param3;
                            data = param2;
                            id = '/' + param1;
                        }

                        post('/cluster/firewall/groups' + id, data, cb);
                    },
                    delete: function (param1, param2, param3) {
                        var cb = param2;
                        var id = '/' + param1;
                        if (param3 && typeof param3 == 'function') {
                            cb = param3;
                            id = '/' + param1 + '/' + param2;
                        }
                        deleteRequest('/cluster/firewall/groups' + id, {}, cb);
                    },
                    put: function (group, pos, data, cb) {
                        put('/cluster/firewall/groups/' + group + '/' + pos, data, cb);
                    },
                },
                ipset: {
                    get: function (param1, param2, param3) {
                        var cb = param1;
                        var id = '';
                        if (param2 && typeof param2 == 'function') {
                            cb = param2;
                            id = '/' + param1;
                        }

                        if (param3 && typeof param3 == 'function') {
                            cb = param3;
                            id = '/' + param1 + '/' + param2;
                        }

                        get('/cluster/firewall/ipset' + id, {}, cb);
                    },
                    post: function (param1, param2, param3) {
                        var cb = param2;
                        var data = param1;
                        var id = '';
                        if (param3 && typeof param3 == 'function') {
                            cb = param3;
                            data = param2;
                            id = '/' + param1;
                        }

                        post('/cluster/firewall/ipset' + id, data, cb);
                    },
                    delete: function (param1, param2, param3) {
                        var cb = param2;
                        var id = '/' + param1;
                        if (param3 && typeof param3 == 'function') {
                            cb = param3;
                            id = '/' + param1 + '/' + param2;
                        }
                        deleteRequest('/cluster/firewall/ipset' + id, {}, cb);
                    },
                    put: function (group, pos, data, cb) {
                        put('/cluster/firewall/ipset/' + group + '/' + pos, data, cb);
                    },
                },
                rules: {
                    get: function (param1, param2) {
                        var cb = param1;
                        var id = '';
                        if (param2 && typeof param2 == 'function') {
                            cb = param2;
                            id = '/' + param1;
                        }

                        get('/cluster/firewall/rules' + id, {}, cb);
                    },
                    post: function (data, cb) {
                        post('/cluster/firewall/rules', data, cb);
                    },
                    put: function (id, data, cb) {
                        put('/cluster/firewall/rules/' + id, data, cb);
                    },
                    delete: function (id, cb) {
                        deleteRequest('/cluster/firewall/rules/' + id, {}, cb);
                    }
                },
                macros: {
                    get: function (cb) {
                        get('/cluster/firewall/macros', {}, cb);
                    }
                },
                options: {
                    get: function (cb) {
                        get('/cluster/firewall/options', {}, cb);
                    },
                    put: function (data, cb) {
                        put('/cluster/firewall/options', data, cb);
                    },
                },
                refs: {
                    get: function (param1, param2) {
                        var data = {};
                        var cb = param1;

                        if (param2 && typeof param2 == 'function') {
                            cb = param2;
                            data = param1;
                        }
                        get('/cluster/firewall/refs', data, cb);
                    }
                },
            },
            ha: {
                get: function (cb) {
                    get('/cluster/ha', {}, cb);
                },
                groups: {
                    get: function (param1, param2) {
                        var cb = param1;
                        var id = '';
                        if (param2 && typeof param2 == 'function') {
                            cb = param2;
                            id = '/' + param1;
                        }

                        get('/cluster/ha/groups' + id, {}, cb);
                    },
                    post: function (data, cb) {
                        post('/cluster/ha/groups', data, cb);
                    },
                    put: function (id, data, cb) {
                        put('/cluster/ha/groups/' + id, data, cb);
                    },
                    delete: function (id, cb) {
                        deleteRequest('/cluster/ha/groups/' + id, {}, cb);
                    }
                },
                resources: {
                    get: function (param1, param2) {
                        var cb = param1;
                        var id = '';
                        if (param2 && typeof param2 == 'function') {
                            cb = param2;
                            id = '/' + param1;
                        }

                        get('/cluster/ha/resources' + id, {}, cb);
                    },
                    post: function (data, cb) {
                        post('/cluster/ha/resources', data, cb);
                    },
                    put: function (id, data, cb) {
                        put('/cluster/ha/resources/' + id, data, cb);
                    },
                    delete: function (id, cb) {
                        deleteRequest('/cluster/ha/resources/' + id, {}, cb);
                    },
                    migrate: {
                        post: function (id, data, cb) {
                            post('/cluster/ha/resources/' + id + '/migrate', data, cb);
                        }
                    },
                    relocate: {
                        post: function (id, data, cb) {
                            post('/cluster/ha/resources/' + id + '/relocate', data, cb);
                        }
                    }
                },
                status: {
                    get: function (cb) {
                        get('/cluster/ha/status', {}, cb);
                    },
                    current: {
                        get: function (cb) {
                            get('/cluster/ha/status/current', {}, cb);
                        },
                    },
                    manager_status: {
                        get: function (cb) {
                            get('/cluster/ha/status/manager_status', {}, cb);
                        },
                    }
                }
            },
            replication: {
                get: function (param1, param2) {
                    var cb = param1;
                    var id = '';
                    if (param2 && typeof param2 == 'function') {
                        cb = param2;
                        id = '/' + param1;
                    }

                    get('/cluster/replication' + id, {}, cb);
                },
                post: function (data, cb) {
                    post('/cluster/replication', data, cb);
                },
                put: function (id, data, cb) {
                    put('/cluster/replication/' + id, data, cb);
                },
                delete: function (id, cb) {
                    deleteRequest('/cluster/replication/' + id, {}, cb);
                },
            },
            log: {
                get: function (data, cb) {
                    get('/cluster/log', data, cb);
                },
            },
            nextid: {
                get: function (data, cb) {
                    get('/cluster/nextid', data, cb);
                },
            },
            options: {
                get: function (cb) {
                    get('/cluster/options', {}, cb);
                },
                put: function (data, cb) {
                    put('/cluster/options', data, cb);
                }
            },
            resources: {
                get: function (data, cb) {
                    get('/cluster/resources', data, cb);
                },
            },
            status: {
                get: function (cb) {
                    get('/cluster/status', {}, cb);
                },
            },
            tasks: {
                get: function (cb) {
                    get('/cluster/tasks', {}, cb);
                },
            },
        },
        nodes: {
            get: function (param1, param2) {
                var cb = param1;
                var id = '';
                if (param2 && typeof param2 == 'function') {
                    cb = param2;
                    id = '/' + param1;
                }
                get('/nodes' + id, {}, cb);
            },
            apt: {
                get: function (id, cb) {
                    get('/nodes/' + id + '/apt', {}, cb);
                },
                changelog: {
                    get: function (param1, param2, param3) {
                        var id = param1;
                        var cb = param2;
                        var data = {};
                        if (param3 && typeof param3 == 'function') {
                            cb = param3;
                            data = param2;
                        }

                        get('/nodes/' + id + '/apt/changelog', data, cb);
                    }
                },
                update: {
                    get: function (id, cb) {
                        get('/nodes/' + id + '/apt/update', {}, cb);
                    },
                    post: function (id, data, cb) {
                        post('/nodes/' + id + '/apt/update', data, cb);
                    }
                },
                versions: {
                    get: function (id, cb) {
                        get('/nodes/' + id + '/apt/versions', {}, cb);
                    }
                }
            },
            ceph: {
                get: function (id, cb) {
                    get('/nodes/' + id + '/ceph', {}, cb);
                },
                flags: {
                    get: function (id, cb) {
                        get('/nodes/' + id + '/ceph/flags', {}, cb);
                    },
                    post: function (id, flag, data, cb) {
                        post('/nodes/' + id + '/ceph/flags/' + flag, data, cb);
                    },
                    delete: function (id, flag, cb) {
                        deleteRequest('/nodes/' + id + '/ceph/flags/' + flag, {}, cb);
                    }
                },
                fs: {
                    get: function (id, cb) {
                        get('/nodes/' + id + '/ceph/fs', {}, cb);
                    },
                    post: function (id, fs, data, cb) {
                        post('/nodes/' + id + '/ceph/fs/' + fs, data, cb);
                    }
                },
                mds: {
                    get: function (id, cb) {
                        get('/nodes/' + id + '/ceph/mds', {}, cb);
                    },
                    post: function (id, mds, data, cb) {
                        post('/nodes/' + id + '/ceph/mds/' + mds, data, cb);
                    },
                    delete: function (id, mds, cb) {
                        deleteRequest('/nodes/' + id + '/ceph/mds/' + mds, {}, cb);
                    }
                },
                mgr: {
                    get: function (id, cb) {
                        get('/nodes/' + id + '/ceph/mgr', {}, cb);
                    },
                    post: function (id, mgr, data, cb) {
                        post('/nodes/' + id + '/ceph/mgr/' + mgr, data, cb);
                    },
                    delete: function (id, mgr, cb) {
                        deleteRequest('/nodes/' + id + '/ceph/mgr/' + mgr, {}, cb);
                    }
                },
                mon: {
                    get: function (id, cb) {
                        get('/nodes/' + id + '/ceph/mon', {}, cb);
                    },
                    post: function (id, mon, data, cb) {
                        post('/nodes/' + id + '/ceph/mon/' + mon, data, cb);
                    },
                    delete: function (id, mon, cb) {
                        deleteRequest('/nodes/' + id + '/ceph/mon/' + mon, {}, cb);
                    }
                },
                osd: {
                    get: function (id, cb) {
                        get('/nodes/' + id + '/ceph/osd', {}, cb);
                    },
                    post: function (id, data, cb) {
                        post('/nodes/' + id + '/ceph/osd', data, cb);
                    },
                    delete: function (id, osd, cb) {
                        deleteRequest('/nodes/' + id + '/ceph/osd/' + osd, {}, cb);
                    },
                    in: {
                        post: function (id, osdid, data, cb) {
                            post('/nodes/' + id + '/ceph/osd/' + osdid + '/in', data, cb);
                        }
                    },
                    out: {
                        post: function (id, osdid, data, cb) {
                            post('/nodes/' + id + '/ceph/osd/' + osdid + '/out', data, cb);
                        }
                    },
                    scrub: {
                        post: function (id, osdid, data, cb) {
                            post('/nodes/' + id + '/ceph/osd/' + osdid + '/scrub', data, cb);
                        }
                    }
                },
                pools: {
                    get: function (id, cb) {
                        get('/nodes/' + id + '/ceph/pools', {}, cb);
                    },
                    post: function (id, data, cb) {
                        post('/nodes/' + id + '/ceph/pools', data, cb);
                    },
                    delete: function (id, name, cb) {
                        deleteRequest('/nodes/' + id + '/ceph/pools/' + name, {}, cb);
                    }
                },
                config: {
                    get: function (id, cb) {
                        get('/nodes/' + id + '/ceph/config', {}, cb);
                    }
                },
                configdb: {
                    get: function (id, cb) {
                        get('/nodes/' + id + '/ceph/configdb', {}, cb);
                    }
                },
                crush: {
                    get: function (id, cb) {
                        get('/nodes/' + id + '/ceph/crush', {}, cb);
                    }
                },
                disks: {
                    get: function (id, cb) {
                        get('/nodes/' + id + '/ceph/disks', {}, cb);
                    }
                },
                init: {
                    post: function (id, data, cb) {
                        post('/nodes/' + id + '/ceph/init', data, cb);
                    },
                },
                log: {
                    get: function (id, cb) {
                        get('/nodes/' + id + '/ceph/log', {}, cb);
                    }
                },
                restart: {
                    post: function (id, data, cb) {
                        post('/nodes/' + id + '/ceph/restart', data, cb);
                    },
                },
                rules: {
                    get: function (id, cb) {
                        get('/nodes/' + id + '/ceph/rules', {}, cb);
                    }
                },
                start: {
                    post: function (id, data, cb) {
                        post('/nodes/' + id + '/ceph/start', data, cb);
                    },
                },
                status: {
                    get: function (id, cb) {
                        get('/nodes/' + id + '/ceph/status', {}, cb);
                    }
                },
                stop: {
                    post: function (id, data, cb) {
                        post('/nodes/' + id + '/ceph/stop', data, cb);
                    },
                },
            },
            certificates: {
                get: function (id, cb) {
                    get('/nodes/' + id + '/certificates', {}, cb);
                },
                acme: {
                    get: function (id, cb) {
                        get('/nodes/' + id + '/certificates/acme', {}, cb);
                    },
                    certificate: {
                        post: function (id, data, cb) {
                            post('/nodes/' + id + '/certificates/acme/certificate', data, cb);
                        },
                        put: function (id, data, cb) {
                            put('/nodes/' + id + '/certificates/acme/certificate', data, cb);
                        },
                        delete: function (id, cb) {
                            deleteRequest('/nodes/' + id + '/certificates/acme/certificate', {}, cb);
                        }
                    }
                },
                custom: {
                    post: function (id, data, cb) {
                        post('/nodes/' + id + '/certificates/custom', data, cb);
                    },
                    delete: function (id, cb) {
                        deleteRequest('/nodes/' + id + '/certificates/custom', {}, cb);
                    }
                },
                info: {
                    get: function (id, cb) {
                        get('/nodes/' + id + '/certificates/info', {}, cb);
                    },
                }
            },
            disks: {
                get: function (id, cb) {
                    get('/nodes/' + id + '/disks', {}, cb);
                },
                zfs: {
                    get: function (param1, param2, param3) {
                        var id = param1;
                        var cb = param2;
                        var name = '';
                        if (param3 && typeof param3 == 'function') {
                            cb = param3;
                            name = '/' + param2;
                        }
                        get('/nodes/' + id + '/disks/zfs' + name, {}, cb);
                    },
                    post: function (id, data, cb) {
                        post('/nodes/' + id + '/disks/zfs', data, cb);
                    }
                },
                directory: {
                    get: function (id, cb) {
                        get('/nodes/' + id + '/disks/directory', {}, cb);
                    },
                    post: function (id, data, cb) {
                        post('/nodes/' + id + '/disks/directory', data, cb);
                    }
                },
                initgpt: {
                    post: function (id, data, cb) {
                        post('/nodes/' + id + '/disks/initgpt', data, cb);
                    }
                },
                list: {
                    get: function (id, data, cb) {
                        get('/nodes/' + id + '/disks/list', data, cb);
                    }
                },
                lvm: {
                    get: function (id, cb) {
                        get('/nodes/' + id + '/disks/lvm', {}, cb);
                    },
                    post: function (id, data, cb) {
                        post('/nodes/' + id + '/disks/lvm', data, cb);
                    }
                },
                lvmthin: {
                    get: function (id, cb) {
                        get('/nodes/' + id + '/disks/lvmthin', {}, cb);
                    },
                    post: function (id, data, cb) {
                        post('/nodes/' + id + '/disks/lvmthin', data, cb);
                    }
                },
                smart: {
                    get: function (id, data, cb) {
                        get('/nodes/' + id + '/disks/smart', data, cb);
                    }
                },
            }


        }
    };
}