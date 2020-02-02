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
proxmox.cluster.get((e, r, b) => {/* ... */}) // /cluster [GET]

/* cluster/acme */
proxmox.cluster.acme.get((e, r, b) => {/* ... */}) // /cluster/acme [GET]
proxmox.cluster.acme.account.get((e, r, b) => {/* ... */}) // /cluster/acme/account [GET]
proxmox.cluster.acme.account.post({key:'value'}, (e, r, b) => {/* ... */}) // /cluster/acme/account [POST]
proxmox.cluster.acme.account.get('name', (e, r, b) => {/* ... */}) // /cluster/acme/account/{name} [GET]
proxmox.cluster.acme.account.put('name', {key:'value'}, (e, r, b) => {/* ... */}) // /cluster/acme/account/{name} [PUT]
proxmox.cluster.acme.account.delete('name', (e, r, b) => {/* ... */}) // /cluster/acme/account/{name} [DELETE]
proxmox.cluster.acme.directories.get((e, r, b) => {/* ... */}) // /cluster/acme/directories [GET]
proxmox.cluster.acme.tos.get((e, r, b) => {/* ... */}) // /cluster/acme/tos [GET]
proxmox.cluster.acme.tos.get({key: 'value'}, (e, r, b) => {/* ... */}) // /cluster/acme/tos?key=value [GET]

/* cluster/backup */
proxmox.cluster.backup.get((e, r, b) => {/* ... */}) // /cluster/backup [GET]
proxmox.cluster.backup.post({key:'value'}, (e, r, b) => {/* ... */}) // /cluster/backup [POST]
proxmox.cluster.backup.get('id', (e, r, b) => {/* ... */}) // /cluster/backup/{id} [GET]
proxmox.cluster.backup.put('id', {key:'value'}, (e, r, b) => {/* ... */}) // /cluster/backup/{id} [PUT]
proxmox.cluster.backup.delete('id', (e, r, b) => {/* ... */}) // /cluster/backup/{id} [DELETE]

/* cluster/ceph */
proxmox.cluster.ceph.get((e, r, b) => {/* ... */}) // /cluster/ceph [GET]
proxmox.cluster.ceph.flags.get((e, r, b) => {/* ... */}) // /cluster/ceph/flags [GET]
proxmox.cluster.ceph.flags.put({key:'value'}, (e, r, b) => {/* ... */}) // /cluster/ceph/flags [PUT]
proxmox.cluster.backup.get('flag', (e, r, b) => {/* ... */}) // /cluster/ceph/flags/{flag} [GET]
proxmox.cluster.ceph.flags.put('flag', {key:'value'}, (e, r, b) => {/* ... */}) // /cluster/ceph/flags/{flag} [PUT]
proxmox.cluster.ceph.metadata.get((e, r, b) => {/* ... */}) // /cluster/ceph/metadata [GET]
proxmox.cluster.ceph.status.get((e, r, b) => {/* ... */}) // /cluster/ceph/status [GET]

/* cluster/config */
proxmox.cluster.config.get((e, r, b) => {/* ... */}) // /cluster/config [GET]
proxmox.cluster.config.post({key:'value'}, (e, r, b) => {/* ... */}) // /cluster/config [POST]
proxmox.cluster.config.nodes.get((e, r, b) => {/* ... */}) // /cluster/config/nodes [GET]
proxmox.cluster.config.nodes.post('node', (e, r, b) => {/* ... */}) // /cluster/config/nodes/{node} [POST]
proxmox.cluster.config.nodes.delete('node', (e, r, b) => {/* ... */}) // /cluster/config/nodes/{node} [DELETE]
proxmox.cluster.config.join.get((e, r, b) => {/* ... */}) // /cluster/config/join [GET]
proxmox.cluster.config.join.post({key:'value'}, (e, r, b) => {/* ... */}) // /cluster/config/join [POST]
proxmox.cluster.config.qdevice.get((e, r, b) => {/* ... */}) // /cluster/config/qdevice [GET]
proxmox.cluster.config.totem.get((e, r, b) => {/* ... */}) // /cluster/config/totem [GET]

/* cluster/firewall */
proxmox.cluster.firewall.get((e, r, b) => {/* ... */}) // /cluster/firewall [GET]
proxmox.cluster.firewall.aliases.get((e, r, b) => {/* ... */}) // /cluster/firewall/aliases [GET]
proxmox.cluster.firewall.aliases.post({key:'value'}, (e, r, b) => {/* ... */}) // /cluster/firewall/aliases [POST]
proxmox.cluster.firewall.aliases.get('name', (e, r, b) => {/* ... */}) // /cluster/firewall/aliases/{name} [GET]
proxmox.cluster.firewall.aliases.put('name', {key:'value'}, (e, r, b) => {/* ... */}) // /cluster/firewall/aliases/{name} [PUT]
proxmox.cluster.firewall.aliases.delete('name', (e, r, b) => {/* ... */}) // /cluster/firewall/aliases/{name} [DELETE]
proxmox.cluster.firewall.groups.get((e, r, b) => {/* ... */}) // /cluster/firewall/groups [GET]
proxmox.cluster.firewall.groups.post({key:'value'}, (e, r, b) => {/* ... */}) // /cluster/firewall/groups [POST]
proxmox.cluster.firewall.groups.get('group', (e, r, b) => {/* ... */}) // /cluster/firewall/groups/{group} [GET]
proxmox.cluster.firewall.groups.post('group', {key:'value'}, (e, r, b) => {/* ... */}) // /cluster/firewall/groups/{group} [POST]
proxmox.cluster.firewall.groups.delete('group', (e, r, b) => {/* ... */}) // /cluster/firewall/groups/{group} [DELETE]
proxmox.cluster.firewall.groups.get('group', 'pos', (e, r, b) => {/* ... */}) // /cluster/firewall/groups/{group}/{pos} [GET]
proxmox.cluster.firewall.groups.put('group', 'pos', {key:'value'}, (e, r, b) => {/* ... */}) // /cluster/firewall/groups/{group}/{pos} [PUT]
proxmox.cluster.firewall.groups.delete('group', 'pos', (e, r, b) => {/* ... */}) // /cluster/firewall/groups/{group}/{pos} [DELETE]
proxmox.cluster.firewall.ipset.get((e, r, b) => {/* ... */}) // /cluster/firewall/ipset [GET]
proxmox.cluster.firewall.ipset.post({key:'value'}, (e, r, b) => {/* ... */}) // /cluster/firewall/ipset [POST]
proxmox.cluster.firewall.ipset.get('name', (e, r, b) => {/* ... */}) // /cluster/firewall/ipset/{name} [GET]
proxmox.cluster.firewall.ipset.post('name', {key:'value'}, (e, r, b) => {/* ... */}) // /cluster/firewall/ipset/{name} [POST]
proxmox.cluster.firewall.ipset.delete('name', (e, r, b) => {/* ... */}) // /cluster/firewall/ipset/{name} [DELETE]
proxmox.cluster.firewall.ipset.get('name', 'cidr', (e, r, b) => {/* ... */}) // /cluster/firewall/ipset/{name}/{cidr} [GET]
proxmox.cluster.firewall.ipset.put('name', 'cidr', {key:'value'}, (e, r, b) => {/* ... */}) // /cluster/firewall/ipset/{name}/{cidr} [PUT]
proxmox.cluster.firewall.ipset.delete('name', 'cidr', (e, r, b) => {/* ... */}) // /cluster/firewall/ipset/{name}/{cidr} [DELETE]
proxmox.cluster.firewall.rules.get((e, r, b) => {/* ... */}) // /cluster/firewall/rules [GET]
proxmox.cluster.firewall.rules.post({key:'value'}, (e, r, b) => {/* ... */}) // /cluster/firewall/rules [POST]
proxmox.cluster.firewall.rules.get('pos', (e, r, b) => {/* ... */}) // /cluster/firewall/rules/{pos} [GET]
proxmox.cluster.firewall.rules.put('pos', {key:'value'}, (e, r, b) => {/* ... */}) // /cluster/firewall/rules/{pos} [PUT]
proxmox.cluster.firewall.rules.delete('pos', (e, r, b) => {/* ... */}) // /cluster/firewall/rules/{pos} [DELETE]
proxmox.cluster.firewall.macros.get((e, r, b) => {/* ... */}) // /cluster/firewall/macros [GET]
proxmox.cluster.firewall.options.get((e, r, b) => {/* ... */}) // /cluster/firewall/options [GET]
proxmox.cluster.firewall.options.put({key:'value'}, (e, r, b) => {/* ... */}) // /cluster/firewall/options [PUT]
proxmox.cluster.firewall.refs.get((e, r, b) => {/* ... */}) // /cluster/firewall/refs [GET]
proxmox.cluster.firewall.refs.get({key:'value'}, (e, r, b) => {/* ... */}) // /cluster/firewall/refs [GET]

/* cluster/ha */
proxmox.cluster.ha.get((e, r, b) => {/* ... */}) // /cluster/ha [GET]
proxmox.cluster.ha.groups.get((e, r, b) => {/* ... */}) // /cluster/ha/groups [GET]
proxmox.cluster.ha.groups.post({key:'value'}, (e, r, b) => {/* ... */}) // /cluster/ha/groups [POST]
proxmox.cluster.ha.groups.get('group', (e, r, b) => {/* ... */}) // /cluster/ha/groups/{group} [GET]
proxmox.cluster.ha.groups.put('group', {key:'value'}, (e, r, b) => {/* ... */}) // /cluster/ha/groups/{group} [PUT]
proxmox.cluster.ha.groups.delete('group', (e, r, b) => {/* ... */}) // /cluster/ha/groups/{group} [DELETE]
proxmox.cluster.ha.resources.get((e, r, b) => {/* ... */}) // /cluster/ha/resources [GET]
proxmox.cluster.ha.resources.post({key:'value'}, (e, r, b) => {/* ... */}) // /cluster/ha/resources [POST]
proxmox.cluster.ha.resources.get('sid', (e, r, b) => {/* ... */}) // /cluster/ha/resources/{sid} [GET]
proxmox.cluster.ha.resources.put('sid', {key:'value'}, (e, r, b) => {/* ... */}) // /cluster/ha/resources/{sid} [PUT]
proxmox.cluster.ha.resources.delete('sid', (e, r, b) => {/* ... */}) // /cluster/ha/resources/{sid} [DELETE]
proxmox.cluster.ha.resources.migrate.post('sid', {key:'value'}, (e, r, b) => {/* ... */}) // /cluster/ha/resources/{sid}/migrate [POST]
proxmox.cluster.ha.resources.relocate.post('sid', {key:'value'}, (e, r, b) => {/* ... */}) // /cluster/ha/resources/{sid}/relocate [POST]
proxmox.cluster.ha.status.get((e, r, b) => {/* ... */}) // /cluster/ha/status [GET]
proxmox.cluster.ha.status.current.get((e, r, b) => {/* ... */}) // /cluster/ha/status/current [GET]
proxmox.cluster.ha.status.manager_status.get((e, r, b) => {/* ... */}) // /cluster/ha/status/manager_status [GET]
proxmox.cluster.ha.replication.get((e, r, b) => {/* ... */}) // /cluster/ha/replication [GET]
proxmox.cluster.ha.replication.post({key:'value'}, (e, r, b) => {/* ... */}) // /cluster/ha/replication [POST]
proxmox.cluster.ha.replication.get('id', (e, r, b) => {/* ... */}) // /cluster/ha/replication/{id} [GET]
proxmox.cluster.ha.replication.put('id', {key:'value'}, (e, r, b) => {/* ... */}) // /cluster/ha/replication/{id} [PUT]
proxmox.cluster.ha.replication.delete('id', (e, r, b) => {/* ... */}) // /cluster/ha/replication/{id} [DELETE]

/* cluster/log */
proxmox.cluster.log.get({key:'value'}, (e, r, b) => {/* ... */}) // /cluster/log [GET]

/* cluster/nextid */
proxmox.cluster.nextid.get({key:'value'}, (e, r, b) => {/* ... */}) // /cluster/nextid [GET]

/* cluster/options */
proxmox.cluster.options.get((e, r, b) => {/* ... */}) // /cluster/options [GET]
proxmox.cluster.options.put({key:'value'}, (e, r, b) => {/* ... */}) // /cluster/options [PUT]

/* cluster/resources */
proxmox.cluster.resources.get({key:'value'}, (e, r, b) => {/* ... */}) // /cluster/resources [GET]

/* cluster/status */
proxmox.cluster.status.get((e, r, b) => {/* ... */}) // /cluster/status [GET]

/* cluster/status */
proxmox.cluster.tasks.get((e, r, b) => {/* ... */}) // /cluster/tasks [GET]


/* nodes */
proxmox.nodes.get((e, r, b) => {/* ... */}) // /nodes [GET]
proxmox.nodes.get('node', (e, r, b) => {/* ... */}) // /nodes/{node} [GET]

/* nodes/{node}/apt */
proxmox.nodes.apt.get('node', (e, r, b) => {/* ... */}) // /nodes/{node}/apt [GET]
proxmox.nodes.apt.changelog.get('node', (e, r, b) => {/* ... */}) // /nodes/{node}/apt/changelog [GET]
proxmox.nodes.apt.changelog.get('node', {key:'value'}, (e, r, b) => {/* ... */}) // /nodes/{node}/apt/changelog?params [GET]
proxmox.nodes.apt.update.get('node', (e, r, b) => {/* ... */}) // /nodes/{node}/apt/update [GET]
proxmox.nodes.apt.update.post('node', {key:'value'}, (e, r, b) => {/* ... */}) // /nodes/{node}/apt/update [POST]
proxmox.nodes.apt.versions.get('node', (e, r, b) => {/* ... */}) // /nodes/{node}/apt/versions [GET]

/* nodes/{node}/ceph */
proxmox.nodes.ceph.get('node', (e, r, b) => {/* ... */}) // /nodes/{node}/ceph [GET]
proxmox.nodes.ceph.flags.get('node', (e, r, b) => {/* ... */}) // /nodes/{node}/ceph/flags [GET]
proxmox.nodes.ceph.flags.post('node', 'flag', {key:'value'}, (e, r, b) => {/* ... */}) // /nodes/{node}/ceph/flags/{flag} [POST]
proxmox.nodes.ceph.flags.delete('node', 'flag', (e, r, b) => {/* ... */}) // /nodes/{node}/ceph/flags/{flag} [DELETE]
proxmox.nodes.ceph.fs.get('node', (e, r, b) => {/* ... */}) // /nodes/{node}/ceph/fs [GET]
proxmox.nodes.ceph.fs.post('node', 'name', {key:'value'}, (e, r, b) => {/* ... */}) // /nodes/{node}/ceph/fs/{name} [POST]
proxmox.nodes.ceph.mds.get('node', (e, r, b) => {/* ... */}) // /nodes/{node}/ceph/mds [GET]
proxmox.nodes.ceph.mds.post('node', 'name', {key:'value'}, (e, r, b) => {/* ... */}) // /nodes/{node}/ceph/mds/{name} [POST]
proxmox.nodes.ceph.mds.delete('node', 'name', (e, r, b) => {/* ... */}) // /nodes/{node}/ceph/mds/{name} [DELETE]
proxmox.nodes.ceph.mgr.get('node', (e, r, b) => {/* ... */}) // /nodes/{node}/ceph/mgr [GET]
proxmox.nodes.ceph.mgr.post('node', 'id', {key:'value'}, (e, r, b) => {/* ... */}) // /nodes/{node}/ceph/mgr/{id} [POST]
proxmox.nodes.ceph.mgr.delete('node', 'id', (e, r, b) => {/* ... */}) // /nodes/{node}/ceph/mgr/{id} [DELETE]
proxmox.nodes.ceph.mon.get('node', (e, r, b) => {/* ... */}) // /nodes/{node}/ceph/mon [GET]
proxmox.nodes.ceph.mon.post('node', 'monid', {key:'value'}, (e, r, b) => {/* ... */}) // /nodes/{node}/ceph/mon/{monid} [POST]
proxmox.nodes.ceph.mon.delete('node', 'monid', (e, r, b) => {/* ... */}) // /nodes/{node}/ceph/mon/{monid} [DELETE]
proxmox.nodes.ceph.osd.get('node', (e, r, b) => {/* ... */}) // /nodes/{node}/ceph/osd [GET]
proxmox.nodes.ceph.osd.post('node', {key:'value'}, (e, r, b) => {/* ... */}) // /nodes/{node}/ceph/osd [POST]
proxmox.nodes.ceph.osd.delete('node', 'osdid', (e, r, b) => {/* ... */}) // /nodes/{node}/ceph/osd/{osdid} [DELETE]
proxmox.nodes.ceph.osd.in.post('node', 'osdid', {key:'value'}, (e, r, b) => {/* ... */}) // /nodes/{node}/ceph/osd/{osdid}/in [POST]
proxmox.nodes.ceph.osd.out.post('node', 'osdid', {key:'value'}, (e, r, b) => {/* ... */}) // /nodes/{node}/ceph/osd/{osdid}/out [POST]
proxmox.nodes.ceph.osd.scrub.post('node', 'osdid', {key:'value'}, (e, r, b) => {/* ... */}) // /nodes/{node}/ceph/osd/{osdid}/scrub [POST]
proxmox.nodes.ceph.pools.get('node', (e, r, b) => {/* ... */}) // /nodes/{node}/ceph/pools [GET]
proxmox.nodes.ceph.pools.post('node', {key:'value'}, (e, r, b) => {/* ... */}) // /nodes/{node}/ceph/pools [POST]
proxmox.nodes.ceph.pools.delete('node', 'name', (e, r, b) => {/* ... */}) // /nodes/{node}/ceph/pools/{name} [DELETE]
proxmox.nodes.ceph.config.get('node', (e, r, b) => {/* ... */}) // /nodes/{node}/ceph/config [GET]
proxmox.nodes.ceph.configdb.get('node', (e, r, b) => {/* ... */}) // /nodes/{node}/ceph/configdb [GET]
proxmox.nodes.ceph.crush.get('node', (e, r, b) => {/* ... */}) // /nodes/{node}/ceph/crush [GET]
proxmox.nodes.ceph.disks.get('node', (e, r, b) => {/* ... */}) // /nodes/{node}/ceph/disks [GET]
proxmox.nodes.ceph.init.post('node', {key:'value'}, (e, r, b) => {/* ... */}) // /nodes/{node}/ceph/init [POST]
proxmox.nodes.ceph.log.get('node', (e, r, b) => {/* ... */}) // /nodes/{node}/ceph/log [GET]
proxmox.nodes.ceph.restart.post('node', {key:'value'}, (e, r, b) => {/* ... */}) // /nodes/{node}/ceph/restart [POST]
proxmox.nodes.ceph.rules.get('node', (e, r, b) => {/* ... */}) // /nodes/{node}/ceph/rules [GET]
proxmox.nodes.ceph.start.post('node', {key:'value'}, (e, r, b) => {/* ... */}) // /nodes/{node}/ceph/start [POST]
proxmox.nodes.ceph.status.get('node', (e, r, b) => {/* ... */}) // /nodes/{node}/ceph/status [GET]
proxmox.nodes.ceph.stop.post('node', {key:'value'}, (e, r, b) => {/* ... */}) // /nodes/{node}/ceph/stop [POST]

/* nodes/{node}/certificates */
proxmox.nodes.certificates.get('node', (e, r, b) => {/* ... */}) // /nodes/{node}/certificates [GET]
proxmox.nodes.certificates.acme.get('node', (e, r, b) => {/* ... */}) // /nodes/{node}/certificates/acme [GET]
proxmox.nodes.certificates.acme.certificate.post('node', {key:'value'}, (e, r, b) => {/* ... */}) // /nodes/{node}/certificates/acme/certificate [POST]
proxmox.nodes.certificates.acme.certificate.put('node', {key:'value'}, (e, r, b) => {/* ... */}) // /nodes/{node}/certificates/acme/certificate [PUT]
proxmox.nodes.certificates.acme.certificate.delete('node', (e, r, b) => {/* ... */}) // /nodes/{node}/certificates/acme/certificate [DELETE]
proxmox.nodes.certificates.custom.post('node', {key:'value'}, (e, r, b) => {/* ... */}) // /nodes/{node}/certificates/custom [POST]
proxmox.nodes.certificates.custom.delete('node', (e, r, b) => {/* ... */}) // /nodes/{node}/certificates/custom [DELETE]
proxmox.nodes.certificates.info.get('node', (e, r, b) => {/* ... */}) // /nodes/{node}/certificates/info [GET]

/* nodes/{node}/disks */
proxmox.nodes.disks.get('node', (e, r, b) => {/* ... */}) // /nodes/{node}/disks [GET]
proxmox.nodes.disks.zfs.get('node', (e, r, b) => {/* ... */}) // /nodes/{node}/disks/zfs [GET]
proxmox.nodes.disks.zfs.post('node', {key:'value'}, (e, r, b) => {/* ... */}) // /nodes/{node}/disks/zfs [POST]
proxmox.nodes.disks.zfs.get('node', 'name', (e, r, b) => {/* ... */}) // /nodes/{node}/disks/zfs/{name} [GET]
proxmox.nodes.disks.directory.get('node', (e, r, b) => {/* ... */}) // /nodes/{node}/disks/directory [GET]
proxmox.nodes.disks.directory.post('node', {key:'value'}, (e, r, b) => {/* ... */}) // /nodes/{node}/disks/directory [POST]
proxmox.nodes.disks.initgpt.post('node', {key:'value'}, (e, r, b) => {/* ... */}) // /nodes/{node}/disks/initgpt [POST]
proxmox.nodes.disks.list.get('node', {key:'value'}, (e, r, b) => {/* ... */}) // /nodes/{node}/disks/list?params.. [GET]
proxmox.nodes.disks.lvm.get('node', (e, r, b) => {/* ... */}) // /nodes/{node}/disks/lvm [GET]
proxmox.nodes.disks.lvm.post('node', {key:'value'}, (e, r, b) => {/* ... */}) // /nodes/{node}/disks/lvm [POST]
proxmox.nodes.disks.lvmthin.get('node', (e, r, b) => {/* ... */}) // /nodes/{node}/disks/lvmthin [GET]
proxmox.nodes.disks.lvmthin.post('node', {key:'value'}, (e, r, b) => {/* ... */}) // /nodes/{node}/disks/lvmthin [POST]
proxmox.nodes.disks.smart.get('node', {key:'value'}, (e, r, b) => {/* ... */}) // /nodes/{node}/disks/smart?params.. [GET]


```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
