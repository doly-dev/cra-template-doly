const delay = require('mocker-api/lib/delay');

const data = [
  {
    name: "util-helpers",
    full_name: "doly-dev/util-helpers",
    html_url: "https://github.com/doly-dev/util-helpers",
    description: "一个基于业务场景的工具方法库"
  },
  {
    name: "rc-hooks",
    full_name: "doly-dev/rc-hooks",
    html_url: "https://github.com/doly-dev/rc-hooks",
    description: "React Hooks Library."
  },
];

module.exports = delay({
  'GET /users/doly-dev/repos': data,
  'GET /repos/doly-dev/:repoName': (req, res) => {
    const { repoName } = req.params;
    res.send(data.find(item => item.name === repoName));
  },
}, 1000);