var os = require('os');

module.exports = function() {
  var ifaces = os.networkInterfaces();

  for (var i in ifaces) {
    for (var j in ifaces[i]) {
      var iface = ifaces[i][j];

      if ('IPv4' !== iface.family || iface.internal !== false)
        continue;

      return iface.address;
    }

  }
};