# ProxmoxJS

ProxmoxJS is a Proxmox API client for node.js:

[API Viewer](https://pve.proxmox.com/pve-docs/api-viewer/) | [API Docs](https://pve.proxmox.com/wiki/Proxmox_VE_API)

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
proxmox.access.get((err, response, body) => {/* ... */}) # /access [GET]

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

```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
