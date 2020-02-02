# ProxmoxJS

ProxmoxJS is a Proxmox API client for node.js:

[API Viewer](https://pve.proxmox.com/pve-docs/api-viewer/) | [API Docs](https://pve.proxmox.com/wiki/Proxmox_VE_API)

Based on: [this](https://github.com/ttarvis/node-proxmox)

## Installation

Use the package manager [npm](https://www.npmjs.com/get-npm) to install proxmoxjs.

```bash
npm install proxmoxjs
#or
npm install proxmoxjs --save
```

## Usage

```js
//controller (for example)
const proxmoxjs = require('proxmoxjs')('user@pam', 'SuperPassword', 'my.proxmox.com');

exports.method = function (req, res) {
    //Get users
    proxmox.access.users.get(function (err, response, body) {
        if (err) throw err;
        else {
            data = JSON.parse(body);
            console.log(data);


            //res.method...
        }
    });
}

```
or
```js
//controller (for example)
const proxmoxjs = require('proxmoxjs');

exports.method = function (req, res) {
    var proxmox_a = proxmox('usera@pam', 'SuperPassworda', 'my.proxmoxa.com');
    var proxmox_b = proxmox('userb@pam', 'SuperPasswordb', 'my.proxmoxb.com');

    //Whatever
}

```

## Methods
```js
/* access */
proxmox.access.get((err, response, body) => {/* ... */}) // /access [GET]

/* access/domains */
proxmox.access.domains.get((e, r, b) => {/* ... */}) // /access/domains [GET]
proxmox.access.domains.post({key:'value'}, (e, r, b) => {/* ... */}) // /access/domains [POST]
proxmox.access.domains.get('realm', (e, r, b) => {/* ... */}) // /access/domains/{realm} [GET]
proxmox.access.domains.put('realm', {key:'value'}, (e, r, b) => {/* ... */}) // /access/domains/{realm} [PUT]
proxmox.access.domains.delete('realm', (e, r, b) => {/* ... */}) // /access/domains/{realm} [DELETE]

/* access/groups */
proxmox.access.groups.get((e, r, b) => {/* ... */}) // /access/groups [GET]
proxmox.access.groups.post({key:'value'}, (e, r, b) => {/* ... */}) // /access/groups [POST]
proxmox.access.groups.get('groupid', (e, r, b) => {/* ... */}) // /access/groups/{groupid} [GET]
proxmox.access.groups.put('groupid', {key:'value'}, (e, r, b) => {/* ... */}) // /access/groups/{groupid} [PUT]
proxmox.access.groups.delete('groupid', (e, r, b) => {/* ... */}) // /access/groups/{groupid} [DELETE]

/* access/roles */
proxmox.access.roles.get((e, r, b) => {/* ... */}) // /access/roles [GET]
proxmox.access.roles.post({key:'value'}, (e, r, b) => {/* ... */}) // /access/groups [POST]
proxmox.access.roles.get('roleid', (e, r, b) => {/* ... */}) // /access/roles/{roleid} [GET]
proxmox.access.roles.put('roleid', {key:'value'}, (e, r, b) => {/* ... */}) // /access/roles/{roleid} [PUT]
proxmox.access.roles.delete('roleid', (e, r, b) => {/* ... */}) // /access/roles/{roleid} [DELETE]

/* access/users */
proxmox.access.users.get((e, r, b) => {/* ... */}) // /access/roles [GET]
proxmox.access.users.post({key:'value'}, (e, r, b) => {/* ... */}) // /access/users [POST]
proxmox.access.users.get('userid', (e, r, b) => {/* ... */}) // /access/users/{userid} [GET]
proxmox.access.users.put('userid', {key:'value'}, (e, r, b) => {/* ... */}) // /access/users/{userid} [PUT]
proxmox.access.users.delete('userid', (e, r, b) => {/* ... */}) // /access/users/{userid} [DELETE]
proxmox.access.users.tfa('userid', (e, r, b) => {/* ... */}) // /access/users/{userid}/tfa [GET]

/* access/acl */
proxmox.access.acl.get((e, r, b) => {/* ... */}) // /access/acl [GET]
proxmox.access.acl.put({key:'value'}, (e, r, b) => {/* ... */}) // /access/acl [PUT]

/* access/password */
proxmox.access.password.put({key:'value'}, (e, r, b) => {/* ... */}) // /access/password [PUT]

/* access/tfa */
proxmox.access.tfa.post({key:'value'}, (e, r, b) => {/* ... */}) // /access/tfa [POST]
proxmox.access.tfa.put({key:'value'}, (e, r, b) => {/* ... */}) // /access/tfa [PUT]


/* cluster */
proxmox.cluster.get((err, response, body) => {/* ... */}) // /cluster [GET]

/* cluster/acme */
proxmox.cluster.acme.get((err, response, body) => {/* ... */}) // /cluster/acme [GET]
proxmox.cluster.acme.account.get((err, response, body) => {/* ... */}) // /cluster/acme/account [GET]
proxmox.cluster.acme.account.post({key:'value'}, (e, r, b) => {/* ... */}) // /cluster/acme/account [POST]
proxmox.cluster.acme.account.get('name', (e, r, b) => {/* ... */}) // /cluster/acme/account/{name} [GET]
proxmox.cluster.acme.account.put('name', {key:'value'}, (e, r, b) => {/* ... */}) // /cluster/acme/account/{name} [PUT]
proxmox.cluster.acme.account.delete('name', (e, r, b) => {/* ... */}) // /cluster/acme/account/{name} [DELETE]
proxmox.cluster.acme.directories.get((err, response, body) => {/* ... */}) // /cluster/acme/directories [GET]
proxmox.cluster.acme.tos.get((err, response, body) => {/* ... */}) // /cluster/acme/tos [GET]
proxmox.cluster.acme.tos.get({key: 'value'}, (err, response, body) => {/* ... */}) // /cluster/acme/tos?key=value [GET]

/* cluster/backup */
proxmox.cluster.backup.get((err, response, body) => {/* ... */}) // /cluster/backup [GET]
proxmox.cluster.backup.post({key:'value'}, (e, r, b) => {/* ... */}) // /cluster/backup [POST]
proxmox.cluster.backup.get('id', (e, r, b) => {/* ... */}) // /cluster/backup/{id} [GET]
proxmox.cluster.backup.put('id', {key:'value'}, (e, r, b) => {/* ... */}) // /cluster/backup/{id} [PUT]
proxmox.cluster.backup.delete('id', (e, r, b) => {/* ... */}) // /cluster/backup/{id} [DELETE]

/* cluster/ceph */
proxmox.cluster.ceph.get((err, response, body) => {/* ... */}) // /cluster/ceph [GET]
proxmox.cluster.ceph.flags.get((err, response, body) => {/* ... */}) // /cluster/ceph/flags [GET]
proxmox.cluster.ceph.flags.put({key:'value'}, (e, r, b) => {/* ... */}) // /cluster/ceph/flags [PUT]
proxmox.cluster.backup.get('flag', (e, r, b) => {/* ... */}) // /cluster/ceph/flags/{flag} [GET]
proxmox.cluster.ceph.flags.put('flag', {key:'value'}, (e, r, b) => {/* ... */}) // /cluster/ceph/flags/{flag} [PUT]
proxmox.cluster.ceph.metadata.get((err, response, body) => {/* ... */}) // /cluster/ceph/metadata [GET]
proxmox.cluster.ceph.status.get((err, response, body) => {/* ... */}) // /cluster/ceph/status [GET]

/* cluster/status */
proxmox.cluster.status.get((err, response, body) => {/* ... */}) // /cluster/status [GET]

```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
