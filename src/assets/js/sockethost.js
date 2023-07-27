let hostname = window.location.hostname;
console.log(window.location.protocol)
if (window.location.protocol === 'http:') hostname = hostname+':3000';
const socketHost = window.location.protocol + '//' + hostname;
